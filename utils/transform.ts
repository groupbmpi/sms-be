export function getInt(arg: unknown): number | undefined {
    if (typeof arg === 'number') {
        return Math.floor(arg);
    }

    if (typeof arg !== 'string' || Number.isNaN(parseInt(arg))) {
        return undefined;
    }

    return parseInt(arg);
}

export function getDate(arg: unknown): Date | undefined {
    if (arg instanceof Date) {
        return arg;
    }

    if (typeof arg !== 'string' || Number.isNaN(Date.parse(arg))) {
        return undefined;
    }

    return new Date(Date.parse(arg));
}