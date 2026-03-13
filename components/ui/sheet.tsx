"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

interface SheetContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SheetContext = React.createContext<SheetContextValue | null>(null);

interface SheetProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

function Sheet({ open: controlledOpen, onOpenChange, children }: SheetProps) {
  const [internalOpen, setInternalOpen] = React.useState(false);
  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : internalOpen;
  const handleOpenChange = React.useCallback(
    (next: boolean) => {
      if (!isControlled) setInternalOpen(next);
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange]
  );

  return (
    <SheetContext.Provider
      value={{ open: isOpen, onOpenChange: handleOpenChange }}
    >
      {children}
    </SheetContext.Provider>
  );
}

interface SheetTriggerProps {
  asChild?: boolean;
  children: React.ReactNode;
  className?: string;
}

function SheetTrigger({
  asChild,
  children,
  className,
}: SheetTriggerProps) {
  const ctx = React.useContext(SheetContext);
  if (!ctx) return null;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    ctx.onOpenChange(!ctx.open);
  };

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<{ onClick?: (e: React.MouseEvent) => void }>, {
      onClick: handleClick,
    });
  }

  return (
    <button type="button" onClick={handleClick} className={className}>
      {children}
    </button>
  );
}

interface SheetContentProps {
  side?: "left" | "right";
  children: React.ReactNode;
  className?: string;
}

function SheetContent({
  side = "right",
  children,
  className,
}: SheetContentProps) {
  const ctx = React.useContext(SheetContext);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  if (!ctx) return null;
  if (!ctx.open) return null;
  if (!mounted || typeof document === "undefined") return null;

  const content = (
    <>
      <div
        className="fixed inset-0 z-[100] bg-black/50"
        onClick={() => ctx.onOpenChange(false)}
        aria-hidden
      />
      <div
        className={cn(
          "fixed top-0 z-[101] h-full w-full max-w-sm bg-background shadow-lg",
          side === "right" ? "right-0" : "left-0",
          className
        )}
      >
        {children}
      </div>
    </>
  );

  return createPortal(content, document.body);
}

export { Sheet, SheetTrigger, SheetContent };
