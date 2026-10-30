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

// Pila global de diálogos abiertos a nivel de módulo
// Permite que al presionar Escape solo se cierre el diálogo más superficial (el último abierto)
const openDialogsStack: Array<() => void> = [];

if (typeof window !== 'undefined') {
  window.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === 'Escape' && openDialogsStack.length > 0) {
      e.preventDefault();
      e.stopPropagation();
      const topCloseHandler = openDialogsStack[openDialogsStack.length - 1];
      if (topCloseHandler) {
        topCloseHandler();
      }
    }
  });
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
  const onCloseRef = useRef(onClose);

  // Mantener la referencia de onClose actualizada sin reiniciar efectos
  onCloseRef.current = onClose;

  // 1. Ciclo de vida del diálogo: solo se ejecuta cuando isOpen pasa de false a true o viceversa
  useEffect(() => {
    if (!isOpen) return;

    // Guardar elemento enfocado antes de abrir
    previousActiveElement.current = document.activeElement as HTMLElement | null;

    // Bloquear scroll del documento
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Registrar en la pila de diálogos para gestión de Escape en capas
    const handleClose = () => {
      onCloseRef.current();
    };
    openDialogsStack.push(handleClose);

    // Foco inicial: una única vez tras la apertura
    const timer = setTimeout(() => {
      if (dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
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

      // Desapilar el diálogo
      const index = openDialogsStack.lastIndexOf(handleClose);
      if (index !== -1) {
        openDialogsStack.splice(index, 1);
      }

      // Devolver foco al elemento disparador si sigue presente en el DOM
      const prevEl = previousActiveElement.current;
      if (prevEl && typeof prevEl.focus === 'function' && prevEl.isConnected) {
        prevEl.focus();
      }
    };
  }, [isOpen]);

  // 2. Trampa de foco (Tab / Shift+Tab) confinada al diálogo activo
  useEffect(() => {
    if (!isOpen) return;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab' || !dialogRef.current) return;

      const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );

      if (focusables.length === 0) {
        e.preventDefault();
        dialogRef.current.focus();
        return;
      }

      const firstElement = focusables[0];
      const lastElement = focusables[focusables.length - 1];
      const activeEl = document.activeElement;

      // Si el foco está fuera del diálogo o en el propio contenedor, redirigir
      if (!dialogRef.current.contains(activeEl) || activeEl === dialogRef.current) {
        e.preventDefault();
        if (e.shiftKey) {
          lastElement.focus();
        } else {
          firstElement.focus();
        }
        return;
      }

      // Ciclo en los extremos
      if (e.shiftKey) {
        if (activeEl === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (activeEl === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    window.addEventListener('keydown', handleTabKey);
    return () => window.removeEventListener('keydown', handleTabKey);
  }, [isOpen]);

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
          onCloseRef.current();
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
