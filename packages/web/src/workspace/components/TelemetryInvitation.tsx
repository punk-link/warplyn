import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { getDesktopTelemetryClient } from "../../application/desktop-client.js";
import { Banner, Button } from "../../ui/primitives.js";

const dismissalKey = "warplyn.telemetry-invitation.dismissed.v1";


export function TelemetryInvitation() {
    const intl = useIntl();
    const [visible, setVisible] = useState(false);
    const [saving, setSaving] = useState(false);
    const [failed, setFailed] = useState(false);
    const telemetry = getDesktopTelemetryClient();

    useEffect(() => {
        let active = true;
        let dismissed = false;
        try {
            dismissed = localStorage.getItem(dismissalKey) === "true";
        } catch { /** Storage failure leaves the invitation available for this session. */ }

        if (!dismissed && telemetry)
            void telemetry.getTelemetryConsent().then((consent) => {
                if (active)
                    setVisible(consent.supported && !consent.enabled);
            }).catch(() => undefined);

        return () => {
            active = false;
        };
    }, [telemetry]);


    function dismiss() {
        try {
            localStorage.setItem(dismissalKey, "true");
        } catch { /** Storage failure limits dismissal to this session. */ }

        setVisible(false);
    }


    async function enable() {
        if (!telemetry)
            return;

        setSaving(true);
        setFailed(false);
        try {
            const consent = await telemetry.setTelemetryConsent(true);
            if (consent.enabled)
                dismiss();
            else
                setFailed(true);
        } catch {
            setFailed(true);
        } finally {
            setSaving(false);
        }
    }


    if (!visible)
        return null;

    return <Banner className="m-3 shrink-0">
        <div className="min-w-0">
            <p>{intl.formatMessage({ id: "telemetry.invitation" })}</p>
            {failed && <p role="alert">{intl.formatMessage({ id: "settings.telemetrySaveFailed" })}</p>}
            <div className="mt-2 flex flex-wrap items-center gap-3">
                <Button disabled={saving} onClick={() => void enable()}>
                    {intl.formatMessage({ id: "telemetry.enable" })}
                </Button>
                <Button variant="quiet" disabled={saving} onClick={dismiss}>
                    {intl.formatMessage({ id: "telemetry.dismiss" })}
                </Button>
                <a
                    className="text-brand underline"
                    href="https://warplyn.com/docs/telemetry.html"
                    target="_blank"
                    rel="noreferrer">
                    {intl.formatMessage({ id: "telemetry.learnMore" })}
                </a>
            </div>
        </div>
    </Banner>;
}
