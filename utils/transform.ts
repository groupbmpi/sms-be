export function getNumberFromString(arg: unknown): number | undefined {
    if (typeof arg !== 'string') {
        return undefined;
    }

    if (Number.isNaN(parseInt(arg))) {
        return undefined;
    }

    return parseInt(arg);
}

export function getDateFromString(arg: unknown): Date | undefined {
    if (typeof arg !== 'string') {
        return undefined;
    }

    const parsedDate = Date.parse(arg);

    if (Number.isNaN(parsedDate)) {
        return undefined;
    }

    return new Date(parsedDate);
}