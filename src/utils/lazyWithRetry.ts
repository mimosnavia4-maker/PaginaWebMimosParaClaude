import React from 'react';

const CHUNK_RETRY_STORAGE_KEY = 'mimos_chunk_retry_at';
const CHUNK_RETRY_WINDOW_MS = 15000;

function isChunkLoadError(error: unknown): boolean {
  const message =
    error instanceof Error ? error.message : typeof error === 'string' ? error : '';
  return (
    /error loading dynamically imported module/i.test(message) ||
    /failed to fetch dynamically imported module/i.test(message) ||
    /importing a module script failed/i.test(message) ||
    /loading chunk \d+ failed/i.test(message) ||
    /chunkloaderror/i.test(message)
  );
}

/**
 * Envuelve React.lazy para recuperarse automáticamente de desajustes de hashes
 * entre despliegues (recarga única segura en 15s) y evitar pantallas en blanco.
 */
export function lazyWithRetry<T extends React.ComponentType<any>>(
  factory: () => Promise<{ default: T }>
): React.LazyExoticComponent<T> {
  return React.lazy(async () => {
    try {
      return await factory();
    } catch (error) {
      if (typeof window !== 'undefined' && isChunkLoadError(error)) {
        try {
          const lastRetryRaw = window.sessionStorage.getItem(CHUNK_RETRY_STORAGE_KEY);
          const lastRetryAt = lastRetryRaw ? Number(lastRetryRaw) : 0;
          const now = Date.now();

          if (!lastRetryAt || now - lastRetryAt > CHUNK_RETRY_WINDOW_MS) {
            window.sessionStorage.setItem(CHUNK_RETRY_STORAGE_KEY, String(now));
            window.location.reload();
            return new Promise<{ default: T }>(() => {});
          }
        } catch {
          // Si sessionStorage no está disponible, propagar el error al ErrorBoundary
        }
      }
      throw error;
    }
  });
}
