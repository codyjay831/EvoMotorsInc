"use client";

import { useEffect, useState } from "react";

/** Avoid SSR/hydration issues when rendering createPortal to document.body. */
export function useMountedPortal(): boolean {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return mounted;
}
