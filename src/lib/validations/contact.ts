import { z } from "zod";

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
  });
};

export type ContactFormData = z.infer<ReturnType<typeof getContactFormSchema>>;
