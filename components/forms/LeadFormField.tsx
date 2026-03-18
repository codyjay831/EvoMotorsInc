"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type LeadFormFieldProps = {
  label: string;
  error?: string;
  required?: boolean;
  className?: string;
  id?: string;
  children?: React.ReactNode;
};

export const LeadFormField = forwardRef<
  HTMLDivElement,
  LeadFormFieldProps & { children: React.ReactNode }
>(function LeadFormField({ label, error, required, className, id, children }, ref) {
  return (
    <div ref={ref} className={cn("space-y-1.5", className)}>
      <label htmlFor={id} className="evo-body-sm font-medium text-foreground block">
        {label}
        {required && <span className="text-muted-foreground ml-0.5" aria-hidden>*</span>}
      </label>
      {children}
      {error && (
        <p className="evo-muted text-xs text-destructive" role="alert">
          {error}
        </p>
      )}
    </div>
  );
});

const inputClass =
  "w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors aria-invalid:border-destructive aria-invalid:ring-destructive/30";

export function LeadFormInput({
  id,
  error,
  className,
  ...props
}: React.ComponentProps<"input"> & { id: string; error?: string }) {
  return (
    <input
      id={id}
      className={cn(inputClass, error && "border-destructive", className)}
      aria-invalid={!!error}
      {...props}
    />
  );
}

export function LeadFormTextarea({
  id,
  error,
  className,
  ...props
}: React.ComponentProps<"textarea"> & { id: string; error?: string }) {
  return (
    <textarea
      id={id}
      className={cn(inputClass, "min-h-[100px] resize-y", error && "border-destructive", className)}
      aria-invalid={!!error}
      {...props}
    />
  );
}

export function LeadFormSelect({
  id,
  error,
  className,
  ...props
}: React.ComponentProps<"select"> & { id: string; error?: string }) {
  return (
    <select
      id={id}
      className={cn(inputClass, error && "border-destructive", className)}
      aria-invalid={!!error}
      {...props}
    />
  );
}
