/**
 * Normalize optional numeric inputs before Zod `union([string, number])` parsing.
 * RHF with `valueAsNumber`, or edge cases on `type="number"`, can yield `NaN`; Zod's
 * `z.number()` rejects `NaN` before `.transform()` runs, so map it to `undefined` first.
 */
export function emptyNumericInputToUndefined(value: unknown): unknown {
  if (value === "" || value === null || value === undefined) {
    return undefined;
  }
  if (typeof value === "number" && Number.isNaN(value)) {
    return undefined;
  }
  return value;
}

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
