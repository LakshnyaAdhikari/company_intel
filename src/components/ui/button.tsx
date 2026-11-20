import { Slot } from "@radix-ui/react-slot";
import type { ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
  size?: "default" | "sm" | "lg";
  variant?: "default" | "outline" | "ghost";
};

export function Button({
  asChild = false,
  className,
  size = "default",
  variant = "default",
  ...props
}: ButtonProps) {
  const Component = asChild ? Slot : "button";

  return (
    <Component
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 disabled:pointer-events-none disabled:opacity-50",
        size === "sm" ? "h-8 px-3 text-xs" : size === "lg" ? "h-11 px-6 text-base" : "h-10 px-4 py-2 text-sm",
        variant === "outline"
          ? "border bg-background hover:bg-muted"
          : variant === "ghost"
          ? "hover:bg-muted text-foreground"
          : "bg-primary text-primary-foreground hover:bg-primary/90",
        className
      )}
      {...props}
    />
  );
}
