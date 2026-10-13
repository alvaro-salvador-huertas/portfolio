# Portfolio de Álvaro Salvador Huertas

Mi portfolio personal en español e inglés, donde comparto mis proyectos, aprendizajes y logros. Lo iré actualizando a medida que avance y alcance nuevas metas personales.

Está desarrollado con HTML, CSS y JavaScript nativo, sin frameworks, dependencias ni compilación. La fuente se sirve desde un archivo local con licencia abierta.

## Verlo en local

Desde esta carpeta:

```bash
python3 -m http.server 8000 --bind 127.0.0.1
```

Abre <http://127.0.0.1:8000>. Detén el servidor con `Ctrl+C`. Si el puerto está ocupado, cambia el número en el comando y en la dirección. Python solo se usa para previsualizar.

También puedes abrir `index.html` directamente: la página, los estilos, la fuente y el script son locales. Los enlaces externos necesitan internet y el enlace de correo utiliza el cliente de correo configurado en el dispositivo.

## Composición

La portada ocupa como mínimo una pantalla e incluye navegación compacta, el selector ES / EN, el nombre completo, una descripción breve, acceso a los proyectos y una indicación para bajar. Después aparecen About, Projects, Skills y Contact (Sobre mí, Proyectos, Habilidades y Contacto) como secciones abiertas, separadas por espacio y líneas finas.

La identidad visual utiliza la marca `as.` y la fuente Manrope. La navegación enlaza las secciones del portfolio y los recursos de cada proyecto.

La paleta es explícitamente clara: marfil `#F5F3EE`, carbón `#181818` y azul `#244BD8`. El color secundario del texto es `#595852`. `color-scheme: only light` y una única definición de colores evitan cambios por la preferencia clara u oscura del sistema.

La skill `design-taste-frontend` se usa como apoyo, subordinada al encargo. Parámetros: `DESIGN_VARIANCE: 6`, `MOTION_INTENSITY: 4`, `VISUAL_DENSITY: 3`.

## Tres decisiones de implementación

1. **Altura mínima, no fija.** `.opening` usa `min-height: 100dvh` e incluye la cabecera en su flujo. La portada puede crecer al ampliar el texto o reducir la altura de la ventana, sin recortarlo.
2. **Secciones semánticas y Grid.** `main` contiene las cuatro secciones. Cada proyecto es un `article` y las competencias utilizan `dl`, `dt` y `dd`. Grid separa título y contenido en escritorio; en móvil se apilan conservando el orden de lectura.
3. **Animación como mejora opcional.** CSS define el movimiento; `motion.js` decide cuándo iniciarlo mediante `IntersectionObserver`. El contenido nunca depende de JavaScript para hacerse visible.

## Idiomas y traducciones

El idioma inicial es inglés, salvo que exista una elección válida guardada en `localStorage` con la clave `portfolio-language`. El selector usa dos botones nativos de al menos 44 × 44 px. El idioma seleccionado se indica mediante subrayado, color y `aria-pressed`; ambos botones tienen foco visible y funcionan con Tab, Enter y Espacio.

`language.js` reúne los textos en el objeto `messages`, con una clave descriptiva y versiones `en` y `es` para cada entrada. El cambio actualiza texto, etiquetas accesibles, título, descripción y el atributo `lang` de `html`, sin recargar. Conserva los elementos de la página, enlaces, IDs y anclas; tampoco reinicia las apariciones de las secciones ni desplaza la página al inicio.

Las lecturas y escrituras de almacenamiento están protegidas por `try/catch`: si fallan, el selector sigue funcionando durante la visita. El HTML conserva todo el contenido en inglés. El selector comienza oculto y solo se muestra tras validar las traducciones e instalar sus eventos; sin JavaScript o si falta `language.js`, la página en inglés sigue siendo navegable.

Para añadir o modificar una traducción:

