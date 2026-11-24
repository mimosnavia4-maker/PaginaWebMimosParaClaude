/**
 * Pre-generador de archivos HTML estáticos por ruta para ProfesionalHosting (Apache/Plesk) y buscadores de IA (AEO)
 * Consume directamente la fuente única de verdad: src/data/routesSeoData.ts y src/data/mimosData.ts
 * Genera dist/<ruta>/index.html y dist/sitemap.xml.
 */

import fs from 'fs';
import path from 'path';
import { ROUTE_SEO_MAP, RouteMeta } from '../src/data/routesSeoData.ts';
import { getPageSEO } from '../src/utils/seoSchemas.ts';
import { ARTICULOS_BLOG } from '../src/data/blogArticlesFull.ts';
import {
  APARTAMENTOS_TURISTICOS_DATA,
  BLOG_FAQS_MAP,
  LIMPIEZA_PROFESIONAL_DATA,
  SERVICIO_DETALLE_ENRIQUECIDO,
  SERVICIO_ALFOMBRAS_DATA,
  SERVICIO_REPARACION_ALFOMBRAS_DATA,
  SERVICIO_ARREGLOS_DATA,
  SERVICIO_NOVIA_CEREMONIA_DATA,
  SERVICIO_PIELES_DATA,
  SERVICIO_SINIESTROS_FAQS,
  SERVICIO_SOFAS_FAQS,
  SERVICIO_TEXTILES_HOGAR_DATA,
  SERVICIO_EMPRESAS_B2B_DATA,
} from '../src/data/servicePagesData.ts';
import { ZONAS_SEO_LOCAL } from '../src/data/zonasSeoData.ts';
import {
  CONTACT_INFO,
  ETIQUETAS_SERVICIOS_CONFIRMADOS,
  FAQ_PORTADA_SIN_PRECIOS,
  GESTION_INTEGRAL_AREAS,
  PACKS_APARTAMENTOS_BORRADOR,
  REGISTROS_PUNTOS,
  SERVICIOS_MIMOS,
  TIENDAS_PROPIAS,
  PUNTOS_COLABORADORES,
} from '../src/data/mimosData.ts';

