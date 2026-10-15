import { useEffect, useState } from "react";
import type { EditorialWorkspaceClient } from "../../application/client.js";


export function useUsableAiConnection(client: EditorialWorkspaceClient, screen: string) {
    const [hasUsableAiConnection, setHasUsableAiConnection] = useState<boolean>();

    useEffect(() => {
        let cancelled = false;
        void client.getApplicationSettings().then((settings) => {
            if (!cancelled)
                setHasUsableAiConnection(settings.connections.some((connection) => connection.active !== false && connection.status === "connected"));
        }).catch(() => undefined);

        return () => {
            cancelled = true;
        };
    }, [client, screen]);

    return hasUsableAiConnection;
}
