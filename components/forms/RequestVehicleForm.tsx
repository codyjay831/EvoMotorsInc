"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { requestVehicleFormSchema, type RequestVehicleFormValues } from "@/lib/validations/lead";
import { submitVehicleRequest } from "@/lib/api";
import { toNumberOrUndefined } from "@/lib/utils/numbers";
import {
  LeadFormField,
  LeadFormInput,
  LeadFormTextarea,
  LeadFormSelect,
  LeadFormSection,
  LeadFormSuccess,
  LeadFormError,
  LeadFormSubmit,
} from "@/components/forms";
import { useSearchParams } from "next/navigation";

type RequestVehicleFormProps = {
  className?: string;
};

export function RequestVehicleForm({ className }: RequestVehicleFormProps) {
  const searchParams = useSearchParams();
  const vehicleId = searchParams.get("vehicleId") ?? undefined;

  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RequestVehicleFormValues>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(requestVehicleFormSchema) as any,
    defaultValues: {
      preferredContact: "either",
      financingInterest: false,
      tradeInInterest: false,
    },
  });

  const onSubmit = async (data: RequestVehicleFormValues) => {
    setStatus("idle");
    setErrorMessage("");
    try {
      const payload = {
        vehicleId,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone || undefined,
        message: data.message || data.notes,
        preferredTrim: data.preferredTrim,
        preferredContact: data.preferredContact,
        make: data.make,
        model: data.model,
        yearMin: toNumberOrUndefined(data.yearMin),
        yearMax: toNumberOrUndefined(data.yearMax),
        maxMileage: toNumberOrUndefined(data.maxMileage),
        budgetMax: toNumberOrUndefined(data.budgetMax),
        colorPreferences: data.colorPreferences,
        desiredFeatures: data.desiredFeatures,
        timeline: data.timeline,
        notes: data.notes,
        financingInterest: data.financingInterest,
        tradeInInterest: data.tradeInInterest,
      };
      const res = await submitVehicleRequest(payload);
      if (res.ok) {
        setStatus("success");
        reset();
      } else {
        setStatus("error");
        setErrorMessage(res.message ?? "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <LeadFormSuccess
        title="Request received"
        message="We'll be in touch to help you find the right vehicle."
        className={className}
      />
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={className}>
      {status === "error" && (
        <LeadFormError
          message={errorMessage}
          onDismiss={() => setStatus("idle")}
          className="mb-6"
        />
      )}

      <LeadFormSection title="Vehicle preferences (optional)">
        <div className="grid gap-4 sm:grid-cols-2">
          <LeadFormField label="Make" id="req-make">
            <LeadFormInput id="req-make" placeholder="e.g. Tesla" {...register("make")} />
          </LeadFormField>
          <LeadFormField label="Model" id="req-model">
            <LeadFormInput id="req-model" placeholder="e.g. Model 3" {...register("model")} />
          </LeadFormField>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <LeadFormField label="Year min" id="req-yearMin">
            <LeadFormInput id="req-yearMin" type="number" placeholder="2022" {...register("yearMin")} />
          </LeadFormField>
          <LeadFormField label="Year max" id="req-yearMax">
            <LeadFormInput id="req-yearMax" type="number" placeholder="2025" {...register("yearMax")} />
          </LeadFormField>
          <LeadFormField label="Max mileage" id="req-maxMileage">
            <LeadFormInput id="req-maxMileage" type="number" placeholder="50000" {...register("maxMileage")} />
          </LeadFormField>
          <LeadFormField label="Budget max ($)" id="req-budgetMax">
            <LeadFormInput id="req-budgetMax" type="number" placeholder="60000" {...register("budgetMax")} />
          </LeadFormField>
        </div>
        <LeadFormField label="Trim / configuration" id="req-preferredTrim">
          <LeadFormInput id="req-preferredTrim" placeholder="e.g. Long Range" {...register("preferredTrim")} />
        </LeadFormField>
        <LeadFormField label="Color preferences" id="req-colorPreferences">
          <LeadFormInput id="req-colorPreferences" placeholder="e.g. White, black" {...register("colorPreferences")} />
        </LeadFormField>
        <LeadFormField label="Desired features" id="req-desiredFeatures">
          <LeadFormInput id="req-desiredFeatures" placeholder="e.g. AWD, premium audio" {...register("desiredFeatures")} />
        </LeadFormField>
        <LeadFormField label="Timeline" id="req-timeline">
          <LeadFormInput id="req-timeline" placeholder="e.g. Within 2 months" {...register("timeline")} />
        </LeadFormField>
      </LeadFormSection>

      <LeadFormSection title="Your details" className="mt-10">
        <div className="grid gap-4 sm:grid-cols-2">
          <LeadFormField label="First name" error={errors.firstName?.message} required id="req-firstName">
            <LeadFormInput
              id="req-firstName"
              placeholder="First name"
              error={errors.firstName?.message}
              {...register("firstName")}
            />
          </LeadFormField>
          <LeadFormField label="Last name" error={errors.lastName?.message} required id="req-lastName">
            <LeadFormInput
              id="req-lastName"
              placeholder="Last name"
              error={errors.lastName?.message}
              {...register("lastName")}
            />
          </LeadFormField>
        </div>
        <LeadFormField label="Email" error={errors.email?.message} required id="req-email" className="mt-4">
          <LeadFormInput
            id="req-email"
            type="email"
            placeholder="you@example.com"
            error={errors.email?.message}
            {...register("email")}
          />
        </LeadFormField>
        <LeadFormField label="Phone" error={errors.phone?.message} id="req-phone" className="mt-4">
          <LeadFormInput
            id="req-phone"
            type="tel"
            placeholder="(555) 000-0000"
            error={errors.phone?.message}
            {...register("phone")}
          />
        </LeadFormField>
        <LeadFormField label="Preferred contact" id="req-preferredContact" className="mt-4">
          <LeadFormSelect id="req-preferredContact" {...register("preferredContact")}>
            <option value="either">Email or phone</option>
            <option value="email">Email</option>
            <option value="phone">Phone</option>
          </LeadFormSelect>
        </LeadFormField>
      </LeadFormSection>

      <LeadFormSection title="Additional details" className="mt-10">
        <LeadFormField label="Message or notes" error={errors.message?.message} id="req-message">
          <LeadFormTextarea
            id="req-message"
            placeholder="Tell us what you're looking for..."
            error={errors.message?.message}
            {...register("message")}
          />
        </LeadFormField>
        <div className="flex flex-wrap gap-6 mt-4">
          <label className="flex items-center gap-2 evo-body-sm text-foreground cursor-pointer">
            <input type="checkbox" {...register("financingInterest")} className="rounded border-border" />
            Interested in financing
          </label>
          <label className="flex items-center gap-2 evo-body-sm text-foreground cursor-pointer">
            <input type="checkbox" {...register("tradeInInterest")} className="rounded border-border" />
            Have a trade-in
          </label>
        </div>
      </LeadFormSection>

      <div className="mt-10">
        <LeadFormSubmit loading={isSubmitting}>Submit request</LeadFormSubmit>
      </div>
    </form>
  );
}
