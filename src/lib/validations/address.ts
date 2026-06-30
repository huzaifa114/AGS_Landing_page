import { z } from "zod";

export const addressSchema = z.object({
  label: z.string().min(1, "Label is required").max(50),
  fullName: z.string().min(1, "Full name is required").max(100),
  company: z.string().max(100).optional().or(z.literal("")),
  address1: z.string().min(1, "Address is required").max(200),
  address2: z.string().max(200).optional().or(z.literal("")),
  city: z.string().min(1, "City is required").max(100),
  state: z.string().min(1, "State is required").max(100),
  postalCode: z.string().min(1, "Postal code is required").max(20),
  country: z.string().min(1, "Country is required").max(100),
  phone: z.string().max(30).optional().or(z.literal("")),
  isDefault: z.boolean().optional(),
});

export type AddressInput = z.infer<typeof addressSchema>;
