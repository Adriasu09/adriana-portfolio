"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { TypingText } from "@/components/ui/TypingText";
import { useTranslation } from "react-i18next";

interface Command {
  input: string;
  output?: string | React.ReactNode;
}

export function Terminal() {
  const { t, i18n } = useTranslation();
  const [commands, setCommands] = useState<Command[]>([]);
  const [currentInput, setCurrentInput] = useState("");
  const [showInitialTyping, setShowInitialTyping] = useState(true);
  const [showInput, setShowInput] = useState(false);
  const hasRunInitial = useRef(false);
  const currentLanguage = useRef(i18n.language);

  const getHelpOutput = useCallback(
    () => (
      <div className="space-y-2 text-sm text-gray-300 animate-fadeIn">
        <p className="text-accent font-bold">{t("terminal.commands.help")}</p>
        <div className="grid grid-cols-2 gap-2 pl-4">
          <span>• whoami</span>
          <span>• help</span>
          <span>• skills</span>
          <span>• projects</span>
          <span>• contact</span>
          <span>• clear</span>
        </div>
      </div>
    ),
    [t],
  );

  const getWhoamiOutput = useCallback(
    (useAnimation: boolean = false) => {
      if (useAnimation && showInitialTyping) {
        return (
          <div className="space-y-2 text-sm text-gray-300">
            <p>
              <TypingText
                text={`${t("terminal.commands.whoami.greeting")} Adriana Suárez`}
                speed={30}
                className="text-white font-bold"
                onComplete={() => setShowInitialTyping(false)}
              />
            </p>
            <p className="opacity-0 animate-fadeInDelay1">
              {t("terminal.commands.whoami.role")}
            </p>
            <p className="opacity-0 animate-fadeInDelay2">
              {t("terminal.commands.whoami.specialization")}
            </p>
            <p
              className="text-accent opacity-0 animate-fadeInDelay3"
              onAnimationEnd={() => setShowInput(true)}
            >
              🔍 {t("terminal.commands.whoami.status")}
            </p>
          </div>
        );
      }

      return (
        <div className="space-y-2 text-sm text-gray-300">
          <p>
            👋 {t("terminal.commands.whoami.greeting")}{" "}
            <span className="text-white font-bold">Adriana Suárez</span>
          </p>
          <p>{t("terminal.commands.whoami.role")}</p>
          <p>{t("terminal.commands.whoami.specialization")}</p>
          <p className="text-accent">
            🔍 {t("terminal.commands.whoami.status")}
          </p>
        </div>
      );
    },
    [t, showInitialTyping],
  );

  const regenerateCommandOutput = useCallback(
    (input: string) => {
      switch (input.toLowerCase()) {
        case "whoami":
          return getWhoamiOutput(false);
        case "help":
          return getHelpOutput();
        case "skills":
          return <p className="text-accent">{t("terminal.commands.skills")}</p>;
        case "projects":
          return (
            <p className="text-accent">{t("terminal.commands.projects")}</p>
          );
        case "contact":
          return (
            <p className="text-accent">{t("terminal.commands.contact")}</p>
          );
        default:
          return (
            <p className="text-red-400">
              {t("terminal.commands.notFound", { command: input })}
            </p>
          );
      }
    },
    [t, getWhoamiOutput, getHelpOutput],
  );

  const executeCommand = useCallback(
    (input: string, useAnimation: boolean = false) => {
      const trimmedInput = input.trim().toLowerCase();

      if (trimmedInput === "") return;

      let output: React.ReactNode = null;

      switch (trimmedInput) {
        case "whoami":
          output = getWhoamiOutput(useAnimation);
          break;

        case "help":
          output = getHelpOutput();
          break;

        case "skills":
          {
            const element = document.querySelector("#skills");
            if (element) element.scrollIntoView({ behavior: "smooth" });
            output = (
              <p className="text-accent animate-fadeIn">
                {t("terminal.commands.skills")}
              </p>
            );
          }
          break;

        case "projects":
          {
            const element = document.querySelector("#projects");
            if (element) element.scrollIntoView({ behavior: "smooth" });
            output = (
              <p className="text-accent animate-fadeIn">
                {t("terminal.commands.projects")}
              </p>
            );
          }
          break;

        case "contact":
          {
            const element = document.querySelector("#contact");
            if (element) element.scrollIntoView({ behavior: "smooth" });
            output = (
              <p className="text-accent animate-fadeIn">
                {t("terminal.commands.contact")}
              </p>
            );
          }
          break;

        case "clear":
          setCommands([]);
          return;

        default:
          output = (
            <p className="text-red-400 animate-fadeIn">
              {t("terminal.commands.notFound", { command: trimmedInput })}
            </p>
          );
      }

      setCommands((prev) => [...prev, { input: trimmedInput, output }]);
    },
    [t, getWhoamiOutput, getHelpOutput],
  );

  useEffect(() => {
    if (currentLanguage.current !== i18n.language) {
      currentLanguage.current = i18n.language;

      const timer = setTimeout(() => {
        setCommands((prev) =>
          prev.map((cmd) => ({
            ...cmd,
            output: regenerateCommandOutput(cmd.input),
          })),
        );
      }, 0);

      return () => clearTimeout(timer);
    }
  }, [i18n.language, regenerateCommandOutput]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentInput.trim()) {
      executeCommand(currentInput, false);
      setCurrentInput("");
    }
  };

  useEffect(() => {
    if (hasRunInitial.current) return;
    if (!i18n.isInitialized) return;

    hasRunInitial.current = true;

    const runInitialCommand = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      executeCommand("whoami", true);
    };

    runInitialCommand();
  }, [i18n.isInitialized, executeCommand]);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-gray-900/95 backdrop-blur-sm">
        <div className="bg-gray-800/50 px-4 py-3 flex items-center justify-between border-b border-white/10">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="text-xs font-mono text-gray-400 uppercase tracking-widest">
            bash — adriana@portfolio
          </div>
          <div className="w-14"></div>
        </div>

        <div className="p-6 font-mono text-sm min-h-80 max-h-100 overflow-y-auto">
          {commands.map((cmd, index) => (
            <div key={index} className="mb-4">
              <div className="flex gap-2 mb-2">
                <span className="text-primary">➜</span>
                <span className="text-accent">~</span>
                <span className="text-white">{cmd.input}</span>
              </div>
              {cmd.output && <div className="pl-4 mb-2">{cmd.output}</div>}
            </div>
          ))}

          {showInput && (
            <form onSubmit={handleSubmit} className="flex gap-2">
              <span className="text-primary">➜</span>
              <span className="text-accent">~</span>
              <input
                type="text"
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-gray-600"
                placeholder={t("terminal.placeholder")}
                autoFocus
              />
              <span className="w-2 h-5 bg-white/60 animate-pulse"></span>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
