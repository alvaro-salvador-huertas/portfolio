# Movimiento del portfolio

Revisión del 20 de noviembre de 2026. La referencia visual es [selinameusel.com](https://selinameusel.com/). Se recorrieron su portada, proyectos y experiencia en Chrome y se consultó su [repositorio público en el commit d15551d](https://github.com/meuselina/My-personal-website-and-CV/tree/d15551d498aae46098d44514316fca09e4c639c4).

## Qué se observó y cómo se aplica

| Referencia | Aplicación en este portfolio |
| --- | --- |
| Portada fijada mientras la imagen se reduce hacia una tarjeta central. | El nombre se contrae hasta una tarjeta al 72 % durante un tramo de 80 svh de scroll adicional. La descripción y el enlace conservan tamaño y área de interacción. |
| Nombre grande al fondo con líneas que se desplazan en sentidos opuestos. | Dos líneas de nombre en contorno aparecen y se desplazan con el avance de la portada. Están excluidas del árbol de accesibilidad. |
| Capas que responden al puntero. | Desplazamiento leve del nombre con puntero fino y una inclinación pequeña de las capturas reales al recorrerlas. |
| Entradas de contenido con desplazamiento, opacidad y desfase. | Encabezados y proyectos entran una vez. En las fichas, texto y visual llegan desde direcciones opuestas con desfases cortos. |
| Una sección fija convierte avance vertical en un recorrido de tarjetas horizontal. | Las cinco capacidades forman el recorrido horizontal en escritorio cuando caben completas en la altura disponible. |
| Navegación flotante y progreso de lectura. | Cabecera fija y barra de progreso calculada sobre el documento. Los enlaces siguen siendo anclas nativas. |

La referencia usa una fotografía y una firma dibujada. Aquí la composición se construye con el nombre y los recursos que ya pertenecían al portfolio. Las ilustraciones y fotografías de Selina permanecen en su sitio.

El movimiento dominante es la portada. Las apariciones secundarias duran entre 900 y 1000 ms, con una curva de desaceleración marcada y desfases de aproximadamente 100 ms. La entrada inicial del nombre dura 1100 ms. El control de scroll sigue siendo nativo.

## Investigación técnica y skills

El [HTML de la referencia](https://github.com/meuselina/My-personal-website-and-CV/blob/d15551d498aae46098d44514316fca09e4c639c4/Selina%20Portfolio.dc.html) utiliza JavaScript para calcular el avance de la portada y `IntersectionObserver` para revelar contenido. También incluye React y Three.js para otros componentes. El efecto de portada analizado se calcula directamente sobre el DOM.

Se revisaron estas guías públicas para la implementación y su evaluación:

- [Frontend Design de Anthropic](https://github.com/anthropics/skills/tree/main/skills/frontend-design), para composición, jerarquía tipográfica y elección de una interacción dominante.
- [ScrollTrigger de GreenSock](https://github.com/greensock/gsap-skills/tree/main/skills/gsap-scrolltrigger), como referencia para pinning, scrub, cálculo de recorridos y adaptación por media queries.
- [Web Interface Guidelines de Vercel](https://github.com/vercel-labs/web-interface-guidelines), para accesibilidad, foco, movimiento reducido, navegación y rendimiento.

La implementación propia reutiliza CSS, Web Animations API e `IntersectionObserver`, ya compatibles con la arquitectura estática del proyecto. `position: sticky` fija las dos escenas y un frame solicitado tras cada entrada actualiza sus transformaciones. El avance se recalcula después de cambios de tamaño, fuentes e idioma. La escena de capacidades mide el alto disponible antes de activarse.

Los archivos nuevos de comportamiento son `motion.css` y la actualización de `motion.js`. Las guías se consultaron como documentación. El sitio se sirve con sus recursos locales y conserva la tipografía Manrope.

## Accesibilidad y comportamiento alternativo

La portada fijada y las capacidades horizontales se activan a partir de 1000 px de ancho y 720 px de alto. Si las tarjetas y las notas no caben completas bajo la cabecera, capacidades conserva su lista vertical. Tableta, móvil y ventanas bajas mantienen el recorrido vertical.

El contenedor horizontal recibe foco y admite Izquierda, Derecha, Inicio y Fin. Tab permite continuar a contacto. El desplazamiento de tarjetas utiliza la misma posición de scroll que el recorrido vertical.

`prefers-reduced-motion` devuelve el documento a la presentación estática, tanto al cargar como al cambiar la preferencia. La impresión utiliza también esa presentación. Escape cancela las entradas en curso. El foco revela inmediatamente cualquier contenido pendiente y evita iniciar una entrada sobre el elemento enfocado.

El HTML contiene el contenido completo antes de ejecutar JavaScript. La inserción de contenedores es progresiva y se revierte visualmente al desactivar el movimiento. Los textos y destinos ES/EN proceden del traductor existente.

## Comprobaciones

Se revisó la portada, su estado contraído y el recorrido horizontal en una ventana real de Chrome de 1363 × 936 px CSS. Se comprobó que el botón principal conserva 52 px de alto durante la contracción y que la descripción conserva su tamaño.

Una página de verificación externa al repositorio carga marcos de 390 × 844, 768 × 1024, 1440 × 1000 y 1440 × 650 px CSS. Se comprobaron ES/EN y los enlaces de casos técnicos en esos tamaños, cuatro fichas y cinco capacidades, con ausencia de desbordamiento horizontal del documento. El modo sin JavaScript conserva el contenido inglés y los enlaces.

Se comprobó la preferencia reducida mediante un fixture de `matchMedia`, incluida su activación y desactivación en caliente. La restauración conserva un único contenedor de portada, recorrido y progreso. Este fixture comprueba la respuesta del código a la preferencia; no sustituye una prueba de ajustes del sistema en un dispositivo físico.

También se revisaron el foco visible del recorrido, Inicio/Fin y la salida con Tab. Sintaxis de JavaScript, integridad del contenido HTML original, recursos locales y `git diff --check` comprobados. No se observaron errores propios de `motion.js` en la consola consultada.

Las verificaciones móviles corresponden a marcos de navegador. Quedan pendientes Safari, Firefox, dispositivos físicos y lectores de pantalla.

