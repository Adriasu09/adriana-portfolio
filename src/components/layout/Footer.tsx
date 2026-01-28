"use client";

import { useTranslation } from "react-i18next";
import { Terminal, MapPin } from "lucide-react";
import { GitHubIcon, LinkedInIcon, MailIcon } from "@/components/icons/SocialIcons";

export function Footer() {
  const { t } = useTranslation();

  const currentYear = new Date().getFullYear();

  const navigation = [
    { name: t("nav.about"), href: "#about" },
    { name: t("nav.experience"), href: "#experience" },
    { name: t("nav.skills"), href: "#skills" },
    { name: t("nav.projects"), href: "#projects" },
    { name: t("nav.contact"), href: "#contact" },
  ];

  const socials = [
    {
      name: "GitHub",
      href: "https://github.com/Adriasu09",
      icon: GitHubIcon,
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/adriana-su%C3%A1rez-4562a5249/",
      icon: LinkedInIcon,
    },
    {
      name: "Email",
      href: "mailto:adsuarez09@gmail.com",
      icon: MailIcon,
    },
  ];

  return (
    <footer className="border-t border-border bg-base">
      <div className="max-w-7xl mx-auto px-6 lg:px-20 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Logo & Description */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary rounded-lg">
                <Terminal className="w-5 h-5 text-white" />
              </div>
              <span className="font-mono text-xl font-bold text-primary-color">
                NANA_DEV
              </span>
            </div>
            <p className="text-secondary-color text-sm leading-relaxed">
              {t("footer.description")}
            </p>
            <div className="flex items-center gap-2 text-tertiary-color text-sm">
              <MapPin className="w-4 h-4" />
              <span>Madrid, España</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-bold text-primary-color uppercase tracking-wider text-sm">
              {t("footer.quickLinks")}
            </h3>
            <nav className="flex flex-col space-y-2">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-secondary-color hover:text-primary transition-colors text-sm"
                >
                  {item.name}
                </a>
              ))}
            </nav>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="font-bold text-primary-color uppercase tracking-wider text-sm">
              {t("footer.connect")}
            </h3>
            <div className="flex gap-4">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-elevated border border-color rounded-lg hover:border-primary hover:bg-primary hover:text-white transition-all"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
            <div className="space-y-2">
              <p className="text-tertiary-color text-xs">
                💼 {t("footer.availability")}
              </p>
              <p className="text-tertiary-color text-xs">
                📧 adsuarez09@gmail.com
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border my-8"></div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-tertiary-color">
          <p>
            © {currentYear} Adriana Suárez. {t("footer.rights")}
          </p>
          <p className="flex items-center gap-1">
            {t("footer.madeWith")} <span className="text-primary">❤️</span>{" "}
            {t("footer.and")}{" "}
            <span className="text-primary font-mono">Next.js 16</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
