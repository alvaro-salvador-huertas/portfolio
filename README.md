# Portfolio de Álvaro Salvador Huertas

Portfolio en español de España e inglés: estudios, proyectos de software y exploración de agentes de IA. HTML, CSS y JavaScript, sin dependencias de animación ni compilación. Manrope se sirve localmente con su licencia SIL Open Font License.

## Vista local

Desde esta carpeta:

```bash
python3 -m http.server 8000 --bind 127.0.0.1
```

Visita <http://localhost:8000> y detén el servidor con `Ctrl+C`. También puedes abrir `index.html` directamente.

## Revisión visual y de movimiento — 28 de octubre de 2026

La versión actual conserva literalmente los textos profesionales, las 78 entradas del diccionario ES/EN y todos los enlaces. CNAME, publicación estática, Manrope y sus licencias, iconos y diagramas de proyectos se mantienen. No se modifica Data Crime Scene ni se incorporan proyectos nuevos.

- **Portada:** azul tinta `#173449`, texto claro, acento verde grisáceo `#B9D6C2` y Manrope local. Se ha retirado el croquis conceptual de la primera propuesta, con sus etiquetas y control de repetición. El nombre ocupa el ancho de la composición; presentación y enlace forman una segunda banda en escritorio y se apilan en móvil. La altura es intrínseca en tableta y móvil.
- **Ritmo:** los encabezados de sección se alinean con sus separadores y tienen una escala más contenida, reduciendo el espacio entre título y contenido.
- **Capacidades:** las cinco capacidades comparten 22 px, peso 650 e interlineado 1,4. Título y descripción se distribuyen en columnas sobre escritorio y se apilan según el espacio disponible, sin alturas fijas. Formación e idiomas quedan como información secundaria.
- **Proyectos:** los artículos permanecen en el flujo del documento. El párrafo existente sobre el problema del orquestador precede al resumen de construcción; evidencia y límites preceden al diagrama en el orden de lectura. Los enlaces, afirmaciones, ejemplos y traducciones no se reescriben.
- **Movimiento:** una única entrada con Web Animations API desplaza suavemente el título y la banda inferior 10 y 6 px, durante 620 y 440 ms respectivamente. El contenido está siempre visible, sin cambios de opacidad ni máscaras. Hover y foco se resuelven en CSS. No hay animaciones de secciones ni control del scroll.

### Dependencias y degradación

No se carga GSAP ni Anime.js. Los archivos GSAP añadidos para el croquis se han retirado; el bundle histórico de Anime.js y su licencia se conservan sin cargarlo. No hay CDN, gestores de paquetes ni paso de compilación en producción.

La entrada no comienza con `prefers-reduced-motion`, una pestaña oculta, un ancla directa o una posición de scroll restaurada. Escape, foco, cambio de idioma, cambio de preferencia, salida de página e impresión la cancelan. Al finalizar o cancelar se retiran sus listeners con `AbortController`; no se reinicia al volver a una página restaurada. Sin Web Animations API el contenido queda estático. Sin JavaScript, el contenido completo continúa disponible en inglés y el selector de idioma permanece oculto.

### Validación

Se comprueban ES/EN a 390 × 844, 768 × 1024 y 1440 × 900: traducciones, desbordamiento, navegación, persistencia de idioma, foco visible y teclado. Se verifica movimiento reducido, texto ampliado al 200 % de la raíz, JavaScript desactivado y anclas directas. `node --check` de ambos scripts y `git diff --check` pasan. El repositorio no contiene un runner de tests ni un paso de compilación.

La revisión anterior de enlaces encontró siete destinos GitHub con HTTP 200 y LinkedIn con HTTP 999 para el cliente automatizado; los enlaces no han cambiado. `mailto:` se conserva, sin enviar mensajes.

Carga local sin compresión, con contexto nuevo y favicon incluido: **11 peticiones y 87.491 bytes de cuerpo**. La propuesta anterior con croquis solicitaba 12 peticiones y 170.241 bytes; la versión inicial del encargo, 12 peticiones y 229.735 bytes. Se verifican finalización, Escape, foco y cambio a movimiento reducido: en los cuatro casos quedan cero animaciones y cero listeners del efecto en `document`/`window`.

