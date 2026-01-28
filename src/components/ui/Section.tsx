import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface SectionProps extends HTMLAttributes<HTMLElement> {
  fullWidth?: boolean;
}

export function Section({
  className,
  children,
  fullWidth = false,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(
        "py-10 md:py-20 px-6 lg:px-20 scroll-mt-24",
        !fullWidth && "max-w-7xl mx-auto w-full",
        className,
      )}
      {...props}
    >
      {children}
    </section>
  );
}

interface SectionHeaderProps {
  number: string;
  title: string;
  className?: string;
}

export function SectionHeader({
  number,
  title,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn("flex items-center gap-4 mb-12", className)}>
      <span className="font-mono text-primary text-xl">{number}.</span>
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-primary-color uppercase">
        {title}
      </h2>
      <div className="h-0.5 flex-1 bg-border"></div>
    </div>
  );
}
