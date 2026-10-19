import React, { useEffect, useRef, ReactNode } from 'react';

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  titleId?: string;
  ariaLabel?: string;
  children: ReactNode;
  maxWidthClass?: string;
  className?: string;
}

export const Dialog: React.FC<DialogProps> = ({
  isOpen,
  onClose,
  titleId,
  ariaLabel,
  children,
  maxWidthClass = 'max-w-2xl',
  className = '',
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  // 1. Guardar foco previo y bloquear scroll del body
  useEffect(() => {
    if (!isOpen) return;

    previousActiveElement.current = document.activeElement as HTMLElement | null;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // 2. Integración con el historial del navegador (botón Atrás cierra el modal)
    if (typeof window !== 'undefined' && window.history) {
      try {
        window.history.pushState({ mimosModal: true }, '');
      } catch {
        // Ignorar en entornos de prueba o iframes restringidos
      }
    }

    const handlePopState = (e: PopStateEvent) => {
      onClose();
    };
    window.addEventListener('popstate', handlePopState);

    // 3. Foco inicial dentro del modal tras abrir
    const timer = setTimeout(() => {
      if (dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length > 0) {
          focusable[0].focus();
        } else {
          dialogRef.current.focus();
        }
      }
    }, 50);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('popstate', handlePopState);

      // Devolver foco al elemento disparador
      if (previousActiveElement.current && typeof previousActiveElement.current.focus === 'function') {
        previousActiveElement.current.focus();
      }
    };
  }, [isOpen, onClose]);

  // 4. Trampa de foco (Tab / Shift+Tab) y cierre con tecla Escape
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === 'Tab' && dialogRef.current) {
        const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;

        const firstElement = focusables[0];
        const lastElement = focusables[focusables.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={backdropRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-label={ariaLabel}
      onClick={(e) => {
        if (e.target === backdropRef.current) {
          onClose();
        }
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/75 backdrop-blur-xs transition-opacity duration-200"
    >
      <div
        ref={dialogRef}
        tabIndex={-1}
        className={`relative w-full ${maxWidthClass} max-h-[92vh] flex flex-col rounded-3xl bg-white dark:bg-[#071324] border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden focus:outline-none ${className}`}
      >
        {children}
      </div>
    </div>
  );
};
