import { randomUUID } from "node:crypto";
import { isTelemetryEvent, type TelemetryConsent, type TelemetryEvent } from "@skladno/shared";
import { readRuntimeSettings, updateRuntimeSettings } from "../runtime/runtime-settings.js";
import { type TelemetryDelivery } from "./telemetry-delivery.js";


interface OwnerState {
    readonly generation: number;
    readonly sessionStartedGeneration: number;
    readonly disposed: boolean;
}


/** Main-process-only telemetry consent owner. Delivery is delegated to TelemetryDelivery. */
export function createTelemetryOwner({ runtimePath, delivery }: {
    runtimePath: string;
    delivery: TelemetryDelivery;
}) {
    let state: OwnerState = { generation: 0, sessionStartedGeneration: -1, disposed: false };
    const models = new Set<string>();

    const initial = getTelemetryConsent();

    if (initial.enabled && initial.installationId)
        delivery.start(initial.installationId);
    else
        delivery.stop();


    function getTelemetryConsent(): TelemetryConsent {
        const telemetry = readRuntimeSettings(runtimePath).telemetry;
        return telemetry?.consent === "granted" && delivery.supported && !state.disposed
            ? { enabled: true, supported: true, installationId: telemetry.installationId }
            : { enabled: false, supported: delivery.supported };
    }


    function stop(): void {
        models.clear();
        state = { ...state, generation: state.generation + 1 };
        delivery.stop();
    }


    function capture(event: TelemetryEvent): void {
        const runtime = readRuntimeSettings(runtimePath);
        if (state.disposed || !runtime.telemetry || runtime.telemetry.consent !== "granted" || !delivery.supported)
            return;

        if (event.kind === "app_session_started" && state.sessionStartedGeneration === state.generation)
            return;

        if (!isTelemetryEvent(event))
            return;

        const modelKey = event.kind === "model_used" ? JSON.stringify([event.operation, event.provider, event.model]) : undefined;
        if (modelKey !== undefined && !models.has(modelKey) && models.size >= 32)
            return;

        if (!delivery.capture(event, runtime.telemetry.installationId))
            return;

        if (modelKey !== undefined)
            models.add(modelKey);

        if (event.kind === "app_session_started")
            state = { ...state, sessionStartedGeneration: state.generation };
    }


    function beginCapture(): (event: TelemetryEvent) => void {
        const currentGeneration = state.generation;
        if (!getTelemetryConsent().enabled)
            return () => undefined;

        return (event) => {
            if (currentGeneration === state.generation)
                capture(event);
        };
    }


    function beginCaptureGeneration(): number | undefined {
        return getTelemetryConsent().enabled ? state.generation : undefined;
    }


    function captureAtGeneration(event: TelemetryEvent, currentGeneration: number | undefined): void {
        if (currentGeneration !== undefined && currentGeneration === state.generation)
            capture(event);
    }


    return {
        getConsent: getTelemetryConsent,
        beginCapture,
        beginCaptureGeneration,
        captureAtGeneration,
        setConsent(enabled: boolean): TelemetryConsent {
            const current = getTelemetryConsent();
            if (!enabled) {
                if (readRuntimeSettings(runtimePath).telemetry?.consent === "denied")
                    return current;

                updateRuntimeSettings(runtimePath, (runtime) => ({ ...runtime, telemetry: { consent: "denied" } }));
                stop();
                return getTelemetryConsent();
            }

            if (current.enabled || !delivery.supported || state.disposed)
                return current;

            updateRuntimeSettings(runtimePath, (runtime) => ({ ...runtime, telemetry: { consent: "granted", installationId: randomUUID() } }));
            state = { ...state, generation: state.generation + 1 };
            const consent = getTelemetryConsent();
            if (consent.installationId)
                delivery.start(consent.installationId);

            capture({ kind: "app_session_started" });

            return getTelemetryConsent();
        },
        capture,
        dispose: () => {
            state = { ...state, disposed: true };
            state = { ...state, generation: state.generation + 1 };
            delivery.suspend();
        },
    };
}
