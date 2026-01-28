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
  });
  const onSubmit = async (data: ContactFormData) => {
    setStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          language: i18n.language,
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

        {/* Terminal Form */}
        <div className="w-full bg-elevated rounded-2xl overflow-hidden border border-color shadow-xl">
          {/* Terminal Header */}
          <div className="bg-subtle px-4 py-3 border-b border-color flex items-center justify-between">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <span className="text-[10px] font-mono text-tertiary-color uppercase tracking-widest">
              {t("contact.terminalTitle")}
            </span>
            <div className="hidden md:block md:w-12"></div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
            {/* Name Field */}
            <div className="space-y-2 text-left">
              <div className="flex gap-2 text-tertiary-color text-sm uppercase font-mono">
                <span>Contact:</span>
                <span>Name</span>
              </div>
              <div className="flex items-center gap-2 border-b border-color pb-2">
                <span className="text-primary font-mono">➜</span>
                <input
                  {...register("name")}
                  type="text"
                  placeholder={t("contact.form.namePlaceholder")}
                  className="flex-1 bg-transparent border-none p-0 focus:ring-0 text-primary-color placeholder:text-tertiary-color font-mono"
                />
              </div>
              {errors.name && (
                <p className="text-error text-xs font-mono flex items-center gap-1">
                  <XCircle className="w-3 h-3" />
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div className="space-y-2 text-left">
              <div className="flex gap-2 text-tertiary-color text-sm uppercase font-mono">
                <span>Contact:</span>
                <span>Email</span>
              </div>
              <div className="flex items-center gap-2 border-b border-color pb-2">
                <span className="text-primary font-mono">➜</span>
                <input
                  {...register("email")}
                  type="email"
                  placeholder={t("contact.form.emailPlaceholder")}
                  className="flex-1 bg-transparent border-none p-0 focus:ring-0 text-primary-color placeholder:text-tertiary-color font-mono"
                />
              </div>
              {errors.email && (
                <p className="text-error text-xs font-mono flex items-center gap-1">
                  <XCircle className="w-3 h-3" />
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Message Field */}
            <div className="space-y-2 text-left">
              <div className="flex gap-2 text-tertiary-color text-sm uppercase font-mono">
                <span>Contact:</span>
                <span>Message</span>
              </div>
              <div className="flex gap-2">
                <span className="text-primary font-mono mt-1">➜</span>
                <textarea
                  {...register("message")}
                  rows={4}
                  placeholder={t("contact.form.messagePlaceholder")}
                  className="flex-1 bg-transparent border-none p-0 focus:ring-0 text-primary-color placeholder:text-tertiary-color font-mono resize-none"
                />
              </div>
              {errors.message && (
                <p className="text-error text-xs font-mono flex items-center gap-1">
                  <XCircle className="w-3 h-3" />
                  {errors.message.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full py-4 bg-primary rounded-lg text-white font-black uppercase tracking-[0.2em] hover:shadow-lg hover:shadow-primary/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
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

        {/* Social Links */}
        <div className="flex gap-8 pt-10">
          <a
            href="https://github.com/Adriasu09"
            target="_blank"
            rel="noopener noreferrer"
            className="text-tertiary-color hover:text-primary transition-colors"
            aria-label="GitHub"
          >
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/in/adriana-su%C3%A1rez-4562a5249/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-tertiary-color hover:text-primary transition-colors"
            aria-label="LinkedIn"
          >
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
          </a>
          <a
            href="mailto:adsuarez09@gmail.com"
            className="text-tertiary-color hover:text-primary transition-colors"
            aria-label="Email"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </a>
        </div>
      </div>
    </Section>
  );
}
