# Portfolio de Álvaro Salvador Huertas

Mi portfolio personal en inglés, donde comparto mis proyectos, aprendizajes y logros. Lo iré actualizando a medida que avance y alcance nuevas metas personales.

Está desarrollado con HTML, CSS y JavaScript nativo, sin frameworks, dependencias ni compilación. La fuente se sirve desde un archivo local con licencia abierta.

## Verlo en local

Desde esta carpeta:

```bash
python3 -m http.server 8000 --bind 127.0.0.1
```

Abre <http://127.0.0.1:8000>. Detén el servidor con `Ctrl+C`. Si el puerto está ocupado, cambia el número en el comando y en la dirección. Python solo se usa para previsualizar.

También puedes abrir `index.html` directamente: la página, los estilos, la fuente y el script son locales. Los enlaces externos necesitan internet y el enlace de correo utiliza el cliente de correo configurado en el dispositivo.

## Composición

La portada ocupa como mínimo una pantalla e incluye navegación compacta, el nombre completo, una descripción breve, acceso a los proyectos y una indicación para bajar. Después aparecen About, Projects, Skills y Contact como secciones abiertas, separadas por espacio y líneas finas.

La identidad visual utiliza la marca `as.` y la fuente Manrope. La navegación enlaza las secciones del portfolio y los recursos de cada proyecto.

La paleta es explícitamente clara: marfil `#F5F3EE`, carbón `#181818` y azul `#244BD8`. El color secundario del texto es `#595852`. `color-scheme: only light` y una única definición de colores evitan cambios por la preferencia clara u oscura del sistema.

La skill `design-taste-frontend` se usa como apoyo, subordinada al encargo. Parámetros: `DESIGN_VARIANCE: 6`, `MOTION_INTENSITY: 4`, `VISUAL_DENSITY: 3`.

## Tres decisiones de implementación

1. **Altura mínima, no fija.** `.opening` usa `min-height: 100dvh` e incluye la cabecera en su flujo. La portada puede crecer al ampliar el texto o reducir la altura de la ventana, sin recortarlo.
2. **Secciones semánticas y Grid.** `main` contiene las cuatro secciones. Cada proyecto es un `article` y las competencias utilizan `dl`, `dt` y `dd`. Grid separa título y contenido en escritorio; en móvil se apilan conservando el orden de lectura.
3. **Animación como mejora opcional.** CSS define el movimiento; `motion.js` decide cuándo iniciarlo mediante `IntersectionObserver`. El contenido nunca depende de JavaScript para hacerse visible.

## Cómo se activan las animaciones

- La entrada de la portada es CSS: nombre, apellidos y descripción usan una animación de **560 ms**, con retrasos de **0, 90 y 180 ms**. Los enlaces permanecen disponibles desde el inicio.
- Los bloques con `data-reveal` se observan hasta su primera entrada en el área visible, con un margen inferior de 32 px. Entonces reciben `.is-revealing`: pasan de opacidad 0 y desplazamiento vertical de 20 px a su posición normal en 560 ms.
- Cada bloque deja de observarse al activarse. Un `WeakSet` recuerda los bloques ya tratados y la clase temporal se retira al terminar la animación. No se repite al volver a subir.
- **No existe un estado oculto previo.** Si falta el archivo JavaScript, no existe `IntersectionObserver` o falla su inicialización, todo el contenido sigue visible.
- Las anclas conservan su comportamiento nativo. Al llegar mediante una ancla o con el teclado, se omite o cancela la animación del destino para mostrarlo inmediatamente.
- Con `prefers-reduced-motion: reduce`, CSS no aplica entradas ni transiciones. JavaScript no inicia el observador; si la preferencia cambia durante la visita, lo desconecta y elimina las animaciones en curso.
- No se interceptan eventos de desplazamiento, no se fija la pantalla y no se obliga a esperar. La versión para impresión también desactiva las animaciones.

## Archivos

| Archivo | Función |
| --- | --- |
| `index.html` | Contenido en inglés, estructura semántica y enlaces |
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

## Comprobaciones del rediseño

Realizadas el **13 de octubre de 2026**, con Chromium **154.0.8037.97** y herramientas ya instaladas. Scripts y capturas temporales fuera del repositorio.

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

Cambios sobre `feat/portfolio-redesign`, sin commit ni push. No se han modificado DNS, configuración de GitHub Pages ni publicación. `.agents/` y `skills-lock.json` ya existían y no forman parte de este cambio.
