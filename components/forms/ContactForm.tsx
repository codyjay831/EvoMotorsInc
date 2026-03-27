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
};

export function ContactForm({ className }: ContactFormProps) {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
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
        source: "contact-page",
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
        <LeadFormField label="First name" error={errors.firstName?.message} required id="contact-firstName">
          <LeadFormInput
            id="contact-firstName"
            placeholder="First name"
            error={errors.firstName?.message}
            {...register("firstName")}
          />
        </LeadFormField>
        <LeadFormField label="Last name" error={errors.lastName?.message} required id="contact-lastName">
          <LeadFormInput
            id="contact-lastName"
            placeholder="Last name"
            error={errors.lastName?.message}
            {...register("lastName")}
          />
        </LeadFormField>
      </div>
      <LeadFormField label="Email" error={errors.email?.message} required id="contact-email" className="mt-4">
        <LeadFormInput
          id="contact-email"
          type="email"
          placeholder="you@example.com"
          error={errors.email?.message}
          {...register("email")}
        />
      </LeadFormField>
      <LeadFormField label="Phone" error={errors.phone?.message} id="contact-phone" className="mt-4">
        <LeadFormInput
          id="contact-phone"
          type="tel"
          placeholder="Phone number"
          error={errors.phone?.message}
          {...register("phone")}
        />
      </LeadFormField>
      <LeadFormField label="Message" error={errors.message?.message} id="contact-message" className="mt-4">
        <LeadFormTextarea
          id="contact-message"
          placeholder="How can we help?"
          error={errors.message?.message}
          {...register("message")}
        />
      </LeadFormField>
      <div className="mt-6">
        <LeadFormSubmit loading={isSubmitting}>Send message</LeadFormSubmit>
      </div>
    </form>
  );
}
