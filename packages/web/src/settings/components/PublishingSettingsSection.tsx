import { isPublishLimitProfileId, PUBLISH_LIMIT_PROFILE, publishLimitProfiles, type CustomPublishLimitProfile, type PublishingSettings } from "@skladno/shared";
import { useState } from "react";
import { useIntl } from "react-intl";
import { Badge, Button, Field, Select } from "../../ui/primitives.js";
import { CustomProfileRemovalDialog } from "./CustomProfileRemovalDialog.js";
import { Control, SettingRow, SettingsGroup } from "./SettingRow.js";


export function PublishingSettingsSection({ publishing, save }: { publishing: PublishingSettings; save: (next: PublishingSettings) => void }) {
    const intl = useIntl();
    const [name, setName] = useState("");
    const [limit, setLimit] = useState("");
    const [pendingRemoval, setPendingRemoval] = useState<CustomPublishLimitProfile>();
    const parsedLimit = Number(limit);
    const valid = Boolean(name.trim()) && Number.isInteger(parsedLimit) && parsedLimit >= 0;
    const profiles = [...publishLimitProfiles, ...publishing.customProfiles];
    const getProfileLabel = (id: string) => id === PUBLISH_LIMIT_PROFILE.NO_RESTRICTIONS ? intl.formatMessage({ id: "publishing.noRestrictions" }) : id === PUBLISH_LIMIT_PROFILE.LINKEDIN_POST ? intl.formatMessage({ id: "publishing.linkedInPost" }) : id === PUBLISH_LIMIT_PROFILE.LINKEDIN_ARTICLE ? intl.formatMessage({ id: "publishing.linkedInArticle" }) : publishing.customProfiles.find((profile) => profile.id === id)?.name ?? intl.formatMessage({ id: "publishing.default" });


    function addCustomProfile() {
        if (!valid)
            return;

        save({ ...publishing, customProfiles: [...publishing.customProfiles, { id: `custom-${crypto.randomUUID()}`, name: name.trim(), characterLimit: parsedLimit }] });
        setName("");
        setLimit("");
    }


    function removeCustomProfile(profileId: string) {
        save({ ...publishing, defaultProfileId: publishing.defaultProfileId === profileId ? PUBLISH_LIMIT_PROFILE.DEFAULT : publishing.defaultProfileId, customProfiles: publishing.customProfiles.filter((profile) => profile.id !== profileId) });
    }


    function confirmRemoval() {
        if (!pendingRemoval)
            return;

        removeCustomProfile(pendingRemoval.id);
        setPendingRemoval(undefined);
    }


    return <>
        <SettingsGroup label={intl.formatMessage({ id: "settings.publishingProfiles" })}>
            <SettingRow headingLevel={3} label={intl.formatMessage({ id: "settings.publishingProfile" })} hint={intl.formatMessage({ id: "settings.publishingProfileHint" })}>
                <Select aria-label={intl.formatMessage({ id: "settings.publishingProfile" })} value={publishing.defaultProfileId} onChange={(event) => {
                    const value = event.target.value;
                    if (isPublishLimitProfileId(value) && profiles.some((profile) => profile.id === value))
                        save({ ...publishing, defaultProfileId: value });
                }}>
                    {profiles.map((profile) => <option key={profile.id} value={profile.id}>{getProfileLabel(profile.id)}{profile.characterLimit === undefined ? "" : ` (${intl.formatNumber(profile.characterLimit)})`}</option>)}
                </Select>
            </SettingRow>
            <div className="mt-5 mb-6">
                <div>
                    <h3 className="text-sm font-semibold">{intl.formatMessage({ id: "settings.customProfiles" })}</h3>
                    <p className="mt-1 text-sm leading-5 text-muted">{intl.formatMessage({ id: "settings.customProfilesHint" })}</p>
                </div>
                {publishing.customProfiles.length > 0 && (
                    <ul className="mt-4 divide-y divide-border border-y border-border">
                        {publishing.customProfiles.map((profile) => (
                            <li key={profile.id} className="flex items-center gap-3 py-2.5 text-sm">
                                <span className="min-w-0 flex-1 truncate text-ink">{profile.name}</span>
                                <Badge className="shrink-0">{intl.formatNumber(profile.characterLimit)}</Badge>
                                <Button
                                    variant="quiet"
                                    onClick={() => setPendingRemoval(profile)}
                                    aria-label={intl.formatMessage({ id: "settings.removeCustomProfile" }, { name: profile.name })}>
                                    {intl.formatMessage({ id: "settings.remove" })}
                                </Button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <div className="pb-8">
                <div className="border-l border-border-strong pl-4">
                    <div className="grid gap-3">
                        <Control label={intl.formatMessage({ id: "settings.customProfileName" })} hint={intl.formatMessage({ id: "settings.customProfileNameHint" })}>
                            <Field aria-label={intl.formatMessage({ id: "settings.customProfileName" })} value={name} onChange={(event) => setName(event.target.value)} />
                        </Control>
                        <div>
                            <Control label={intl.formatMessage({ id: "settings.customProfileLimit" })} hint={intl.formatMessage({ id: "settings.customProfileLimitHint" })}>
                                <Field
                                    aria-label={intl.formatMessage({ id: "settings.customProfileLimit" })}
                                    type="number"
                                    min="0"
                                    step="1"
                                    value={limit}
                                    onChange={(event) => setLimit(event.target.value)} />
                            </Control>
                            {!valid && (name || limit) && <p className="mt-2 text-xs text-muted" role="status">{intl.formatMessage({ id: "settings.customProfileInvalid" })}</p>}
                        </div>
                    </div>
                    <div className="mt-4">
                        <Button variant="secondary" disabled={!valid} onClick={addCustomProfile}>{intl.formatMessage({ id: "settings.saveCustomProfile" })}</Button>
                    </div>
                </div>
            </div>
        </SettingsGroup>

        {pendingRemoval && (
            <CustomProfileRemovalDialog
                profile={pendingRemoval}
                isDefault={publishing.defaultProfileId === pendingRemoval.id}
                close={() => setPendingRemoval(undefined)}
                remove={confirmRemoval} />
        )}
    </>;
}
