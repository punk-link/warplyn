import { useEffect, useState } from "react";
import { defaultGeneralSettings, type GeneralSettings } from "@skladno/shared";
import type { EditorialWorkspaceClient } from "../../application/client.js";


export function useWorkspaceGeneralSettings(client: EditorialWorkspaceClient, active: boolean) {
    const [generalSettings, setGeneralSettings] = useState<GeneralSettings>(defaultGeneralSettings);

    useEffect(() => {
        if (!active)
            return;

        void client.getApplicationSettings()
            .then((settings) => setGeneralSettings(settings.general))
            .catch(() => undefined);
    }, [client, active]);

    return generalSettings;
}
