import { cloneElement, isValidElement, useId, type ReactNode } from "react";


export function SettingRow(props: { label: string; hint: string; children: ReactNode; status?: ReactNode; action?: ReactNode; fullWidthAction?: boolean; headingLevel?: 2 | 3; className?: string; layout?: "columns" | "stacked" }) {
    const { label, hint, children, status, action, fullWidthAction = false, headingLevel = 2, className, layout = "columns" } = props;
    const hintId = useId();
    const Heading = headingLevel === 3 ? "h3" : "h2";

    return <section className={`border-b border-border py-4 last:border-b-0 ${layout === "columns" ? "md:grid md:grid-cols-[minmax(0,1fr)_minmax(14rem,18rem)] md:gap-x-8" : ""} ${className ?? ""}`}>
        <div>
            <Heading className="text-sm font-semibold">{label}</Heading>
            <p id={hintId} className="mt-1 text-sm leading-5 text-muted">{hint}</p>
        </div>
        <div className={`mt-4 min-w-0 ${layout === "columns" ? "md:mt-0" : ""}`}>
            <div className={layout === "columns" ? "max-w-md" : undefined}>{isValidElement(children) ? cloneElement(children, { "aria-describedby": hintId }) : children}</div>
            {!fullWidthAction && action && <div className="mt-3">{action}</div>}
            {status && <p className="mt-2 text-xs text-muted" role="status">{status}</p>}
        </div>
        {fullWidthAction && action && <div className="mt-3 md:col-span-2">{action}</div>}
    </section>;
}


export function SettingsGroup({ label, children, className = "mt-6" }: { label: string; children: ReactNode; className?: string }) {
    const headingId = useId();

    return <section className={className} aria-labelledby={headingId}>
        <h2 id={headingId} className="text-base font-semibold">{label}</h2>
        {children}
    </section>;
}


export function Control({ label, hint, children }: { label: string; hint: string; children: ReactNode }) {
    const hintId = useId();

    return <div>
        <p className="text-sm font-medium">{label}</p>
        <p id={hintId} className="mt-1 text-xs text-muted">{hint}</p>
        <div className="mt-2" aria-describedby={hintId}>{children}</div>
    </div>;
}
