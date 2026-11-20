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
  let skillsStage;
  let viewport;
  let track;
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

    skillsStage = document.createElement('div');
    skillsStage.className = 'skills-stage';
    skillsStage.append(...skills.childNodes);
    skills.append(skillsStage);
    viewport = document.createElement('div');
    viewport.className = 'capability-viewport';
    track = document.createElement('div');
    track.className = 'capability-track';
    const capabilities = workbench.querySelector('.tool-capabilities');
    const support = workbench.querySelector('.tool-support');
    capabilities.before(viewport);
    viewport.append(track);
    track.append(capabilities, support);
  }

  function measure() {
    const headerSpace = header.getBoundingClientRect().height + (innerWidth < 768 ? 24 : 40);
    root.style.setProperty('--header-space', headerSpace + 'px');
    root.style.setProperty('--skills-top', (headerSpace + 12) + 'px');
    opening.classList.toggle('hero-pinned', wide.matches);
    skills.classList.toggle('skills-pinned', wide.matches);
    skills.style.height = '';
    track.style.transform = '';
    const stageHeight = skillsStage.offsetHeight;
    const fits = wide.matches && stageHeight + headerSpace + 60 < innerHeight;
    skills.classList.toggle('skills-pinned', fits);
    const travel = fits ? Math.max(0, track.scrollWidth - track.clientWidth) : 0;
    const distance = travel + 180;
    const sectionStyle = getComputedStyle(skills);
    const paddingTop = parseFloat(sectionStyle.paddingTop);
    const paddingBottom = parseFloat(sectionStyle.paddingBottom);
    if (fits) skills.style.height = (stageHeight + distance + paddingTop + paddingBottom) + 'px';
    if (fits) {
      viewport.tabIndex = 0;
      viewport.setAttribute('role', 'region');
      viewport.setAttribute('aria-labelledby', 'skills-title');
    } else {
      viewport.removeAttribute('tabindex');
      viewport.removeAttribute('role');
      viewport.removeAttribute('aria-labelledby');
    }
    metrics = {
      maxScroll: Math.max(1, root.scrollHeight - innerHeight),
      heroStart: opening.getBoundingClientRect().top + scrollY,
      heroDistance: Math.max(1, opening.offsetHeight - innerHeight),
      skillsStart: skills.getBoundingClientRect().top + scrollY +
        paddingTop - headerSpace - 12,
      skillsDistance: distance,
      travel,
      pinnedSkills: fits,
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
    if (metrics.pinnedSkills) {
      const position = clamp((y - metrics.skillsStart) / metrics.skillsDistance);
      track.style.transform = 'translate3d(' + (-position * metrics.travel) + 'px, 0, 0)';
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
    if (element.matches('.project-window')) {
      animate(element, [
        { opacity: 0.15, transform: 'translate3d(0, 55px, 0) scale(.975)' },
        { opacity: 1, transform: 'none' },
      ], { duration: 1000 });
      element.querySelectorAll('.project-copy, .project-visual').forEach((part, partIndex) => {
        animate(part, [
          { opacity: 0.15, transform: 'translate3d(' + (partIndex % 2 ? 34 : -34) + 'px, 0, 0)' },
          { opacity: 1, transform: 'none' },
        ], { delay: 100 + partIndex * 90 });
      });
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
    document.querySelectorAll('.section-heading, .about-layout, .project-window, .contact-layout').forEach(element => {
      if (seen.has(element)) return;
      if (element.getBoundingClientRect().top < innerHeight * 0.95) {
        seen.add(element);
        return;
      }
      element.setAttribute('data-motion-pending', '');
      observer.observe(element);
    });
  }

  function keyboardTrack(event) {
    if (!metrics.pinnedSkills ||
        !['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const position = clamp((scrollY - metrics.skillsStart) / metrics.skillsDistance);
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? 1 :
      clamp(position + (event.key === 'ArrowRight' ? 0.3 : -0.3));
    window.scrollTo({ top: metrics.skillsStart + next * metrics.skillsDistance, behavior: 'smooth' });
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
    on(viewport, 'keydown', keyboardTrack);
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
      resizeObserver.observe(skillsStage);
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
    skills.classList.remove('skills-pinned');
    skills.style.height = '';
    if (heroFrame) heroFrame.style.transform = '';
    if (track) track.style.transform = '';
    if (viewport) {
      viewport.removeAttribute('tabindex');
      viewport.removeAttribute('role');
      viewport.removeAttribute('aria-labelledby');
    }
    document.querySelectorAll('.project-screenshot').forEach(image => { image.style.transform = ''; });
  }

  reduced.addEventListener('change', () => { if (reduced.matches) stop(); else start(); });
  window.addEventListener('afterprint', () => { if (!reduced.matches) start(); });
  try { start(); } catch { stop(); }
})();
