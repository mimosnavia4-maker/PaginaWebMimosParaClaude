import { ALL_ROUTE_PATHS, ROUTE_SEO_MAP } from '../data/routesSeoData.ts';

export const KNOWN_ROUTES: string[] = ALL_ROUTE_PATHS;

const LEGACY_REDIRECT_MAP: Record<string, string> = {
  '/feder.html': '/feder',
  '/programa-bono-energia-peme-2025-in417z.html': '/programa-bono-energia-peme-2025-in417z',
  '/empleo-unete-a-nosotros.html': '/empleo-unete-a-nosotros',
  '/empleo': '/empleo-unete-a-nosotros',
  '/unete-a-nosotros': '/empleo-unete-a-nosotros',
  '/servicios/alfombras-pieles': '/limpieza-alfombras-vigo',
  '/alfombras-vigo': '/limpieza-alfombras-vigo',
  '/servicios/limpieza-de-alfombras.html': '/limpieza-alfombras-vigo',
  '/servicios/limpieza-de-alfombras': '/limpieza-alfombras-vigo',
  '/servicios/reparacion-de-alfombras.html': '/reparacion-alfombras-vigo',
  '/servicios/reparacion-de-alfombras': '/reparacion-alfombras-vigo',
  '/servicios/limpieza-de-pieles-y-cuero.html': '/limpieza-pieles-cuero-vigo',
  '/servicios/limpieza-de-pieles-y-cuero': '/limpieza-pieles-cuero-vigo',
  '/pieles-y-cuero-vigo': '/limpieza-pieles-cuero-vigo',
  '/costura-y-arreglos': '/arreglos-de-ropa-vigo',
  '/servicios/costura-arreglos': '/arreglos-de-ropa-vigo',
  '/arreglos-ropa-vigo': '/arreglos-de-ropa-vigo',
  '/blog/9-blog/26-la-colada-en-casa.html': '/blog/la-colada-en-casa',
  '/blog/9-blog/26-la-colada-en-casa': '/blog/la-colada-en-casa',
  '/blog/9-blog/22-montar-tu-propia-tintoreria-lavanderia.html':
    '/blog/montar-tu-propia-tintoreria-lavanderia',
  '/blog/9-blog/22-montar-tu-propia-tintoreria-lavanderia':
    '/blog/montar-tu-propia-tintoreria-lavanderia',
  '/punto-telas-mas-porrino': '/zonas/o-porrino',
  '/punto/telas-mas': '/zonas/o-porrino',
  '/ficha/telas-mas': '/zonas/o-porrino',
  '/punto-puntadas-no-aire-gondomar': '/zonas/gondomar',
  '/punto/puntadas-no-aire': '/zonas/gondomar',
  '/ficha/puntadas-no-aire': '/zonas/gondomar',
  '/tienda/navia': '/tienda-mimos-navia-vigo',
  '/tienda-navia': '/tienda-mimos-navia-vigo',
  '/central-navia': '/tienda-mimos-navia-vigo',
  '/tienda/gregorio-espino': '/tienda-mimos-gregorio-espino-vigo',
  '/tienda-gregorio-espino': '/tienda-mimos-gregorio-espino-vigo',
  '/tienda/venezuela': '/tienda-mimos-venezuela-vigo',
  '/tienda-venezuela': '/tienda-mimos-venezuela-vigo',
  '/punto-dpasso-vigo': '/punto-mimos-dpasso-vigo',
  '/punto/dpasso': '/punto-mimos-dpasso-vigo',
  '/ficha/dpasso': '/punto-mimos-dpasso-vigo',
  '/se-punto-de-recogida.html': '/se-punto-colaborador',
  '/se-punto-de-recogida': '/se-punto-colaborador',
  '/punto-colaborador': '/se-punto-colaborador',
  '/siniestros-vigo': '/limpieza-incendios-siniestros-vigo',
  '/limpieza-incendios-vigo': '/limpieza-incendios-siniestros-vigo',
  '/recuperacion-textil-siniestros': '/limpieza-incendios-siniestros-vigo',
  '/franquicia-wash-in-town.html': '/se-punto-colaborador',
  '/franquicia-wash-in-town': '/se-punto-colaborador',
  '/servicios/tintoreria.html': '/tintoreria-vigo',
  '/servicios/tintoreria': '/tintoreria-vigo',
  '/servicios/lavanderia.html': '/lavanderia-vigo',
  '/servicios/lavanderia': '/lavanderia-vigo',
  '/servicios/costura.html': '/arreglos-de-ropa-vigo',
  '/servicios/costura': '/arreglos-de-ropa-vigo',
  '/servicios/alfombras.html': '/limpieza-alfombras-vigo',
  '/servicios/alfombras': '/limpieza-alfombras-vigo',
  '/servicios/limpieza-de-sofas.html': '/limpieza-sofas-vigo',
  '/servicios/limpieza-de-sofas': '/limpieza-sofas-vigo',
  '/servicios/limpieza-a-domicilio.html': '/limpieza-casas-vigo',
  '/servicios/limpieza-a-domicilio': '/limpieza-casas-vigo',
  '/limpieza-casas-particulares-vigo': '/limpieza-casas-vigo',
  '/servicios/edredones-y-cortinas.html': '/textiles-hogar-vigo',
  '/servicios/edredones-y-cortinas': '/textiles-hogar-vigo',
  '/recogida-a-domicilio.html': '/recogida-a-domicilio',
  '/contacto.html': '/contacto',
  '/blog.html': '/blog',
};

export function resolveCanonicalRoute(rawPath: string): string {
  const withoutQuery = (rawPath || '/').split('?')[0].split('#')[0] || '/';
  const normalized =
    withoutQuery.length > 1 ? withoutQuery.replace(/\/+$/, '') : '/';
  return LEGACY_REDIRECT_MAP[normalized] || normalized;
}

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
