import { useState } from "react";
import { ActivityIndicator, Badge, Banner, Button, Dialog, Diff, Drawer, EmptyState, Field, IconButton, Progress, Select, Skeleton, Status, TextAction, TextareaField, Tooltip } from "../ui/primitives.js";
import { WorkspaceTabBar } from "../workspace/components/WorkspaceTabBar.js";
import type { WorkspaceView } from "../workspace/workspace-views.js";


export function UiLanguagePreview() {
    const [view, setView] = useState<WorkspaceView>("write");
    const [dialogOpen, setDialogOpen] = useState(false);
    const [checked, setChecked] = useState(true);

    return <main className="min-h-screen bg-canvas p-4 text-ink sm:p-8">
        <header className="mx-auto mb-8 max-w-6xl">
            <p className="text-xs font-semibold uppercase tracking-overline text-muted">Developer reference</p>
            <h1 className="mt-2 text-3xl font-semibold">UI language preview</h1>
            <p className="mt-2 max-w-2xl text-sm text-muted">Live examples rendered with Warplyn's shared React primitives and design tokens. Interact with the controls to see their real states.</p>
        </header>
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[14rem_minmax(0,1fr)]">
            <Drawer className="rounded-panel p-4">
                <p className="mb-4 font-semibold text-brand">Warplyn</p>
                <nav aria-label="Preview navigation" className="grid gap-1 text-sm">
                    <a className="rounded-control px-3 py-2 text-muted hover:bg-brand-soft" href="#workspace">Workspace</a>
                    <a className="rounded-control bg-brand-soft px-3 py-2 font-semibold text-brand" href="#controls" aria-current="page">Controls</a>
                    <a className="rounded-control px-3 py-2 text-muted hover:bg-brand-soft" href="#feedback">Feedback</a>
                </nav>
            </Drawer>
            <div className="min-w-0 space-y-6">
                <section id="workspace" className="overflow-hidden rounded-panel border border-border bg-surface">
                    <div className="border-b border-border p-5">
                        <p className="text-xs text-muted">Article · Updated just now</p>
                        <h2 className="mt-2 font-editor text-2xl">Make space for the important sentence</h2>
                        <p className="mt-1 text-xs text-muted">Draft · Saved locally</p>
                    </div>
                    <WorkspaceTabBar view={view} setView={setView} badges={{ revisions: { label: "3", accessibleLabel: "3 revisions", tone: "default" } }} />
                    <div className="p-5">
                        {view === "write" && <p className="max-w-prose font-editor text-lg leading-8">Good writing gives each idea enough room to become clear. Quiet surfaces, readable type, and clear controls keep attention on the work.</p>}
                        {view === "revisions" && <p className="text-sm text-muted">Three revisions preserve this Article's history.</p>}
                        {view === "proposal" && <p className="text-sm text-muted">Suggested changes wait for the Author's decision.</p>}
                        {view === "fact-check" && <p className="text-sm text-muted">Claims and sources appear here for review.</p>}
                        {view === "translations" && <p className="text-sm text-muted">Translations stay recoverable as separate Articles.</p>}
                        <div className="mt-5 flex flex-wrap gap-2">
                            <Button onClick={() => setDialogOpen(true)}>Review changes</Button>
                            <Button variant="secondary">Revision history</Button>
                            <Button variant="quiet">More options</Button>
                            <Button variant="danger">Delete draft</Button>
                            <Button state="loading" loadingLabel="Saving">Save</Button>
                            <IconButton label="Pin Article" variant="toolbar" aria-pressed={checked} onClick={() => setChecked(!checked)}>★</IconButton>
                        </div>
                    </div>
                </section>

                <section id="controls" className="rounded-panel border border-border bg-surface p-5">
                    <h2 className="text-base font-semibold">Fields and choices</h2>
                    <div className="mt-4 grid gap-5 sm:grid-cols-2">
                        <label className="grid gap-2 text-xs font-semibold">Article title<Field defaultValue="A useful idea" /></label>
                        <label className="grid gap-2 text-xs font-semibold">Language<Select defaultValue="en"><option value="en">English</option><option value="es">Español</option></Select></label>
                        <label className="grid gap-2 text-xs font-semibold sm:col-span-2">Draft content<TextareaField defaultValue="A Draft checkpoint preserves work as you write." /></label>
                        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={checked} onChange={(event) => setChecked(event.target.checked)} />Keep recovery checkpoints</label>
                        <div className="flex flex-wrap items-center gap-3">
                            <TextAction href="#feedback">Learn about feedback</TextAction>
                            <Tooltip content="Recovery state is saved locally."><IconButton label="Help">?</IconButton></Tooltip>
                        </div>
                    </div>
                </section>

                <section id="feedback" className="rounded-panel border border-border bg-surface p-5">
                    <h2 className="text-base font-semibold">Feedback and review</h2>
                    <div className="mt-4 grid gap-4 lg:grid-cols-2">
                        <Status label="Saved · " tone="success">Your Draft is available locally.</Status>
                        <Banner tone="warning" role="alert">This result needs another look before you apply it.</Banner>
                        <div className="space-y-2 rounded-panel border border-border p-4"><div className="flex items-center gap-2 text-sm"><ActivityIndicator />Assistant is preparing suggestions</div><Progress value={62} label="Assistant progress" /></div>
                        <div className="grid gap-2 rounded-panel border border-border p-4"><Skeleton className="h-3 w-2/5" /><Skeleton className="h-3 w-full" /><Skeleton className="h-3 w-3/4" /></div>
                        <Diff removed="The original wording is less direct." added="The revised wording is clear and direct." />
                        <div className="rounded-panel border border-border"><EmptyState title="No revisions yet"><span>Create a checkpoint to preserve this version.</span><Button variant="secondary">Create checkpoint</Button></EmptyState></div>
                    </div>
                    <Button className="mt-4" variant="secondary" onClick={() => setDialogOpen(true)}>Open confirmation dialog</Button>
                </section>
            </div>
        </div>
        <Dialog open={dialogOpen} aria-labelledby="preview-dialog-title" className="w-full max-w-md">
            <h2 id="preview-dialog-title" className="text-base font-semibold">Restore this Revision?</h2>
            <p className="mt-2 text-sm text-muted">Restoring appends a new Revision. Existing history stays available.</p>
            <div className="mt-5 flex justify-end gap-2"><Button variant="secondary" onClick={() => setDialogOpen(false)}>Cancel</Button><Button onClick={() => setDialogOpen(false)}>Restore Revision</Button></div>
        </Dialog>
    </main>;
}
