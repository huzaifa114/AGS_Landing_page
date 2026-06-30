"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children?: ReactNode;
  className?: string;
}

function Modal({
  open,
  onClose,
  title,
  description,
  children,
  className,
}: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      className={cn(
        "fixed inset-0 z-50 m-auto w-full max-w-lg rounded-2xl border border-border bg-surface p-0 shadow-premium backdrop:bg-foreground/20",
        "open:animate-in open:fade-in-0",
        className
      )}
      aria-labelledby="modal-title"
      aria-describedby={description ? "modal-description" : undefined}
    >
      <div className="flex items-start justify-between border-b border-border p-6">
        <div>
          <h2 id="modal-title" className="text-h4 font-semibold">
            {title}
          </h2>
          {description && (
            <p id="modal-description" className="mt-1 text-body-sm text-muted">
              {description}
            </p>
          )}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          aria-label="Close dialog"
          className="h-8 w-8 shrink-0 rounded-full p-0"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      {children && <div className="p-6">{children}</div>}
    </dialog>
  );
}

export { Modal };
