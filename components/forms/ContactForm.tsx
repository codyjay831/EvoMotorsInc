"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, type ContactFormValues } from "@/lib/validations/lead";
import { submitContact } from "@/lib/api";
import {
  LeadFormField,
  LeadFormInput,
  LeadFormTextarea,
  LeadFormSuccess,
  LeadFormError,
  LeadFormSubmit,
} from "@/components/forms";

type ContactFormProps = {
  className?: string;
  /** Passed through to leads API (default: contact-page). */
  source?: string;
  defaultMessage?: string;
  messagePlaceholder?: string;
  /** Prefix for input ids when multiple forms exist on the site. */
  fieldIdPrefix?: string;
  submitLabel?: string;
};

export function ContactForm({
  className,
  source = "contact-page",
  defaultMessage = "",
  messagePlaceholder = "How can we help?",
  fieldIdPrefix = "contact-",
  submitLabel = "Send message",
}: ContactFormProps) {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { message: defaultMessage },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setStatus("idle");
    setErrorMessage("");
    try {
      const res = await submitContact({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone || undefined,
        message: data.message,
        source,
      });
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
        title="Message sent"
        message="We've received your message and will get back to you soon."
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
      <div className="grid gap-4 sm:grid-cols-2">
        <LeadFormField label="First name" error={errors.firstName?.message} required id={`${fieldIdPrefix}firstName`}>
          <LeadFormInput
            id={`${fieldIdPrefix}firstName`}
            placeholder="First name"
            error={errors.firstName?.message}
            {...register("firstName")}
          />
        </LeadFormField>
        <LeadFormField label="Last name" error={errors.lastName?.message} required id={`${fieldIdPrefix}lastName`}>
          <LeadFormInput
            id={`${fieldIdPrefix}lastName`}
            placeholder="Last name"
            error={errors.lastName?.message}
            {...register("lastName")}
          />
        </LeadFormField>
      </div>
      <LeadFormField label="Email" error={errors.email?.message} required id={`${fieldIdPrefix}email`} className="mt-4">
        <LeadFormInput
          id={`${fieldIdPrefix}email`}
          type="email"
          placeholder="you@example.com"
          error={errors.email?.message}
          {...register("email")}
        />
      </LeadFormField>
      <LeadFormField label="Phone" error={errors.phone?.message} id={`${fieldIdPrefix}phone`} className="mt-4">
        <LeadFormInput
          id={`${fieldIdPrefix}phone`}
          type="tel"
          placeholder="Phone number"
          error={errors.phone?.message}
          {...register("phone")}
        />
      </LeadFormField>
      <LeadFormField label="Message" error={errors.message?.message} id={`${fieldIdPrefix}message`} className="mt-4">
        <LeadFormTextarea
          id={`${fieldIdPrefix}message`}
          placeholder={messagePlaceholder}
          error={errors.message?.message}
          {...register("message")}
        />
      </LeadFormField>
      <div className="mt-6">
        <LeadFormSubmit loading={isSubmitting}>{submitLabel}</LeadFormSubmit>
      </div>
    </form>
  );
}