Pruebas con Chrome de escritorio y viewports emulados: no sustituyen una prueba en móvil físico, Safari o Firefox. Las medidas de recursos locales sin compresión comparan bytes y peticiones; no demuestran mejoras de FPS, LCP o rendimiento en una red real.

Las secciones que siguen son el registro histórico previo. Sus descripciones de Anime.js, ventanas, paletas y animaciones no describen la implementación actual.

## Diseño y contenido

Se conservan la portada, la navegación por anclas y el contacto. Los proyectos son ventanas opacas inspiradas en macOS: barra gris, nombre y número, tres círculos decorativos sin interacción, borde fino, radio de 12 px y sombra. Desde 1200 px, el orquestador separa presentación/enlaces, esquema y evidencia en tres columnas; a menor ancho se redistribuyen sin ocultar contenido. Se mantienen Manrope, blanco roto `#FAF9F6`, carbón `#292724` y terracota `#984D3B`.

«Con qué construyo» / “What I build with” es un panel de herramientas. C++ presenta la base académica en Ingeniería Informática; Python, su uso en los dos proyectos. MySQL, Oracle SQL Developer (herramienta), Linux y Git/GitHub ocupan grupos secundarios. AWS figura como formación introductoria en curso. Se mantienen los idiomas y se añade un texto de enfoque sobre resolver problemas, iniciativa personal y colaboración, sin atribuir experiencia profesional ni certificaciones. Los cinco iconos son SVG oficiales locales de **Tabler Icons 3.34.1**, MIT: [procedencia, licencia e integridad](assets/vendor/tabler-icons/README.md).
Los proyectos destacados son **code-review-orchestrator** y **git-docs-agent**, en ese orden. Se retira carrera-tech del HTML, de ambos diccionarios y de los estilos exclusivos de su esquema. Su repositorio no se modifica. Se conservan C++, Python, bases de datos, herramientas, idiomas y formación AWS, así como CNAME, contactos y publicación.

## Evidencia del orquestador