function escapeHtml(str: unknown): string {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function buildRootPrerenderContent(routePath: string, meta: RouteMeta): string {
  let specificHtml = '';

  if (meta.ogType === 'article') {
    const articulo = ARTICULOS_BLOG.find((a) => a.url === routePath);
    if (articulo) {
      const seccionesHtml = articulo.secciones
        .map((s) => {
          const parrafosHtml = (s.parrafos || [])
            .map((p) => `<p>${escapeHtml(p)}</p>`)
            .join('');
          const subseccionesHtml =
            s.subsecciones && s.subsecciones.length > 0
              ? `<div class="space-y-2">${s.subsecciones
                  .map(
                    (sub) =>
                      `<div><h3 class="font-bold text-slate-900 mt-2">${escapeHtml(
                        sub.h3
                      )}</h3><p>${escapeHtml(sub.texto)}</p></div>`
                  )
                  .join('')}</div>`
              : '';
          const puntosHtml =
            s.puntosClave && s.puntosClave.length > 0
              ? `<ul class="list-disc pl-5 space-y-1">${s.puntosClave
                  .map((pt) => `<li>${escapeHtml(pt)}</li>`)
                  .join('')}</ul>`
              : '';
          const tablaHtml = s.tabla
            ? `<table><thead><tr>${s.tabla.encabezados
                .map((h) => `<th>${escapeHtml(h)}</th>`)
                .join('')}</tr></thead><tbody>${s.tabla.filas
                .map(
                  (fila) =>
                    `<tr>${fila.map((celda) => `<td>${escapeHtml(celda)}</td>`).join('')}</tr>`
                )
                .join('')}</tbody>${
                s.tabla.pie
                  ? `<tfoot><tr><td colspan="${s.tabla.encabezados.length}">${escapeHtml(
                      s.tabla.pie
                    )}</td></tr></tfoot>`
                  : ''
              }</table>`
            : '';
          const destacadoHtml = s.destacado
            ? `<div><h4>${escapeHtml(s.destacado.titulo)}</h4><p>${escapeHtml(
                s.destacado.texto
              )}</p></div>`
            : '';

          return (
            `<article class="space-y-2">` +
            `<h2 class="text-xl font-bold text-[#002147] dark:text-white mt-4">${escapeHtml(
              s.h2
            )}</h2>` +
            parrafosHtml +
            subseccionesHtml +
            puntosHtml +
            tablaHtml +
            destacadoHtml +
            `</article>`
          );
        })
        .join('');

      const introHtml = Array.isArray(articulo.introduccion)
        ? articulo.introduccion.map((p) => `<p>${escapeHtml(p)}</p>`).join('')
        : articulo.introduccion
        ? `<p>${escapeHtml(articulo.introduccion)}</p>`
        : '';

      const advertenciaHtml = articulo.advertenciaProfesional
        ? `<aside><h3>Recomendación profesional sobre el cuidado de tejidos</h3><p>${escapeHtml(
            articulo.advertenciaProfesional
          )}</p></aside>`
        : '';

      const blogFaqs = BLOG_FAQS_MAP[articulo.slug] || [];
      const blogFaqsHtml =
        blogFaqs.length > 0
          ? `<h2 class="text-xl font-bold text-[#002147] dark:text-white mt-4">Preguntas frecuentes sobre esta guía</h2><dl>` +
            blogFaqs
              .map(
                (f) =>
                  `<dt><strong>${escapeHtml(f.pregunta)}</strong></dt><dd>${escapeHtml(f.respuesta)}</dd>`
              )
              .join('') +
            `</dl>`
          : '';

      const enlacesInternosHtml =
        articulo.enlacesInternos && articulo.enlacesInternos.length > 0
          ? `<h2 class="text-xl font-bold text-[#002147] dark:text-white mt-4">Servicios y guías relacionadas</h2><ul>` +
            articulo.enlacesInternos
              .map(
                (l) =>
                  `<li><a href="${escapeHtml(l.href)}"><strong>${escapeHtml(l.texto)}</strong></a>: ${escapeHtml(l.descripcion)}</li>`
              )
              .join('') +
            `</ul>`
          : '';

      specificHtml =
        `<section class="space-y-4">` +
        introHtml +
        seccionesHtml +
        advertenciaHtml +
        blogFaqsHtml +
        enlacesInternosHtml +
        `</section>`;
    }
  } else if (routePath.startsWith('/zonas/')) {
    const zona = ZONAS_SEO_LOCAL.find((z) => z.url === routePath);
    if (zona) {
      const puntos = REGISTROS_PUNTOS.filter((p) => p.zona_slug === zona.slug);
      const puntosHtml =
        puntos.length > 0
          ? puntos
              .map(
                (p) =>
                  `<article class="border border-slate-200 rounded-xl p-4 space-y-1">` +
                  `<h3 class="font-bold text-lg text-[#002147]">${escapeHtml(p.nombre_mostrado)}</h3>` +
                  `<p><strong>Dirección:</strong> ${escapeHtml(p.direccion)}, ${escapeHtml(p.codigo_postal)} ${escapeHtml(p.localidad)}</p>` +
                  `<p><strong>Horario:</strong> ${escapeHtml(p.horario.resumen)}</p>` +
                  `<p><strong>Teléfono:</strong> ${escapeHtml(p.telefonos_mostrados)}</p>` +
                  `<p><strong>Servicios confirmados:</strong> ${escapeHtml(
                    p.servicios_confirmados.map((s) => ETIQUETAS_SERVICIOS_CONFIRMADOS[s] || s).join(', ')
                  )}</p>` +
                  `</article>`
              )
              .join('')
          : `<div class="space-y-3">` +
            zona.explicacionEspecificaZona.map((p) => `<p>${escapeHtml(p)}</p>`).join('') +
            (zona.opcionesCercanas && zona.opcionesCercanas.length > 0
              ? `<h3>Puntos físicos más cercanos a ${escapeHtml(zona.localidad)}</h3><ul class="list-disc pl-5 space-y-1">` +
                zona.opcionesCercanas
                  .map(
                    (op) =>
                      `<li><a href="${escapeHtml(op.href)}"><strong>${escapeHtml(op.nombre)}</strong></a> (${escapeHtml(
                        op.direccion
                      )}): ${escapeHtml(op.detalle)}</li>`
                  )
                  .join('') +
                `</ul>`
              : '') +
            `</div>`;

      const faqsHtml =
        zona.preguntasFrecuentes && zona.preguntasFrecuentes.length > 0
          ? `<h3 class="text-lg font-bold text-[#002147] mt-4">Preguntas frecuentes en ${escapeHtml(zona.localidad)}</h3><dl class="space-y-2">` +
            zona.preguntasFrecuentes
              .map(
                (f) =>
                  `<dt><strong>${escapeHtml(f.pregunta)}</strong></dt><dd class="text-slate-600 mb-2">${escapeHtml(f.respuesta)}</dd>`
              )
              .join('') +
            `</dl>`
          : '';

      const vigoLimitropheHtml =
        zona.slug === 'vigo'
          ? `<p><strong>Municipios limítrofes sin tienda física:</strong> atendemos mediante recogida y entrega a domicilio en <a href="/zonas/mos">Mos</a> y <a href="/zonas/nigran">Nigrán</a>.</p>`
          : '';

      specificHtml =
        `<section class="space-y-4">` +
        (zona.subtitulo ? `<p>${escapeHtml(zona.subtitulo)}</p>` : '') +
        `<h2 class="text-xl font-bold text-[#002147]">${
          puntos.length > 0
            ? `Puntos de atención y recogida en ${escapeHtml(zona.localidad)}`
            : `Cobertura a domicilio y puntos cercanos en ${escapeHtml(zona.localidad)}`
        }</h2>` +
        puntosHtml +
        vigoLimitropheHtml +
        faqsHtml +
        `</section>`;
    }
  } else if (routePath === '/tienda-mimos-navia-vigo') {
    const punto = TIENDAS_PROPIAS.find((t) => t.id === 'as-teixugueiras');
    if (punto) {
      specificHtml =
        `<section class="space-y-3">` +
        `<h2 class="text-xl font-bold text-[#002147]">Sede Central Tintorería Mimos Navia (Vigo)</h2>` +
        `<p><strong>Dirección:</strong> ${escapeHtml(punto.direccion)}, ${escapeHtml(punto.codigo_postal)} ${escapeHtml(punto.localidad)}</p>` +
        `<p><strong>Horario:</strong> ${escapeHtml(punto.horario.resumen)}</p>` +
        `<p><strong>Teléfono:</strong> ${escapeHtml(punto.telefonos_mostrados)} · WhatsApp Mimos: +34 655 536 844</p>` +
        `<p><strong>Métodos de pago:</strong> Tarjeta bancaria (contactless, Apple Pay, Google Pay) y Efectivo (no se acepta Bizum).</p>` +
        `<p><strong>Aparcamiento:</strong> ${escapeHtml(punto.aparcamiento)}</p>` +
        `<p><strong>Servicios disponibles:</strong> Tintorería profesional, lavandería atendida, planchado profesional, colada familiar (lavar y doblar / planchar), limpieza de alfombras, edredones y mantas, coordinación de recogida a domicilio y recepción para taller propio de costura.</p>` +
        `<h3>Preguntas frecuentes en Tintorería Mimos Navia</h3>` +
        `<dl class="space-y-2">` +
        `<dt><strong>¿Tengo que pedir cita previa para acudir a la tienda de Navia?</strong></dt><dd>No, no necesitas cita previa. Puedes venir libremente de lunes a viernes (09:30–14:00 y 16:00–20:00) y sábados (10:00–13:30).</dd>` +
        `<dt><strong>¿Cómo funciona el servicio de arreglos y costura en la tienda de Navia?</strong></dt><dd>En Navia recepcionamos tus prendas, tomamos nota de todas las especificaciones, las derivamos a nuestros talleres propios in situ (Gregorio Espino y Venezuela) y te las entregamos de vuelta planchadas y terminadas.</dd>` +
        `<dt><strong>¿Se puede aparcar fácilmente cerca de la tienda en Teixugueiras?</strong></dt><dd>Sí, Rúa das Teixugueiras dispone de amplio aparcamiento público en batería y en línea frente a los soportales.</dd>` +
        `<dt><strong>¿Puedo entregar alfombras grandes de lana o seda en la tienda de Navia?</strong></dt><dd>Sí, la sede de Navia es punto central de recepción de alfombras para lavado plano, desinfección y secado controlado.</dd>` +
        `<dt><strong>¿Cómo me avisáis cuando la ropa está lista para recoger?</strong></dt><dd>Te notificamos por WhatsApp o SMS en cuanto tus prendas pasan el control de calidad final.</dd>` +
        `<dt><strong>¿Qué formas de pago tenéis disponibles en el mostrador de Navia?</strong></dt><dd>Aceptamos tarjeta (contactless, móvil, Apple Pay, Google Pay) y efectivo (no se acepta Bizum), siempre con ticket oficial con IVA desglosado.</dd>` +
        `<dt><strong>¿Puedo pedir que me entreguen en mi casa las prendas que dejé en Navia?</strong></dt><dd>Sí, coordinamos reparto a domicilio en Vigo y comarca con nuestra furgoneta propia por WhatsApp.</dd>` +
        `</dl>` +
        `</section>`;
    }
  } else if (routePath === '/tienda-mimos-gregorio-espino-vigo') {
    const punto = TIENDAS_PROPIAS.find((t) => t.id === 'gregorio-espino');
    if (punto) {
      specificHtml =
        `<section class="space-y-3">` +
        `<h2 class="text-xl font-bold text-[#002147]">Tienda propia Tintorería Mimos Gregorio Espino (Vigo)</h2>` +
        `<p><strong>Dirección:</strong> ${escapeHtml(punto.direccion)}, ${escapeHtml(punto.codigo_postal)} ${escapeHtml(punto.localidad)} (esquina con Rúa do Escultor Nogueira)</p>` +
        `<p><strong>Horario:</strong> ${escapeHtml(punto.horario.resumen)}</p>` +
        `<p><strong>Teléfono:</strong> ${escapeHtml(punto.telefonos_mostrados)} · WhatsApp Mimos: +34 655 536 844</p>` +
        `<p><strong>Aparcamiento y carga/descarga:</strong> ${escapeHtml(punto.aparcamiento)}</p>` +
        `<p><strong>Servicios disponibles:</strong> Tintorería profesional, lavandería, planchado profesional, colada familiar, limpieza de alfombras y taller propio de costura y arreglos in situ.</p>` +
        `<h3>Preguntas frecuentes en Mimos Gregorio Espino</h3>` +
        `<dl class="space-y-2">` +
        `<dt><strong>¿Tengo que pedir cita previa para llevar prendas a arreglar o limpiar?</strong></dt><dd>No, no hace falta cita previa en ningún momento. Puedes acudir libremente en nuestro horario de apertura (lunes a viernes de 09:30 a 13:30 y de 16:30 a 20:00, y sábados de 09:30 a 13:00).</dd>` +
        `<dt><strong>¿Se pueden probar las prendas en la tienda para tomar la medida del bajo?</strong></dt><dd>Sí, disponemos de espacio para probarte pantalones, faldas, vestidos o chaquetas y nuestra modista toma la medida exacta in situ.</dd>` +
        `<dt><strong>¿Puedo entregar alfombras grandes viniendo en coche?</strong></dt><dd>Sí, en la bocacalle lateral de Rúa do Escultor Nogueira dispones de zona de carga y descarga a unos 15 metros de la puerta.</dd>` +
        `<dt><strong>¿Disponéis de servicio de arreglos express o urgentes?</strong></dt><dd>Para arreglos sencillos como bajos de pantalón o cremalleras comunes podemos valorar plazo exprés, siempre preguntando primero en taller si es posible según carga de trabajo.</dd>` +
        `<dt><strong>¿Cómo me notificáis cuando las prendas están listas para recoger?</strong></dt><dd>Enviamos aviso personalizado por WhatsApp o SMS en cuanto el encargo queda terminado y revisado.</dd>` +
        `<dt><strong>¿Qué métodos de pago aceptáis en la tienda de Gregorio Espino?</strong></dt><dd>Aceptamos tarjeta contactless (Apple Pay, Google Pay) y efectivo (no se acepta Bizum), siempre con resguardo oficial e IVA desglosado.</dd>` +
        `<dt><strong>Si después no puedo desplazarme a recogerlas, ¿podéis llevármelas a casa?</strong></dt><dd>Sí, puedes coordinar la entrega a domicilio en Vigo con Mimo por WhatsApp.</dd>` +
        `</dl>` +
        `</section>`;
    }
  } else if (routePath === '/tienda-mimos-venezuela-vigo') {
    const punto = TIENDAS_PROPIAS.find((t) => t.id === 'rua-venezuela');
    if (punto) {
      specificHtml =
        `<section class="space-y-3">` +
        `<h2 class="text-xl font-bold text-[#002147]">Tienda propia Tintorería y Costura Mimos Venezuela (Vigo centro)</h2>` +
        `<p><strong>Dirección:</strong> ${escapeHtml(punto.direccion)}, Santiago de Vigo, ${escapeHtml(punto.codigo_postal)} ${escapeHtml(punto.localidad)} (Pontevedra)</p>` +
        `<p><strong>Acceso:</strong> Portal nº 29 señalizado en la acera con cartel azul de Tintorería Arreglos Mimos y placa azul MIMOS junto a la puerta para acceder a la entreplanta.</p>` +
        `<p><strong>Horario:</strong> ${escapeHtml(punto.horario.resumen)} · Domingos y festivos: Cerrado</p>` +
        `<p><strong>Teléfono:</strong> ${escapeHtml(punto.telefonos_mostrados)} · WhatsApp Mimos: +34 655 536 844</p>` +
        `<p><strong>Métodos de pago:</strong> Tarjeta bancaria (contactless) y Efectivo. Importante: en Mimos Venezuela no se acepta Bizum.</p>` +
        `<p><strong>Aparcamiento:</strong> ${escapeHtml(punto.aparcamiento)}</p>` +
        `<p><strong>Servicios disponibles:</strong> Taller propio de costura in situ con probador y máquina industrial, tintorería profesional, lavandería atendida, planchado profesional, colada familiar, edredones, cortinas y recepción de alfombras.</p>` +
        `<h3>Preguntas frecuentes sobre Mimos Venezuela (Rúa de Venezuela, 29)</h3>` +
        `<dl class="space-y-2">` +
        `<dt><strong>¿Dónde está exactamente la tienda y cómo se entra a la entreplanta?</strong></dt><dd>Estamos en Rúa de Venezuela, 29, Entreplanta (Santiago de Vigo, 36203 Vigo), a pocos minutos a pie de El Corte Inglés, Gran Vía y Urzáiz. En la acera verás nuestro cartel azul de Tintorería Arreglos Mimos junto al árbol y, al lado de la puerta del portal, la placa azul oficial de MIMOS que te guía hacia la entreplanta.</dd>` +
        `<dt><strong>¿Cuál es el horario de Mimos Venezuela? ¿Abrís los sábados?</strong></dt><dd>Atendemos de lunes a viernes de 09:30 a 13:30 y de 16:30 a 19:30. Los sábados, domingos y festivos esta tienda permanece cerrada. Si necesitas venir un sábado por la mañana, nuestras tiendas propias de Navia (10:00–13:30) y Gregorio Espino 42 (09:30–13:00) sí abren.</dd>` +
        `<dt><strong>¿Tenéis taller propio de costura y probador en la tienda de Venezuela?</strong></dt><dd>Sí. Contamos con taller propio de costura in situ con máquina industrial y espejo probador para tomar la medida exacta de bajos, estrechar o ensanchar prendas, cambiar cremalleras y ajustar vestidos o pantalones directamente en tienda.</dd>` +
        `<dt><strong>¿Qué métodos de pago aceptáis en Mimos Venezuela? ¿Aceptáis Bizum?</strong></dt><dd>En nuestra tienda de Rúa de Venezuela 29 aceptamos pago con tarjeta bancaria (contactless) y en efectivo. No se acepta Bizum en este establecimiento. Entregamos siempre tu resguardo oficial de depósito.</dd>` +
        `<dt><strong>¿Dónde puedo aparcar si vengo en coche al centro con edredones o alfombras?</strong></dt><dd>Justo enfrente de nuestro portal se encuentra el aparcamiento subterráneo de pago Parking Venezuela (accesos en Rúa de Venezuela 34–36), muy práctico para bajar prendas de abrigo, trajes, edredones o alfombras sin dar vueltas por el centro.</dd>` +
        `<dt><strong>¿Necesito pedir cita previa o puedo pedir entrega a domicilio después?</strong></dt><dd>No hace falta cita previa para entregar o probar prendas en horario de apertura. Y si tras dejar tu encargo en Rúa de Venezuela 29 prefieres recibirlo limpio en tu casa u oficina de Vigo, puedes coordinar la entrega a domicilio con Mimo por WhatsApp.</dd>` +
        `</dl>` +
        `</section>`;
    }
  } else if (routePath === '/punto-mimos-dpasso-vigo') {
    const punto = REGISTROS_PUNTOS.find((p) => p.id === 'punto-vigo-dpasso');
    if (punto) {
      specificHtml =
        `<section class="space-y-3">` +
        `<h2 class="text-xl font-bold text-[#002147]">Punto Colaborador Oficial Tintorería Mimos · D'Passo (Vigo)</h2>` +
        `<p><strong>Dirección:</strong> ${escapeHtml(punto.direccion)}, ${escapeHtml(punto.codigo_postal)} ${escapeHtml(punto.localidad)} (Pontevedra) · entorno As Travesas / Balaídos</p>` +
        `<p><strong>Horario:</strong> ${escapeHtml(punto.horario.resumen)} · Domingos y festivos: Cerrado</p>` +
        `<p><strong>Teléfono:</strong> ${escapeHtml(punto.telefonos_mostrados)} · WhatsApp Mimos: +34 655 536 844</p>` +
        `<p><strong>Aparcamiento y acceso:</strong> ${escapeHtml(punto.aparcamiento)}</p>` +
        `<p><strong>Servicios confirmados:</strong> ${escapeHtml(
          punto.servicios_confirmados.map((s) => ETIQUETAS_SERVICIOS_CONFIRMADOS[s] || s).join(', ')
        )}.</p>` +
        `<p><strong>Nota sobre costura:</strong> D'Passo actúa como punto colaborador oficial de recepción y entrega, sin taller de costura en el local. Para arreglos de ropa, acude a nuestras tiendas propias de Vigo (Navia, Rúa Venezuela o Gregorio Espino).</p>` +
        `<h3>Preguntas frecuentes sobre el punto colaborador D'Passo en Vigo</h3>` +
        `<dl class="space-y-2">` +
        `<dt><strong>¿Cómo funciona la entrega de ropa para Tintorería Mimos en D'Passo?</strong></dt><dd>Llevas tus prendas (trajes, vestidos, abrigos, edredones, alfombras o colada familiar) a D'Passo en ${escapeHtml(punto.direccion)}, Vigo. Allí registran tu encargo con tu resguardo oficial y nuestra furgoneta las traslada a la central de Mimos en Navia para devolverlas listas y protegidas al punto.</dd>` +
        `<dt><strong>¿Cuál es el horario de apertura de D'Passo en Vigo?</strong></dt><dd>Atiende de lunes a viernes en horario partido de 09:30 a 13:30 y de 16:30 a 20:30. Los sábados, domingos y festivos permanece cerrado.</dd>` +
        `<dt><strong>¿Se realizan arreglos de costura o composturas en D'Passo?</strong></dt><dd>No. D'Passo actúa como punto colaborador oficial de recogida y entrega para tintorería, lavandería, planchado, colada familiar, ropa de hogar y alfombras, sin taller de costura en el local. Para arreglos de ropa atendemos en nuestras tiendas propias de Vigo (Navia, Rúa Venezuela y Gregorio Espino).</dd>` +
        `<dt><strong>¿Se pueden entregar edredones nórdicos y alfombras grandes en este punto?</strong></dt><dd>Sí. En D’Passo recibimos edredones sintéticos y de plumón natural, mantas, colchas, cortinas y alfombras de cualquier formato para su tratamiento en nuestra planta de Navia.</dd>` +
        `<dt><strong>¿Los precios son los mismos que en las tiendas propias de Tintorería Mimos?</strong></dt><dd>Sí. Se aplican exactamente las mismas tarifas oficiales de Tintorería Mimos que en nuestras 3 tiendas propias de Vigo, sin recargos por recepción ni transporte.</dd>` +
        `<dt><strong>¿Puedo consultar por WhatsApp antes de llevar la prenda o pedir entrega en casa?</strong></dt><dd>Sí, puedes escribir directamente a Mimo por WhatsApp al 655 536 844 o llamar a D’Passo al 986 23 06 43, y también coordinar entrega posterior a domicilio en Vigo.</dd>` +
        `</dl>` +
        `</section>`;
    }
  } else if (routePath === '/limpieza-alfombras-vigo') {
    const faqsHtml = SERVICIO_ALFOMBRAS_DATA.preguntasFrecuentes
      .map(
        (f) =>
          `<dt><strong>${escapeHtml(f.pregunta)}</strong></dt><dd>${escapeHtml(f.respuesta)}</dd>`
      )
      .join('');
    specificHtml =
      `<section>` +
      `<p>${escapeHtml(SERVICIO_ALFOMBRAS_DATA.subtituloCabecera)}</p>` +
      `<h2>Preguntas frecuentes sobre limpieza de alfombras en Vigo</h2>` +
      `<dl>${faqsHtml}</dl>` +
      `</section>`;
  } else if (routePath === '/reparacion-alfombras-vigo') {
    const especialidadesHtml = SERVICIO_REPARACION_ALFOMBRAS_DATA.especialidades
      .map(
        (e) =>
          `<li><strong>${escapeHtml(e.titulo)}:</strong> ${escapeHtml(e.descripcion)} ${escapeHtml(
            e.criterioRestaurador
          )}</li>`
      )
      .join('');
    const faqsHtml = SERVICIO_REPARACION_ALFOMBRAS_DATA.preguntasFrecuentes
      .map(
        (f) =>
          `<dt><strong>${escapeHtml(f.pregunta)}</strong></dt><dd>${escapeHtml(f.respuesta)}</dd>`
      )
      .join('');
    specificHtml =
      `<section>` +
      `<p>${escapeHtml(SERVICIO_REPARACION_ALFOMBRAS_DATA.subtituloCabecera)}</p>` +
      `<p>${escapeHtml(SERVICIO_REPARACION_ALFOMBRAS_DATA.aclaracionOperativa)}</p>` +
      `<h2>Especialidades de reparación y restauración de alfombras</h2>` +
      `<ul>${especialidadesHtml}</ul>` +
      `<h2>Preguntas frecuentes sobre reparación de alfombras en Vigo</h2>` +
      `<dl>${faqsHtml}</dl>` +
      `</section>`;
  } else if (routePath === '/limpieza-pieles-cuero-vigo') {
    const tiposHtml = SERVICIO_PIELES_DATA.tiposPieles
      .map((t) => `<li><strong>${escapeHtml(t.titulo)}:</strong> ${escapeHtml(t.descripcion)}</li>`)
      .join('');
    const fasesHtml = SERVICIO_PIELES_DATA.fasesProceso
      .map((p) => `<li><strong>${escapeHtml(p.num)}. ${escapeHtml(p.titulo)}:</strong> ${escapeHtml(p.descripcion)}</li>`)
      .join('');
    const faqsHtml = SERVICIO_PIELES_DATA.preguntasFrecuentes
      .map(
        (f) =>
          `<dt><strong>${escapeHtml(f.pregunta)}</strong></dt><dd>${escapeHtml(f.respuesta)}</dd>`
      )
      .join('');
    specificHtml =
      `<section>` +
      `<p>${escapeHtml(SERVICIO_PIELES_DATA.subtituloCabecera)}</p>` +
      `<h2>Tipos de pieles y acabados que tratamos</h2>` +
      `<ul>${tiposHtml}</ul>` +
      `<h2>Protocolo profesional en 5 fases</h2>` +
      `<ol>${fasesHtml}</ol>` +
      `<h2>Preguntas frecuentes sobre limpieza de pieles y cuero en Vigo</h2>` +
      `<dl>${faqsHtml}</dl>` +
      `</section>`;
  } else if (routePath === '/limpieza-vestidos-novia-ceremonia-vigo') {
    const momentosHtml = SERVICIO_NOVIA_CEREMONIA_DATA.momentosUso
      .map(
        (m) =>
          `<li><strong>${escapeHtml(m.titulo)}:</strong> ${escapeHtml(m.casos.join('; '))}.</li>`
      )
      .join('');
    const prendasHtml = SERVICIO_NOVIA_CEREMONIA_DATA.prendasTratadas
      .map((p) => `<li><strong>${escapeHtml(p.titulo)} (${escapeHtml(p.tejidos)}):</strong> ${escapeHtml(p.descripcion)}</li>`)
      .join('');
    const fasesHtml = SERVICIO_NOVIA_CEREMONIA_DATA.fasesProtocolo
      .map((f) => `<li><strong>${escapeHtml(f.num)}. ${escapeHtml(f.titulo)}:</strong> ${escapeHtml(f.descripcion)}</li>`)
      .join('');
    const faqsHtml = SERVICIO_NOVIA_CEREMONIA_DATA.preguntasFrecuentes
      .map(
        (f) =>
          `<dt><strong>${escapeHtml(f.pregunta)}</strong></dt><dd>${escapeHtml(f.respuesta)}</dd>`
      )
      .join('');
    specificHtml =
      `<section>` +
      `<p>${escapeHtml(SERVICIO_NOVIA_CEREMONIA_DATA.subtituloCabecera)}</p>` +
      `<h2>Antes o después de la celebración</h2>` +
      `<ul>${momentosHtml}</ul>` +
      `<h2>Prendas de novia, fiesta, comunión, bautizo y chaqués que tratamos</h2>` +
      `<ul>${prendasHtml}</ul>` +
      `<h2>Protocolo artesanal en 5 fases</h2>` +
      `<ol>${fasesHtml}</ol>` +
      `<h2>Preguntas frecuentes sobre vestidos de ceremonia en Vigo</h2>` +
      `<dl>${faqsHtml}</dl>` +
      `</section>`;
  } else if (routePath === '/textiles-hogar-vigo') {
    const especialidadesHtml = SERVICIO_TEXTILES_HOGAR_DATA.especialidades
      .map(
        (e) =>
          `<li><strong>${escapeHtml(e.titulo)} (${escapeHtml(e.tejidos)}):</strong> ${escapeHtml(
            e.descripcion
          )} ${escapeHtml(e.avisoHonesto)}</li>`
      )
      .join('');
    const faqsHtml = SERVICIO_TEXTILES_HOGAR_DATA.preguntasFrecuentes
      .map(
        (f) =>
          `<dt><strong>${escapeHtml(f.pregunta)}</strong></dt><dd>${escapeHtml(f.respuesta)}</dd>`
      )
      .join('');
    specificHtml =
      `<section>` +
      `<p>${escapeHtml(SERVICIO_TEXTILES_HOGAR_DATA.subtituloCabecera)}</p>` +
      `<p>${escapeHtml(SERVICIO_TEXTILES_HOGAR_DATA.aclaracionServicio)}</p>` +
      `<h2>Edredones, cortinas, estores de tela, mantas y fundas desenfundables</h2>` +
      `<ul>${especialidadesHtml}</ul>` +
      `<h2>Desmontaje y colocación de cortinas a domicilio y costura propia</h2>` +
      `<p>${escapeHtml(
        SERVICIO_TEXTILES_HOGAR_DATA.ventajasDiferenciales.retiradaCortinas.descripcion
      )}</p>` +
      `<p>${escapeHtml(
        SERVICIO_TEXTILES_HOGAR_DATA.ventajasDiferenciales.costuraHogar.descripcion
      )}</p>` +
      `<h2>Preguntas frecuentes sobre textiles del hogar en Vigo</h2>` +
      `<dl>${faqsHtml}</dl>` +
      `</section>`;
  } else if (routePath === '/limpieza-sofas-vigo') {
    const faqsHtml = SERVICIO_SOFAS_FAQS.map(
      (f) =>
        `<dt><strong>${escapeHtml(f.pregunta)}</strong></dt><dd>${escapeHtml(f.respuesta)}</dd>`
    ).join('');
    specificHtml =
      `<section>` +
      `<p>Servicio 100 % a domicilio en Vigo y área de influencia para limpieza de sofás de 2, 3 o más plazas, chaiselongue, rinconeras, sillones, sillas tapizadas, cabeceros y colchones (no realizamos tapicerías de coches ni trasladamos muebles fuera de casa, salvo fundas desenfundables aptas en planta de Vigo). Método mediante lectura de etiqueta (W, S, WS, X), aspirado profundo en seco, pretratamiento e inyección-extracción controlada o baja humedad en código S, con secado natural al aire sin vapor seco, ozono, enzimáticos ni ventiladores.</p>` +
      `<h2>Higienización de colchones y canapés a domicilio en Vigo (humedad 77–85 % y ácaros)</h2>` +
      `<p>Aspirado profundo en seco, pretratamiento localizado y extracción controlada de baja humedad en caras accesibles sin saturar la espuma viscoelástica ni usar vaporeta, con secado natural al aire con ventilación cruzada continua.</p>` +
      `<h2>Cómo solicitar presupuesto por foto de tu sofá o colchón con Mimo</h2>` +
      `<ul>` +
      `<li>Foto frontal completa del sofá, colchón o piezas, fotos de cerca de manchas y foto del tejido junto con la etiqueta W, S, WS o X si la conserva.</li>` +
      `<li>Número de plazas, medida del colchón (90, 135, 150, 180 cm) o piezas, origen aproximado de manchas (y si se aplicó lejía, amoníaco, bicarbonato/vinagre o vaporeta previo) y localidad o código postal.</li>` +
      `</ul>` +
      `<h2>Preguntas frecuentes sobre limpieza de sofás, tapicerías y colchones</h2>` +
      `<dl>${faqsHtml}</dl>` +
      `</section>`;
  } else if (routePath === '/arreglos-de-ropa-vigo') {
    const catalogoHtml = SERVICIO_ARREGLOS_DATA.catalogoCompleto18Puntos
      .map((item) => `<li>${escapeHtml(item)}</li>`)
      .join('');
    const faqsHtml = SERVICIO_ARREGLOS_DATA.preguntasFrecuentes
      .map(
        (f) =>
          `<dt><strong>${escapeHtml(f.pregunta)}</strong></dt><dd>${escapeHtml(f.respuesta)}</dd>`
      )
      .join('');
    specificHtml =
      `<section>` +
      `<p>${escapeHtml(SERVICIO_ARREGLOS_DATA.subtituloCabecera)}</p>` +
      `<h2>Las 18 especialidades de costura y arreglos de ropa</h2>` +
      `<ol>${catalogoHtml}</ol>` +
      `<h2>Preguntas frecuentes sobre costura y arreglos de ropa</h2>` +
      `<dl>${faqsHtml}</dl>` +
      `</section>`;
  } else if (routePath === '/limpieza-profesional-vigo') {
    const garantiasHtml = LIMPIEZA_PROFESIONAL_DATA.garantiasOperativas
      .map((g) => `<li><strong>${escapeHtml(g.titulo)}:</strong> ${escapeHtml(g.detalle)}</li>`)
      .join('');
    const areasHtml = LIMPIEZA_PROFESIONAL_DATA.areasLimpieza
      .map(
        (area) =>
          `<article>` +
          `<h3>${escapeHtml(area.titulo)}</h3>` +
          `<p>${escapeHtml(area.descripcion)}</p>` +
          `<ul>${area.incluye.map((i) => `<li>${escapeHtml(i)}</li>`).join('')}</ul>` +
          `</article>`
      )
      .join('');
    const faqsHtml = LIMPIEZA_PROFESIONAL_DATA.preguntasFrecuentes
      .map(
        (f) =>
          `<dt><strong>${escapeHtml(f.pregunta)}</strong></dt><dd>${escapeHtml(f.respuesta)}</dd>`
      )
      .join('');
    specificHtml =
      `<section>` +
      `<p>${escapeHtml(LIMPIEZA_PROFESIONAL_DATA.subtitulo)}</p>` +
      `<p><strong>Alcance del servicio:</strong> ${escapeHtml(LIMPIEZA_PROFESIONAL_DATA.alcanceClaro)}</p>` +
      `<h2>Garantías legales y operativas para comunidades (LPH) y empresas</h2>` +
      `<ul>${garantiasHtml}</ul>` +
      `<h2>Áreas de limpieza profesional periódica en Vigo</h2>` +
      areasHtml +
      `<h2>Preguntas frecuentes sobre limpieza profesional en Vigo</h2>` +
      `<dl>${faqsHtml}</dl>` +
      `<h3>Divisiones especializadas con página propia</h3>` +
      `<ul>` +
      `<li><a href="/servicios-empresas">Pack combinado limpieza + lavandería para empresas, peluquerías y clínicas en Vigo</a></li>` +
      `<li><a href="/limpieza-apartamentos-turisticos-vigo">Limpieza y lavandería para apartamentos turísticos (VUT) en Vigo</a></li>` +
      `<li><a href="/limpieza-sofas-vigo">Limpieza de sofás, tapicerías y colchones a domicilio en Vigo</a></li>` +
      `<li><a href="/limpieza-incendios-siniestros-vigo">Recuperación textil tras incendios, humo e inundaciones</a></li>` +
      `</ul>` +
      `</section>`;
  } else if (routePath === '/limpieza-apartamentos-turisticos-vigo') {
    const clavesHtml = APARTAMENTOS_TURISTICOS_DATA.clavesDiferenciales
      .map((c) => `<li><strong>${escapeHtml(c.titulo)}:</strong> ${escapeHtml(c.detalle)}</li>`)
      .join('');
    const packsHtml = PACKS_APARTAMENTOS_BORRADOR.map(
      (p) =>
        `<article>` +
        `<h3>${escapeHtml(p.nombre)}</h3>` +
        `<p>${escapeHtml(p.descripcion)}</p>` +
        `<ul>${p.incluye.map((i) => `<li>${escapeHtml(i)}</li>`).join('')}</ul>` +
        `</article>`
    ).join('');
    const integralHtml = GESTION_INTEGRAL_AREAS.map(
      (a) =>
        `<article>` +
        `<h4>${escapeHtml(a.numero)}. ${escapeHtml(a.titulo)}</h4>` +
        `<ul>${a.puntos.map((pt) => `<li>${escapeHtml(pt)}</li>`).join('')}</ul>` +
        `</article>`
    ).join('');
    const faqsHtml = APARTAMENTOS_TURISTICOS_DATA.preguntasFrecuentes
      .map(
        (f) =>
          `<dt><strong>${escapeHtml(f.pregunta)}</strong></dt><dd>${escapeHtml(f.respuesta)}</dd>`
      )
      .join('');
    specificHtml =
      `<section>` +
      `<p>${escapeHtml(APARTAMENTOS_TURISTICOS_DATA.subtitulo)}</p>` +
      `<h2>Claves operativas para alojamientos turísticos (VUT) en Vigo</h2>` +
      `<ul>${clavesHtml}</ul>` +
      `<h2>Modalidades de colaboración para anfitriones y gestoras</h2>` +
      packsHtml +
      `<h3>Coordinación integral en 4 áreas</h3>` +
      integralHtml +
      `<h2>Preguntas frecuentes sobre apartamentos turísticos en Vigo</h2>` +
      `<dl>${faqsHtml}</dl>` +
      `<h3>Guías recomendadas para anfitriones VUT</h3>` +
      `<ul>` +
      `<li><a href="/blog/protocolo-rotacion-apartamentos-turisticos-vigo">Checklist de rotación en apartamentos turísticos en Vigo (11:00–15:00)</a></li>` +
      `<li><a href="/blog/como-preparar-apartamento-turistico-entre-huespedes">Cómo organizar limpieza y textiles VUT según Decreto 12/2017 (REAT)</a></li>` +
      `</ul>` +
      `</section>`;
  } else if (routePath === '/se-punto-colaborador') {
    specificHtml =
      `<section>` +
      `<h2>Sé Punto Colaborador de Tintorería Mimos</h2>` +
      `<p>Suma un servicio de tintorería profesional a tu comercio de proximidad (modistería, mercería, arreglos, boutique o calzado) en Vigo, Val Miñor, O Morrazo o comarcas limítrofes.</p>` +
      `<h3>Claves para tu comercio</h3>` +
      `<ul>` +
      `<li>Operativa ágil en mostrador en menos de 30 segundos con el software TintoSilver.</li>` +
      `<li>Recogida y entrega puntual en tu puerta con furgoneta propia de Mimos.</li>` +
      `<li>Tratamiento profesional en taller propio central en Vigo con acabado al vapor Veit.</li>` +
      `<li>Comisión periódica directa por prenda y aumento de tráfico de clientes a tu tienda.</li>` +
      `</ul>` +
      `</section>`;
  } else if (routePath === '/servicios-empresas') {
    const sectoresHtml = SERVICIO_EMPRESAS_B2B_DATA.sectores
      .map(
        (sec) =>
          `<li><h3>${escapeHtml(sec.titulo)} (${escapeHtml(sec.etiqueta)})</h3><p>${escapeHtml(
            sec.descripcion
          )}</p><ul>${sec.items.map((it) => `<li>${escapeHtml(it)}</li>`).join('')}</ul></li>`
      )
      .join('');
    const procesoHtml = SERVICIO_EMPRESAS_B2B_DATA.procesoPlanta
      .map(
        (p) =>
          `<li><strong>${escapeHtml(p.numero)}. ${escapeHtml(p.titulo)}:</strong> ${escapeHtml(
            p.descripcion
          )}</li>`
      )
      .join('');
    const exclusividadHtml = SERVICIO_EMPRESAS_B2B_DATA.exclusividadPuntos
      .map(
        (ex) =>
          `<li><h3>${escapeHtml(ex.titulo)}</h3><p>${escapeHtml(ex.descripcion)}</p></li>`
      )
      .join('');
    const faqsHtml = SERVICIO_EMPRESAS_B2B_DATA.preguntasFrecuentes
      .map(
        (f) =>
          `<dt><strong>${escapeHtml(f.pregunta)}</strong></dt><dd>${escapeHtml(f.respuesta)}</dd>`
      )
      .join('');
    specificHtml =
      `<section>` +
      `<p>${escapeHtml(SERVICIO_EMPRESAS_B2B_DATA.subtitulo)}</p>` +
      `<h2>${escapeHtml(SERVICIO_EMPRESAS_B2B_DATA.sectoresTitulo)}</h2>` +
      `<ul>${sectoresHtml}</ul>` +
      `<h2>${escapeHtml(SERVICIO_EMPRESAS_B2B_DATA.procesoPlantaTitulo)}</h2>` +
      `<ol>${procesoHtml}</ol>` +
      `<h2>${escapeHtml(SERVICIO_EMPRESAS_B2B_DATA.exclusividadTitulo)}</h2>` +
      `<ul>${exclusividadHtml}</ul>` +
      `<h2>${escapeHtml(SERVICIO_EMPRESAS_B2B_DATA.ventajasTitulo)}</h2>` +
      `<ul>${SERVICIO_EMPRESAS_B2B_DATA.ventajas
        .map((v) => `<li><strong>${escapeHtml(v.titulo)}:</strong> ${escapeHtml(v.descripcion)}</li>`)
        .join('')}</ul>` +
      `<h2>Preguntas frecuentes sobre nuestro servicio de lavandería para empresas en Vigo</h2>` +
      `<dl>${faqsHtml}</dl>` +
      `</section>`;
  } else if (routePath === '/limpieza-incendios-siniestros-vigo') {
    const faqsHtml = SERVICIO_SINIESTROS_FAQS.map(
      (f) =>
        `<dt><strong>${escapeHtml(f.pregunta)}</strong></dt><dd>${escapeHtml(f.respuesta)}</dd>`
    ).join('');
    specificHtml =
      `<section>` +
      `<p>Servicio técnico exclusivamente textil en Vigo (${escapeHtml(CONTACT_INFO.legalName)}, CIF ${escapeHtml(CONTACT_INFO.cif)}) para recuperar ropa, abrigos, trajes, cortinas, edredones y alfombras afectados por incendio, humo, hollín o inundaciones. No realizamos limpieza estructural de vivienda (paredes, techos ni escombros).</p>` +
      `<h2>Claves operativas y documentación para aseguradoras (Ley 50/1980)</h2>` +
      `<ul>` +
      `<li><strong>Ventana crítica 24–48 h:</strong> aspiración en seco previa, neutralización de hollín ácido (PVC) o grasas y secado técnico frente a la humedad de Vigo.</li>` +
      `<li><strong>Prueba de viabilidad previa y lote prioritario:</strong> test puntual en piezas críticas y adelanto de vestuario de trabajo o colegio dentro de un ciclo habitual de 1 a 3 semanas.</li>` +
      `<li><strong>Documentación pericial:</strong> plantilla interactiva de pre-inventario (Art. 38 LCS, 5 días) con exportación PDF/Excel (.xlsx), carta modelo (Arts. 17 y 18 LCS), certificado de pérdida total y factura oficial con CIF.</li>` +
      `</ul>` +
      `<h2>Preguntas frecuentes sobre recuperación textil tras siniestros en Vigo</h2>` +
      `<dl>${faqsHtml}</dl>` +
      `</section>`;
  } else if (routePath === '/contacto') {
    const tiendasContactoHtml = TIENDAS_PROPIAS.map(
      (t) =>
        `<li><strong>${escapeHtml(t.nombre_mostrado)}:</strong> ${escapeHtml(t.direccion)}, ${escapeHtml(
          t.codigo_postal
        )} ${escapeHtml(t.localidad)} · Teléfono: <a href="tel:+34${escapeHtml(
          t.telefono
        )}">${escapeHtml(t.telefonos_mostrados)}</a> · Horario: ${escapeHtml(
          t.horario.resumen
        )}</li>`
    ).join('');
    specificHtml =
      `<section class="space-y-3">` +
      `<h2 class="text-xl font-bold text-[#002147]">Canales directos de atención y presupuestos</h2>` +
      `<ul>` +
      `<li><strong>Teléfono Sede Central Navia:</strong> <a href="tel:+34986125141">+34 986 12 51 41</a></li>` +
      `<li><strong>WhatsApp Mimo (presupuestos, recogida a domicilio y consultas):</strong> <a href="https://wa.me/34655536844">+34 655 536 844</a></li>` +
      `<li><strong>Correo electrónico:</strong> <a href="mailto:${escapeHtml(
        CONTACT_INFO.email
      )}">${escapeHtml(CONTACT_INFO.email)}</a></li>` +
      `<li><strong>Métodos de pago en tienda:</strong> Tarjeta bancaria (contactless) y efectivo. No se acepta Bizum.</li>` +
      `<li><strong>Recogida y entrega a domicilio:</strong> Vigo, Redondela, Gondomar, Ponteareas, O Porriño, Mos y Nigrán.</li>` +
      `</ul>` +
      `<h3>Teléfonos y horarios de las 3 tiendas propias en Vigo</h3>` +
      `<ul>${tiendasContactoHtml}</ul>` +
      `</section>`;
  } else if (routePath === '/puntos-mimos') {
    const propiasHtml = TIENDAS_PROPIAS.map(
      (t) =>
        `<article class="border border-slate-200 rounded-xl p-4 space-y-1">` +
        `<h3>${escapeHtml(t.nombre_mostrado)} (Tienda propia)</h3>` +
        `<p><strong>Dirección:</strong> ${escapeHtml(t.direccion)}, ${escapeHtml(
          t.codigo_postal
        )} ${escapeHtml(t.localidad)}</p>` +
        `<p><strong>Horario:</strong> ${escapeHtml(t.horario.resumen)}</p>` +
        `<p><strong>Teléfono:</strong> ${escapeHtml(t.telefonos_mostrados)}</p>` +
        `</article>`
    ).join('');
    const colaboradoresHtml = PUNTOS_COLABORADORES.map(
      (p) =>
        `<article class="border border-slate-200 rounded-xl p-4 space-y-1">` +
        `<h3>${escapeHtml(p.nombre_mostrado)} — ${escapeHtml(p.localidad)} (Punto colaborador)</h3>` +
        `<p><strong>Dirección:</strong> ${escapeHtml(p.direccion)}, ${escapeHtml(
          p.codigo_postal
        )} ${escapeHtml(p.localidad)}</p>` +
        `<p><strong>Horario:</strong> ${escapeHtml(p.horario.resumen)}</p>` +
        `<p><strong>Teléfono:</strong> ${escapeHtml(p.telefonos_mostrados)}</p>` +
        `<p><strong>Servicios confirmados:</strong> ${escapeHtml(
          p.servicios_confirmados.map((s) => ETIQUETAS_SERVICIOS_CONFIRMADOS[s] || s).join(', ')
        )}</p>` +
        `</article>`
    ).join('');
    specificHtml =
      `<section class="space-y-4">` +
      `<h2 class="text-xl font-bold text-[#002147]">Las 3 tiendas propias de Tintorería Mimos en Vigo</h2>` +
      propiasHtml +
      `<h2 class="text-xl font-bold text-[#002147]">Los 5 puntos colaboradores oficiales en Vigo y comarca</h2>` +
      colaboradoresHtml +
      `</section>`;
  } else if (routePath === '/') {
    const faqsHtml = FAQ_PORTADA_SIN_PRECIOS.map(
      (f) =>
        `<dt><strong>${escapeHtml(f.pregunta)}</strong></dt><dd>${escapeHtml(f.respuesta)}</dd>`
    ).join('');
    specificHtml =
      `<section>` +
      `<h2>Preguntas frecuentes de nuestros clientes</h2>` +
      `<dl>${faqsHtml}</dl>` +
      `</section>`;
  } else {
    const servicio = SERVICIOS_MIMOS.find((s) => s.url === routePath);
    if (servicio) {
      const detalle = SERVICIO_DETALLE_ENRIQUECIDO[servicio.id];
      const modalidadesHtml = detalle
        ? `<h2>${escapeHtml(detalle.modalidadesTitulo)}</h2><ul>` +
          detalle.modalidades
            .map(
              (m) =>
                `<li><strong>${escapeHtml(m.titulo)}:</strong> ${escapeHtml(m.descripcion)}</li>`
            )
            .join('') +
          `</ul>`
        : '';
      const procesoHtml = detalle
        ? `<h2>${escapeHtml(detalle.procesoTitulo)}</h2><ol>` +
          detalle.procesoPasos
            .map(
              (p) =>
                `<li><strong>${escapeHtml(p.titulo)}:</strong> ${escapeHtml(p.descripcion)}</li>`
            )
            .join('') +
          `</ol>`
        : '';
      const comparativaHtml = detalle?.comparativaTabla
        ? `<h2>${escapeHtml(detalle.comparativaTabla.titulo)}</h2>` +
          `<p>${escapeHtml(detalle.comparativaTabla.subtitulo)}</p>` +
          `<table><thead><tr><th>Criterio técnico y operativo</th>` +
          detalle.comparativaTabla.columnas.map((col) => `<th>${escapeHtml(col)}</th>`).join('') +
          `</tr></thead><tbody>` +
          detalle.comparativaTabla.filas
            .map(
              (f) =>
                `<tr><th>${escapeHtml(f.criterio)}</th>${f.valores
                  .map((v) => `<td>${escapeHtml(v)}</td>`)
                  .join('')}</tr>`
            )
            .join('') +
          `</tbody></table>`
        : '';
      const queTratamosHtml =
        servicio.queTratamos && servicio.queTratamos.length > 0
          ? `<h3>Prendas y textiles que tratamos</h3><ul>` +
            servicio.queTratamos.map((item) => `<li>${escapeHtml(item)}</li>`).join('') +
            `</ul>`
          : '';
      const comoSeContrataHtml =
        servicio.comoSeContrata && servicio.comoSeContrata.length > 0
          ? `<h3>Cómo solicitar el servicio</h3><ul>` +
            servicio.comoSeContrata.map((item) => `<li>${escapeHtml(item)}</li>`).join('') +
            `</ul>`
          : '';
      const faqsHtml =
        detalle && detalle.preguntasFrecuentes.length > 0
          ? `<h2>Preguntas frecuentes sobre ${escapeHtml(servicio.titulo)}</h2><dl>` +
            detalle.preguntasFrecuentes
              .map(
                (f) =>
                  `<dt><strong>${escapeHtml(f.pregunta)}</strong></dt><dd>${escapeHtml(f.respuesta)}</dd>`
              )
              .join('') +
            `</dl>`
          : '';
      const enlacesEspecializadosHtml =
        detalle?.enlacesEspecializados && detalle.enlacesEspecializados.length > 0
          ? `<h2>Guías y servicios relacionados</h2><ul>` +
            detalle.enlacesEspecializados
              .map(
                (l) =>
                  `<li><a href="${escapeHtml(l.href)}"><strong>${escapeHtml(l.titulo)}</strong></a>: ${escapeHtml(l.descripcion)}</li>`
              )
              .join('') +
            `</ul>`
          : '';
      const recogidaZonasHtml =
        servicio.id === 'recogida-a-domicilio'
          ? `<h2>Cobertura por municipio y puntos físicos cercanos</h2>` +
            `<p>Consulta condiciones de ruta en <a href="/zonas/vigo">Vigo</a>, <a href="/zonas/mos">Mos (solo recogida a domicilio)</a>, <a href="/zonas/nigran">Nigrán (solo recogida a domicilio)</a>, <a href="/zonas/o-porrino">O Porriño</a>, <a href="/zonas/gondomar">Gondomar</a>, <a href="/zonas/redondela">Redondela</a> y <a href="/zonas/ponteareas">Ponteareas</a>.</p>`
          : '';
      specificHtml =
        `<section>` +
        `<p>${escapeHtml(servicio.descripcion)}</p>` +
        (detalle?.aclaracionHonesta ? `<p>${escapeHtml(detalle.aclaracionHonesta)}</p>` : '') +
        recogidaZonasHtml +
        modalidadesHtml +
        procesoHtml +
        comparativaHtml +
        queTratamosHtml +
        comoSeContrataHtml +
        enlacesEspecializadosHtml +
        faqsHtml +
        `</section>`;
    }
  }

  const navHtml =
    `<nav aria-label="Navegación principal">` +
    `<h2>Servicios y secciones principales</h2>` +
    `<ul>` +
    `<li><a href="/">Inicio</a></li>` +
    `<li><a href="/tintoreria-vigo">Tintorería profesional</a></li>` +
    `<li><a href="/limpieza-vestidos-novia-ceremonia-vigo">Vestidos de novia, fiesta y ceremonia</a></li>` +
    `<li><a href="/lavanderia-vigo">Lavandería</a></li>` +
    `<li><a href="/planchado-vigo">Solo planchado</a></li>` +
    `<li><a href="/colada-familiar-vigo">Colada familiar</a></li>` +
    `<li><a href="/textiles-hogar-vigo">Textiles del hogar (edredones, cortinas y estores)</a></li>` +
    `<li><a href="/limpieza-sofas-vigo">Limpieza de sofás y tapicerías a domicilio</a></li>` +
    `<li><a href="/limpieza-alfombras-vigo">Limpieza de alfombras a domicilio</a></li>` +
    `<li><a href="/reparacion-alfombras-vigo">Reparación y restauración de alfombras</a></li>` +
    `<li><a href="/limpieza-pieles-cuero-vigo">Pieles y cuero</a></li>` +
    `<li><a href="/arreglos-de-ropa-vigo">Costura y arreglos de ropa</a></li>` +
    `<li><a href="/recogida-a-domicilio">Recogida a domicilio</a></li>` +
    `<li><a href="/limpieza-profesional-vigo">Limpieza profesional</a></li>` +
    `<li><a href="/limpieza-apartamentos-turisticos-vigo">Apartamentos turísticos</a></li>` +
    `<li><a href="/servicios-empresas">Lavandería para empresas</a></li>` +
    `<li><a href="/limpieza-incendios-siniestros-vigo">Recuperación textil tras incendios, humo e inundaciones</a></li>` +
    `<li><a href="/puntos-mimos">Tiendas y Puntos Mimos</a></li>` +
    `<li><a href="/tienda-mimos-navia-vigo">Tienda propia Mimos Navia (Sede Central)</a></li>` +
    `<li><a href="/tienda-mimos-gregorio-espino-vigo">Tienda propia Mimos Gregorio Espino (Vigo)</a></li>` +
    `<li><a href="/tienda-mimos-venezuela-vigo">Tienda propia Mimos Venezuela (Vigo centro)</a></li>` +
    `<li><a href="/punto-mimos-dpasso-vigo">Punto colaborador D'Passo (Vigo)</a></li>` +
    `<li><a href="/zonas/vigo">Vigo (3 tiendas propias)</a></li>` +
    `<li><a href="/zonas/redondela">Redondela</a></li>` +
    `<li><a href="/zonas/gondomar">Gondomar</a></li>` +
    `<li><a href="/zonas/ponteareas">Ponteareas</a></li>` +
    `<li><a href="/zonas/o-porrino">O Porriño</a></li>` +
    `<li><a href="/zonas/mos">Mos (recogida a domicilio)</a></li>` +
    `<li><a href="/zonas/nigran">Nigrán (recogida a domicilio)</a></li>` +
    `<li><a href="/contacto">Contacto y horarios</a></li>` +
    `<li><a href="/blog">Blog y consejos</a></li>` +
    `</ul>` +
    `</nav>`;

  const tiendasHtml = TIENDAS_PROPIAS.map(
    (t) =>
      `<li><strong>${escapeHtml(t.nombre_mostrado)}:</strong> ${escapeHtml(t.direccion)} (${escapeHtml(
        t.localidad
      )}) · Tel. ${escapeHtml(t.telefonos_mostrados)} · Horario: ${escapeHtml(t.horario.resumen)}</li>`
  ).join('');

  const footerHtml =
    `<footer>` +
    `<h2>Contacto oficial y tiendas propias</h2>` +
    `<p><strong>${escapeHtml(CONTACT_INFO.companyName)}</strong> · Sede central: ${escapeHtml(
      CONTACT_INFO.streetAddress
    )}, ${escapeHtml(CONTACT_INFO.postalCode)} ${escapeHtml(CONTACT_INFO.locality)} (${escapeHtml(
      CONTACT_INFO.region
    )}) · Teléfono: <a href="tel:+34986125141">+34 986 12 51 41</a> · WhatsApp: <a href="https://wa.me/34655536844">+34 655 536 844</a> · Email: <a href="mailto:${escapeHtml(
      CONTACT_INFO.email
    )}">${escapeHtml(CONTACT_INFO.email)}</a>.</p>` +
    `<h3>Tiendas propias en Vigo:</h3>` +
    `<ul>${tiendasHtml}</ul>` +
    `</footer>`;

  return (
    `<main id="main-content" class="max-w-4xl mx-auto px-4 sm:px-6 py-10 bg-white text-slate-800 space-y-6">` +
    `<h1 class="text-2xl sm:text-3xl font-extrabold text-[#002147]">${escapeHtml(meta.h1)}</h1>` +
    `<p class="text-slate-600 leading-relaxed">${escapeHtml(meta.description)}</p>` +
    specificHtml +
    navHtml +
    footerHtml +
    `</main>`
  );
}

function renderHtmlForRoute(baseHtml: string, routePath: string, meta: RouteMeta): string {
  const seo = getPageSEO(routePath);
  const routeSchemaTag = `<script type="application/ld+json" id="schema-dynamic-page">${JSON.stringify(
    seo.jsonLd
  )}</script>`;

  const aeoRootContent = buildRootPrerenderContent(routePath, meta);

  return baseHtml
    .replace(/<script\s+type="application\/ld\+json"\s+id="schema-localbusiness">[\s\S]*?<\/script>\s*/, '')
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${meta.title}</title>`)
    .replace(
      /<meta\s+name="description"\s+content="[^"]*"\s*\/>/,
      `<meta name="description" content="${meta.description}" />`
    )
    .replace(
      /<meta\s+name="robots"\s+id="meta-robots"\s+content="[^"]*"\s*\/>/,
      `<meta name="robots" id="meta-robots" content="${meta.robots}" />`
    )
    .replace(
      /<link\s+rel="canonical"\s+id="canonical-link"\s+href="[^"]*"\s*\/>/,
      `<link rel="canonical" id="canonical-link" href="${meta.canonical}" />`
    )
    .replace(
      /<meta\s+property="og:type"\s+content="[^"]*"\s+id="og-type"\s*\/>/,
      `<meta property="og:type" content="${meta.ogType}" id="og-type" />`
    )
    .replace(
      /<meta\s+property="og:title"\s+id="og-title"\s+content="[^"]*"\s*\/>/,
      `<meta property="og:title" id="og-title" content="${meta.title}" />`
    )
    .replace(
      /<meta\s+property="og:description"\s+id="og-description"\s+content="[^"]*"\s*\/>/,
      `<meta property="og:description" id="og-description" content="${meta.description}" />`
    )
    .replace(
      /<meta\s+property="og:url"\s+id="og-url"\s+content="[^"]*"\s*\/>/,
      `<meta property="og:url" id="og-url" content="${meta.canonical}" />`
    )
    .replace(
      /<meta\s+name="twitter:title"\s+id="twitter-title"\s+content="[^"]*"\s*\/>/,
      `<meta name="twitter:title" id="twitter-title" content="${meta.title}" />`
    )
    .replace(
      /<meta\s+name="twitter:description"\s+id="twitter-description"\s+content="[^"]*"\s*\/>/,
      `<meta name="twitter:description" id="twitter-description" content="${meta.description}" />`
    )
    .replace(
      /<meta\s+property="og:image"\s+content="[^"]*"\s*\/>/,
      `<meta property="og:image" content="${meta.ogImage || 'https://www.tintoreriamimos.es/osito-mimos.jpg'}" />`
    )
    .replace(
      /<meta\s+name="twitter:image"\s+content="[^"]*"\s*\/>/,
      `<meta name="twitter:image" content="${meta.ogImage || 'https://www.tintoreriamimos.es/osito-mimos.jpg'}" />`
    )
    .replace(
      '</head>',
      `${
        routePath === '/'
          ? '    <link rel="preload" as="image" href="/osito-mimos.webp" imagesrcset="/osito-mimos-640w.webp 640w, /osito-mimos.webp 1024w" imagesizes="(max-width: 1023px) 100vw, 42vw" fetchpriority="high" />\n'
          : ''
      }    ${routeSchemaTag}\n  </head>`
    )
    .replace('<div id="root"></div>', `<div id="root">${aeoRootContent}</div>`);
}

function render404Html(baseHtml: string): string {
  const notFoundRootBlock =
    `<main id="main-content" class="max-w-4xl mx-auto px-4 sm:px-6 py-10 text-slate-800 space-y-6">` +
    `<h1 class="text-2xl sm:text-3xl font-extrabold text-[#002147]">Página no encontrada</h1>` +
    `<p class="text-slate-600 leading-relaxed">La dirección que has introducido no existe o ha sido trasladada a una nueva sección. Tintorería Mimos ofrece servicios profesionales de tintorería, lavandería y limpieza de alfombras en Vigo y comarca con recogida a domicilio y 3 tiendas propias.</p>` +
    `<nav aria-label="Servicios recomendados">` +
    `<ul class="list-disc pl-5 space-y-1">` +
    `<li><a href="/">Portada principal de Tintorería Mimos</a></li>` +
    `<li><a href="/limpieza-sofas-vigo">Limpieza de sofás y tapicerías a domicilio</a></li>` +
    `<li><a href="/limpieza-alfombras-vigo">Limpieza de alfombras con recogida a domicilio</a></li>` +
    `<li><a href="/reparacion-alfombras-vigo">Reparación y restauración de alfombras</a></li>` +
    `<li><a href="/tintoreria-vigo">Tintorería profesional en Vigo</a></li>` +
    `<li><a href="/lavanderia-vigo">Lavandería atendida y ropa de diario</a></li>` +
    `<li><a href="/arreglos-de-ropa-vigo">Costura y arreglos de ropa</a></li>` +
    `<li><a href="/limpieza-incendios-siniestros-vigo">Recuperación textil tras incendios y siniestros</a></li>` +
    `<li><a href="/contacto">Contacto, teléfonos y horarios</a></li>` +
    `</ul>` +
    `</nav>` +
    `</main>`;

  return baseHtml
    .replace(/<script\s+type="application\/ld\+json"\s+id="schema-localbusiness">[\s\S]*?<\/script>\s*/, '')
    .replace(/<title>[\s\S]*?<\/title>/, `<title>Página no encontrada | Tintorería Mimos</title>`)
    .replace(
      /<meta\s+name="description"\s+content="[^"]*"\s*\/>/,
      `<meta name="description" content="La página que busca no existe o ha sido movida. Tintorería y lavandería profesional en Vigo con recogida a domicilio y 3 tiendas propias." />`
    )
    .replace(
      /<meta\s+name="robots"\s+id="meta-robots"\s+content="[^"]*"\s*\/>/,
      `<meta name="robots" id="meta-robots" content="noindex, nofollow" />`
    )
    .replace(
      /<link\s+rel="canonical"\s+id="canonical-link"\s+href="[^"]*"\s*\/>\s*/,
      ''
    )
    .replace(
      /<meta\s+property="og:title"\s+id="og-title"\s+content="[^"]*"\s*\/>/,
      `<meta property="og:title" id="og-title" content="Página no encontrada | Tintorería Mimos" />`
    )
    .replace(
      /<meta\s+property="og:description"\s+id="og-description"\s+content="[^"]*"\s*\/>/,
      `<meta property="og:description" id="og-description" content="La página solicitada no existe o ha sido movida." />`
    )
    .replace(
      /<meta\s+property="og:url"\s+id="og-url"\s+content="[^"]*"\s*\/>\s*/,
      ''
    )
    .replace(
      /<meta\s+name="twitter:title"\s+id="twitter-title"\s+content="[^"]*"\s*\/>/,
      `<meta name="twitter:title" id="twitter-title" content="Página no encontrada | Tintorería Mimos" />`
    )
    .replace(
      /<meta\s+name="twitter:description"\s+id="twitter-description"\s+content="[^"]*"\s*\/>/,
      `<meta name="twitter:description" id="twitter-description" content="La página solicitada no existe o ha sido movida." />`
    )
    .replace('<div id="root"></div>', `<div id="root">${notFoundRootBlock}</div>`);
}

function getBlogArticleLastmod(path: string): string | null {
  // Únicamente los artículos individuales del blog disponen de fechaISO real verificable
  if (path.startsWith('/blog/') && path !== '/blog') {
    const articulo = ARTICULOS_BLOG.find((a) => a.url === path);
    if (articulo?.fechaISO) return articulo.fechaISO;
  }
  return null;
}

function generateSitemapXml(routes: Record<string, RouteMeta>): string {
  const urls = Object.entries(routes)
    .filter(([_, meta]) => meta.robots === 'index, follow')
    .map(([path, meta]) => {
      const lastmod = getBlogArticleLastmod(path);
      if (lastmod) {
        return `  <url>\n    <loc>${meta.canonical}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`;
      }
      return `  <url>\n    <loc>${meta.canonical}</loc>\n  </url>`;
    });

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`;
}

const distDir = path.resolve(process.cwd(), 'dist');
const baseIndexPath = path.join(distDir, 'index.html');

if (fs.existsSync(baseIndexPath)) {
  const distAiStudioDir = path.join(distDir, 'assets', 'aistudio');
  if (fs.existsSync(distAiStudioDir)) {
    fs.rmSync(distAiStudioDir, { recursive: true, force: true });
  }
  const baseHtml = fs.readFileSync(baseIndexPath, 'utf-8');

  for (const [routePath, meta] of Object.entries(ROUTE_SEO_MAP)) {
    const rendered = renderHtmlForRoute(baseHtml, routePath, meta);
    if (routePath === '/') {
      fs.writeFileSync(baseIndexPath, rendered, 'utf-8');
    } else {
      const targetDir = path.join(distDir, routePath.replace(/^\//, ''));
      fs.mkdirSync(targetDir, { recursive: true });
      fs.writeFileSync(path.join(targetDir, 'index.html'), rendered, 'utf-8');
    }
  }

  // Generar dist/404.html (excluido de sitemap.xml y fuera de las 34 rutas válidas)
  const notFoundHtml = render404Html(baseHtml);
  fs.writeFileSync(path.join(distDir, '404.html'), notFoundHtml, 'utf-8');

  // Generar dist/sitemap.xml y sincronizar public/sitemap.xml (solo contiene las rutas válidas indexables)
  const sitemapXml = generateSitemapXml(ROUTE_SEO_MAP);
  fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemapXml, 'utf-8');
  try {
    fs.writeFileSync(path.resolve(process.cwd(), 'public', 'sitemap.xml'), sitemapXml, 'utf-8');
  } catch {
    // ignorar si public no es escribible
  }

  console.log(`[AEO Prerender] Generados ${Object.keys(ROUTE_SEO_MAP).length} archivos HTML estáticos + dist/404.html y sitemap.xml.`);
}
