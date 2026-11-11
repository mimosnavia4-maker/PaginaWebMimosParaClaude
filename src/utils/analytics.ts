export const GA4_MEASUREMENT_ID = 'G-17E0NSEG5Q';
export const COOKIE_CONSENT_KEY = 'mimos_cookies_consent';

export type CookieConsentChoice = 'accepted' | 'rejected';

export type ContactEventName = 'whatsapp_click' | 'phone_click';

export type CtaZone =
  | 'header'
  | 'mobile_bar'
  | 'mimo_assistant'
  | 'page_content'
  | 'footer'
  | 'hero'
  | 'service_card'
  | 'service_detail'
  | 'pickup_section'
  | 'pickup_form'
  | 'contact_form'
  | 'point_card'
  | 'point_modal';

export type MimosEventName =
  | ContactEventName
  | 'form_prepared'
  | 'request_prepared'
  | 'form_submit'
  | 'locator_search'
  | 'ficha_view';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    [key: `ga-disable-${string}`]: boolean | undefined;
  }
}

let gaInitialized = false;
let lastTrackedPath: string | null = null;
let lastClickRecord: { key: string; timestamp: number } | null = null;
let lastSearchRecord: { key: string; timestamp: number } | null = null;

function sanitizePagePath(rawPath?: string): string {
  const path = rawPath || (typeof window !== 'undefined' ? window.location.pathname : '/');
  const clean = path.split('?')[0].split('#')[0].trim();
  return clean.startsWith('/') ? clean : `/${clean}`;
}

export function getCookieConsentChoice(): CookieConsentChoice | null {
  if (typeof window === 'undefined') {
    return null;
  }
  try {
    const val = window.localStorage.getItem(COOKIE_CONSENT_KEY);
    if (val === 'accepted' || val === 'rejected') {
      return val;
    }
    return null;
  } catch {
    return null;
  }
}

export function setCookieConsentChoice(choice: CookieConsentChoice): void {
  if (typeof window === 'undefined') {
    return;
  }
  try {
    window.localStorage.setItem(COOKIE_CONSENT_KEY, choice);
    window.localStorage.removeItem('ck');
  } catch {
    // Ignore storage errors in restricted browsing modes
  }
}

export function hasAnalyticsConsent(): boolean {
  return getCookieConsentChoice() === 'accepted';
}

function clearGA4BrowserCookies(): void {
  if (typeof document === 'undefined' || typeof window === 'undefined') {
    return;
  }
  try {
    const rawCookies = document.cookie ? document.cookie.split(';') : [];
    const cookieNames = new Set<string>([
      '_ga',
      `_ga_${GA4_MEASUREMENT_ID.replace(/^G-/, '')}`,
    ]);

    for (const entry of rawCookies) {
      const eqIdx = entry.indexOf('=');
      const name = (eqIdx > -1 ? entry.slice(0, eqIdx) : entry).trim();
      if (name.startsWith('_ga') || name.startsWith('_gid') || name.startsWith('_gat')) {
        cookieNames.add(name);
      }
    }

    const hostname = window.location.hostname || '';
    const hostParts = hostname.split('.');
    const rootDomain =
      hostParts.length >= 2 ? `.${hostParts.slice(-2).join('.')}` : hostname;

    const domains = Array.from(
      new Set(['', hostname, `.${hostname}`, rootDomain].filter(Boolean))
    );

    cookieNames.forEach((name) => {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Lax`;
      domains.forEach((domain) => {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${domain}; SameSite=Lax`;
      });
    });
  } catch {
    // Ignore cookie deletion errors
  }
}

