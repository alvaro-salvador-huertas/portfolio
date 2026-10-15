# Portfolio de Álvaro Salvador Huertas

Portfolio en español de España e inglés: estudios, proyectos de software y exploración de agentes de IA. HTML, CSS y JavaScript nativo, sin dependencias ni compilación. Manrope se sirve localmente con su licencia SIL Open Font License.

## Vista local

Abre `index.html` en el navegador o ejecuta desde esta carpeta:

```bash
python3 -m http.server 8000 --bind 127.0.0.1
```

Visita <http://127.0.0.1:8000> y detén el servidor con `Ctrl+C`.

## Diseño y contenido

- [code-review-orchestrator](https://github.com/alvaro-salvador-huertas/code-review-orchestrator) abre la lista como «Prototipo evaluado» / «Evaluated prototype», antes de git-docs-agent y carrera-tech, cuyo contenido se conserva. Incluye una presentación ES/EN, el esquema ilustrativo de desarrollador, pruebas, revisor y decisión del controlador, y un enlace al [informe multicaso en español](https://github.com/alvaro-salvador-huertas/code-review-orchestrator/blob/main/evals/resultados-multicaso-2026-10-15.md). Distingue los dos ejercicios aprobados al primer intento y las cuatro invocaciones reales de las 126 pruebas del proyecto y de las pruebas de candidatos. La corrección adicional tiene cobertura simulada, pero no se observó en ese experimento; el esquema explicita el presupuesto máximo de dos intentos.
- Fondo blanco roto `#FAF9F6`, texto carbón `#292724` y terracota `#984D3B` como acento. Se conserva el nombre protagonista y la composición de cada sección; los esquemas usan tipografía y conectores, y AWS tiene un peso secundario.
- Los proyectos incluyen esquemas HTML/CSS, etiquetados como ilustrativos. No representan ejecuciones ni resultados medidos. El [informe de evaluación](https://github.com/alvaro-salvador-huertas/git-docs-agent/blob/main/evals/resultados-2026-10-13.md) conserva el detalle y los límites del agente.
- C++ y Python mantienen su contexto académico y personal. MySQL, Oracle SQL Developer, Linux, Git, GitHub e idiomas conservan la información previa. AWS figura como formación introductoria en curso.
- [git-docs-agent](https://github.com/alvaro-salvador-huertas/git-docs-agent) y [carrera-tech](https://github.com/alvaro-salvador-huertas/carrera-tech) son públicos: comprobado en la API de GitHub el 14 de octubre de 2026.

## Mantenimiento

`index.html` contiene el respaldo completo en inglés. `language.js` guarda ambas versiones en `messages`: al cambiar un texto, actualiza también su equivalente inglés en el HTML, incluidos título, descripción y etiquetas accesibles. Usa `data-i18n` solo en elementos sin hijos; para atributos, `data-i18n-content` y `data-i18n-aria-label`.

El selector ES/EN actualiza `html.lang` y `aria-pressed`, y guarda la elección en `localStorage` cuando está disponible. Sin JavaScript, el contenido inglés y los enlaces siguen funcionando; el selector permanece oculto.

`styles.css` define la composición, las máscaras del nombre y las transiciones de enlaces. `motion.js` usa Web Animations e `IntersectionObserver`: la portada termina en unos 920 ms; títulos, contenidos y esquemas tienen sus propios desfases. Los apellidos comparten la entrada si caben en una línea y se escalonan si se separan. El texto del nombre existe una sola vez en el HTML.

El contenido es visible por defecto, incluso si falla la inicialización. Cada elemento aparece una vez. Foco, anclas, redimensionado y movimiento reducido cancelan los efectos correspondientes. El desplazamiento sigue siendo nativo y los enlaces responden desde el principio. Con movimiento reducido, CSS muestra el estado final inmediatamente y JavaScript cancela las animaciones.

## Comprobaciones de la incorporación de code-review-orchestrator

Realizadas el **15 de octubre de 2026**, con Chrome **155.0.8059.79** y Playwright **1.57.0**, sobre HTTP local:

- ES y EN a **320, 390 y 1440 px**, con movimiento normal y reducido: 12 combinaciones, sin desbordamientos. Texto raíz al **200 %** comprobado en las mismas combinaciones. Capturas de los seis tamaños/idiomas revisadas visualmente.
- **89 destinos de traducción** contrastados con ambos diccionarios y el respaldo inglés, incluidas etiquetas accesibles. Orden de proyectos, identificadores únicos y referencias `aria-labelledby` comprobados. Los dos artículos previos y todas sus traducciones coinciden con la versión anterior.
- Los **18 enlaces y botones** recorridos con Tab y Shift+Tab en las 12 combinaciones: foco visible, salto al contenido y selector mediante Enter/Espacio operativos; elección de idioma conservada al recargar.
- La nueva sección reutiliza `motion.js` sin modificarlo. Sus diez entradas (texto y nueve partes del esquema) se producen una sola vez; recorrer de nuevo la página o cambiar de idioma no las reinicia. Sin animaciones con movimiento reducido; activar esa preferencia durante la entrada cancela los efectos.
- Contenido inglés visible y selector oculto **sin JavaScript** a los tres anchos. Sin errores JavaScript en las comprobaciones. HTML, CSS, ambos scripts, favicon y fuente local responden con HTTP 200.
- Todas las anclas tienen destino. Los seis enlaces externos de GitHub, incluidos el nuevo repositorio y el informe, responden con HTTP 200. LinkedIn rechaza la comprobación automática (HEAD 405, GET 999); su destino no se ha podido verificar y se conserva intacto.
- `node --check language.js`, `node --check motion.js` y `git diff --check` sin errores. Sin nuevas dependencias. CNAME, publicación, contactos, contenido personal y archivos locales ajenos al cambio conservados.

Los tamaños móviles están emulados y el aumento de fuente no equivale a zoom nativo. Los scripts de comprobación, informes y capturas quedan en `/tmp`, fuera del repositorio. Esta revisión no ejecuta los agentes ni las pruebas de code-review-orchestrator, ni repite las mediciones de Lighthouse de la revisión anterior.

## Comprobaciones anteriores

Realizadas el **14 de octubre de 2026**, con Chrome **155.0.8059.79** y Playwright, sobre HTTP local:

- ES y EN a 320, 390, 640, 768, 1024, 1440 y 1920 px, además de 844 × 390; sin desbordamientos. Fuente raíz al 200 % comprobada a 320, 390 y 1440 px en ambos idiomas.
- 64 destinos de traducción contrastados con el diccionario y el respaldo inglés, incluidos metadatos y etiquetas accesibles. Persistencia al recargar y cambio de idioma con almacenamiento bloqueado.
- Los 16 enlaces y botones recorridos con Tab y Shift+Tab a 390 y 1440 px, en ambos idiomas y con movimiento normal y reducido. Foco visible, selector con Enter/Espacio y salto al contenido operativos.
- Contraste del texto calculado: mínimo **5,33:1**. También comprobado el estado hover del botón principal.
- Anclas de secciones y destinos `focus-title` y `evaluation-title` comprobados en ambos idiomas. Los 27 elementos animados de las secciones y esquemas aparecen una sola vez; cambiar de idioma o volver a recorrerlos no reinicia los efectos. Entrada de portada medida en **920 ms** en móvil y escritorio. Sin animaciones con movimiento reducido ni al imprimir.
- Respaldo sin JavaScript, archivos de mejora bloqueados, IntersectionObserver ausente o con error y fallo parcial de animación: contenido legible. Interacción con el enlace de proyectos durante la entrada y cancelación del destino al navegar comprobadas. Sin errores JavaScript ni peticiones externas durante la carga normal.
- Vídeos reales de entrada y recorrido hasta proyectos, en 1440 × 900 y 390 × 844, grabados a 25 fps. Durante estas grabaciones, el percentil 95 de los intervalos de `requestAnimationFrame` fue de **16,7 y 16,8 ms**, respectivamente; sin tareas largas registradas. Se comprobaron también las fases del revelado, los saltos de línea y la ausencia de duplicados en el nombre accesible.
- Lighthouse **13.5.0**, móvil e inglés: **100** en rendimiento, accesibilidad, buenas prácticas y SEO; LCP **1,4 s**, bloqueo total **40 ms**, CLS **0**.
- `node --check` para ambos scripts y `git diff --check` sin errores. CNAME, favicon, fuentes y configuración de publicación conservados.

Los móviles están emulados; ampliar la fuente no equivale a zoom nativo. Los resultados de Lighthouse son de laboratorio. Estas comprobaciones no evalúan los proyectos enlazados. Scripts, informes, capturas y vídeos de revisión permanecen fuera del repositorio. El codificador de vídeo es una herramienta temporal en `/tmp`; el portfolio sigue sin dependencias.
