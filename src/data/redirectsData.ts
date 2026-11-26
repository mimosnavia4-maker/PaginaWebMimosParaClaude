/**
 * FUENTE ÚNICA DE VERDAD: REDIRECCIONES CANÓNICAS (301 / SPA)
 * Consumida por:
 * - src/utils/seo.ts (enrutado SPA cliente)
 * - src/utils/seoSchemas.ts (SEO / Schema / Prerender)
 * - server.ts (redirecciones HTTP 301 en servidor Express)
 * Sincronizada con public/.htaccess y deploy/plesk-nginx-directives.conf.
 */

export const LEGACY_REDIRECT_MAP: Record<string, string> = {
  // Subvenciones y empleo
  '/feder.html': '/feder',
  '/programa-bono-energia-peme-2025-in417z.html': '/programa-bono-energia-peme-2025-in417z',
  '/empleo-unete-a-nosotros.html': '/empleo-unete-a-nosotros',
  '/empleo': '/empleo-unete-a-nosotros',
  '/unete-a-nosotros': '/empleo-unete-a-nosotros',

  // Alfombras y pieles
  '/servicios/alfombras-pieles': '/limpieza-alfombras-vigo',
  '/alfombras-vigo': '/limpieza-alfombras-vigo',
  '/servicios/limpieza-de-alfombras.html': '/limpieza-alfombras-vigo',
  '/servicios/limpieza-de-alfombras': '/limpieza-alfombras-vigo',
  '/servicios/alfombras.html': '/limpieza-alfombras-vigo',
  '/servicios/alfombras': '/limpieza-alfombras-vigo',
  '/servicios/reparacion-de-alfombras.html': '/reparacion-alfombras-vigo',
  '/servicios/reparacion-de-alfombras': '/reparacion-alfombras-vigo',
  '/servicios/limpieza-de-pieles-y-cuero.html': '/limpieza-pieles-cuero-vigo',
  '/servicios/limpieza-de-pieles-y-cuero': '/limpieza-pieles-cuero-vigo',
  '/servicios/pieles.html': '/limpieza-pieles-cuero-vigo',
  '/servicios/pieles': '/limpieza-pieles-cuero-vigo',
  '/pieles-y-cuero-vigo': '/limpieza-pieles-cuero-vigo',

  // Costura y arreglos
  '/costura-y-arreglos': '/arreglos-de-ropa-vigo',
  '/servicios/costura-arreglos': '/arreglos-de-ropa-vigo',
  '/costura-arreglos-vigo': '/arreglos-de-ropa-vigo',
  '/arreglos-ropa-vigo': '/arreglos-de-ropa-vigo',
  '/servicios/costura.html': '/arreglos-de-ropa-vigo',
  '/servicios/costura': '/arreglos-de-ropa-vigo',

  // Servicios históricos Joomla
  '/servicios/tintoreria.html': '/tintoreria-vigo',
  '/servicios/tintoreria': '/tintoreria-vigo',
  '/servicios/tenido-de-prendas.html': '/tintoreria-vigo',
  '/servicios/tenido-de-prendas': '/tintoreria-vigo',
  '/servicios/lavanderia.html': '/lavanderia-vigo',
  '/servicios/lavanderia': '/lavanderia-vigo',
  '/servicios/planchado.html': '/planchado-vigo',
  '/servicios/planchado': '/planchado-vigo',
  '/servicios/colada-familiar.html': '/colada-familiar-vigo',
  '/servicios/colada-familiar': '/colada-familiar-vigo',
  '/tarifa-duende.html': '/colada-familiar-vigo',
  '/tarifa-duende': '/colada-familiar-vigo',
  '/tarifa-duende-coladas.html': '/colada-familiar-vigo',
  '/tarifa-duende-coladas': '/colada-familiar-vigo',
  '/servicios/textiles-del-hogar.html': '/textiles-hogar-vigo',
  '/servicios/textiles-del-hogar': '/textiles-hogar-vigo',
  '/servicios/edredones-y-cortinas.html': '/textiles-hogar-vigo',
  '/servicios/edredones-y-cortinas': '/textiles-hogar-vigo',
  '/edredones-mimos-vigo': '/textiles-hogar-vigo',
  '/servicios/limpieza-de-sofas.html': '/limpieza-sofas-vigo',
  '/servicios/limpieza-de-sofas': '/limpieza-sofas-vigo',
  '/servicios/limpieza-a-domicilio.html': '/limpieza-casas-vigo',
  '/servicios/limpieza-a-domicilio': '/limpieza-casas-vigo',
  '/limpieza-casas-particulares-vigo': '/limpieza-casas-vigo',

  // Siniestros
  '/siniestros-vigo': '/limpieza-incendios-siniestros-vigo',
  '/limpieza-incendios-vigo': '/limpieza-incendios-siniestros-vigo',
  '/recuperacion-textil-siniestros': '/limpieza-incendios-siniestros-vigo',

  // Tiendas y puntos colaboradores
  '/tienda/navia': '/tienda-mimos-navia-vigo',
  '/tienda-navia': '/tienda-mimos-navia-vigo',
  '/central-navia': '/tienda-mimos-navia-vigo',
  '/tienda/gregorio-espino': '/tienda-mimos-gregorio-espino-vigo',
  '/tienda-gregorio-espino': '/tienda-mimos-gregorio-espino-vigo',
  '/tienda/venezuela': '/tienda-mimos-venezuela-vigo',
  '/tienda-venezuela': '/tienda-mimos-venezuela-vigo',
  '/punto-telas-mas-porrino': '/zonas/o-porrino',
  '/punto/telas-mas': '/zonas/o-porrino',
  '/ficha/telas-mas': '/zonas/o-porrino',
  '/punto-puntadas-no-aire-gondomar': '/zonas/gondomar',
  '/punto/puntadas-no-aire': '/zonas/gondomar',
  '/ficha/puntadas-no-aire': '/zonas/gondomar',
  '/punto-dpasso-vigo': '/punto-mimos-dpasso-vigo',
  '/punto/dpasso': '/punto-mimos-dpasso-vigo',
  '/ficha/dpasso': '/punto-mimos-dpasso-vigo',
  '/se-punto-de-recogida.html': '/se-punto-colaborador',
  '/se-punto-de-recogida': '/se-punto-colaborador',
  '/punto-colaborador': '/se-punto-colaborador',
  '/franquicia-wash-in-town.html': '/se-punto-colaborador',
  '/franquicia-wash-in-town': '/se-punto-colaborador',
  '/galeria.html': '/puntos-mimos',
  '/galeria': '/puntos-mimos',

  // Blog y páginas generales
  '/blog/9-blog/26-la-colada-en-casa.html': '/blog/la-colada-en-casa',
  '/blog/9-blog/26-la-colada-en-casa': '/blog/la-colada-en-casa',
  '/blog/9-blog/22-montar-tu-propia-tintoreria-lavanderia.html':
    '/blog/montar-tu-propia-tintoreria-lavanderia',
  '/blog/9-blog/22-montar-tu-propia-tintoreria-lavanderia':
    '/blog/montar-tu-propia-tintoreria-lavanderia',
  '/blog.html': '/blog',
  '/recogida-a-domicilio.html': '/recogida-a-domicilio',
  '/contacto.html': '/contacto',
};

export function resolveCanonicalRoute(rawPath: string): string {
  const withoutQuery = (rawPath || '/').split('?')[0].split('#')[0] || '/';
  const normalized =
    withoutQuery.length > 1 ? withoutQuery.replace(/\/+$/, '') : '/';
  return LEGACY_REDIRECT_MAP[normalized] || normalized;
}
