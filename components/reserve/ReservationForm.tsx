"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { reservationFormSchema, type ReservationFormValues } from "@/lib/validations/lead";
import {
  LeadFormField,
  LeadFormInput,
  LeadFormTextarea,
  LeadFormSubmit,
} from "@/components/forms";

type ReservationFormProps = {
  vehicleId: string;
  onSubmit: (values: ReservationFormValues) => Promise<void>;
  loading?: boolean;
  className?: string;
};

export function ReservationForm({
  vehicleId,
  onSubmit,
  loading = false,
  className,
}: ReservationFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReservationFormValues>({
    resolver: zodResolver(reservationFormSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={className}>
      <input type="hidden" name="vehicleId" value={vehicleId} readOnly aria-hidden />
      <div className="grid gap-4 sm:grid-cols-2">
        <LeadFormField label="First name" error={errors.firstName?.message} required id="res-firstName">
          <LeadFormInput
            id="res-firstName"
            placeholder="First name"
            error={errors.firstName?.message}
            {...register("firstName")}
          />
        </LeadFormField>
        <LeadFormField label="Last name" error={errors.lastName?.message} required id="res-lastName">
          <LeadFormInput
            id="res-lastName"
            placeholder="Last name"
            error={errors.lastName?.message}
            {...register("lastName")}
          />
        </LeadFormField>
      </div>
      <LeadFormField label="Email" error={errors.email?.message} required id="res-email" className="mt-4">
        <LeadFormInput
          id="res-email"
          type="email"
          placeholder="you@example.com"
          error={errors.email?.message}
          {...register("email")}
        />
      </LeadFormField>
      <LeadFormField label="Phone" error={errors.phone?.message} required id="res-phone" className="mt-4">
        <LeadFormInput
          id="res-phone"
          type="tel"
          placeholder="Phone number"
          error={errors.phone?.message}
          {...register("phone")}
        />
      </LeadFormField>
      <LeadFormField label="Notes (optional)" error={errors.message?.message} id="res-message" className="mt-4">
        <LeadFormTextarea
          id="res-message"
          placeholder="Any questions or preferences..."
          error={errors.message?.message}
          {...register("message")}
        />
      </LeadFormField>
      <div className="mt-6">
        <LeadFormSubmit loading={loading}>Hold this vehicle</LeadFormSubmit>
      </div>
    </form>
  );
}
