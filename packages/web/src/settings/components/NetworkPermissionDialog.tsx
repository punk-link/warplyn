import type { IntlShape } from "react-intl";
import type { DesktopUpdateClient, DesktopUpdateState } from "@skladno/shared";
import { Button, Dialog } from "../../ui/primitives.js";


export function NetworkPermissionDialog({ client, open, onClose, onState, intl }: {
    client: DesktopUpdateClient; open: boolean; onClose: () => void;
    onState: (state: DesktopUpdateState) => void; intl: IntlShape;
}) {
    if (!open)
        return null;

    return <Dialog
        className="w-full max-w-[calc(100vw-2rem)] sm:max-w-xl"
        open
        aria-labelledby="update-network-permission-title"
        onCancel={(event) => {
            event.preventDefault();
            onClose();
        }}>
        <h2 id="update-network-permission-title" className="text-lg font-semibold">{intl.formatMessage({ id: "settings.updateNetworkPermissionTitle" })}</h2>
        <p className="mt-2 text-sm leading-6 text-muted">{intl.formatMessage({ id: "settings.updateNetworkPermissionDescription" })}</p>
        <div className="mt-5 flex justify-end gap-2">
            <Button variant="secondary" autoFocus onClick={onClose}>{intl.formatMessage({ id: "editor.cancel" })}</Button>
            <Button onClick={() => void client.setNetworkAccess(true).then((state) => {
                onState(state);
                onClose();
            })}>{intl.formatMessage({ id: "settings.allowNetworkAccess" })}
            </Button>
        </div>
    </Dialog>;
}
