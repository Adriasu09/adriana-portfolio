"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Section } from "@/components/ui";
import { Loader2, CheckCircle2, XCircle, SendHorizonal } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  getContactFormSchema,
  type ContactFormData,
} from "@/lib/validations/contact";

type SubmitStatus = "idle" | "loading" | "success" | "error";

export function Contact() {
  const { t, i18n } = useTranslation();
  const [status, setStatus] = useState<SubmitStatus>("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(getContactFormSchema(t)),
    defaultValues: {
      name: "",
      email: "",
      message: "",
      language: i18n.language.startsWith("en") ? "en" : "es", 
    },
  });
  const onSubmit = async (data: ContactFormData) => {
    setStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          language: i18n.language.startsWith("en") ? "en" : "es",
        }),
      });

      if (!response.ok) throw new Error("Failed to send message");

      setStatus("success");
      reset();

      // Reset status después de 5 segundos
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      console.error("Error sending message:", error);
      setStatus("error");

      // Reset status después de 5 segundos
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <Section id="contact" className="pb-24">
      <div className="flex flex-col items-center text-center max-w-2xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <span className="font-mono text-primary text-sm">
            {t("contact.subtitle")}
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-primary-color uppercase tracking-tight">
            {t("contact.title")}
          </h2>
          <p className="text-secondary-color text-lg">
            {t("contact.description")}
          </p>
        </div>

        {/* Terminal Form - Forzar colores oscuros como el Hero */}
        <div className="w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-gray-900/95 backdrop-blur-sm">
          {/* Terminal Header - Fondo oscuro fijo */}
          <div className="bg-gray-800/50 px-4 py-3 border-b border-white/10 flex items-center justify-between">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">
              {t("contact.terminalTitle")}
            </span>
            <div className="hidden md:block md:w-12"></div>
          </div>

          {/* Form - Texto blanco/gris fijo */}
          <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
            {/* Name Field */}
            <div className="space-y-2 text-left">
              <div className="flex gap-2 text-gray-400 text-sm uppercase font-mono">
                <span>Contact:</span>
                <span>Name</span>
              </div>
              <div className="flex items-center gap-2 border-b border-white/20 pb-2">
                <span className="text-primary font-mono">➜</span>
                <input
                  {...register("name")}
                  type="text"
                  placeholder={t("contact.form.namePlaceholder")}
                  className="flex-1 bg-transparent border-none p-0 focus:ring-0 text-white placeholder:text-gray-600 font-mono"
                />
              </div>
              {errors.name && (
                <p className="text-red-400 text-xs font-mono flex items-center gap-1">
                  <XCircle className="w-3 h-3" />
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div className="space-y-2 text-left">
              <div className="flex gap-2 text-gray-400 text-sm uppercase font-mono">
                <span>Contact:</span>
                <span>Email</span>
              </div>
              <div className="flex items-center gap-2 border-b border-white/20 pb-2">
                <span className="text-primary font-mono">➜</span>
                <input
                  {...register("email")}
                  type="email"
                  placeholder={t("contact.form.emailPlaceholder")}
                  className="flex-1 bg-transparent border-none p-0 focus:ring-0 text-white placeholder:text-gray-600 font-mono"
                />
              </div>
              {errors.email && (
                <p className="text-red-400 text-xs font-mono flex items-center gap-1">
                  <XCircle className="w-3 h-3" />
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Message Field */}
            <div className="space-y-2 text-left">
              <div className="flex gap-2 text-gray-400 text-sm uppercase font-mono">
                <span>Contact:</span>
                <span>Message</span>
              </div>
              <div className="flex gap-2">
                <span className="text-primary font-mono mt-1">➜</span>
                <textarea
                  {...register("message")}
                  rows={4}
                  placeholder={t("contact.form.messagePlaceholder")}
                  className="flex-1 bg-transparent border-none p-0 focus:ring-0 text-white placeholder:text-gray-600 font-mono resize-none"
                />
              </div>
              {errors.message && (
                <p className="text-red-400 text-xs font-mono flex items-center gap-1">
                  <XCircle className="w-3 h-3" />
                  {errors.message.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={status === "loading"}
              className="cursor-pointer w-full py-4 bg-primary rounded-lg text-white font-black uppercase tracking-[0.2em] hover:shadow-lg hover:shadow-primary/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === "loading" && (
                <Loader2 className="w-5 h-5 animate-spin" />
              )}
              {status === "success" && (
                <CheckCircle2 className="w-5 h-5 text-green-400" />
              )}
              {status === "error" && (
                <XCircle className="w-5 h-5 text-red-400" />
              )}
              {status === "idle" && <SendHorizonal className="w-5 h-5" />}
              {status === "loading" && t("contact.form.sending")}
              {status === "success" && t("contact.form.success")}
              {status === "error" && t("contact.form.error")}
              {status === "idle" && t("contact.form.submit")}
            </button>
          </form>
        </div>
      </div>
    </Section>
  );
}
