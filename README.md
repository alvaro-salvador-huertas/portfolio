# Portfolio de Álvaro Salvador Huertas

Primera versión local del portfolio pensado para **alvarosalvadorhuertas.com**. La web está escrita en inglés; esta guía está en español. Utiliza HTML y CSS, sin frameworks, JavaScript, backend, compilación ni dependencias de terceros.

## Verla en local

Abre `index.html` directamente en un navegador. La página, los estilos, el icono y la navegación interna funcionan sin conexión; los enlaces a GitHub y LinkedIn necesitan internet.

También puedes servirla con Python, si lo tienes instalado. Desde esta carpeta:

```bash
python3 -m http.server 8000 --bind 127.0.0.1
```

Abre <http://127.0.0.1:8000>. Detén el servidor con `Ctrl+C`. Python solo se usa para la previsualización: no es una dependencia de la web. Si el puerto está ocupado, cambia `8000` por otro, también en la dirección del navegador.

## Archivos

```text
portfolio/
├── index.html          Contenido, estructura semántica y enlaces
├── styles.css          Colores, tipografías, composición y adaptación móvil
├── assets/
│   └── favicon.svg     Icono vectorial de la pestaña, dibujado para esta web
└── README.md           Instrucciones de uso, mantenimiento y comprobaciones
```

Las carpetas ocultas que ya existían en el entorno no forman parte de la web y no se han modificado. No hace falta subirlas ni servirlas en un futuro alojamiento.

## Modificar textos

Edita `index.html` con cualquier editor de texto. Los comentarios `INTRODUCTION`, `PROJECTS`, `ABOUT` y `CONTACT` señalan los bloques principales. Guarda y recarga el navegador; si los estilos parecen antiguos, fuerza la recarga con `Ctrl+Shift+R`.

- **Presentación:** cambia el `h1`, el párrafo `hero-description` y las preguntas de `focus-note`.
- **Sobre mí:** actualiza los párrafos de `about-copy` y los datos de `background-facts`. El curso universitario aparece también en la presentación y en la descripción de la página.
- **Título y resumen para buscadores:** edita `<title>` y `<meta name="description">` dentro de `<head>`.
- **Idioma:** la página usa `<html lang="en">`. Mantén los textos públicos en inglés; si cambias el idioma principal, actualiza ese atributo.

No hay datos generados automáticamente ni contenido remoto: todo el texto está en el HTML. Mantén el estado de los proyectos y las limitaciones de sus resultados actualizados.

## Modificar o añadir proyectos

Cada proyecto es un `<article>` dentro de la sección con `id="projects"`.

1. Para editar uno, cambia su título `h3`, descripción, bloques de problema/funcionamiento/aprendizaje y lista `tech-list`.
2. Para añadir otro proyecto sencillo, copia el artículo completo `foundations-project` antes del cierre de la sección de proyectos.
3. Cambia el número visible, el nombre, los textos, las tecnologías y el enlace al repositorio.
4. Asigna un `id` único al nuevo `h3` y usa el mismo valor en el `aria-labelledby` del artículo. Por ejemplo, `id="new-project-title"` y `aria-labelledby="new-project-title"`.

El proyecto destacado utiliza `featured-project` y un esquema explicativo en HTML/CSS. El esquema es una figura estática, no una demo conectada a Codex. `evaluation-note` explica los límites de la evaluación y enlaza el informe público. No confundas pruebas del programa con evaluación de la calidad de las respuestas ni presentes un éxito técnico como garantía de corrección.

## Cambiar colores, tipografía y espaciado

Las variables de `:root`, al principio de `styles.css`, centralizan las decisiones principales:

| Variable | Uso |
| --- | --- |
| `--color-paper` | Fondo cálido principal |
| `--color-ink` | Texto principal |
| `--color-muted` | Texto secundario |
| `--color-accent` | Azul de enlaces, detalles y fondo de contacto |
| `--color-accent-dark` | Azul al pasar el puntero sobre enlaces destacados |
| `--color-line` | Separadores y bordes neutros |
| `--color-blue-tint` / `--color-blue-line` | Fondo y bordes del esquema |
| `--color-about` | Fondo de la sección sobre mí |
| `--font-body` | Tipografía de lectura |
| `--font-display` | Tipografía editorial de títulos |
| `--font-mono` | Etiquetas técnicas pequeñas |
| `--content-width` | Anchura máxima del contenido |

Los colores claros del texto de contacto están definidos en su propio bloque CSS: revísalos si cambias el azul. Cambia también `theme-color` en el HTML y los colores del SVG si modificas la identidad visual.

Se utilizan fuentes instaladas en cada sistema, sin descargas ni peticiones a Google Fonts. El aspecto exacto de las letras puede variar entre dispositivos. Los títulos serif y en cursiva aportan personalidad; el texto de lectura utiliza una familia sans serif del sistema.

El CSS está organizado en siete bloques comentados. Los ajustes para tablet y móvil están en el bloque 6. El contenido pasa de dos columnas a una; la navegación permanece visible y no necesita un menú de JavaScript. No hay alturas fijas de contenido ni texto oculto en móvil.

## Cambiar enlaces y recursos

Todos los destinos están en los atributos `href` de `index.html`:

- Los enlaces `#projects`, `#about`, `#contact`, `#main` y `#top` apuntan a identificadores de esta página. Si cambias un `id`, actualiza todos sus enlaces.
- Los enlaces externos abren en la misma pestaña y permiten volver con el botón del navegador.
- Repositorios, perfil de GitHub y LinkedIn usan las direcciones proporcionadas. LinkedIn conserva la codificación `%C3%A1` de la `á`.
- El informe de evaluación tiene una URL a un archivo fechado. Actualízala y revisa el texto cuando haya nuevas evaluaciones.
- Guarda futuras imágenes o documentos en `assets/` y usa rutas relativas como `assets/project.webp`. Añade texto alternativo útil a las imágenes informativas (`alt="..."`) y vacío a las puramente decorativas (`alt=""`).

