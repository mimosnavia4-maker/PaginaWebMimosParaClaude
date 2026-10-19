import React, { Component, ErrorInfo, ReactNode } from 'react';
import { RefreshCw, Home, Phone, MessageCircle, AlertCircle } from 'lucide-react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (import.meta.env.DEV) {
      console.warn('ErrorBoundary capturó un error de renderizado:', error, errorInfo);
    }
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    if (typeof window !== 'undefined') {
      window.location.href = '/';
    }
  };

  private handleReload = () => {
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#071324] text-slate-900 dark:text-slate-100 flex flex-col justify-center items-center p-4 sm:p-6">
          <div className="w-full max-w-lg bg-white dark:bg-[#002147]/90 rounded-3xl border border-slate-200 dark:border-white/10 p-6 sm:p-8 shadow-2xl text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
              <AlertCircle className="w-9 h-9" aria-hidden="true" />
            </div>

            <h1 className="text-xl sm:text-2xl font-black text-[#002147] dark:text-white mb-2">
              Disculpa, ha ocurrido un imprevisto
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
              No te preocupes: tus datos no se han perdido. Puedes recargar la página o volver a la portada de Tintorería Mimos.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
              <button
                type="button"
                onClick={this.handleReload}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#0F76BB] hover:bg-[#0b5f97] text-white text-sm font-bold transition-colors cursor-pointer shadow-sm"
              >
                <RefreshCw className="w-4 h-4" aria-hidden="true" />
                <span>Recargar página</span>
              </button>
              <button
                type="button"
                onClick={this.handleReset}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-sm font-bold transition-colors cursor-pointer"
              >
                <Home className="w-4 h-4" aria-hidden="true" />
                <span>Ir al inicio</span>
              </button>
            </div>

            <div className="pt-6 border-t border-slate-200 dark:border-white/10 text-xs text-slate-500 dark:text-slate-400">
              <p className="font-semibold mb-2">¿Necesitas atención inmediata?</p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <a
                  href="tel:+34986125141"
                  className="inline-flex items-center gap-1.5 text-[#0F76BB] dark:text-[#60B5F6] font-bold hover:underline"
                >
                  <Phone className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>986 12 51 41</span>
                </a>
                <a
                  href="https://wa.me/34655536844"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold hover:underline"
                >
                  <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>WhatsApp: 655 536 844</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
