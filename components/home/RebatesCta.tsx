"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  rebateCaliforniaNote,
  rebateUtilitySections,
  rebatesModalMeta,
} from "./rebates-modal-data";

const outlineButtonClass =
  "inline-flex h-9 shrink-0 items-center justify-center rounded-lg border border-border bg-transparent px-5 text-sm font-medium text-foreground transition-colors duration-200 hover:bg-muted/80 hover:border-primary/30 evo-focus-ring";

const eligibilityLinkClass =
  "inline-flex h-9 w-full items-center justify-center rounded-lg border border-transparent bg-primary px-4 text-sm font-medium text-primary-foreground shadow-[0_0_16px_-2px_var(--glow-subtle)] transition-all duration-200 hover:bg-primary/90 evo-focus-ring";

const TRANSITION_MS = 200;

function RebateBlocks({
  blocks,
  className,
  listSize = "xs",
}: {
  blocks: (typeof rebateUtilitySections)[number]["blocks"];
  className?: string;
  listSize?: "xs" | "sm";
}) {
  const listClass =
    listSize === "sm"
      ? "mt-2 list-disc space-y-1.5 pl-4 text-sm leading-relaxed text-muted-foreground"
      : "mt-1.5 list-disc space-y-1 pl-3.5 text-xs leading-relaxed text-muted-foreground";
  const headingClass =
    listSize === "sm" ? "text-sm font-medium text-foreground/95" : "text-xs font-medium text-foreground/95";

  return (
    <div className={cn("space-y-3", className)}>
      {blocks.map((block) => (
        <div key={block.heading}>
          <p className={headingClass}>{block.heading}</p>
          <ul className={listClass}>
            {block.lines.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

type RebatesCtaProps = {
  /** When set, replaces default trigger sizing/colors (e.g. dark hero glass button). */
  triggerClassName?: string;
};

export function RebatesCta({ triggerClassName }: RebatesCtaProps = {}) {
  const [open, setOpen] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const requestClose = useCallback(() => {
    setRevealed(false);
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    closeTimerRef.current = setTimeout(() => {
      closeTimerRef.current = null;
      setOpen(false);
    }, TRANSITION_MS);
  }, []);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (!open) {
      setRevealed(false);
      return;
    }
    setRevealed(false);
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => setRevealed(true));
    });
    return () => cancelAnimationFrame(id);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") requestClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, requestClose]);

  useEffect(() => {
    if (!open || !revealed) return;
    closeRef.current?.focus();
  }, [open, revealed]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={
          triggerClassName
            ? cn(triggerClassName)
            : cn(outlineButtonClass, "min-w-[180px] text-foreground")
        }
        aria-expanded={open}
        aria-haspopup="dialog"
      >
        Rebates
      </button>

      {open ? (
        <div
          className="fixed inset-0 z-[100] flex items-end justify-center p-3 sm:items-center sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="rebates-modal-title"
        >
          <div
            className={cn(
              "absolute inset-0 bg-black/60 backdrop-blur-[2px] transition-opacity duration-200 ease-out",
              revealed ? "opacity-100" : "opacity-0"
            )}
            aria-hidden
            onClick={requestClose}
          />

          <div
            className={cn(
              "relative z-[1] flex w-full flex-col overflow-hidden rounded-xl border border-white/10",
              "max-w-[min(17rem,92vw)] max-h-[min(88dvh,720px)]",
              "bg-zinc-950/94 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.92)] backdrop-blur-xl",
              "transition-all duration-200 ease-out max-sm:rounded-t-xl",
              "sm:max-w-[52rem] sm:max-h-[min(94vh,960px)] lg:max-w-[56rem]",
              revealed
                ? "translate-y-0 opacity-100 sm:scale-100"
                : "translate-y-6 opacity-0 max-sm:translate-y-full sm:translate-y-0 sm:scale-[0.96]"
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex shrink-0 items-start justify-between gap-3 border-b border-white/10 px-4 py-3 sm:px-8 sm:py-5">
              <div className="min-w-0 pr-2">
                <h2
                  id="rebates-modal-title"
                  className="text-base font-semibold tracking-tight text-foreground sm:text-lg"
                >
                  {rebatesModalMeta.title}
                </h2>
                <p className="mt-1.5 text-xs leading-snug text-muted-foreground sm:text-sm sm:leading-relaxed">
                  {rebatesModalMeta.subtitle}
                </p>
              </div>
              <button
                ref={closeRef}
                type="button"
                onClick={requestClose}
                className="shrink-0 rounded-lg p-2 text-muted-foreground transition-colors duration-200 hover:bg-white/10 hover:text-foreground evo-focus-ring"
                aria-label="Close"
              >
                <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-3 pb-5 sm:px-8 sm:py-5 sm:pb-8">
              <p className="mb-3 rounded-lg border border-white/5 bg-white/[0.04] p-3 text-[11px] leading-relaxed text-muted-foreground sm:mb-5 sm:p-4 sm:text-sm sm:leading-relaxed">
                {rebatesModalMeta.disclaimer}
              </p>

              {/* Mobile: accordions + scroll */}
              <div className="space-y-2 sm:hidden">
                {rebateUtilitySections.map((section) => (
                  <details
                    key={section.utilityTitle}
                    className="group rounded-lg border border-white/10 bg-white/[0.03]"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-2 py-2.5 pl-3 pr-2 text-xs font-semibold uppercase tracking-wide text-primary [&::-webkit-details-marker]:hidden">
                      {section.utilityTitle}
                      <ChevronDown className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180" />
                    </summary>
                    <div className="px-3 pb-3">
                      <RebateBlocks
                        blocks={section.blocks}
                        className="border-t border-white/5 pt-3"
                      />
                    </div>
                  </details>
                ))}

                <details className="group rounded-lg border border-white/10 bg-white/[0.03]">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-2 py-2.5 pl-3 pr-2 text-xs font-semibold text-foreground [&::-webkit-details-marker]:hidden">
                    {rebateCaliforniaNote.title}
                    <ChevronDown className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180" />
                  </summary>
                  <div className="border-t border-white/5 px-3 pb-3 pt-3">
                    <ul className="list-disc space-y-1 pl-3.5 text-xs leading-relaxed text-muted-foreground">
                      {rebateCaliforniaNote.lines.map((line) => (
                        <li key={line}>{line}</li>
                      ))}
                    </ul>
                  </div>
                </details>
              </div>

              {/* Desktop: 2×2 cards, all visible — no accordion scroll */}
              <div className="mb-5 hidden gap-4 sm:mb-6 sm:grid sm:grid-cols-2">
                {rebateUtilitySections.map((section) => (
                  <div
                    key={section.utilityTitle}
                    className="rounded-xl border border-white/10 bg-white/[0.03] p-5"
                  >
                    <h3 className="text-xs font-semibold uppercase tracking-wide text-primary">
                      {section.utilityTitle}
                    </h3>
                    <RebateBlocks blocks={section.blocks} className="mt-3" listSize="sm" />
                  </div>
                ))}
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
                  <h3 className="text-sm font-semibold text-foreground">{rebateCaliforniaNote.title}</h3>
                  <ul className="mt-3 list-disc space-y-2 pl-4 text-sm leading-relaxed text-muted-foreground">
                    {rebateCaliforniaNote.lines.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-1 sm:mt-0 sm:flex sm:flex-wrap sm:items-center sm:justify-between sm:gap-4">
                <a
                  href={rebatesModalMeta.eligibilityUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(eligibilityLinkClass, "sm:w-auto sm:min-w-[200px]")}
                >
                  {rebatesModalMeta.eligibilityLabel}
                </a>
                <p className="evo-body-sm mt-3 text-center text-[11px] text-muted-foreground/90 sm:mt-0 sm:flex-1 sm:text-left sm:text-xs">
                  {rebatesModalMeta.footerNote}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
