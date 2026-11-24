/**
 * Utilidades de acceso seguro a localStorage con protección contra SecurityError
 * en modos privados, iframes restringidos, cuota excedida o almacenamiento deshabilitado.
 */

export function safeGetItem(key: string): string | null {
  if (typeof window === 'undefined') return null;
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function safeSetItem(key: string, value: string): boolean {
  if (typeof window === 'undefined') return false;
  try {
    window.localStorage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
}

export function safeRemoveItem(key: string): boolean {
  if (typeof window === 'undefined') return false;
  try {
    window.localStorage.removeItem(key);
    return true;
  } catch {
    return false;
  }
}

const THEME_STORAGE_KEY = 'mimos_theme';

export function getStoredTheme(): boolean {
  return false;
}

export function setStoredTheme(_darkMode: boolean): void {
  safeSetItem(THEME_STORAGE_KEY, 'light');
}
