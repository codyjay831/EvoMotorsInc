/** When total inventory is at or below this count, show simplified UX (no search/filter UI). */
export const INVENTORY_SIMPLE_MODE_MAX_COUNT = 5;

export function isInventorySimpleMode(total: number): boolean {
  return total <= INVENTORY_SIMPLE_MODE_MAX_COUNT;
}