Actualización del **17 de octubre de 2026**, contrastada en lectura con `main` de `../code-review-orchestrator`, commit [`a49c15ad3d31ef2dc39c176a922bea747cb61297`](https://github.com/alvaro-salvador-huertas/code-review-orchestrator/commit/a49c15ad3d31ef2dc39c176a922bea747cb61297). Se consultaron el [README](https://github.com/alvaro-salvador-huertas/code-review-orchestrator/blob/a49c15ad3d31ef2dc39c176a922bea747cb61297/README.md), la [guía de funcionamiento](https://github.com/alvaro-salvador-huertas/code-review-orchestrator/blob/a49c15ad3d31ef2dc39c176a922bea747cb61297/docs/funcionamiento.md) y los documentos de la tarea JSON indicados abajo. Sus referencias a una incorporación local describen etapas anteriores; el hito ya está integrado en ese `main`.

La ficha presenta el controlador Python, sus límites de ejecución y registros consultables, y la exportación JSON del inspector para consumir resultados desde otras herramientas. ES, EN y el respaldo HTML comparten el mismo alcance.

| Evidencia publicada | Alcance que se muestra |
| --- | --- |
| [Caso real: inspector JSON](https://github.com/alvaro-salvador-huertas/code-review-orchestrator/blob/a49c15ad3d31ef2dc39c176a922bea747cb61297/evals/tareas_reales/inspect_json/README.md) y [revisión](https://github.com/alvaro-salvador-huertas/code-review-orchestrator/blob/a49c15ad3d31ef2dc39c176a922bea747cb61297/evals/tareas_reales/inspect_json/revision.md) | Funcionalidad incorporada tras desarrollo con un agente, revisión y correcciones asistidas bajo dirección humana. No acredita una implementación completamente autónoma ni un ciclo automático de corrección. |
| [GitHub Actions del commit integrado](https://github.com/alvaro-salvador-huertas/code-review-orchestrator/actions/runs/39062974165) | Ejecución completada con éxito sobre el commit indicado y 238 pruebas automatizadas superadas, comprobadas en su registro. Los agentes son simulados; esta suite es evidencia distinta de las evaluaciones reales del modelo. |
| [Revisor, 16 de octubre](https://github.com/alvaro-salvador-huertas/code-review-orchestrator/blob/a49c15ad3d31ef2dc39c176a922bea747cb61297/evals/revisor/resultados-2026-10-16.md) y [multicaso, 15 de octubre](https://github.com/alvaro-salvador-huertas/code-review-orchestrator/blob/a49c15ad3d31ef2dc39c176a922bea747cb61297/evals/resultados-multicaso-2026-10-15.md) | Evaluaciones anteriores con el modelo real, accesibles desde el bloque de evidencia. Los informes conservan los resultados y límites de cada experimento. |

El esquema animado se rotula como **flujo ilustrativo de los ejercicios de benchmark**. Su presupuesto de hasta dos intentos no se atribuye a la tarea JSON ni representa una ejecución registrada. La limitación visible resume que las evaluaciones realizadas no establecen fiabilidad general. Los enlaces de la ficha llevan al repositorio, al caso JSON en `main`, a CI y a los informes anteriores; los enlaces documentales de esta tabla fijan la revisión consultada.

Esta actualización del portfolio **no ejecuta agentes, candidatos ni pruebas del orquestador**; resume la evidencia publicada, sin afirmar acceso a los registros privados de `runs/`.

### Comprobaciones del contenido — 17 de octubre de 2026

Verificación local con Playwright 1.57.0 y Chrome 155.0.8059.79, comparando la propuesta con una copia anterior al cambio. Los tamaños móviles son **emulados; no se ha probado en un dispositivo real**. Las comprobaciones de fechas anteriores que siguen más abajo conservan su alcance histórico.

| Comprobación realizada | Resultado |
| --- | --- |
| Idiomas y respaldo | Todos los textos y atributos traducibles coinciden con el diccionario en ES/EN. Respaldo inglés comprobado sin JavaScript a 390 × 844, con los cinco enlaces de la ficha disponibles y el selector oculto. |
| Fuentes y enlaces | Los cinco enlaces de la ficha responden con HTTP 200. La API de Actions confirma el commit y el resultado satisfactorio; el registro contiene `Ran 238 tests` y `OK`. Se retiran de la ficha los recuentos y resultados históricos sustituidos. |
| Altura y adaptación | Comparación ES/EN a 1440 × 720, 1440 × 900, 1366 × 720, 1366 × 650, 1260 × 673, 768 × 1024, 390 × 844 y 320 × 844. Sin desbordamiento horizontal ni texto recortado. En los tamaños de escritorio la altura de la tarjeta no cambia; en móvil se reduce entre 44 y 75 px. Se conserva la decisión de apilar o usar flujo vertical en las 16 combinaciones. Capturas revisadas en ambos idiomas, en escritorio y móvil emulado. |
| Teclado | Tab y Mayús+Tab por los 20 controles a 1440 × 720, 1366 × 650 y 390 × 844, en ES/EN: orden correcto, foco visible de 3 px y sin oclusión. Las ventanas enfocadas caben completas cuando hay apilado. |
| Movimiento reducido | A 1440 × 720 y 390 × 844, en ES/EN: contenido estático y completo, sin apilado ni trazados animados. |
| Animación | En escritorio, ventanas y esquema cambian con el scroll y recuperan el mismo estado al recorrer cinco posiciones en sentido inverso, en ES/EN. El cambio de idioma conserva el apilado y los tres trazados. En móvil emulado se observa la entrada propia del esquema y el avance de sus trazados al desplazarse. |

Al cambiar la altura del viewport emulado de 844 a 780 px, también cambian la portada y la altura del documento: la entrada en curso finaliza tanto en la versión anterior como en la propuesta. Esta comprobación no reproduce el comportamiento de las barras del navegador de un móvil real.

Se comprobaron la sintaxis de `language.js`, `git diff --check` y la conservación de CSS, `motion.js`, CNAME y los archivos pendientes sin seguimiento. La propuesta se abrió en el navegador desde `http://localhost:8000/#orchestrator-title`.

## Movimiento con Anime.js

Se utiliza **Anime.js 4.5.0**, distribución oficial UMD alojada en `assets/vendor/animejs/4.5.0/anime.umd.min.js`, con licencia **MIT**. [Procedencia, integridad y documentación oficial consultada](assets/vendor/animejs/README.md). Se conserva el bundle oficial sin modificar. No hay CDN, instalación ni compilación al publicar: todos los recursos son relativos y compatibles con GitHub Pages.

`motion.js` usa Anime.js para las entradas, los trazados, el relevo y la respuesta de enlaces y controles. CSS conserva subrayados, foco y el cambio de fondo al pasar por un grupo de herramientas. No hay dos motores animando la transformación de una ventana.

| Escena | Implementación |
| --- | --- |
| `enterHero()` | Entrada coordinada del nombre, presentación y enlaces, de hasta 850 ms; portada conservada. |
| `reveal()` | Timelines finitas para títulos, introducción, contacto y grupos de herramientas. Cada grupo se activa al estar visible, con un desfase breve entre hermanos, también en móvil. El título compacto de Proyectos queda estático durante el relevo, sin una entrada independiente. |
| `buildScroll()`, `hero-exit` | Transformación de la portada ligada al scroll, conservada. |
| `buildProjects()`, `project-windows` | Timeline enlazada a `onScroll({ sync: true })`: entrada, lectura, ascenso de git-docs-agent y reducción del orquestador a 0,96. Se detiene al detener el scroll y retrocede al subir. |
| `addFlow()` | Cuatro énfasis y tres conexiones con `svg.createDrawable()` en la misma timeline, antes de la superposición. Etiquetas siempre visibles y aviso de ilustración conservado. |
| `orchestrator-flow` | En flujo vertical, el esquema tiene una escena de scroll propia, referenciada a su figura. Cada ventana entra al aparecer su barra y cada esquema tiene una entrada independiente de 700 ms al alcanzar su figura. |
| `interaction()` | Transiciones breves de flechas y selector de idioma, conservadas. |

### Ajuste móvil del 16 de octubre de 2026

Tras el aviso de ausencia de animaciones en un móvil real, se corrigen dos comportamientos del código: `resize` cancelaba las entradas en curso incluso cuando solo cambiaba la altura, y el esquema del orquestador tomaba toda la tarjeta como referencia de scroll. En una tarjeta vertical larga, su texto y su esquema llegan a la pantalla en momentos distintos. No se ha confirmado cuál de estos factores produjo el síntoma en el dispositivo del usuario.

- Por debajo de 960 px, un cambio solo de altura actualiza los límites del scroll sin finalizar las entradas. Los cambios de ancho, contenido o idioma siguen recalculando la composición.
- Las ventanas comienzan su entrada al aparecer su barra, sin depender de una fracción de la altura de toda la tarjeta. Los dos esquemas entran por separado cuando sus figuras son visibles; el recorrido del orquestador se vincula a su propia figura.
- Se conserva el relevo de escritorio y el flujo vertical legible en móvil, sin apilar tarjetas mayores que la pantalla. Se respetan movimiento reducido, foco y ausencia de JavaScript. El HTML versiona la URL de `motion.js` para solicitar el archivo corregido.

Validación de este ajuste: sintaxis JavaScript y siete comprobaciones de lógica con DOM y Anime.js simulados. Cubren el cambio de altura móvil durante una entrada, la aparición independiente del esquema, el cambio de ancho, el relevo de escritorio, movimiento reducido, biblioteca ausente y foco. La versión anterior falla dos de esas comprobaciones; la corregida supera las siete. Son comprobaciones de control de eventos, no una reproducción visual en navegador ni una prueba de Safari/iPhone. En esta sesión no hay navegador de pruebas disponible: queda pendiente comprobar el aspecto y movimiento en el móvil real. Las verificaciones visuales históricas de abajo no se atribuyen a este ajuste.

### Diagnóstico anterior de la discrepancia

La condición anterior exigía que la ventana más alta cupiese completa, más dos márgenes y 16 px. La medición inicial sobre `localhost:8000`, en ES/EN, encontró:

| Viewport de reproducción | Altura del orquestador | Resultado anterior |
| --- | --- | --- |
| 1366 × 650 | 710 px | Flujo estático, sin entrada animada de paneles. |
| 1440 × 720 | 712 px | Flujo estático, sin entrada animada de paneles. |
| 1440 × 900 | 735 px | Relevo activo, como en el vídeo anterior. |

Anime.js y `motion.js` cargaban, sin excepciones JavaScript; la preferencia de movimiento reducido era falsa en estas reproducciones. Las diez respuestas de `index.html`, CSS, ambos scripts propios y Anime.js en `localhost` y `127.0.0.1` fueron HTTP 200 e idénticas a los archivos en disco. No se encontró evidencia de un problema de caché. Los antecesores del sticky no tenían transformaciones ni un scroll anidado: la sección usa `overflow: clip`, no `overflow: auto/hidden`.

Se observó por X11 la previsualización real abierta en VS Code: ventana exterior de 1920 × 1048 y área de página aproximada de 1260 × 673. Esta última se estimó visualmente; **no se obtuvo su viewport CSS, zoom ni preferencia de movimiento mediante DevTools**. Se reprodujo ese tamaño por separado en Playwright. También se abrió el portfolio final en el Chrome habitual; esta observación visual se distingue de la matriz automatizada.

El vídeo anterior se grabó a 1440 × 900; no tenía manifiesto de hashes para reconstruir cada recurso servido. La grabación nueva sí verifica todos los recursos cargados contra el disco y documenta su entorno.

Esa revisión permitió paneles ligeramente más altos que el viewport. El ajuste de encuadre posterior, descrito a continuación, sustituye esa condición: ahora deben caber juntos el título, los márgenes y el panel completo. Las medidas anteriores describen el diagnóstico histórico, no la composición actual.

### Encuadre de Proyectos, foco y adaptación

La estructura es `.project-sequence > .project-stage`, que contiene el encabezado y `.project-stack > .project-slot > .project-window`. **Un único bloque sticky reúne el título y las ventanas**. El encabezado usa un tamaño compacto, separación inferior y una capa de pintado propia sobre los paneles; no participa en las entradas de duración fija. Sale con el bloque al terminar la sección.

`onScroll` mide la secuencia exterior, sin transformar. La timeline sigue controlando la entrada del orquestador, su reducción hasta 0,96 y el ascenso de git-docs-agent. El panel entrante se revela dentro del área del stack; el recorte de su envoltorio se limita a esa entrada, con 32 px de margen para las sombras. Al quedar colocado, todo su contenido cabe y es visible. No hay scroll interno ni altura fija que recorte el contenido.

Antes de apilar se mide la altura intrínseca de ambas ventanas y la distancia que ocupan título y separación. El conjunto se centra verticalmente con `top = (innerHeight - stageHeight) / 2`, conservando las fracciones de píxel. Se exige además un margen mínimo por lado de entre 16 y 24 px, calculado a partir de la altura CSS del viewport, y un ancho de al menos 960 px. **Ya no se usan offsets sticky negativos**. Si el conjunto no cabe con esos márgenes, los paneles pasan a flujo vertical con sus entradas de Anime.js; con movimiento reducido o fallo de JavaScript/Anime.js, quedan estáticos y completos. El ancho horizontal y la alineación superior e izquierda del contenido no cambian.

Ese mismo `top` se usa para el sticky y el límite final de `onScroll`. La entrada sigue comenzando en el 82 % del viewport y su distancia se recalcula como `0,82 × innerHeight - top`. Las dos lecturas y el relevo mantienen sus distancias; la altura de `.project-sequence` tampoco cambia por el centrado. A 1440 × 864 CSS, el conjunto mide 659,5 px y deja 102,25 px arriba y abajo; a 1440 × 720 deja 30,25 px por lado. El título sigue saliendo con Proyectos.

La paleta nueva se limita a Proyectos mediante variables locales: fondo `#E3E5E8`, cuerpo `#FAF9F6`, barra `#DCE0E5` y borde `#BDC2C9`. La barra se aclaró respecto a `#D5D8DD` para conservar el terracota de los números con contraste superior a 4,5:1. Carbón, enlaces y conexiones conservan sus colores. Los esquemas mantienen sus superficies cálidas interiores; la sombra exterior se reduce a `0 12px 28px / 9 %` y `0 2px 6px / 4 %`. La paleta del resto del portfolio se conserva.

Después de la entrada se reserva una lectura de `min(240 px, 0,28 × innerHeight)` y un relevo de `min(600 px, 0,72 × innerHeight)`. El esquema ilustrativo comparte la misma timeline. Al acabar el relevo se añade **una lectura del segundo proyecto de la misma distancia que la primera**, antes de soltar el sticky. Son distancias de scroll, no esperas en segundos. La nota inferior sigue a 1,5 rem de la secuencia; no se añade un espaciador ni se cambian los márgenes.

La versión anterior hacía coincidir el final del ascenso con el límite del sticky. Se reprodujo en una ventana nativa de 1440 × 720 CSS: al avanzar solo 20 px desde ese punto, el título pasaba de aproximadamente 18 px a −2 px. Ahora `settledAt` marca el final del relevo, `finalHold` reserva la lectura y `total` coincide con la salida. La altura de `.project-sequence` suma `stageHeight + hold + transfer + finalHold`; las medidas intrínsecas conservan sus fracciones de píxel. La única timeline sincronizada mantiene `scale: 0.96` en el orquestador y `y: 0` en git-docs-agent durante el tramo final y después de completarse. Así, la salida mueve el bloque entero sin que las ventanas sigan transformándose respecto al stack. A 720 px de alto, la lectura final ocupa 201,6 px; su máximo es 240 px. Al subir se recorren las mismas fases en sentido inverso.

En git-docs-agent, presentación y enlaces se alinean arriba. Se compactaron las conexiones, los márgenes del esquema y el relleno del núcleo del agente, sin cambiar textos ni tamaños de letra. Las conexiones SVG usan porcentajes para ajustarse a sus alturas. Se conservan las ventanas macOS, la paleta y todos los contenidos.

`showProject()` lleva al punto de lectura del proyecto al recibir foco o navegar a un ancla interna. Para git-docs-agent se utiliza la mitad de su lectura final, en lugar del límite de salida. La ventana enfocada permanece por delante de la otra; todo el conjunto cabe en el viewport mientras hay apilado. El orden de teclado y las anclas se conservan.

`refreshLayout()` conserva el progreso al cambiar ES/EN, retira el observador anterior y reconstruye tras 120 ms. Se comprueban también la altura del encabezado, fuentes, cuerpo y paneles. Al alternar entre apilado y flujo vertical se conserva una referencia al proyecto visible. En estado estable hay dos ScrollObservers, sin trazados duplicados. La portada, herramientas y contactos conservan su implementación; impresión y salida de página siguen limpiando las escenas.

## Idiomas y mantenimiento

`index.html` contiene el respaldo completo en inglés. `language.js` guarda ambas versiones en `messages`: al cambiar un texto, actualiza también su equivalente inglés en el HTML, incluidos título, descripción y etiquetas accesibles. Usa `data-i18n` solo en elementos sin hijos; para atributos, `data-i18n-content` y `data-i18n-aria-label`.

El selector ES/EN actualiza `html.lang` y `aria-pressed`, y guarda la elección en `localStorage` cuando está disponible. El evento `portfolio:languagechange` permite recalcular las escenas. Sin JavaScript, el contenido inglés y los enlaces siguen funcionando y el selector permanece oculto.

## Comprobaciones del centrado y contraste — 16 de octubre de 2026

Pruebas sobre `http://localhost:8000` con Playwright 1.57.0 y Chrome/Chromium 155.0.8059.79. La matriz usa viewports controlados. La grabación usa una ventana nativa con `viewport: null`: sus dimensiones CSS se leen desde la página, no se deducen de la resolución del vídeo.

| Comprobación realizada | Resultado |
| --- | --- |
| ES/EN y adaptación | 1440 × 720, 1366 × 720 y 1440 × 900: apilado con título y paneles completos. 1366 × 650, 1260 × 673, 390 × 844 y 320 × 844: flujo vertical. Traducciones correctas y sin desbordamiento horizontal en los catorce casos. |
| Título y márgenes | Centrado de título, separación y stack comprobado en primera lectura, relevo y lectura final a 1440 × 864, 1440 × 720, 1366 × 720 y 1440 × 900, en ES/EN. Diferencia entre márgenes superior e inferior inferior a 0,05 px; título separado al menos 15 px del panel. Ancho y altura del conjunto conservados frente a la versión anterior. |
| Límite de apilado y redimensionado | A 1440 px de ancho, se apila desde 694 px de alto en ES/EN. A 1366 px, desde 713 px en ES y 692 px en EN. Se hicieron seis cambios de altura por caso, incluyendo 1 px por debajo y por encima del umbral: flujo vertical cuando no cabe, centrado cuando cabe, dos observadores y tres trazados sin duplicación. |
| Pintado en ventana nativa | Capturas del primer y segundo proyecto y del relevo, en ES/EN a 1440 × 864 CSS. Capturas adicionales de lectura final a 1440 × 720. Título y ventanas completos; texto interior alineado arriba y a la izquierda. |
| Contraste | Se calcularon los colores efectivos de 66 fragmentos de texto por idioma y se revisaron los cinco enlaces con hover y foco. Mínimo de texto: 4,58:1, en los números sobre la barra; enlaces y contorno de foco: 5,77:1 sobre el cuerpo. Foco sólido de 3 px, visible y sin oclusión. Esto no constituye una auditoría completa de accesibilidad. |
| Distancias | Comparación con los archivos anteriores a 1440 × 864: `stageHeight` 659,5 px y `.project-sequence` 1739,5 px en ambas versiones. Lecturas de 240 px y relevo de 600 px conservados; solo se ajusta la entrada y los límites del observador al nuevo offset. El ScrollObserver redondea sus distancias a píxeles enteros. |
| Reversibilidad | Siete posiciones al bajar y subir recuperan geometría, transformaciones, énfasis y trazados. Pausa de 600 ms, rueda de 20 px y saltos de ±2200 px. Además, en ventana nativa ES/EN se cruzaron las fronteras relevo/lectura y lectura/salida con pasos de rueda de 3 px en ambos sentidos y desplazamientos rápidos de ±1100 px. |
| Lectura final y salida | Aproximadamente 201,6 px entre colocación final y liberación del sticky a 1440 × 720. Título a 30,25 px y panel completo durante la lectura. Después, el bloque sigue el scroll; las transformaciones permanecen finales. Se comprobaron posiciones a ambos lados de las fronteras y hasta 240 px después de la salida. Tras completar la timeline, 80 px más de rueda desplazan el bloque 80 px. La nota conserva su separación de 24 px. |
| Teclado | Tab y Shift+Tab por los 18 controles a 1440 × 720, 1366 × 650 y 390 × 844, en ES/EN. Foco visible y sin oclusión con `elementFromPoint`; primer proyecto enfocado durante el relevo y acceso al segundo. |
| Texto ampliado | Texto raíz al 200 % a 1440 × 720, ES/EN: flujo vertical, sin desbordamiento horizontal y teclado completo. No equivale al zoom nativo. |
| Cambios de idioma y tamaño | Cuatro cambios de idioma durante el relevo y cuatro de tamaño por idioma: progreso conservado, dos observadores y tres trazados al estabilizarse, sin crecimiento posterior. |
| Fuente retrasada | Fuente local retrasada 1200 ms a 1440 × 720: conjunto completo, dos observadores y tres trazados tras cargar, sin crecimiento posterior durante 600 ms. |
| Anclas | `#projects`, `#orchestrator-title`, `#orchestrator-caption` y `#git-docs-title`: navegación nativa y contenido correspondiente visible. |
| Movimiento reducido | Carga inicial estática, cambio durante el relevo, navegación por teclado y restauración de las escenas al desactivar la preferencia emulada. La grabación no modifica esta preferencia. |
| Fallos | Sin JavaScript, Anime.js bloqueado, motion.js bloqueado y fallo inyectado al crear una timeline: ventanas verticales completas y teclado accesible. |
| Impresión | Emulación print: el bloque deja de ser sticky y muestra ambos paneles en vertical. |
| Alcance | Este ajuste solo modifica `motion.js`, los estilos de Proyectos y esta documentación. `index.html` y `language.js` coinciden byte a byte con el inicio del ajuste. Se compararon colores y tipografía computados fuera de Proyectos: sin cambios. Contenidos, CNAME, dependencias y publicación conservados. |

También pasaron `node --check motion.js` y `git diff --check`. Sin excepciones JavaScript no controladas en la matriz. No se probaron Safari, Firefox, dispositivos físicos, lector de pantalla ni zoom nativo.

### Ventana real y propuesta local

En la revisión de encuadre anterior se midió una ventana nativa de Chrome de 1396 × 674 CSS, que activaba el flujo vertical. Para las capturas actuales se ha usado una ventana nativa con **1440 × 864 CSS**, `clientWidth` 1425, exterior 1484 × 995, DPR 1 y escala visual 1, leídos desde la página. También se comprobaron las fronteras de las fases en una ventana nativa de 1440 × 720 CSS. No se pudo leer mediante DevTools el viewport de la previsualización abierta en VS Code; no se confunde su captura con una medición CSS.

- Portfolio real: <http://localhost:8000/#projects>.
- Recorrido y capturas: <http://localhost:8006/>.
- Artefactos temporales e informes: `/tmp/portfolio-center/`, fuera del repositorio. `centering.json` documenta centrado, distancias y umbrales; `visual.json`, capturas y contraste; `boundaries.json`, las fronteras en ventana nativa; `verification.json`, la matriz y los fallbacks. La reproducción histórica del final precipitado se conserva en `/tmp/portfolio-reading/baseline.json`.
- Grabación: `preview/centrado-y-contraste-es.webm`, en español, **26,2 s** y 25 fps. Ventana nativa de Chrome ajustada mediante sus límites exteriores; **innerWidth/innerHeight 1440 × 864**, `clientWidth` 1425 y exterior 1484 × 995; DPR 1, escala visual 1.
- `prefers-reduced-motion: reduce` fue **false** según la página, sin sobrescribir la preferencia. El recorrido usa rueda nativa; no inyecta clases, alturas, estilos ni estados de animación.
- `recording.json` guarda el entorno y SHA-256 de las respuestas servidas. Los recursos cargados coinciden con los archivos finales del proyecto; `record.cjs` conserva el procedimiento.
- Capturas de lectura: `es-primero.png`, `es-segundo.png`, `en-primero.png` y `en-segundo.png`. Se incluyen además relevo y foco en ambos idiomas y las posiciones de la grabación, desde el primer proyecto hasta la salida.

Se comprobó la reproducción del vídeo y la carga de las capturas. Después de grabar se volvieron a comparar los hashes registrados con las respuestas de `localhost:8000` y el disco: coinciden. Se abrieron el portfolio y la revisión en el navegador habitual.

Para verlo, entra en Proyectos y continúa bajando. Después de subir git-docs-agent, sigue desplazándote: durante 240 px a 864 px de altura (unos 202 px a 720), título y panel permanecen centrados, completos y estables. Después salen juntos hacia la nota y Habilidades, conservando la posición final de las ventanas. Al subir se invierte la secuencia. En las alturas donde no cabe el conjunto se conserva la lectura vertical completa.

Todo queda sin commit ni push.

