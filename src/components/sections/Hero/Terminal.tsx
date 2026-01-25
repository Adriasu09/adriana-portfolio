"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { TypingText } from "@/components/ui/TypingText";

interface Command {
  input: string;
  output?: string | React.ReactNode;
}

export function Terminal() {
  const [commands, setCommands] = useState<Command[]>([]);
  const [currentInput, setCurrentInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showInitialTyping, setShowInitialTyping] = useState(true);
  const hasRunInitial = useRef(false);

  const getWhoamiOutput = () => {
    if (showInitialTyping && commands.length === 0) {
      return (
        <div className="space-y-2 text-sm text-gray-300">
          <p>
            <TypingText
              text="👋 Hi! I'm Adriana Suárez"
              speed={30}
              className="text-white font-bold"
              onComplete={() =>
                setTimeout(() => setShowInitialTyping(false), 2000)
              }
            />
          </p>
          <p className="opacity-0 animate-fadeInDelay1">
            Frontend & Fullstack Developer
          </p>
          <p className="opacity-0 animate-fadeInDelay2">
            Specialized in React, Next.js, TypeScript, and Node.js
          </p>
          <p className="text-accent opacity-0 animate-fadeInDelay3">
            🔍 Currently seeking new opportunities
          </p>
        </div>
      );
    }

    return (
      <div className="space-y-2 text-sm text-gray-300 animate-fadeIn">
        <p>
          👋 Hi! I&apos;m{" "}
          <span className="text-white font-bold">Adriana Suárez</span>
        </p>
        <p>Frontend & Fullstack Developer</p>
        <p>Specialized in React, Next.js, TypeScript, and Node.js</p>
        <p className="text-accent">🔍 Currently seeking new opportunities</p>
      </div>
    );
  };

  const executeCommand = (input: string) => {
    const trimmedInput = input.trim().toLowerCase();

    if (trimmedInput === "") return;

    let output: React.ReactNode = null;

    switch (trimmedInput) {
      case "whoami":
        output = getWhoamiOutput();
        break;

      case "help":
        output = (
          <div className="space-y-2 text-sm text-gray-300 animate-fadeIn">
            <p className="text-accent font-bold">Available commands:</p>
            <div className="grid grid-cols-2 gap-2 pl-4">
              <span>• whoami</span>
              <span>• help</span>
              <span>• skills</span>
              <span>• projects</span>
              <span>• contact</span>
              <span>• clear</span>
            </div>
          </div>
        );
        break;

      case "skills":
        {
          const element = document.querySelector("#skills");
          if (element) element.scrollIntoView({ behavior: "smooth" });
          output = (
            <p className="text-accent animate-fadeIn">
              Navigating to Skills section...
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
              Navigating to Projects section...
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
              Navigating to Contact section...
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
            Command not found: {trimmedInput}. Type &apos;help&apos; for
            available commands.
          </p>
        );
    }

    setCommands((prev) => [...prev, { input: trimmedInput, output }]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentInput.trim()) {
      executeCommand(currentInput);
      setCurrentInput("");
    }
  };

  // Ejecutar comando inicial
  useEffect(() => {
    if (hasRunInitial.current) return;

    hasRunInitial.current = true;

    const runInitialCommand = async () => {
      setIsTyping(true);
      await new Promise((resolve) => setTimeout(resolve, 500));
      executeCommand("whoami");
      setIsTyping(false);
    };

    runInitialCommand();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

        <div className="p-6 font-mono text-sm min-h-100 max-h-150 overflow-y-auto">
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

          <form onSubmit={handleSubmit} className="flex gap-2">
            <span className="text-primary">➜</span>
            <span className="text-accent">~</span>
            <input
              type="text"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-gray-600"
              placeholder="Type 'help' for available commands..."
              autoFocus
              disabled={isTyping}
            />
            <span
              className={cn("w-2 h-5 bg-white/60", isTyping && "animate-pulse")}
            ></span>
          </form>
        </div>
      </div>
    </div>
  );
}
