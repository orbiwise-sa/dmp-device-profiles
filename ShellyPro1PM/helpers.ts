/**
 * Flattens a nested JSON object into a single-level object with dot-separated keys.
 *
 * @param obj - The JSON object to be flattened.
 * @returns A new object representing the flattened structure of the original JSON object.
 */
export function flattenObject(obj: any): any {
    const result: any = {};

    function flatten(obj: any, prefix: string = ""): void {
        for (const key in obj) {
            const value = obj[key];
            const newKey = prefix ? `${prefix}.${key}` : key;

            if (value && typeof value === "object" && !Array.isArray(value)) {
                flatten(value, newKey);
            } else {
                result[newKey] = value;
            }
        }
    }

    flatten(obj);
    return result;
}

export function isValidJSON(input: any) {
    if (typeof input !== "string") {
        return false;
    }
    try {
        JSON.parse(input);
        return true;
    } catch (error) {
        return false;
    }
}
