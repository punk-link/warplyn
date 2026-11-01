import { useIntl } from "react-intl";
import { getDesktopSettingsClient, getDesktopUpdateClient } from "../../application/desktop-client.js";
import { SettingRow, SettingsGroup } from "./SettingRow.js";
import { UpdatesSettingsGroup } from "./UpdatesSettingsGroup.js";
import { Button, TextAction } from "../../ui/primitives.js";


const repositoryUrl = "https://github.com/punk-link/warplyn";


export function AboutSettingsSection({ openQuickStart }: { openQuickStart?: () => void }) {
    const intl = useIntl();

    return <>
        <p className="mt-2 text-sm leading-5 text-muted">{intl.formatMessage({ id: "settings.aboutDescription" })}</p>
        <SettingsGroup label={intl.formatMessage({ id: "settings.projectResources" })}>
            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2">
                <TextAction
                    href={repositoryUrl}
                    target="_blank"
                    rel="noreferrer">{intl.formatMessage({ id: "settings.sourceCode" })}
                </TextAction>
                <TextAction
                    href={`${repositoryUrl}/issues`}
                    target="_blank"
                    rel="noreferrer">{intl.formatMessage({ id: "settings.reportProblem" })}
                </TextAction>
                <TextAction
                    href={`${repositoryUrl}/blob/main/LICENSE`}
                    target="_blank"
                    rel="noreferrer">{intl.formatMessage({ id: "settings.mitLicense" })}
                </TextAction>
                <TextAction
                    href="https://warplyn.com/docs/"
                    target="_blank"
                    rel="noreferrer">{intl.formatMessage({ id: "settings.documentation" })}
                </TextAction>
            </div>
        </SettingsGroup>
        {openQuickStart && (
            <SettingRow label={intl.formatMessage({ id: "settings.quickStart" })} hint={intl.formatMessage({ id: "settings.quickStartHint" })}>
                <Button variant="secondary" compact onClick={openQuickStart}>{intl.formatMessage({ id: "settings.openQuickStart" })}</Button>
            </SettingRow>
        )}
        <div id="settings-updates" tabIndex={-1} />
        <UpdatesSettingsGroup client={getDesktopUpdateClient()} desktop={Boolean(getDesktopSettingsClient())} />
    </>;
}
