export function SwitchIndicator({ checked }: { checked: boolean }) {
    return <span aria-hidden="true" className={
        "relative inline-flex h-[18px] w-8 shrink-0 items-center rounded-full border p-0.5 transition-colors group-hover:border-brand " +
        (checked ? "border-brand bg-brand" : "border-border-strong bg-surface-raised")}>
        <span className={"size-3 shrink-0 rounded-full border border-border-strong bg-surface transition-transform " +
            (checked ? "translate-x-3.5" : "translate-x-0")} />
    </span>;
}
