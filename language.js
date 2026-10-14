/* Keep both languages and the English HTML fallback in sync.
   Translate only leaf text and explicitly declared attributes. */
(() => {
  const messages = {
    "page.title": {
      "en": "Álvaro Salvador Huertas - Software & AI agents",
      "es": "Álvaro Salvador Huertas - Software y agentes de IA"
    },
    "page.description": {
      "en": "Álvaro Salvador Huertas, Computer Engineering student at the University of Granada. C++ coursework, Python projects and experiments with AI agents.",
      "es": "Álvaro Salvador Huertas, estudiante de Ingeniería Informática en la Universidad de Granada. C++ en la carrera, proyectos en Python y exploración de agentes de IA."
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
      "es": "Competencias"
    },
    "section.contact": {
      "en": "Contact",
      "es": "Contacto"
    },
    "hero.description": {
      "en": "What I’m building, and what I’m learning along the way.",
      "es": "Comparto lo que construyo y lo que aprendo por el camino."
    },
    "hero.projects": {
      "en": "View projects",
      "es": "Ver proyectos"
    },
    "about.intro": {
      "en": "I’m a third-year Computer Engineering student at the University of Granada. I’m passionate about building AI systems and understanding how they work.",
      "es": "Estudio tercero de Ingeniería Informática en la Universidad de Granada. Me apasiona el desarrollo de sistemas de inteligencia artificial y entender cómo funcionan por dentro."
    },
    "about.focus": {
      "en": "I use C++ in my coursework and Python in my own projects. My current focus is AI agents: how they use tools, work together, and how to evaluate their results.",
      "es": "Trabajo con C++ en la carrera y desarrollo proyectos en Python. Ahora estoy centrado en agentes de IA: cómo utilizan herramientas, cómo se coordinan y cómo evaluar sus resultados."
    },
    "git.status": {
      "en": "AI agent prototype",
      "es": "Prototipo de agente de IA"
    },
    "git.summary": {
      "en": "I built this terminal assistant to answer Git questions using Codex CLI and local notes.",
      "es": "He creado este asistente para consultar dudas sobre Git desde la terminal, con Codex CLI y notas locales."
    },
    "git.technologies": {
      "en": "git-docs-agent technologies",
      "es": "Tecnologías de git-docs-agent"
    },
    "git.resources": {
      "en": "git-docs-agent resources",
      "es": "Recursos de git-docs-agent"
    },
    "repository": {
      "en": "View repository",
      "es": "Ver repositorio"
    },
    "evaluation.link": {
      "en": "Evaluation & limitations",
      "es": "Evaluación y límites"
    },
    "evaluation.language": {
      "en": "(in Spanish)",
      "es": "(en español)"
    },
    "git.question": {
      "en": "How do git add and git commit differ?",
      "es": "¿En qué se diferencian git add y git commit?"
    },
    "git.notes": {
      "en": "Local notes",
      "es": "Notas locales"
    },
    "git.agent": {
      "en": "Agent",
      "es": "Agente"
    },
    "git.answer": {
      "en": "Answer with sources",
      "es": "Respuesta con fuentes"
    },
    "carrera.status": {
      "en": "Python practice",
      "es": "Práctica con Python"
    },
    "carrera.summary": {
      "en": "This is where I keep my Python exercises and a study log for recording sessions and reviewing them by subject.",
      "es": "Aquí reúno mis ejercicios de Python y un registro para guardar sesiones de estudio y revisarlas por asignatura."
    },
    "carrera.technologies": {
      "en": "carrera-tech technologies",
      "es": "Tecnologías de carrera-tech"
    },
    "carrera.tests": {
      "en": "Automated tests",
      "es": "Pruebas automatizadas"
    },
    "carrera.resources": {
      "en": "carrera-tech resources",
      "es": "Recursos de carrera-tech"
    },
    "carrera.storage": {
      "en": "Save sessions",
      "es": "Guardar sesiones"
    },
    "carrera.summaryLabel": {
      "en": "Summary by subject",
      "es": "Resumen por asignatura"
    },
    "development": {
      "en": "I use Codex to help develop these projects. I review the code and check how it behaves.",
      "es": "Uso Codex como apoyo para desarrollar estos proyectos. Reviso el código y compruebo cómo funciona."
    },
    "skills.programming": {
      "en": "Programming",
      "es": "Programación"
    },
    "skills.cppPython": {
      "en": "C++ & Python",
      "es": "C++ y Python"
    },
    "skills.programmingDetail": {
      "en": "C++ for coursework; Python for personal projects.",
      "es": "C++ en la carrera; Python en proyectos propios."
    },
    "skills.databases": {
      "en": "Databases",
      "es": "Bases de datos"
    },
    "skills.mysqlOracle": {
      "en": "MySQL & Oracle SQL Developer",
      "es": "MySQL y Oracle SQL Developer"
    },
    "skills.databasesDetail": {
      "en": "Relational databases with MySQL; database development with Oracle SQL Developer.",
      "es": "Bases de datos relacionales con MySQL y desarrollo de bases de datos con Oracle SQL Developer."
    },
    "skills.workflow": {
      "en": "Development tools",
      "es": "Herramientas de desarrollo"
    },
    "skills.tools": {
      "en": "Linux, Git & GitHub",
      "es": "Linux, Git y GitHub"
    },
    "skills.workflowDetail": {
      "en": "My working environment and tools for version control.",
      "es": "Entorno de trabajo y control de versiones."
    },
    "learning.title": {
      "en": "Currently learning",
      "es": "Formación en curso"
    },
    "learning.aws": {
      "en": "Introductory training.",
      "es": "Formación introductoria."
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
    "contact.title": {
      "en": "Let’s talk.",
      "es": "¿Hablamos?"
    },
    "contact.description": {
      "en": "Have an internship opportunity or a question about a project? Send me an email.",
      "es": "Si tienes una propuesta de prácticas o quieres hablar de algún proyecto, escríbeme."
    },
    "contact.profiles": {
      "en": "Contact profiles",
      "es": "Perfiles de contacto"
    },
    "footer.top": {
      "en": "Back to top",
      "es": "Volver arriba"
    },
    "git.questionLabel": {
      "en": "Question",
      "es": "Pregunta"
    },
    "git.addAnswer": {
      "en": "Stages changes in the index.",
      "es": "Prepara cambios en el índice."
    },
    "git.commitAnswer": {
      "en": "Creates a local commit from staged changes.",
      "es": "Crea un commit local con los cambios preparados."
    },
    "git.sources": {
      "en": "Sources",
      "es": "Fuentes"
    },
    "git.caption": {
      "en": "Illustrative workflow with an example answer.",
      "es": "Esquema ilustrativo con una respuesta de ejemplo."
    },
    "carrera.sessions": {
      "en": "Study sessions",
      "es": "Sesiones de estudio"
    },
    "carrera.networks": {
      "en": "Networks",
      "es": "Redes"
    },
    "carrera.total": {
      "en": "Total",
      "es": "Total"
    },
    "carrera.caption": {
      "en": "Illustrative workflow. Sample data.",
      "es": "Esquema ilustrativo. Datos de ejemplo."
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
