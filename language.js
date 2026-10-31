/* Keep both languages and the English HTML fallback in sync.
   Translate only leaf text and explicitly declared attributes. */
(() => {
  const messages = {
    "page.title": {
      "en": "Álvaro Salvador Huertas - AI Agents, Evals & Developer Tooling",
      "es": "Álvaro Salvador Huertas - Agentes de IA, evaluación y herramientas de desarrollo"
    },
    "page.description": {
      "en": "Third-year Computer Engineering student at the University of Granada. I build Python tools for AI agent orchestration, evaluation and software quality.",
      "es": "Estudiante de tercero de Ingeniería Informática en la Universidad de Granada. Desarrollo herramientas en Python para orquestación de agentes de IA, evaluación y calidad de software."
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
      "en": "I design tools to orchestrate AI agents and evaluate the software they generate.",
      "es": "Diseño herramientas para orquestar agentes de IA y evaluar el software que generan."
    },
    "hero.projects": {
      "en": "View projects",
      "es": "Ver proyectos"
    },
    "about.intro": {
      "en": "I’m a third-year Computer Engineering student at the University of Granada. I develop Python tools that integrate AI agents into workflows for querying documentation, planning, development and code review.",
      "es": "Soy estudiante de tercero de Ingeniería Informática en la Universidad de Granada. Desarrollo herramientas en Python que integran agentes de IA en flujos de consulta documental, planificación, desarrollo y revisión de código."
    },
    "about.focus": {
      "en": "My projects combine Codex CLI, context versioned in Git, structured outputs and independent evaluation. I use acceptance criteria, automated tests and GitHub Actions to check generated changes and retain evidence before integration under human supervision.",
      "es": "Mis proyectos combinan Codex CLI, contexto versionado en Git, salidas estructuradas y evaluación independiente. Trabajo con criterios de aceptación, pruebas automatizadas y GitHub Actions para contrastar los cambios generados y conservar evidencia antes de su incorporación bajo supervisión humana."
    },
    "orchestrator.status": {
      "en": "v1.0.0 released",
      "es": "v1.0.0 publicada"
    },
    "orchestrator.summary": {
      "en": "I built a supervised Python workflow for AI-assisted code changes. It combines planning with versioned Git references, developer and reviewer agents in separate sessions, independent tests, execution limits and inspectable records. Changes require human approval before integration.",
      "es": "He creado un flujo de trabajo supervisado en Python para cambios de código asistidos por IA. Combina planificación con referencias versionadas de Git, agentes de desarrollo y revisión en sesiones separadas, pruebas independientes, límites de ejecución y registros consultables. Incorporar los cambios requiere autorización humana."
    },
    "orchestrator.results": {
      "en": "Real experiments and assisted corrections are documented separately:",
      "es": "Los experimentos reales y las correcciones asistidas se documentan por separado:"
    },
    "orchestrator.tests": {
      "en": "The documented validation reports 768 test methods passed. Controller tests use simulated agents; Python evaluation processes actually run.",
      "es": "La validación documentada recoge 768 métodos de prueba superados. Las pruebas del controlador usan agentes simulados; los procesos Python de evaluación sí se ejecutan."
    },
    "orchestrator.problem": {
      "en": "An agent’s own verdict is not enough to validate a code change. This workflow adds independent checks and human oversight.",
      "es": "El dictamen de un agente no basta para validar un cambio de código. Este flujo añade comprobaciones independientes y supervisión humana."
    },
    "orchestrator.limits": {
      "en": "These results do not establish general reliability or measure an AI success rate.",
      "es": "Estos resultados no acreditan fiabilidad general ni miden una tasa de éxito de la IA."
    },
    "orchestrator.release": {
      "en": "Release v1.0.0",
      "es": "Versión v1.0.0"
    },
    "orchestrator.ci": {
      "en": "CI for the released commit",
      "es": "CI del commit publicado"
    },
    "orchestrator.versionResults": {
      "en": "v1 results & limits",
      "es": "Resultados y límites de v1"
    },
    "orchestrator.technologies": {
      "en": "code-review-orchestrator technologies",
      "es": "Tecnologías de code-review-orchestrator"
    },
    "orchestrator.resources": {
      "en": "code-review-orchestrator resources",
      "es": "Recursos de code-review-orchestrator"
    },
    "orchestrator.developer": {
      "en": "Developer agent",
      "es": "Agente desarrollador"
    },
    "orchestrator.developerAction": {
      "en": "Proposes a code change",
      "es": "Propone un cambio de código"
    },
    "orchestrator.independentTests": {
      "en": "Independent tests",
      "es": "Pruebas independientes"
    },
    "orchestrator.testsAction": {
      "en": "Evaluate the candidate in a separate Python process",
      "es": "Evalúan el candidato en otro proceso Python"
    },
    "orchestrator.reviewGate": {
      "en": "Only with passing tests and valid evidence",
      "es": "Solo con pruebas superadas y evidencia válida"
    },
    "orchestrator.reviewer": {
      "en": "Reviewer agent",
      "es": "Agente revisor"
    },
    "orchestrator.reviewerAction": {
      "en": "Inspects the code and evidence",
      "es": "Examina el código y la evidencia"
    },
    "orchestrator.controller": {
      "en": "Python controller’s decision",
      "es": "Decisión del controlador Python"
    },
    "orchestrator.decision": {
      "en": "Approve without integrating, request a correction or stop",
      "es": "Aprobar sin incorporar, pedir una corrección o detener"
    },
    "orchestrator.budget": {
      "en": "Up to 2 attempts in total. A correction needs remaining budget and valid evidence; technical errors stop the run.",
      "es": "Hasta 2 intentos en total. Una corrección requiere presupuesto disponible y evidencia válida; los errores técnicos detienen la ejecución."
    },
    "orchestrator.records": {
      "en": "Logs retained at each stage",
      "es": "Registros conservados en cada etapa"
    },
    "orchestrator.caption": {
      "en": "Benchmark exercises: illustrative flow, not a recorded run.",
      "es": "Ejercicios de benchmark: esquema ilustrativo, no una ejecución real."
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
    "development": {
      "en": "I use Codex to help develop these projects. I review the code and check how it behaves.",
      "es": "Uso Codex como apoyo para desarrollar estos proyectos. Reviso el código y compruebo cómo funciona."
    },
    "skills.title": {
      "en": "Capabilities",
      "es": "Capacidades"
    },
    "skills.workspace": {
      "en": "AI agents, evaluation & developer tooling",
      "es": "Agentes de IA, evaluación y herramientas de desarrollo"
    },
    "skills.orchestration": {
      "en": "Agent Orchestration",
      "es": "Orquestación de agentes"
    },
    "skills.orchestrationDetail": {
      "en": "Codex CLI integration and coordination of specialized agents in supervised planning, development and review workflows.",
      "es": "Integración de Codex CLI y coordinación de agentes especializados en flujos supervisados de planificación, desarrollo y revisión."
    },
    "skills.evaluation": {
      "en": "LLM & Agent Evaluation",
      "es": "Evaluación de LLM y agentes"
    },
    "skills.evaluationDetail": {
      "en": "Evaluation cases and criteria, answer and citation review, acceptance tests and failure analysis.",
      "es": "Casos y criterios de evaluación, revisión de respuestas y citas, pruebas de aceptación y análisis de fallos."
    },
    "skills.context": {
      "en": "Context Engineering",
      "es": "Ingeniería de contexto"
    },
    "skills.contextDetail": {
      "en": "Document context, Git-versioned references, separation of instructions from data and validation of structured outputs.",
      "es": "Contexto documental, referencias versionadas en Git, separación de instrucciones y datos y validación de salidas estructuradas."
    },
    "skills.quality": {
      "en": "Software Quality & CI",
      "es": "Calidad de software y CI"
    },
    "skills.qualityDetail": {
      "en": "Testing with unittest, acceptance and regression checks, pull request reviews and continuous integration with GitHub Actions.",
      "es": "Pruebas con unittest, aceptación y regresión, revisión mediante pull requests e integración continua con GitHub Actions."
    },
    "skills.programming": {
      "en": "Programming & Data",
      "es": "Programación y datos"
    },
    "skills.programmingDetail": {
      "en": "Python, C++, SQL and relational databases. Linux and Git throughout the development workflow.",
      "es": "Python, C++, SQL y bases de datos relacionales. Linux y Git como herramientas transversales de desarrollo."
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
    "crime.status": {
      "en": "Published code · local application",
      "es": "Código publicado · aplicación local"
    },
    "crime.problem": {
      "en": "An interactive machine learning lab for investigating data leakage and comparing evaluation procedures.",
      "es": "Laboratorio interactivo de machine learning para investigar fugas de información y comparar procedimientos de evaluación."
    },
    "crime.summary": {
      "en": "Guided, Laboratory and Detective modes combine real training on synthetic data, eight case files with evidence and interventions, and reproducible JSON reports. The project puts experimental design, model evaluation and automated testing into practice.",
      "es": "Los modos Guiado, Laboratorio y Detective combinan entrenamiento real sobre datos sintéticos, ocho expedientes con evidencias e intervenciones e informes JSON reproducibles. El proyecto aplica diseño experimental, evaluación de modelos y pruebas automatizadas."
    },
    "crime.technologies": {
      "en": "Data Crime Scene technologies",
      "es": "Tecnologías de Data Crime Scene"
    },
    "crime.resources": {
      "en": "Data Crime Scene resources",
      "es": "Recursos de Data Crime Scene"
    },
    "crime.code": {
      "en": "View code",
      "es": "Ver código"
    },
    "crime.methodology": {
      "en": "Methodology",
      "es": "Metodología"
    },
    "crime.tests": {
      "en": "226 automated tests",
      "es": "226 pruebas automatizadas"
    },
    "crime.imageAlt": {
      "en": "Data Crime Scene’s Guided Mode: mode selector and initial case brief, with the prediction objective and timing. Interface in Spanish.",
      "es": "Modo Guiado de Data Crime Scene: selector de modos e informe inicial del expediente, con el objetivo y el momento de predicción."
    },
    "crime.caption": {
      "en": "Guided Mode · real application screenshot, before running the experiment.",
      "es": "Recorrido guiado · captura real de la aplicación, antes de ejecutar el experimento."
    },
    "crime.imageLink": {
      "en": "View full-size screenshot (in Spanish)",
      "es": "Ver captura a tamaño completo"
    },
    "orchestrator.evidenceTitle": {
      "en": "Evidence & limits",
      "es": "Evidencia y límites"
    }
  };
  const storageKey = 'portfolio-language';
  const picker = document.querySelector('.language-switch');
  if (!picker) return;

  const targets = [
    ['data-i18n', null],
    ['data-i18n-aria-label', 'aria-label'],
    ['data-i18n-content', 'content'],
    ['data-i18n-alt', 'alt'],
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
    document.dispatchEvent(new Event('portfolio:languagechange'));
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
