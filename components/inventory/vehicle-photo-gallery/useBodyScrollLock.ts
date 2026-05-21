"use client";

import { useEffect } from "react";

let lockCount = 0;
let savedScrollY = 0;
let savedOverflow = "";
let savedPosition = "";
let savedTop = "";
let savedWidth = "";

function applyLock() {
  if (lockCount === 0) {
    savedScrollY = window.scrollY;
    savedOverflow = document.body.style.overflow;
    savedPosition = document.body.style.position;
    savedTop = document.body.style.top;
    savedWidth = document.body.style.width;

    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${savedScrollY}px`;
    document.body.style.width = "100%";
  }
  lockCount += 1;
}

function releaseLock() {
  lockCount = Math.max(0, lockCount - 1);
  if (lockCount === 0) {
    document.body.style.overflow = savedOverflow;
    document.body.style.position = savedPosition;
    document.body.style.top = savedTop;
    document.body.style.width = savedWidth;
    window.scrollTo(0, savedScrollY);
  }
}

export function useBodyScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return;
    applyLock();
    return () => {
      releaseLock();
    };
  }, [active]);
}
