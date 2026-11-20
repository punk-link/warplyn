import { useEffect, useId, useState, type RefObject } from "react";
import { Field } from "./primitives.js";


export function TranslationLanguageInput({ label, placeholder, describedBy, value, options, inputRef, change }: {
    label: string;
    placeholder: string;
    describedBy: string;
    value: string;
    options: readonly string[];
    inputRef: RefObject<HTMLInputElement>;
    change: (value: string) => void;
}) {
    const inputId = useId();
    const listId = useId();
    const [open, setOpen] = useState(false);
    const [upward, setUpward] = useState(false);
    const [position, setPosition] = useState({ left: 0, top: 0, width: 0 });
    const [active, setActive] = useState(-1);
    const matches = options.filter((option) => option.toLocaleLowerCase().includes(value.trim().toLocaleLowerCase()));
    const visible = open && matches.length > 0;
    const activeOption = visible && active >= 0 && active < matches.length ? active : undefined;

    useEffect(() => {
        if (activeOption !== undefined)
            document.getElementById(`${listId}-${activeOption}`)?.scrollIntoView?.({ block: "nearest" });
    }, [activeOption, listId]);

    const show = () => {
        const bounds = inputRef.current?.getBoundingClientRect();
        if (bounds) {
            const opensUpward = window.innerHeight - bounds.bottom < 200;
            setUpward(opensUpward);
            setPosition({ left: bounds.left, top: opensUpward ? bounds.top : bounds.bottom, width: bounds.width });
        }

        setOpen(true);
    };
    const choose = (option: string) => {
        change(option);
        setActive(-1);
        setOpen(false);
    };

    return <div className="min-w-0 flex-1" onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
            setOpen(false);
            setActive(-1);
        }
    }}>
        <label htmlFor={inputId} className="block text-sm font-semibold text-ink">{label}</label>
        <div className="relative mt-2">
            <Field
                ref={inputRef}
                id={inputId}
                role="combobox"
                aria-autocomplete="list"
                aria-describedby={describedBy}
                aria-expanded={visible}
                aria-controls={visible ? listId : undefined}
                aria-activedescendant={activeOption === undefined ? undefined : `${listId}-${activeOption}`}
                autoComplete="off"
                value={value}
                maxLength={100}
                placeholder={placeholder}
                onClick={show}
                onChange={(event) => {
                    change(event.target.value);
                    setActive(-1);
                    show();
                }}
                onKeyDown={(event) => {
                    if (event.nativeEvent.isComposing)
                        return;

                    if ((event.key === "ArrowDown" || event.key === "ArrowUp") && matches.length) {
                        event.preventDefault();
                        show();
                        const step = event.key === "ArrowDown" ? 1 : -1;
                        setActive((index) => {
                            if (index < 0)
                                return step === 1 ? 0 : matches.length - 1;

                            return (index + step + matches.length) % matches.length;
                        });
                    } else if (event.key === "Enter" && activeOption !== undefined) {
                        event.preventDefault();
                        choose(matches[activeOption]!);
                    } else if (event.key === "Escape" && visible) {
                        event.preventDefault();
                        event.stopPropagation();
                        setOpen(false);
                        setActive(-1);
                    }
                }} />
            {visible && (
                <div
                    id={listId}
                    role="listbox"
                    aria-label={label}
                    style={{ left: position.left, top: position.top, width: position.width }}
                    className={"fixed z-10 max-h-48 overflow-y-auto rounded-control border border-border bg-surface-raised p-1 shadow-raised " +
                        "[scrollbar-color:var(--color-border-strong)_transparent] [scrollbar-width:thin] [&::-webkit-scrollbar]:w-2 " +
                        "[&::-webkit-scrollbar-button]:hidden [&::-webkit-scrollbar-thumb]:rounded-full " +
                        "[&::-webkit-scrollbar-thumb]:bg-border-strong " + (upward ? "-translate-y-full -mt-1" : "mt-1")}>
                    {matches.map((option, index) => (
                        <button
                            key={option}
                            id={`${listId}-${index}`}
                            type="button"
                            role="option"
                            tabIndex={-1}
                            aria-selected={activeOption === index}
                            className={"flex min-h-9 w-full items-center rounded-control px-2 text-left text-sm text-ink " +
                                "hover:bg-brand-soft hover:text-brand focus:outline-none focus-visible:ring-2 focus-visible:ring-brand " +
                                (activeOption === index ? "bg-brand-soft text-brand" : "")}
                            onPointerDown={(event) => event.preventDefault()}
                            onClick={() => choose(option)}>{option}
                        </button>
                    ))}
                </div>
            )}
        </div>
    </div>;
}
