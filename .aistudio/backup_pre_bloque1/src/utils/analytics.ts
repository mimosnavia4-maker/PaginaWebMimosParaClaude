export type MimosEventName =
  | 'whatsapp_click'
  | 'phone_click'
  | 'form_submit'
  | 'locator_search'
  | 'ficha_view';

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export function hasAnalyticsConsent(): boolean {
  try {
    return localStorage.getItem('ck') === '1';
  } catch {
    return false;
  }
}

export function trackMimosEvent(
  eventName: MimosEventName,
  params: Record<string, string | number | boolean> = {}
): void {
  if (!hasAnalyticsConsent()) {
    return;
  }
  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: eventName,
      timestamp: new Date().toISOString(),
      ...params,
    });
  } catch {
    // Ignore tracking errors
  }
}
