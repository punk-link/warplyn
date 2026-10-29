export type Result<T, Details extends object> =
    | { ok: true; value: T }
    | ({ ok: false } & Details);


export function success<T>(value: T): { ok: true; value: T } {
    return { ok: true, value };
}


export function failure<const Details extends object>(details: Details): { ok: false } & Details {
    return { ok: false, ...details };
}