export function initGA4(): boolean {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return false;
  }
  if (!hasAnalyticsConsent()) {
    window[`ga-disable-${GA4_MEASUREMENT_ID}`] = true;
    return false;
  }

  window[`ga-disable-${GA4_MEASUREMENT_ID}`] = false;
  window.dataLayer = window.dataLayer || [];

  if (typeof window.gtag !== 'function') {
    window.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer?.push(arguments);
    };
  }

  const existingScript = document.getElementById('mimos-ga4-script');
  if (!existingScript) {
    const script = document.createElement('script');
    script.id = 'mimos-ga4-script';
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`;
    document.head.appendChild(script);
  }

  if (!gaInitialized) {
    window.gtag('consent', 'default', {
      analytics_storage: 'granted',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
    });
    window.gtag('js', new Date());
    window.gtag('config', GA4_MEASUREMENT_ID, {
      send_page_view: false,
      anonymize_ip: true,
    });
    gaInitialized = true;
  } else {
    window.gtag('consent', 'update', {
      analytics_storage: 'granted',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
    });
  }

  return true;
}

export function disableAndClearGA4(): void {
  if (typeof window === 'undefined') {
    return;
  }

  window[`ga-disable-${GA4_MEASUREMENT_ID}`] = true;
  lastTrackedPath = null;
  lastClickRecord = null;
  lastSearchRecord = null;
  gaInitialized = false;

  try {
    if (typeof window.gtag === 'function') {
      window.gtag('consent', 'update', {
        analytics_storage: 'denied',
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
      });
    }
  } catch {
    // Ignore errors when revoking
  }

  if (typeof document !== 'undefined') {
    const scriptEl = document.getElementById('mimos-ga4-script');
    if (scriptEl && scriptEl.parentNode) {
      scriptEl.parentNode.removeChild(scriptEl);
    }
  }

  window.gtag = undefined;
  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.length = 0;
  }

  clearGA4BrowserCookies();
}

export function trackPageView(path: string, title?: string): boolean {
  if (typeof window === 'undefined' || !hasAnalyticsConsent()) {
    return false;
  }
  if (window[`ga-disable-${GA4_MEASUREMENT_ID}`] === true) {
    return false;
  }
  if (!gaInitialized) {
    initGA4();
  }
  if (typeof window.gtag !== 'function') {
    return false;
  }

  const cleanPath = sanitizePagePath(path);
  if (lastTrackedPath === cleanPath) {
    return false;
  }
  lastTrackedPath = cleanPath;

  try {
    window.gtag('event', 'page_view', {
      page_path: cleanPath,
      page_title: title || (typeof document !== 'undefined' ? document.title : ''),
      send_to: GA4_MEASUREMENT_ID,
    });
    return true;
  } catch {
    return false;
  }
}

// Throttler global unificado para eventos de contacto (WhatsApp y teléfono)
// Previene dobles conversiones entre el listener global de App.tsx y los manejadores locales en componentes
let lastContactThrottle: { type: string; timestamp: number } | null = null;

export function shouldThrottleContact(type: string, windowMs = 1500): boolean {
  const now = Date.now();
  if (lastContactThrottle && lastContactThrottle.type === type && now - lastContactThrottle.timestamp < windowMs) {
    return true;
  }
  lastContactThrottle = { type, timestamp: now };
  return false;
}

/**
 * Registra un clic en enlaces de contacto (WhatsApp o teléfono).
 * ctaZone identifica la zona visual general ('header', 'mobile_bar', 'mimo_assistant', 'page_content').
 */
export function trackContactClick(
  eventName: ContactEventName,
  pagePath: string,
  ctaZone: CtaZone = 'page_content'
): boolean {
  if (typeof window === 'undefined' || !hasAnalyticsConsent()) {
    return false;
  }
  if (window[`ga-disable-${GA4_MEASUREMENT_ID}`] === true) {
    return false;
  }
  if (!gaInitialized) {
    initGA4();
  }
  if (typeof window.gtag !== 'function') {
    return false;
  }

  // Prevenir duplicaciones unificadas (1,5 s de ventana)
  if (shouldThrottleContact(eventName, 1500)) {
    return false;
  }

  const cleanPath = sanitizePagePath(pagePath);

  try {
    window.gtag('event', eventName, {
      page_path: cleanPath,
      cta_location: ctaZone,
      cta_zone: ctaZone,
      send_to: GA4_MEASUREMENT_ID,
    });
    return true;
  } catch {
    return false;
  }
}

export interface TrackClickOptions {
  service_id?: string;
  store_id?: string;
  cta_location?: string;
}

/**
 * Registra la intención de contactar abriendo WhatsApp (whatsapp_click).
 * Nota de medición: Este evento registra la acción del usuario al pulsar el botón hacia WhatsApp,
 * no equivale a una venta o contacto cerrado, el cual se confirma una vez el mensaje llega al equipo de Mimos.
 */
export function trackWhatsAppClick(
  pagePath: string,
  ctaLocation: string = 'page_content',
  options?: TrackClickOptions
): boolean {
  if (typeof window === 'undefined' || !hasAnalyticsConsent()) {
    return false;
  }
  if (window[`ga-disable-${GA4_MEASUREMENT_ID}`] === true) {
    return false;
  }
  if (!gaInitialized) {
    initGA4();
  }
  if (typeof window.gtag !== 'function') {
    return false;
  }

  // Prevenir duplicaciones unificadas (1,5 s de ventana)
  if (shouldThrottleContact('whatsapp_click', 1500)) {
    return false;
  }

  const cleanPath = sanitizePagePath(pagePath);
  const serviceId = options?.service_id;
  const storeId = options?.store_id;

  try {
    const payload: Record<string, unknown> = {
      page_path: cleanPath,
      cta_location: ctaLocation,
      cta_zone: ctaLocation,
      send_to: GA4_MEASUREMENT_ID,
    };
    if (serviceId) payload.service_id = serviceId;
    if (storeId) payload.store_id = storeId;

    window.gtag('event', 'whatsapp_click', payload);
    return true;
  } catch {
    return false;
  }
}

/**
 * Registra la intención de llamar por teléfono (phone_click).
 */
export function trackPhoneClick(
  pagePath: string,
  ctaLocation: string = 'page_content',
  options?: { store_id?: string }
): boolean {
  if (typeof window === 'undefined' || !hasAnalyticsConsent()) {
    return false;
  }
  if (window[`ga-disable-${GA4_MEASUREMENT_ID}`] === true) {
    return false;
  }
  if (!gaInitialized) {
    initGA4();
  }
  if (typeof window.gtag !== 'function') {
    return false;
  }

  // Prevenir duplicaciones unificadas (1,5 s de ventana)
  if (shouldThrottleContact('phone_click', 1500)) {
    return false;
  }

  const cleanPath = sanitizePagePath(pagePath);
  const storeId = options?.store_id;

  try {
    const payload: Record<string, unknown> = {
      page_path: cleanPath,
      cta_location: ctaLocation,
      cta_zone: ctaLocation,
      send_to: GA4_MEASUREMENT_ID,
    };
    if (storeId) payload.store_id = storeId;

    window.gtag('event', 'phone_click', payload);
    return true;
  } catch {
    return false;
  }
}

export type FormPreparedType =
  | 'pickup_request'
  | 'contact_request'
  | 'quote_apartamentos'
  | 'quote_empresas'
  | 'quote_limpieza'
  | 'collaborator_application'
  | (string & {});

/**
 * Tracks valid form preparation (strictly NO personal data, names, phone numbers, or addresses).
 */
export function trackFormPrepared(
  pagePath: string,
  formName: FormPreparedType
): boolean {
  if (typeof window === 'undefined' || !hasAnalyticsConsent()) {
    return false;
  }
  if (window[`ga-disable-${GA4_MEASUREMENT_ID}`] === true) {
    return false;
  }
  if (!gaInitialized) {
    initGA4();
  }
  if (typeof window.gtag !== 'function') {
    return false;
  }

  const cleanPath = sanitizePagePath(pagePath);
  try {
    window.gtag('event', 'form_prepared', {
      page_path: cleanPath,
      form_name: formName,
      send_to: GA4_MEASUREMENT_ID,
    });
    return true;
  } catch {
    return false;
  }
}

/**
 * Tracks locator search/filter interactions without transmitting user queries or personal data.
 */
export function trackLocatorSearch(
  pagePath: string,
  resultsCount: number,
  filterType?: string
): boolean {
  if (typeof window === 'undefined' || !hasAnalyticsConsent()) {
    return false;
  }
  if (window[`ga-disable-${GA4_MEASUREMENT_ID}`] === true) {
    return false;
  }
  if (!gaInitialized) {
    initGA4();
  }
  if (typeof window.gtag !== 'function') {
    return false;
  }

  const cleanPath = sanitizePagePath(pagePath);
  const dedupeKey = `locator_search:${cleanPath}:${filterType || 'query'}:${resultsCount}`;
  const now = Date.now();

  if (
    lastSearchRecord &&
    lastSearchRecord.key === dedupeKey &&
    now - lastSearchRecord.timestamp < 1000
  ) {
    return false;
  }
  lastSearchRecord = { key: dedupeKey, timestamp: now };

  try {
    window.gtag('event', 'locator_search', {
      page_path: cleanPath,
      results_count: resultsCount,
      filter_type: filterType || 'query',
      send_to: GA4_MEASUREMENT_ID,
    });
    return true;
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
  const path =
    typeof params.page_path === 'string'
      ? params.page_path
      : typeof window !== 'undefined'
        ? window.location.pathname
        : '/';

  if (eventName === 'whatsapp_click') {
    const location =
      typeof params.cta_location === 'string'
        ? params.cta_location
        : typeof params.cta_zone === 'string'
          ? params.cta_zone
          : 'page_content';
    const serviceId = typeof params.service_id === 'string' ? params.service_id : undefined;
    const storeId = typeof params.store_id === 'string' ? params.store_id : undefined;
    trackWhatsAppClick(path, location, { service_id: serviceId, store_id: storeId });
  } else if (eventName === 'phone_click') {
    const location =
      typeof params.cta_location === 'string'
        ? params.cta_location
        : typeof params.cta_zone === 'string'
          ? params.cta_zone
          : 'page_content';
    const storeId = typeof params.store_id === 'string' ? params.store_id : undefined;
    trackPhoneClick(path, location, { store_id: storeId });
  } else if (eventName === 'form_prepared' || eventName === 'request_prepared') {
    const formName =
      params.form_name === 'contact_request' ? 'contact_request' : 'pickup_request';
    trackFormPrepared(path, formName);
  }
}

// Block GA4 by default on module evaluation until explicit consent is verified
if (typeof window !== 'undefined' && !hasAnalyticsConsent()) {
  window[`ga-disable-${GA4_MEASUREMENT_ID}`] = true;
}

