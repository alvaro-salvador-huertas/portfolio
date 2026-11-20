/* Native, scroll-linked choreography. Content works before enhancement.
   Frames are scheduled on input, with no permanent rendering loop. */
(() => {
  const root = document.documentElement;
  const opening = document.querySelector('.opening');
  const header = document.querySelector('.site-header');
  const hero = document.querySelector('.hero');
  const title = hero?.querySelector('h1');
  const bottom = hero?.querySelector('.hero-bottom');
  const skills = document.querySelector('#skills');
  const workbench = skills?.querySelector('.tool-workbench');
  if (!opening || !header || !hero || !title || !bottom || !workbench ||
      !window.matchMedia || !window.IntersectionObserver || !title.animate) return;

  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const wide = matchMedia('(min-width: 1000px) and (min-height: 720px)');
  const projects = Array.from(document.querySelectorAll('.project-window'));
  const fine = matchMedia('(hover: hover) and (pointer: fine)');
  const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
  const easing = 'cubic-bezier(.16, 1, .3, 1)';
  const animations = new Set();
  const seen = new WeakSet();
  let events;
  let observer;
  let resizeObserver;
  let frame = 0;
  let needsMeasure = true;
  let enabled = false;
  let heroFrame;
  let echo;
  let progress;
  let projectNav;
  let projectLinks = [];
  let activeProject = -1;
  let metrics = {};
  let pointer = { x: 0, y: 0 };

  function on(target, event, listener, options = {}) {
    target.addEventListener(event, listener, { ...options, signal: events.signal });
  }

  function animate(element, keyframes, options = {}) {
    const animation = element.animate(keyframes, { duration: 900, easing, ...options });
    animations.add(animation);
    animation.finished.catch(() => {}).finally(() => animations.delete(animation));
  }

  function settle() {
    animations.forEach(animation => animation.cancel());
    animations.clear();
    document.querySelectorAll('[data-motion-pending]').forEach(element => {
      element.removeAttribute('data-motion-pending');
    });
  }

  function wrapContent() {
    if (heroFrame) return;
    heroFrame = document.createElement('div');
    heroFrame.className = 'hero-frame';
    heroFrame.append(title);
    hero.append(heroFrame, bottom);
    echo = document.createElement('div');
    echo.className = 'hero-echo';
    echo.setAttribute('aria-hidden', 'true');
    for (let index = 0; index < 2; index++) {
      const line = document.createElement('span');
      line.textContent = 'Álvaro Salvador Huertas · Álvaro Salvador Huertas';
      echo.append(line);
    }
    hero.prepend(echo);
    progress = document.createElement('div');
    progress.className = 'motion-progress';
    progress.setAttribute('aria-hidden', 'true');
    document.body.prepend(progress);

    projectNav = document.createElement('nav');
    projectNav.className = 'project-index';
    projectNav.setAttribute('aria-labelledby', 'projects-title');
    projects.forEach((project, index) => {
      const heading = project.querySelector('h3');
      project.id ||= 'project-' + heading.id;
      project.tabIndex = -1;
      const link = document.createElement('a');
      link.href = '#' + project.id;
      link.textContent = heading.textContent;
      projectLinks.push(link);
      projectNav.append(link);
      const figure = project.querySelector('.project-visual');
      if (figure) {
        const art = document.createElement('div');
        art.className = 'project-art';
        const parts = Array.from(figure.children).filter(child => child.tagName !== 'FIGCAPTION');
        parts[0]?.before(art);
        art.append(...parts);
      }
      project.style.setProperty('--project-accent', ['#245baa', '#39776b', '#76589a', '#a35c35'][index]);
    });
    document.querySelector('.project-stack')?.before(projectNav);
  }

  function measure() {
    const headerSpace = header.getBoundingClientRect().height + (innerWidth < 768 ? 24 : 40);
    root.style.setProperty('--header-space', headerSpace + 'px');
    const dockHeight = projectNav.offsetHeight;
    const projectOffset = headerSpace + (innerWidth >= 1000 ? dockHeight + 28 : 16);
    root.style.setProperty('--project-offset', projectOffset + 'px');
    opening.classList.toggle('hero-pinned', wide.matches);
    const projectMetrics = projects.map(project => {
      const figure = project.querySelector('.project-visual');
      figure?.classList.toggle('visual-pinned', innerWidth >= 1180 &&
        figure.offsetHeight + projectOffset + 36 < innerHeight);
      return {
        element: project,
        art: project.querySelector('.project-art'),
        top: project.getBoundingClientRect().top + scrollY,
        height: project.offsetHeight,
      };
    });
    metrics = {
      maxScroll: Math.max(1, root.scrollHeight - innerHeight),
      heroStart: opening.getBoundingClientRect().top + scrollY,
      heroDistance: Math.max(1, opening.offsetHeight - innerHeight),
      projectOffset,
      projects: projectMetrics,
    };
    needsMeasure = false;
  }

  function render() {
    frame = 0;
    if (!enabled || document.hidden) return;
    if (needsMeasure) measure();
    const y = scrollY;
    progress.style.transform = 'scaleX(' + clamp(y / metrics.maxScroll) + ')';
    const p = wide.matches ? clamp((y - metrics.heroStart) / metrics.heroDistance) : 0;
    const eased = 1 - Math.pow(1 - p, 3);
    heroFrame.style.transform = wide.matches
      ? 'translate3d(' + pointer.x + 'px, ' + (pointer.y - eased * 18) +
        'px, 0) scale(' + (1 - eased * 0.28) + ') rotate(' + (-eased * 1.2) + 'deg)'
      : '';
    hero.style.setProperty('--hero-frame-opacity', eased.toFixed(3));
    hero.style.setProperty('--hero-echo-opacity', (clamp((p - 0.1) / 0.4) * 0.3).toFixed(3));
    echo.style.setProperty('--echo-offset', (-p * 220) + 'px');
    let current = 0;
    metrics.projects.forEach((project, index) => {
      if (y + metrics.projectOffset + innerHeight * 0.2 >= project.top) current = index;
      const position = clamp((y + innerHeight * 0.6 - project.top) /
        Math.max(1, project.height + innerHeight * 0.15));
      projectLinks[index].style.setProperty('--project-progress', position.toFixed(4));
      project.element.style.setProperty('--project-progress', position.toFixed(4));
      // Artwork moves independently; copy and links keep stable hit targets.
      if (project.art && project.top < y + innerHeight && project.top + project.height > y) {
        const drift = innerWidth >= 1000 ? (position - 0.5) * -24 : 0;
        project.art.style.setProperty('--art-shift', drift.toFixed(2) + 'px');
      }
    });
    if (current !== activeProject) {
      activeProject = current;
      projectLinks.forEach((link, index) => {
        if (index === current) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }
  }

  function schedule(measureAgain = false) {
    needsMeasure ||= measureAgain;
    if (enabled && !frame && !document.hidden) frame = requestAnimationFrame(render);
  }

  function reveal(element, index = 0) {
    element.removeAttribute('data-motion-pending');
    if (seen.has(element)) return;
    seen.add(element);
    if (element.contains(document.activeElement)) return;
    if (element.matches('.project-copy')) {
      Array.from(element.children).forEach((part, partIndex) => {
        animate(part, [
          { opacity: 0.25, transform: 'translate3d(0, 32px, 0)' },
          { opacity: 1, transform: 'none' },
        ], { duration: 750, delay: Math.min(partIndex, 5) * 75 });
      });
      return;
    }
    if (element.matches('.project-visual')) {
      animate(element, [
        { opacity: 0.3, transform: 'translate3d(0, 44px, 0) scale(.96)' },
        { opacity: 1, transform: 'none' },
      ], { duration: 1100 });
      const panels = element.querySelectorAll('.diagram-panel, .agent-core, .document-sheet');
      panels.forEach((panel, panelIndex) => animate(panel, [
        { opacity: 0.2, transform: 'translateY(14px)' },
        { opacity: 1, transform: 'none' },
      ], { duration: 700, delay: 180 + panelIndex * 85 }));
      element.querySelectorAll('.flow-connectors path, .flow-connectors line').forEach(path => {
        const length = path.getTotalLength?.();
        if (!length || !Number.isFinite(length)) return;
        animate(path, [
          { strokeDasharray: length + ' ' + length, strokeDashoffset: length },
          { strokeDasharray: length + ' ' + length, strokeDashoffset: 0 },
        ], { duration: 1000, delay: 250 });
      });
      return;
    }
    if (element.matches('.tool-capabilities .tool-group, .tool-support .tool-group')) {
      const cardIndex = Array.from(workbench.querySelectorAll('.tool-capabilities .tool-group, .tool-support .tool-group')).indexOf(element);
      animate(element, [
        { opacity: 0.25, transform: 'translate3d(0, 52px, 0) scale(.96)' },
        { opacity: 1, transform: 'none' },
      ], { duration: 950, delay: (cardIndex % 3) * 100 });
      const icon = element.querySelector('.tool-icon');
      if (icon) animate(icon, [
        { transform: 'translateY(8px) rotate(-12deg)', opacity: 0.1 },
        { transform: 'none', opacity: 1 },
      ], { duration: 850, delay: 180 + (cardIndex % 3) * 100 });
      return;
    }
    animate(element, [
      { opacity: 0.1, transform: 'translate3d(0, 40px, 0)' },
      { opacity: 1, transform: 'none' },
    ], { delay: (index % 3) * 100 });
    const rule = element.querySelector('.section-rule');
    if (rule) animate(rule, [{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }], { delay: 120 });
  }

  function observeContent() {
    observer = new IntersectionObserver(entries => {
      entries.filter(entry => entry.isIntersecting).forEach((entry, index) => {
        observer.unobserve(entry.target);
        reveal(entry.target, index);
      });
    }, { rootMargin: '0px 0px -5% 0px', threshold: 0.08 });
    document.querySelectorAll('.section-heading, .about-layout, .project-copy, .project-visual, .orchestrator-evidence, .tool-capabilities .tool-group, .tool-support .tool-group, .tool-notes, .contact-layout').forEach(element => {
      if (seen.has(element)) return;
      if (element.getBoundingClientRect().top < innerHeight * 0.95) {
        seen.add(element);
        return;
      }
      element.setAttribute('data-motion-pending', '');
      observer.observe(element);
    });
  }

  function start() {
    if (enabled || reduced.matches) return;
    enabled = true;
    events = new AbortController();
    wrapContent();
    root.classList.add('motion-ready');
    on(window, 'scroll', () => schedule(), { passive: true });
    on(window, 'resize', () => schedule(true), { passive: true });
    on(window, 'pageshow', () => schedule(true));
    on(window, 'pagehide', settle);
    on(window, 'beforeprint', stop);
    on(wide, 'change', () => schedule(true));
    on(document, 'portfolio:languagechange', () => { settle(); schedule(true); });
    on(document, 'visibilitychange', () => { if (document.hidden) settle(); else schedule(true); });
    on(document, 'keydown', event => { if (event.key === 'Escape') settle(); });
    on(document, 'focusin', settle);
    on(hero, 'pointermove', event => {
      if (!fine.matches || !wide.matches || event.pointerType === 'touch') return;
      pointer = {
        x: (event.clientX / innerWidth - 0.5) * 9,
        y: (event.clientY / innerHeight - 0.5) * 7,
      };
      schedule();
    }, { passive: true });
    on(hero, 'pointerleave', () => { pointer = { x: 0, y: 0 }; schedule(); });

    // Tilt belongs to screenshots, leaving text and links stable.
    document.querySelectorAll('.project-screenshot').forEach(image => {
      let bounds;
      on(image, 'pointerenter', () => { bounds = image.getBoundingClientRect(); });
      on(image, 'pointermove', event => {
        if (!fine.matches || !bounds || event.pointerType === 'touch') return;
        const x = clamp((event.clientX - bounds.left) / bounds.width) - 0.5;
        const y = clamp((event.clientY - bounds.top) / bounds.height) - 0.5;
        image.style.transform = 'perspective(1000px) rotateX(' + (-y * 5) +
          'deg) rotateY(' + (x * 5) + 'deg) scale(1.015)';
      }, { passive: true });
      on(image, 'pointerleave', () => { image.style.transform = ''; });
    });
    if (window.ResizeObserver) {
      resizeObserver = new ResizeObserver(() => schedule(true));
      resizeObserver.observe(header);
      resizeObserver.observe(workbench);
      resizeObserver.observe(projectNav);
      projects.forEach(project => resizeObserver.observe(project));
    }
    observeContent();
    schedule(true);
    if (!location.hash && scrollY < 12 && !document.hidden) {
      title.querySelectorAll('.name-text').forEach((word, index) => {
        animate(word, [
          { transform: 'translate3d(0, 105%, 0) rotate(3deg)' },
          { transform: 'none' },
        ], { duration: 1100, delay: 80 + index * 120 });
      });
      animate(bottom, [
        { opacity: 0.1, transform: 'translateY(22px)' },
        { opacity: 1, transform: 'none' },
      ], { delay: 320, duration: 800 });
    }
    document.fonts?.ready.then(() => schedule(true));
  }

  function stop() {
    enabled = false;
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
    events?.abort();
    observer?.disconnect();
    resizeObserver?.disconnect();
    settle();
    root.classList.remove('motion-ready');
    opening.classList.remove('hero-pinned');

    if (heroFrame) heroFrame.style.transform = '';
    projects.forEach(project => {
      project.querySelector('.project-visual')?.classList.remove('visual-pinned');
      project.querySelector('.project-art')?.style.removeProperty('--art-shift');
    });
    document.querySelectorAll('.project-screenshot').forEach(image => { image.style.transform = ''; });
  }

  reduced.addEventListener('change', () => { if (reduced.matches) stop(); else start(); });
  window.addEventListener('afterprint', () => { if (!reduced.matches) start(); });
  try { start(); } catch { stop(); }
})();
