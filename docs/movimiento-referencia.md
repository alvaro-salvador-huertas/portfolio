# Movimiento del portfolio

Revisión del 20 de noviembre de 2026. La referencia visual es [selinameusel.com](https://selinameusel.com/). Se recorrieron su portada, proyectos y experiencia en Chrome y se consultó su [repositorio público en el commit d15551d](https://github.com/meuselina/My-personal-website-and-CV/tree/d15551d498aae46098d44514316fca09e4c639c4).

## Qué se observó y cómo se aplica

| Referencia | Aplicación en este portfolio |
| --- | --- |
| Portada fijada mientras la imagen se reduce hacia una tarjeta central. | El nombre se contrae hasta una tarjeta al 72 % durante un tramo de 80 svh de scroll adicional. La descripción y el enlace conservan tamaño y área de interacción. |
| Nombre grande al fondo con líneas que se desplazan en sentidos opuestos. | Dos líneas de nombre en contorno aparecen y se desplazan con el avance de la portada. Están excluidas del árbol de accesibilidad. |
| Capas que responden al puntero. | Desplazamiento leve del nombre con puntero fino y una inclinación pequeña de las capturas reales al recorrerlas. |
| Entradas de contenido con desplazamiento, opacidad y desfase. | Los encabezados y los iconos de capacidades entran una vez. En proyectos, estado, resumen, tecnologías y enlaces se revelan por separado; visuales, paneles y conexiones tienen su propia secuencia. |
| Una sección fija convierte avance vertical en un recorrido de tarjetas horizontal. | Las cinco capacidades forman un recorrido horizontal: dos tarjetas completas en escritorio, una escena centrada y selección de la capacidad activa. En móvil se deslizan con scroll nativo. |
| Navegación flotante y progreso de lectura. | Cabecera fija, progreso de documento e índice de proyectos con lectura por ficha. Los enlaces siguen siendo anclas nativas. |

La referencia usa una fotografía y una firma dibujada. Aquí la composición se construye con el nombre y los recursos que ya pertenecían al portfolio. Las ilustraciones y fotografías de Selina permanecen en su sitio.

El movimiento dominante es la portada. Las entradas utilizan una curva de desaceleración marcada, duraciones de 700 a 1100 ms y desfases de 75 a 100 ms. La entrada inicial del nombre dura 1100 ms. El control de scroll sigue siendo nativo.

## Investigación técnica y skills

El [HTML de la referencia](https://github.com/meuselina/My-personal-website-and-CV/blob/d15551d498aae46098d44514316fca09e4c639c4/Selina%20Portfolio.dc.html) utiliza JavaScript para calcular el avance de la portada y `IntersectionObserver` para revelar contenido. También incluye React y Three.js para otros componentes. El efecto de portada analizado se calcula directamente sobre el DOM.

Se revisaron estas guías públicas para la implementación y su evaluación:

- [Frontend Design de Anthropic](https://github.com/anthropics/skills/tree/main/skills/frontend-design), para composición, jerarquía tipográfica y elección de una interacción dominante.
- [ScrollTrigger de GreenSock](https://github.com/greensock/gsap-skills/tree/main/skills/gsap-scrolltrigger), como referencia para pinning, scrub, cálculo de recorridos y adaptación por media queries.
- [Web Interface Guidelines de Vercel](https://github.com/vercel-labs/web-interface-guidelines), para accesibilidad, foco, movimiento reducido, navegación y rendimiento.

La implementación propia reutiliza CSS, Web Animations API e `IntersectionObserver`, ya compatibles con la arquitectura estática del proyecto. `position: sticky` fija la portada, la escena de capacidades, el índice de proyectos y las figuras que caben completas bajo ambas barras. Un frame solicitado tras cada entrada actualiza el progreso y las transformaciones, sin un bucle continuo. El avance se recalcula después de cambios de tamaño, fuentes e idioma; los proyectos también se observan con `ResizeObserver`.

Los archivos nuevos de comportamiento son `motion.css` y la actualización de `motion.js`. Las guías se consultaron como documentación. El sitio se sirve con sus recursos locales y conserva la tipografía Manrope.

## Accesibilidad y comportamiento alternativo

La portada fijada se activa a partir de 1000 px de ancho y 720 px de alto. El índice de proyectos acompaña el scroll a partir de 1000 px de ancho; en móvil permanece en el flujo y distribuye sus enlaces en dos columnas. Cada enlace lleva al artículo correspondiente, le entrega foco y actualiza `aria-current="location"` según la lectura. Tab continúa por los enlaces del proyecto. El cálculo de destino reserva espacio para cabecera e índice sin sumar dos veces el margen de las anclas.

Las figuras solo se fijan a partir de 1180 px si su altura completa cabe bajo la navegación. Capturas y diagramas tienen un desplazamiento independiente de hasta 12 px; el texto y los enlaces de cada ficha mantienen sus áreas de interacción estables. Las conexiones SVG se dibujan una vez con su longitud medida. Las demostraciones conservan su carácter ilustrativo y sus notas de procedencia.

Capacidades se fija desde 1000 px de ancho y 720 px de alto únicamente si la escena completa cabe bajo la cabecera, con 40 px de margen adicional. Las tarjetas comparten ancho y altura; se muestran dos completas en escritorio. El recorrido horizontal se mide con el ancho de scroll del track menos su ancho visible. Se reserva un tramo inicial de 96 px, un avance de 1,15 veces el recorrido y una lectura final de 120 px. Los extremos quedan alineados y la sección se libera al terminar.

Cinco controles de 44 × 44 px permiten ir a cada capacidad y reflejan el estado con `aria-pressed`; sus nombres proceden de los títulos traducidos y se actualizan sin esperar al siguiente frame. El contenedor admite Izquierda, Derecha, Inicio y Fin. En móvil, tableta y ventanas bajas usa overflow horizontal y snap nativos; los controles actúan sobre ese scroll. AWS e idiomas aparecen después de la escena, fuera del tramo fijo.

La capacidad activa cambia de fondo y los iconos originales aparecen como marcas decorativas, excluidas de accesibilidad. Con movimiento reducido, sin JavaScript o al imprimir, las cinco capacidades se muestran en una lista vertical completa.

`prefers-reduced-motion` devuelve el documento a la presentación estática, tanto al cargar como al cambiar la preferencia. La impresión utiliza también esa presentación. Escape cancela las entradas en curso. El foco cancela inmediatamente las entradas en curso y evita iniciar una entrada sobre el elemento enfocado. El contenido no depende de un estado de opacidad cero mientras espera al observador.

El HTML contiene el contenido completo antes de ejecutar JavaScript. La inserción de contenedores es progresiva y se revierte visualmente al desactivar el movimiento. Los textos y destinos ES/EN proceden del traductor existente.

## Comprobaciones

Se revisó la portada, su estado contraído, los saltos del índice de proyectos y ambos extremos del recorrido de capacidades en una ventana real de Chrome de 1363 × 936 px CSS. Se comprobó que el botón principal conserva 52 px de alto durante la contracción y que la descripción conserva su tamaño.

Una página de verificación externa al repositorio carga marcos de 390 × 844, 768 × 1024, 1024 × 768, 1440 × 1000 y 1440 × 650 px CSS. Se comprobaron ES/EN y los enlaces de casos técnicos en esos tamaños, cuatro fichas y cinco capacidades, con ausencia de desbordamiento horizontal del documento. El modo sin JavaScript conserva el contenido inglés y los enlaces.

Se comprobó la preferencia reducida mediante un fixture de `matchMedia`, incluida su activación y desactivación en caliente. La restauración conserva un único contenedor de portada, un índice, cuatro contenedores de arte y una escena de capacidades. Se comprobó la selección del último elemento en móvil y el encuadre completo de la última tarjeta. Este fixture comprueba la respuesta del código a la preferencia; no sustituye una prueba de ajustes del sistema en un dispositivo físico.

También se revisaron la activación del índice con Enter, el foco del artículo y el acceso a sus enlaces con Tab. Un documento de verificación externo instrumenta Web Animations API para comprobar que se inician las secuencias de texto, las cuatro figuras, los paneles y las conexiones SVG. Sintaxis de JavaScript, integridad del contenido HTML original, recursos locales y `git diff --check` comprobados. No se observaron errores propios de `motion.js` en la consola consultada.

Las verificaciones móviles corresponden a marcos de navegador. Quedan pendientes Safari, Firefox, dispositivos físicos y lectores de pantalla.