1. Edita las versiones `en` y `es` de la entrada correspondiente en `messages`, dentro de `language.js`.
2. Mantén el texto inglés original de `index.html` sincronizado, para las visitas sin JavaScript.
3. Para un texto nuevo, añade una clave a `messages` y úsala en un elemento de texto con `data-i18n="mi.clave"`. Por ejemplo, un enlace con una flecha debe traducir solo un `span` de texto dentro del enlace, conservando la flecha y el destino.
4. Usa `data-i18n-aria-label="mi.clave"` para una etiqueta accesible y `data-i18n-content="mi.clave"` para el contenido de un metadato. No marques un contenedor con elementos hijos: la traducción usa `textContent`, nunca `innerHTML`.
5. Revisa ambos idiomas en pantalla estrecha y comprueba que la versión inglesa sin JavaScript sigue completa. Una clave usada sin ambas traducciones mantiene el selector oculto y el contenido original.

## Cómo se activan las animaciones

- El nombre y los apellidos usan un revelado tipográfico CSS de **640 ms**, con retrasos de **0 y 90 ms**: termina en **730 ms**. Combina opacidad, un desplazamiento de **12 px** y una máscara con margen para la tilde de «Á» y los extremos de los caracteres. Al terminar no queda ningún recorte aplicado. Los apellidos pueden repartirse en más líneas cuando falta anchura.
- La descripción conserva su entrada de **560 ms**, con un retraso de **180 ms**. Los enlaces permanecen disponibles desde el inicio. `motion.js` marca las entradas terminadas con `.has-entered`, para que no vuelvan a empezar al cambiar la preferencia de movimiento.
- Las flechas se desplazan **3 px** en vertical o **2 px** en diagonal al pasar el ratón o recibir foco de teclado, con una transición de **180 ms**. El enlace y su superficie de pulsación permanecen en su sitio.
- Los bloques con `data-reveal` se observan hasta su primera entrada en el área visible, con un margen inferior de 32 px. Entonces reciben `.is-revealing`: pasan de opacidad 0 y desplazamiento vertical de 20 px a su posición normal en 560 ms.
- Cada bloque deja de observarse al activarse. Un `WeakSet` recuerda los bloques ya tratados y la clase temporal se retira al terminar la animación. No se repite al volver a subir.
- **No existe un estado oculto previo.** Si falta el archivo JavaScript, no existe `IntersectionObserver` o falla su inicialización, todo el contenido sigue visible.
- Las anclas conservan su comportamiento nativo. Al llegar mediante una ancla o con el teclado, se omite o cancela la animación del destino para mostrarlo inmediatamente.
- Con `prefers-reduced-motion: reduce`, CSS no aplica entradas ni transiciones. JavaScript no inicia el observador; si la preferencia cambia durante la visita, lo desconecta y elimina las animaciones en curso.
- No se interceptan eventos de desplazamiento, no se fija la pantalla y no se obliga a esperar. La versión para impresión también desactiva las animaciones.

## Archivos

| Archivo | Función |
| --- | --- |
| `index.html` | Contenido original en inglés, claves de traducción, estructura semántica y enlaces |
| `language.js` | Traducciones ES/EN, selector accesible y persistencia opcional |
| `styles.css` | Composición, tipografía, paleta clara, adaptación y animaciones |
| `motion.js` | Apariciones únicas con IntersectionObserver y accesibilidad de los destinos |
| `assets/favicon.svg` | Icono original, sin cambios |
| `assets/fonts/manrope-latin-variable.woff2` | Fuente variable local de 24.836 bytes |
| `assets/fonts/OFL-Manrope.txt` | Licencia SIL Open Font License de Manrope |
| `CNAME` | Dominio original, conservado byte a byte |