No hay formulario, correo, CV, analítica, cookies ni llamadas a servicios externos al cargar la página.

## Fuentes del contenido

- Datos personales, estudios, idiomas, orientación y formación introductoria en AWS: facilitados por Álvaro para esta versión. No se afirma experiencia profesional, dominio experto ni certificaciones.
- **git-docs-agent:** [README público](https://github.com/alvaro-salvador-huertas/git-docs-agent), consultado el 12 de octubre de 2026 a través del archivo en `raw.githubusercontent.com`. Confirma las cinco notas, Codex CLI, las instrucciones de citas e información insuficiente, los registros, pruebas con un proceso simulado y una evaluación manual inicial. Documenta un fallo inicial y casos pendientes de repetir tras ajustar el prompt. La web no presenta todos los casos como superados ni afirma fiabilidad general.
- **carrera-tech:** descripción proporcionada por Álvaro. La consulta pública del repositorio y del README de la rama `main` devolvió 404; no se ha inferido contenido adicional ni se ha sustituido su URL por otro proyecto.

## Accesibilidad y comprobaciones

La implementación incluye idioma declarado, regiones semánticas, una jerarquía de encabezados, nombres descriptivos de enlaces, enlace para saltar al contenido y foco visible. Los iconos decorativos se ocultan a lectores de pantalla. No hay animaciones; el desplazamiento suave se desactiva con `prefers-reduced-motion: reduce`. El contraste y la adaptación deben volver a comprobarse después de cambiar colores o composición.

Comprobaciones realizadas el **12 de octubre de 2026** con Chrome 154 en modo headless, sobre un servidor local:

| Comprobación | Resultado |
| --- | --- |
| HTML, CSS y favicon por HTTP | Respuesta 200 y tipos de contenido correctos |
| Apertura directa sin conexión | `index.html` abierto mediante `file://` con la red desactivada en Chrome: estilos y navegación interna correctos |
| Estructura del HTML | Idioma inglés, un solo `h1`, identificadores únicos y recursos locales existentes |
| Enlaces internos | Destinos existentes; navegación a Projects, About, Contact y al inicio verificada en el navegador |
| Adaptación | 320, 390, 540, 768, 800, 1024, 1440 y 1920 px, sin desbordamiento horizontal ni elementos fuera del ancho de pantalla |
| Reflujo | Sin desbordamiento a 320 px de viewport de escritorio, equivalente al espacio de una pantalla de 1280 px ampliada al 400 %; no se ha probado el zoom nativo de la interfaz |
| Teclado | Recorrido de todos los enlaces con Tab, retroceso con Shift+Tab, foco visible y activación del salto al contenido con Enter |
| Movimiento reducido | Preferencia emulada; `scroll-behavior` cambia a `auto` |
| Contraste del texto | Mínimo calculado de 5,06:1 sobre los fondos efectivos, superior a 4,5:1 |
| Árbol de accesibilidad | Regiones, niveles de encabezado y nombres de enlaces presentes; ningún enlace sin nombre |
| Errores del navegador | Sin errores de ejecución, recursos fallidos ni respuestas HTTP de error en la carga local |
| Revisión visual | Capturas de escritorio (1440 px), móvil (390 px) y del proyecto destacado |

Los scripts y capturas de revisión son temporales y no añaden dependencias ni archivos de ejecución al portfolio. Estas comprobaciones no equivalen a una auditoría completa de accesibilidad.

Estado de los enlaces externos al realizar la comprobación:

| Destino | Resultado |
| --- | --- |
| Repositorio git-docs-agent | HTTP 200 |
| Informe de evaluación de git-docs-agent | HTTP 200 |
| Perfil de GitHub | HTTP 200 |
| Repositorio carrera-tech | HTTP 404: confirmar la dirección o su visibilidad pública antes de publicar |
| Perfil de LinkedIn | HTTP 999 en la consulta automática: comprobar manualmente desde un navegador |

Se conservan las URLs proporcionadas; no se ha accedido a cuentas ni cambiado la visibilidad de los repositorios. Quedan pendientes las verificaciones con Firefox, Safari, dispositivos móviles reales y un lector de pantalla. La adaptación móvil se ha comprobado mediante emulación de tamaños en Chrome.

Para revisar cambios futuros:

1. Prueba al menos 320, 390, 768 y 1440 píxeles de anchura, comprobando que no haya desplazamiento horizontal ni texto cortado.
2. Recorre los enlaces con `Tab` y `Shift+Tab`. El primer enlace debe permitir saltar al contenido; activa la navegación con `Enter`.
3. Aumenta el zoom y activa la preferencia de movimiento reducido del sistema.
4. Comprueba destinos externos e internos y que el favicon y el CSS se carguen.
5. Si cambias colores, comprueba un contraste mínimo de 4,5:1 para texto normal y 3:1 para texto grande. Revisa también el foco sobre cada fondo.
6. Revisa la página en Firefox y Safari, en un móvil real y con un lector de pantalla antes de una publicación futura.

## Alcance de esta entrega

Solo versión local. No se ha publicado la web, registrado un sitio, cambiado DNS ni accedido a IONOS. No hay configuración de despliegue ni vínculo activo entre estos archivos y el dominio. La publicación futura es una tarea separada.
