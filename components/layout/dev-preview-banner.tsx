/**
 * Banner for dev/QA-only preview routes. Makes it clear these are not production pages.
 */

export function DevPreviewBanner() {
  return (
    <div
      className="border-b border-amber-500/30 bg-amber-500/10 px-4 py-2 text-center"
      role="status"
      aria-label="Development preview"
    >
      <p className="evo-body-sm font-medium text-amber-700 dark:text-amber-400">
        Dev / QA only; not part of production. These routes are excluded from search indexing.
      </p>
    </div>
  );
}