Manrope procede de [Google Fonts](https://fonts.google.com/specimen/Manrope), con licencia del [repositorio oficial](https://github.com/google/fonts/tree/main/ofl/manrope). No se realizan solicitudes externas durante la carga de la página.

## Contenido y mantenimiento

Los datos personales y competencias proceden de las indicaciones de Álvaro: tercero de Ingeniería Informática en la UGR, C++ académico, proyectos con Python e interés en funcionamiento, orquestación y evaluación de agentes. Las cualidades personales se expresan como motivaciones, sin inventar experiencia profesional ni logros de liderazgo. Oracle SQL Developer figura como herramienta; AWS como formación introductoria en curso; español e inglés como idiomas nativos.

- `git-docs-agent` conserva su descripción y figura como «Evaluated prototype». El [informe del 13 de octubre de 2026 (en español)](https://github.com/alvaro-salvador-huertas/git-docs-agent/blob/main/evals/resultados-2026-10-13.md) completa la evaluación inicial: los cinco casos predefinidos están superados con el prompt revisado y las mismas notas fuente. Tres comprobaciones exploratorias adicionales obtuvieron resultados favorables. Son observaciones individuales, no una medida de fiabilidad general. Las pruebas del programa con proceso simulado y la evaluación de respuestas se valoran por separado. Esta actualización del portfolio refleja el informe; no ejecuta pruebas ni evaluaciones del agente.
- `carrera-tech` se mantiene como proyecto de fundamentos. Ahora es público y se enlaza su [repositorio](https://github.com/alvaro-salvador-huertas/carrera-tech).
- El correo visible y su destino `mailto:` son `salvadorhuertas.alvaro@gmail.com`.
- Al actualizar información, conserva IDs y `aria-labelledby`. Para animar un nuevo bloque basta con añadir `data-reveal` a su contenedor; evita anidarlo en otro bloque animado.
- Los enlaces externos abren en la misma pestaña. LinkedIn mantiene su dirección original codificada.

## Comprobaciones de idiomas y animaciones

Realizadas para esta actualización el **13 de octubre de 2026**, con Chrome **154.0.8037.97** y Playwright. Vista previa mediante HTTP local; scripts, capturas e informes temporales fuera del repositorio.

| Comprobación | Resultado |
| --- | --- |
| Ambos idiomas | ES y EN a 320 × 700, 390 × 844 y 1440 × 900 px; sin desbordamiento horizontal, también con la fuente raíz al 200 % |
| Traducción completa | 62 destinos de texto y atributos contrastados con el diccionario; revisión de textos sin marcar, título, descripción, etiquetas accesibles y `html.lang`. Los textos que se conservan son nombres propios, tecnologías, direcciones, abreviaturas y símbolos |
| Selector y teclado | Botones de 44 × 44 px y contraste mínimo calculado de 6,16:1 en reposo y hover; un solo `aria-pressed="true"`, activación con Enter y Espacio sin perder el foco; recorrido de los 17 enlaces y botones con Tab, foco de 3 px, Shift+Tab y salto al contenido, con movimiento normal y reducido |
| Navegación | Anclas de las cuatro secciones y carga directa de `projects`, `evaluation-title`, `skills` y `contact` comprobadas en ES y EN; enlaces e IDs idénticos a los anteriores |
| Persistencia | ES y EN conservados al recargar; ES recuperado en otra pestaña del mismo contexto; valor guardado inválido vuelve a EN; un navegador configurado en español sigue empezando en EN sin elección guardada |
| Almacenamiento bloqueado | Cambio en ambos sentidos con acceso a `localStorage` bloqueado, lectura fallida y escritura fallida; selección mantenida al navegar por anclas durante la visita |
| Movimiento | Duración, retrasos y desplazamiento del nombre medidos; sin recorte final. Las 15 apariciones se ejecutan una vez en 390 y 1440 px y no se repiten tras cambiar de idioma o volver a recorrer la página; elementos conservados y posición sin volver al inicio |
| Flechas y movimiento reducido | Desplazamiento del enlace principal comprobado con ratón y foco; sin movimiento con preferencia reducida al cargar o al activarla durante la visita; las entradas terminadas no vuelven a empezar al desactivarla |
| Impresión | Sin animaciones al emular el medio de impresión en ambos idiomas |
| Fallos y ausencia de JavaScript | Contenido legible y anclas operativas sin JS, con `language.js` bloqueado, con `motion.js` bloqueado, sin IntersectionObserver y con fallo simulado en su constructor; selector oculto cuando no funciona la traducción |
| Integridad | `node --check language.js`, `node --check motion.js` y `git diff --check`; CNAME, favicon y configuración de publicación conservados |

Lighthouse **13.5.0** se ejecutó sobre la versión inicial en inglés del servidor local, con emulación móvil: **100** en rendimiento, accesibilidad, buenas prácticas y SEO; LCP de **1,4 s**, bloqueo total de **60 ms** y CLS de **0**. La comprobación de correspondencia entre etiquetas visibles y nombres accesibles también pasa. Son resultados de laboratorio local, no medidas de usuarios reales ni una auditoría manual con lector de pantalla.

Los tamaños móviles están emulados. La fuente raíz al 200 % no equivale a zoom nativo. Estas comprobaciones no ejecutan pruebas ni evaluaciones de los proyectos enlazados.

## Comprobaciones históricas del rediseño

Registro de la revisión anterior, realizada el **13 de octubre de 2026**, antes del selector de idiomas y de este ajuste de las animaciones. Esta tabla describe aquella versión y **no presenta sus comprobaciones como nuevas**. Se utilizó Chromium **154.0.8037.97**, con scripts y capturas temporales fuera del repositorio.

| Comprobación | Resultado |
| --- | --- |
| Adaptación | Anchos de 320, 390, 640, 768, 1024, 1440 y 1920 px, además de 844 × 390: sin desbordamiento horizontal |
| Tema | Misma paleta clara al emular preferencias de sistema clara y oscura |
| Texto ampliado | Fuente raíz al 200 % en 320, 390 y 1440 px, sin desbordamiento horizontal |
| Contraste | Mínimo calculado de **6,16:1** para el texto en reposo; también comprobado el estado hover del botón principal |
| Teclado | 14 enlaces recorridos con Tab en escritorio y móvil, con y sin movimiento reducido; foco visible de 3 px, Shift+Tab y salto a `main` mediante Enter |
| Anclas | About, Projects, Skills y Contact; enlaces de portada; carga directa de Projects, evaluación, Skills y Contact, con sus destinos visibles sin esperar |
| Entrada | Duración de 560 ms, desplazamiento de 20 px y retrasos de 0, 90 y 180 ms comprobados en las animaciones del navegador |
| Apariciones | Los 15 bloques se animaron una sola vez en escritorio y móvil; recorrido repetido y salto rápido al final sin contenido oculto tras finalizar las entradas |
| Movimiento reducido | Sin animaciones al cargar con la preferencia reducida; cambio de preferencia durante la visita cancela las animaciones |
| Fallos y ausencia de JavaScript | Contenido visible y anclas operativas con JS desactivado, archivo bloqueado, IntersectionObserver ausente y error simulado en su constructor |
| Estructura y conservación | Un `h1`, idioma inglés, IDs únicos y conservados, cuatro secciones en el orden solicitado, destinos previos conservados y correo exacto |
| Recursos | Carga local sin errores de ejecución ni solicitudes externas; apertura `file://` sin conexión con fuente y estilos disponibles |
| Integridad | `node --check motion.js` y `git diff --check` sin errores; CNAME y favicon idénticos a HEAD |

Los tamaños móviles son emulados. La ampliación de la fuente raíz no equivale a zoom nativo. El enlace de correo se comprueba por su destino, sin enviar mensajes.

Actualización posterior: se añadió el enlace público de `carrera-tech`, comprobado con respuesta HTTP 200. La revisión de teclado de la tabla corresponde a los 14 enlaces anteriores a esta incorporación.

## Alcance

Esta actualización añade idiomas y refina las animaciones sobre la composición existente, sin commit ni push. Se trabajó en `main`: el árbol inicial contenía `.agents/` y `skills-lock.json` sin seguimiento, por lo que no se cumplía la condición de árbol limpio para crear `feat/portfolio-idiomas`. Ambos se conservan y quedan fuera de los cambios. No se modifican CNAME, DNS ni la configuración de GitHub Pages o publicación.
