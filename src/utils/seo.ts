import { ALL_ROUTE_PATHS, ROUTE_SEO_MAP } from '../data/routesSeoData.ts';
import { LEGACY_REDIRECT_MAP, resolveCanonicalRoute } from '../data/redirectsData.ts';

export { LEGACY_REDIRECT_MAP, resolveCanonicalRoute };

export const KNOWN_ROUTES: string[] = ALL_ROUTE_PATHS;

export function isKnownRoute(rawPath: string): boolean {
  const resolved = resolveCanonicalRoute(rawPath);
  return KNOWN_ROUTES.includes(resolved);
}

let seoUpdateCounter = 0;

export function applyPageSEO(pathname: string): void {
  const canonicalPath = resolveCanonicalRoute(pathname);
  const cleanPath = canonicalPath.split('?')[0].split('#')[0] || '/';
  const meta = ROUTE_SEO_MAP[cleanPath];

  const title = meta ? meta.title : 'Página no encontrada | Tintorería Mimos';
  const description = meta
    ? meta.description
    : 'La página solicitada no existe o ha sido trasladada. Tintorería y lavandería profesional en Vigo con recogida a domicilio y 3 tiendas propias.';
  const canonical = meta ? meta.canonical : '';
  const robots = meta ? meta.robots : 'noindex, nofollow';
  const ogType = meta ? meta.ogType : 'website';

  document.title = title;

  const setMetaContent = (selector: string, content: string) => {
    let el = document.querySelector(selector);
    if (!el) {
      if (selector.startsWith('meta[')) {
        el = document.createElement('meta');
        const matchName = selector.match(/name="([^"]+)"/);
        const matchProp = selector.match(/property="([^"]+)"/);
        if (matchName) el.setAttribute('name', matchName[1]);
        if (matchProp) el.setAttribute('property', matchProp[1]);
        document.head.appendChild(el);
      }
    }
    if (el) {
      el.setAttribute('content', content);
    }
  };

  setMetaContent('meta[name="description"]', description);
  setMetaContent('meta[name="robots"]', robots);
  setMetaContent('meta[property="og:title"]', title);
  setMetaContent('meta[property="og:description"]', description);
  if (canonical) {
    setMetaContent('meta[property="og:url"]', canonical);
  } else {
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.remove();
  }
  setMetaContent('meta[property="og:type"]', ogType);
  setMetaContent('meta[name="twitter:title"]', title);
  setMetaContent('meta[name="twitter:description"]', description);

  const image = meta?.ogImage || 'https://www.tintoreriamimos.es/osito-mimos.jpg';
  setMetaContent('meta[property="og:image"]', image);
  setMetaContent('meta[name="twitter:image"]', image);

  let canonicalEl = document.querySelector('link[rel="canonical"]');
  if (canonical) {
    if (!canonicalEl) {
      canonicalEl = document.createElement('link');
      canonicalEl.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.setAttribute('href', canonical);
  } else if (canonicalEl) {
    canonicalEl.remove();
  }

  const legacyLocalBusiness = document.getElementById('schema-localbusiness');
  if (legacyLocalBusiness) {
    legacyLocalBusiness.remove();
  }

  // En carga inicial estática (prerenderizada), #schema-dynamic-page ya viene inyectado en HTML;
  // en navegación cliente o modo dev, cargamos seoSchemas.ts de forma diferida para no engordar el bundle inicial.
  const currentUpdateId = ++seoUpdateCounter;
  const existingDynamicSchema = document.getElementById('schema-dynamic-page');
  if (existingDynamicSchema && currentUpdateId === 1) {
    return;
  }

  void import('./seoSchemas.ts')
    .then(({ getPageSEO }) => {
      if (currentUpdateId !== seoUpdateCounter) return;
      const seo = getPageSEO(pathname);
      let scriptEl = document.getElementById('schema-dynamic-page') as HTMLScriptElement | null;
      if (
        seo.jsonLd &&
        (Array.isArray(seo.jsonLd) ? seo.jsonLd.length > 0 : Object.keys(seo.jsonLd).length > 0)
      ) {
        if (!scriptEl) {
          scriptEl = document.createElement('script');
          scriptEl.id = 'schema-dynamic-page';
          scriptEl.type = 'application/ld+json';
          document.head.appendChild(scriptEl);
        }
        scriptEl.textContent = JSON.stringify(seo.jsonLd);
      } else if (scriptEl) {
        scriptEl.remove();
      }
    })
    .catch(() => {
      // Ignorar fallo transitorio de carga diferida de esquema
    });
}
