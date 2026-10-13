/* Each key has both languages. Keep the English HTML fallback in sync.
   Only leaf text nodes and explicitly declared attributes are translated. */
(() => {
  const messages = {
    "page.description": {
      "en": "Álvaro Salvador Huertas, third-year Computer Engineering student at the University of Granada. Academic work in C++, Python projects, and an interest in AI agents, orchestration, and evaluation.",
      "es": "Álvaro Salvador Huertas, estudiante de tercero de Ingeniería Informática en la Universidad de Granada. Trabajo académico en C++, proyectos con Python e interés en agentes de IA, orquestación y evaluación."
    },
    "page.title": {
      "en": "Álvaro Salvador Huertas - Software & AI agents",
      "es": "Álvaro Salvador Huertas - Software y agentes de IA"
    },
    "skip": {
      "en": "Skip to content",
      "es": "Saltar al contenido"
    },
    "home": {
      "en": "as. - Álvaro Salvador Huertas - home",
      "es": "as. - Álvaro Salvador Huertas - inicio"
    },
    "navigation": {
      "en": "Main navigation",
      "es": "Navegación principal"
    },
    "section.about": {
      "en": "About",
      "es": "Sobre mí"
    },
    "section.projects": {
      "en": "Projects",
      "es": "Proyectos"
    },
    "section.skills": {
      "en": "Skills",
      "es": "Habilidades"
    },
    "section.contact": {
      "en": "Contact",
      "es": "Contacto"
    },
    "hero.description": {
      "en": "Computer Engineering student. Software & AI agents.",
      "es": "Estudiante de Ingeniería Informática. Software y agentes de IA."
    },
    "hero.projects": {
      "en": "Explore my projects",
      "es": "Explora mis proyectos"
    },
    "hero.scroll": {
      "en": "Scroll to explore",
      "es": "Desplázate para explorar"
    },
    "about.intro": {
      "en": "I'm Álvaro, a third-year Computer Engineering student at the University of Granada.",
      "es": "Soy Álvaro, estudiante de tercero de Ingeniería Informática en la Universidad de Granada."
    },
    "about.focus": {
      "en": "I'm interested in how AI agents work, how they are orchestrated, and how to evaluate their responses.",
      "es": "Me interesa cómo funcionan los agentes de IA, cómo se orquestan y cómo evaluar sus respuestas."
    },
    "about.approach": {
      "en": "I'm ambitious about the engineer I want to become. I take my work seriously, enjoy solving problems, and want to contribute to a team with initiative and responsibility.",
      "es": "Tengo ambición por el ingeniero que quiero llegar a ser. Me tomo mi trabajo en serio, disfruto resolviendo problemas y quiero aportar a un equipo con iniciativa y responsabilidad."
    },
    "about.context": {
      "en": "Programming context",
      "es": "Contexto de programación"
    },
    "about.cpp": {
      "en": "Academic coursework",
      "es": "Trabajo académico"
    },
    "about.python": {
      "en": "Software & agent projects",
      "es": "Proyectos de software y agentes"
    },
    "git.status": {
      "en": "Evaluated prototype",
      "es": "Prototipo evaluado"
    },
    "git.summary": {
      "en": "Git questions need answers backed by documentation. I built a Python terminal assistant around Codex CLI and five local notes, with instructions to cite sources and acknowledge missing information.",
      "es": "Las preguntas sobre Git necesitan respuestas respaldadas por documentación. He creado un asistente de terminal en Python basado en Codex CLI y cinco notas locales, con instrucciones para citar las fuentes y reconocer la información que falta."
    },
    "git.technologies": {
      "en": "git-docs-agent technologies",
      "es": "Tecnologías de git-docs-agent"
    },
    "git.evaluation": {
      "en": "Initial evaluation completed: all five predefined cases passed with the revised prompt and the same source notes. Three additional exploratory checks produced favorable results. These are individual observations, not a measure of general reliability. Program tests and answer evaluations are assessed separately.",
      "es": "Evaluación inicial completada: los cinco casos predefinidos se superaron con el prompt revisado y las mismas notas fuente. Tres comprobaciones exploratorias adicionales obtuvieron resultados favorables. Son observaciones individuales, no una medida de fiabilidad general. Las pruebas del programa y las evaluaciones de respuestas se valoran por separado."
    },
    "git.resources": {
      "en": "git-docs-agent resources",
      "es": "Recursos de git-docs-agent"
    },
    "repository": {
      "en": "Repository",
      "es": "Repositorio"
    },
    "evaluation.link": {
      "en": "Evaluation & limitations",
      "es": "Evaluación y limitaciones"
    },
    "evaluation.date": {
      "en": "13 Oct 2026",
      "es": "13 oct 2026"
    },
    "evaluation.language": {
      "en": "(Spanish)",
      "es": "(español)"
    },
    "carrera.status": {
      "en": "Public repository",
      "es": "Repositorio público"
    },
    "carrera.summary": {
      "en": "Python exercises and a study log for recording sessions and reviewing progress by subject. It includes input validation, JSON persistence, subject-level statistics, and automated tests.",
      "es": "Ejercicios de Python y un registro de estudio para guardar sesiones y revisar el progreso por asignatura. Incluye validación de entradas, persistencia en JSON, estadísticas por asignatura y pruebas automatizadas."
    },
    "carrera.technologies": {
      "en": "carrera-tech technologies",
      "es": "Tecnologías de carrera-tech"
    },
    "carrera.tests": {
      "en": "Automated tests",
      "es": "Pruebas automatizadas"
    },
    "carrera.context": {
      "en": "My foundation for working with structured data and checking program behaviour.",
      "es": "Mi base para trabajar con datos estructurados y comprobar el comportamiento de los programas."
    },
    "carrera.resources": {
      "en": "carrera-tech resources",
      "es": "Recursos de carrera-tech"
    },
    "development": {
      "en": "I develop these projects with assistance from Codex, taking time to understand the code and check its behaviour.",
      "es": "Desarrollo estos proyectos con asistencia de Codex, dedicando tiempo a entender el código y comprobar su comportamiento."
    },
    "skills.programming": {
      "en": "Programming",
      "es": "Programación"
    },
    "skills.programmingDetail": {
      "en": "C++ through academic coursework; Python through software and AI agent projects.",
      "es": "C++ en trabajos académicos; Python en proyectos de software y agentes de IA."
    },
    "skills.databases": {
      "en": "Databases & tools",
      "es": "Bases de datos y herramientas"
    },
    "skills.databasesDetail": {
      "en": "MySQL for relational databases; Oracle SQL Developer as a database development tool.",
      "es": "MySQL para bases de datos relacionales; Oracle SQL Developer como herramienta de desarrollo de bases de datos."
    },
    "skills.workflow": {
      "en": "Development workflow",
      "es": "Flujo de desarrollo"
    },
    "skills.workflowDetail": {
      "en": "Working environment, version control, and repository collaboration.",
      "es": "Entorno de trabajo, control de versiones y colaboración en repositorios."
    },
    "skills.approach": {
      "en": "Working approach",
      "es": "Forma de trabajar"
    },
    "skills.strengths": {
      "en": "Problem solving & leadership",
      "es": "Resolución de problemas y liderazgo"
    },
    "skills.strengthsDetail": {
      "en": "I aim to break problems down, take initiative, and help a team move work forward.",
      "es": "Busco descomponer los problemas, tomar la iniciativa y ayudar a un equipo a avanzar en su trabajo."
    },
    "learning.title": {
      "en": "Ongoing training",
      "es": "Formación en curso"
    },
    "learning.aws": {
      "en": "Introductory training in progress",
      "es": "Formación introductoria en curso"
    },
    "languages.title": {
      "en": "Languages",
      "es": "Idiomas"
    },
    "languages.names": {
      "en": "Spanish & English",
      "es": "Español e inglés"
    },
    "languages.level": {
      "en": "Native proficiency in both",
      "es": "Dominio nativo de ambos"
    },
    "contact.description": {
      "en": "For internship opportunities or a conversation about my projects, you can reach me by email.",
      "es": "Para oportunidades de prácticas o para hablar sobre mis proyectos, puedes escribirme por correo."
    },
    "contact.profiles": {
      "en": "Contact profiles",
      "es": "Perfiles de contacto"
    },
    "footer.top": {
      "en": "Back to top",
      "es": "Volver al inicio"
    },
    "skills.cppPython": {
      "en": "C++ & Python",
      "es": "C++ y Python"
    },
    "skills.mysqlOracle": {
      "en": "MySQL & Oracle SQL Developer",
      "es": "MySQL y Oracle SQL Developer"
    },
    "skills.tools": {
      "en": "Linux, Git & GitHub",
      "es": "Linux, Git y GitHub"
    },
    "language.label": {
      "en": "Page language",
      "es": "Idioma de la página"
    },
    "language.es": {
      "en": "ES - Spanish",
      "es": "ES - Español"
    },
    "language.en": {
      "en": "EN - English",
      "es": "EN - Inglés"
    }
  };
  const storageKey = 'portfolio-language';
  const picker = document.querySelector('.language-switch');
  if (!picker) return;

  const targets = [
    ['data-i18n', null],
    ['data-i18n-aria-label', 'aria-label'],
    ['data-i18n-content', 'content'],
  ];
  const bindings = targets.flatMap(([marker, attribute]) =>
    [...document.querySelectorAll(`[${marker}]`)].map(element => ({
      element, attribute, key: element.getAttribute(marker),
    }))
  );
  // A missing entry leaves the complete English fallback and the picker hidden.
  if (bindings.some(({key}) => !messages[key]?.en || !messages[key]?.es)) return;

  const buttons = [...picker.querySelectorAll('[data-language]')];
  function setLanguage(language) {
    if (language !== 'en' && language !== 'es') return;
    bindings.forEach(({element, attribute, key}) => {
      const value = messages[key][language];
      if (attribute) element.setAttribute(attribute, value);
      else element.textContent = value;
    });
    document.documentElement.lang = language;
    buttons.forEach(button => {
      button.setAttribute('aria-pressed', String(button.dataset.language === language));
    });
  }

  let initialLanguage = 'en';
  try {
    const stored = window.localStorage.getItem(storageKey);
    if (stored === 'es' || stored === 'en') initialLanguage = stored;
  } catch {
    // Storage can be blocked; switching still works for the current visit.
  }
  setLanguage(initialLanguage);
  buttons.forEach(button => button.addEventListener('click', () => {
    const language = button.dataset.language;
    setLanguage(language);
    try {
      window.localStorage.setItem(storageKey, language);
    } catch {
      // No persistence is required to update the page.
    }
  }));
  // Reveal controls only after initialization and event binding have succeeded.
  picker.hidden = false;
})();
