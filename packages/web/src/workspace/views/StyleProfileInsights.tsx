import { useState } from "react";
import type { GeneralSettings, StyleCorpus } from "@skladno/shared";
import { Button } from "../../ui/primitives.js";
import { ChevronRightIcon } from "../../ui/icons.js";
import { formatDateTime } from "../../i18n/formatting.js";
import type { MessageId } from "../../i18n/messages.js";
import { useIntl } from "react-intl";


const traitTitles: Record<string, MessageId> = { voice: "styleProfile.trait.voice", rhythm: "styleProfile.trait.rhythm", structure: "styleProfile.trait.structure", vocabulary: "styleProfile.trait.vocabulary", transitions: "styleProfile.trait.transitions" };
const traitDescriptions: Record<string, MessageId> = {
    "personal author presence": "styleProfile.trait.personalAuthorPresence",
    "impersonal explanatory voice": "styleProfile.trait.impersonalExplanatoryVoice",
    "compact sentences": "styleProfile.trait.compactSentences",
    "long, developed sentences": "styleProfile.trait.longDevelopedSentences",
    "moderate sentence length": "styleProfile.trait.moderateSentenceLength",
    "frequent paragraph breaks": "styleProfile.trait.frequentParagraphBreaks",
    "developed paragraphs": "styleProfile.trait.developedParagraphs",
    "conversational contractions": "styleProfile.trait.conversationalContractions",
    "formal, expanded phrasing": "styleProfile.trait.formalExpandedPhrasing",
    "uses explicit transitions": "styleProfile.trait.usesExplicitTransitions",
    "uses few explicit transitions": "styleProfile.trait.usesFewExplicitTransitions",
};


export function StyleProfileInsights({ corpus, generalSettings }: { corpus: StyleCorpus | undefined; generalSettings: GeneralSettings }) {
    const intl = useIntl();
    const [sourcesExpanded, setSourcesExpanded] = useState(false);
    const contributors = corpus?.profile?.contributorIds.map((id) => corpus.items.find((item) => item.id === id)?.name).filter((name): name is string => Boolean(name)) ?? [];
    return (
        <section className="mb-7">
            <h3 className="mb-3 text-base font-semibold">{intl.formatMessage({ id: "styleProfile.detectedCharacteristics" })}</h3>
            <div className="border-l border-border-strong pl-4">
                <p className="mb-4 text-xs text-muted">
                    {intl.formatMessage({ id: corpus?.profile ? "styleProfile.detectedHint" : "styleProfile.detectedEmpty" })}
                </p>
                {corpus?.profile && (
                    <div className="mb-5 text-xs text-muted">
                        <dl className="flex flex-wrap gap-x-8 gap-y-2">
                            <div>
                                <dt>{intl.formatMessage({ id: "styleProfile.profileContributors" })}</dt>
                                <dd>{intl.formatMessage({ id: "styleProfile.profileSourceCount" }, { count: contributors.length })}</dd>
                            </div>
                            <div>
                                <dt>{intl.formatMessage({ id: "styleProfile.profileLastRebuilt" })}</dt>
                                <dd>
                                    {formatDateTime(
                                        corpus.profile.updatedAt,
                                        intl.locale,
                                        generalSettings.dateFormat,
                                        generalSettings.timeFormat,
                                        generalSettings.timeZone,
                                    )}
                                </dd>
                            </div>
                        </dl>
                        <ProfileSourceDisclosure
                            expanded={sourcesExpanded}
                            toggle={() => setSourcesExpanded((value) => !value)}
                            contributors={contributors}
                        />
                    </div>
                )}
                <div className="space-y-4">
                    {corpus?.profile?.traits.map((trait) => (
                        <div key={trait.id}>
                            <h4 className="text-sm font-medium">
                                {traitTitles[trait.id] ? intl.formatMessage({ id: traitTitles[trait.id] }) : trait.id}
                            </h4>
                            <p className="mt-1 text-sm text-muted">
                                {intl.formatMessage(
                                    { id: traitDescriptions[trait.label] ?? "styleProfile.trait.unknown" },
                                    { label: trait.label, evidence: trait.evidence },
                                )}
                            </p>
                        </div>
                    ))}
                </div>
                {corpus?.profile?.phrasesToAvoid.length ? (
                    <>
                        <h3 className="mb-3 mt-7 text-micro font-semibold uppercase tracking-overline text-muted">
                            {intl.formatMessage({ id: "styleProfile.phrasesToAvoid" })}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {corpus.profile.phrasesToAvoid.map((phrase) => (
                                <span
                                    className="rounded-control border border-danger/30 bg-danger-soft px-2 py-1 text-sm text-danger"
                                    key={phrase}
                                >
                                    {phrase}
                                </span>
                            ))}
                        </div>
                    </>
                ) : null}
            </div>
        </section>
    );
}


function ProfileSourceDisclosure({ expanded, toggle, contributors }: { expanded: boolean; toggle: () => void; contributors: string[] }) {
    const intl = useIntl();
    return <>
        <Button
            className="mt-2 inline-flex min-h-0 items-center px-0 py-1 text-xs"
            variant="quiet"
            aria-expanded={expanded}
            aria-controls="style-profile-contributors"
            onClick={toggle}>
            <span className="inline-flex items-center gap-1 whitespace-nowrap">
                <ChevronRightIcon className={`size-3 transition-transform motion-reduce:transition-none ${expanded ? "rotate-90" : ""}`} />{intl.formatMessage({ id: "styleProfile.showProfileSources" })}
            </span>
        </Button>
        <div
            id="style-profile-contributors"
            aria-hidden={!expanded}
            {...(!expanded ? { inert: true } : {}) as Record<string, boolean>}
            className={`grid transition-[grid-template-rows,opacity] duration-200 ease-out motion-reduce:transition-none ${expanded ? "grid-rows-[1fr] opacity-100" : "pointer-events-none grid-rows-[0fr] opacity-0"}`}>
            <div className="overflow-hidden">
                <ul className="mt-1 space-y-1 border-l border-border pl-3 text-xs">{contributors.map((name) => <li className="break-words" key={name}>{name}</li>)}</ul>
            </div>
        </div>
    </>;
}
