"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { vehicleInquiryFormSchema, type VehicleInquiryFormValues } from "@/lib/validations/lead";
import { submitVehicleRequest } from "@/lib/api";
import {
  LeadFormField,
  LeadFormInput,
  LeadFormTextarea,
  LeadFormSelect,
  LeadFormSuccess,
  LeadFormError,
  LeadFormSubmit,
} from "@/components/forms";
import { cn } from "@/lib/utils";
import type { VehicleSummary } from "@/lib/api";

type VehicleInquiryModalProps = {
  isOpen: boolean;
  onClose: () => void;
  vehicleId: string;
  vehicle: Pick<VehicleSummary, "displayName" | "year" | "make" | "model" | "priceDisplay">;
};

export function VehicleInquiryModal({
  isOpen,
  onClose,
  vehicleId,
  vehicle,
}: VehicleInquiryModalProps) {
  const displayName = vehicle.displayName ?? `${vehicle.year} ${vehicle.make} ${vehicle.model}`;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    setFocus,
  } = useForm<VehicleInquiryFormValues>({
    resolver: zodResolver(vehicleInquiryFormSchema),
    defaultValues: {
      preferredContact: "either",
      financingInterest: false,
      tradeInInterest: false,
    },
  });

  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    if (!isOpen) return;
    setStatus("idle");
    setErrorMessage("");
    reset();
    setFocus("firstName");
  }, [isOpen, reset, setFocus]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  const onSubmit = async (data: VehicleInquiryFormValues) => {
    setStatus("idle");
    setErrorMessage("");
    try {
      const res = await submitVehicleRequest({
        vehicleId,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone || undefined,
        message: data.message || undefined,
        preferredContact: data.preferredContact,
        financingInterest: data.financingInterest,
        tradeInInterest: data.tradeInInterest,
      });
      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMessage(res.message ?? "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="inquiry-modal-title"
    >
      <div
        className="absolute inset-0 bg-black/70 transition-opacity duration-200"
        aria-hidden
        onClick={onClose}
      />
      <div
        className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border border-border bg-background shadow-xl transition-all duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-background px-6 py-4">
          <div>
            <h2 id="inquiry-modal-title" className="evo-card-title text-foreground">
              Ask about this vehicle
            </h2>
            <p className="evo-muted text-sm mt-0.5">{displayName}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors duration-200 evo-focus-ring"
            aria-label="Close"
          >
            <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6">
          {status === "success" ? (
            <>
              <LeadFormSuccess
                title="Message sent"
                message="We'll get back to you soon about this vehicle."
              />
              <button
                type="button"
                onClick={onClose}
                className="evo-body-sm mt-6 w-full rounded-lg border border-border py-2.5 font-medium text-foreground hover:bg-muted transition-colors duration-200 evo-focus-ring"
              >
                Close
              </button>
            </>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {status === "error" && (
                <LeadFormError
                  message={errorMessage}
                  onDismiss={() => setStatus("idle")}
                />
              )}
              <div className="grid gap-4 sm:grid-cols-2">
                <LeadFormField label="First name" error={errors.firstName?.message} required id="inquiry-firstName">
                  <LeadFormInput
                    id="inquiry-firstName"
                    placeholder="First name"
                    error={errors.firstName?.message}
                    {...register("firstName")}
                  />
                </LeadFormField>
                <LeadFormField label="Last name" error={errors.lastName?.message} required id="inquiry-lastName">
                  <LeadFormInput
                    id="inquiry-lastName"
                    placeholder="Last name"
                    error={errors.lastName?.message}
                    {...register("lastName")}
                  />
                </LeadFormField>
              </div>
              <LeadFormField label="Email" error={errors.email?.message} required id="inquiry-email">
                <LeadFormInput
                  id="inquiry-email"
                  type="email"
                  placeholder="you@example.com"
                  error={errors.email?.message}
                  {...register("email")}
                />
              </LeadFormField>
              <LeadFormField label="Phone" error={errors.phone?.message} id="inquiry-phone">
                <LeadFormInput
                  id="inquiry-phone"
                  type="tel"
                  placeholder="(555) 000-0000"
                  error={errors.phone?.message}
                  {...register("phone")}
                />
              </LeadFormField>
              <LeadFormField label="Preferred contact" id="inquiry-preferredContact">
                <LeadFormSelect
                  id="inquiry-preferredContact"
                  error={errors.preferredContact?.message}
                  {...register("preferredContact")}
                >
                  <option value="either">Email or phone</option>
                  <option value="email">Email</option>
                  <option value="phone">Phone</option>
                </LeadFormSelect>
              </LeadFormField>
              <LeadFormField label="Message" error={errors.message?.message} id="inquiry-message">
                <LeadFormTextarea
                  id="inquiry-message"
                  placeholder="Questions about this vehicle?"
                  error={errors.message?.message}
                  {...register("message")}
                />
              </LeadFormField>
              <div className="flex flex-wrap gap-6">
                <label className="flex items-center gap-2 evo-body-sm text-foreground cursor-pointer">
                  <input type="checkbox" {...register("financingInterest")} className="rounded border-border" />
                  Interested in financing
                </label>
                <label className="flex items-center gap-2 evo-body-sm text-foreground cursor-pointer">
                  <input type="checkbox" {...register("tradeInInterest")} className="rounded border-border" />
                  Have a trade-in
                </label>
              </div>
              <LeadFormSubmit loading={isSubmitting}>Send message</LeadFormSubmit>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
