import { useCallback, useEffect, useRef, useState } from "react";
import type { DesktopSpellingRequest, DesktopSpellingSnapshot } from "@skladno/shared";
import { getDesktopSpellingClient } from "../application/desktop-client.js";
import type { MessageId } from "../i18n/messages.js";


export function useSpellingSettings() {
    const client = getDesktopSpellingClient();
    const [snapshot, setSnapshot] = useState<DesktopSpellingSnapshot>();
    const [selected, setSelected] = useState<string[]>([]);
    const [input, setInput] = useState("");
    const [search, setSearch] = useState("");
    const [busy, setBusy] = useState(false);
    const [status, setStatus] = useState<MessageId>("spelling.loading");
    const mounted = useRef(false);
    const inFlight = useRef(false);
    const sequence = useRef(0);

    const load = useCallback(async (request: DesktopSpellingRequest) => {
        const current = ++sequence.current;
        if (!client)
            throw new Error("Desktop spelling unavailable");

        const result = await client.request(request);
        if (!result.ok)
            throw new Error("Desktop spelling failed");

        if (mounted.current && current === sequence.current) {
            setSnapshot(result.value);
            setSelected((selected) => selected.filter((language) => result.value.dictionaries.states[language] !== "ready" && result.value.dictionaries.states[language] !== "unloaded"));
        }

        return result.value;
    }, [client]);

    useEffect(() => {
        mounted.current = true;
        if (client)
            void load({ method: "snapshot" }).then(() => {
                if (mounted.current)
                    setStatus("spelling.loaded");
            }).catch(() => {
                if (mounted.current)
                    setStatus("spelling.loadFailed");
            });

        return () => {
            mounted.current = false;
        };
    }, [client, load]);

    useEffect(() => {
        if (busy || !Object.values(snapshot?.dictionaries.states ?? {}).includes("preparing"))
            return;

        const timer = setTimeout(() => {
            void load({ method: "snapshot" }).catch(() => {
                if (mounted.current)
                    setStatus("spelling.loadFailed");
            });
        }, 1000);
        return () => clearTimeout(timer);
    }, [busy, load, snapshot]);


    async function mutate(request: DesktopSpellingRequest): Promise<DesktopSpellingSnapshot | undefined> {
        if (inFlight.current)
            return undefined;

        inFlight.current = true;
        setBusy(true);
        setStatus("spelling.working");
        try {
            const value = await load(request);
            if (mounted.current)
                setStatus(value.personal.failed.length ? "spelling.partial" : "spelling.updated");

            return value;
        } catch {
            if (mounted.current)
                setStatus("spelling.operationFailed");

            return undefined;
        } finally {
            inFlight.current = false;
            if (mounted.current)
                setBusy(false);
        }
    }


    async function addWords() {
        const words = [...new Set(input.split(/\r?\n/).map((word) => word.trim()).filter(Boolean))];
        if (!words.length || words.length > 500 || new TextEncoder().encode(input).length > 65_536 || words.some((word) => word.length > 256)) {
            setStatus("spelling.invalidWords");
            return;
        }

        const value = await mutate({ method: "addWords", words });
        if (value && mounted.current)
            setInput(value.personal.failed.join("\n"));
    }


    return {
        available: Boolean(client), snapshot, selected, setSelected, input, setInput, search, setSearch, busy, status,
        prepare: () => mutate({ method: "prepare", languages: selected }),
        unload: (language: string) => mutate({ method: "unload", language }),
        addWords,
        removeWord: (word: string) => mutate({ method: "removeWord", word }),
        retryLoad: () => mutate({ method: "snapshot" }),
    };
}
