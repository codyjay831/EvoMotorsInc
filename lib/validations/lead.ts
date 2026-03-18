import { z } from "zod";

export const contactFormSchema = z.object({
  firstName: z.string().min(1, "First name is required").max(100),
  lastName: z.string().min(1, "Last name is required").max(100),
  email: z.string().min(1, "Email is required").email("Please enter a valid email"),
  phone: z.string().max(20).optional().or(z.literal("")),
  message: z.string().max(2000).optional(),
});

export const vehicleInquiryFormSchema = contactFormSchema.extend({
  preferredContact: z.enum(["email", "phone", "either"]).optional(),
  message: z.string().max(2000).optional(),
  financingInterest: z.boolean().optional(),
  tradeInInterest: z.boolean().optional(),
});

const optionalYear = z
  .union([z.string(), z.number()])
  .optional()
  .transform((v) => {
    if (v === "" || v === undefined) return undefined;
    const n = Number(v);
    return Number.isNaN(n) ? undefined : n;
  })
  .refine((n) => n === undefined || (n >= 2000 && n <= 2030), "Invalid year");

const optionalNonNegative = z
  .union([z.string(), z.number()])
  .optional()
  .transform((v) => {
    if (v === "" || v === undefined) return undefined;
    const n = Number(v);
    return Number.isNaN(n) ? undefined : n;
  })
  .refine((n) => n === undefined || n >= 0, "Must be 0 or more");

export const requestVehicleFormSchema = z.object({
  make: z.string().max(80).optional(),
  model: z.string().max(80).optional(),
  yearMin: optionalYear,
  yearMax: optionalYear,
  maxMileage: optionalNonNegative,
  budgetMax: optionalNonNegative,
  colorPreferences: z.string().max(200).optional(),
  desiredFeatures: z.string().max(500).optional(),
  timeline: z.string().max(100).optional(),
  preferredTrim: z.string().max(100).optional(),
  firstName: z.string().min(1, "First name is required").max(100),
  lastName: z.string().min(1, "Last name is required").max(100),
  email: z.string().min(1, "Email is required").email("Please enter a valid email"),
  phone: z.string().max(20).optional().or(z.literal("")),
  preferredContact: z.enum(["email", "phone", "either"]).optional(),
  message: z.string().max(3000).optional(),
  notes: z.string().max(2000).optional(),
  financingInterest: z.boolean().optional(),
  tradeInInterest: z.boolean().optional(),
});

/** Reservation (hold vehicle) form – phone required for API. */
export const reservationFormSchema = z.object({
  firstName: z.string().min(1, "First name is required").max(100),
  lastName: z.string().min(1, "Last name is required").max(100),
  email: z.string().min(1, "Email is required").email("Please enter a valid email"),
  phone: z.string().min(1, "Phone is required").max(20),
  message: z.string().max(500).optional(),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
export type VehicleInquiryFormValues = z.infer<typeof vehicleInquiryFormSchema>;
export type RequestVehicleFormValues = z.infer<typeof requestVehicleFormSchema>;
export type ReservationFormValues = z.infer<typeof reservationFormSchema>;
