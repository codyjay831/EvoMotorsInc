/** Coerce form/API values to a finite number, or undefined (omit from JSON). */
export function toNumberOrUndefined(value: unknown): number | undefined {
  if (value === "" || value === null || value === undefined) {
    return undefined;
  }
  if (typeof value === "number" && Number.isNaN(value)) {
    return undefined;
  }
  const num = Number(value);
  return Number.isNaN(num) ? undefined : num;
}
