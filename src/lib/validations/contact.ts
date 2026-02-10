import { z } from "zod";

// Schema base sin traducciones (para inferir tipos correctamente)
export const contactFormSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email().min(1),
  message: z.string().min(10).max(1000),
  language: z.union([z.literal("es"), z.literal("en")]),
});

// Schema con mensajes de traducción (para react-hook-form)
export const getContactFormSchema = (t: (key: string) => string) => {
  return z.object({
    name: z
      .string()
      .min(2, t("contact.form.errors.nameMin"))
      .max(50, t("contact.form.errors.nameMax")),
    email: z
      .string()
      .email(t("contact.form.errors.emailInvalid"))
      .min(1, t("contact.form.errors.emailRequired")),
    message: z
      .string()
      .min(10, t("contact.form.errors.messageMin"))
      .max(1000, t("contact.form.errors.messageMax")),
    language: z.union([z.literal("es"), z.literal("en")]),
  });
};

// Tipo inferido del esquema base
export type ContactFormData = z.infer<typeof contactFormSchema>;