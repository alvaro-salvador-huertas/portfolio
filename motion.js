/* Content is visible by default. Finite Web Animations add entrances only
   after setup succeeds; cancellation always restores the ordinary document. */
(() => {
  if (!window.matchMedia || !('IntersectionObserver' in window) ||
      typeof Element.prototype.animate !== 'function') return;

  const blocks = [...document.querySelectorAll('[data-reveal]')];
  const finished = new WeakSet();
  const active = new Map();
  const projectStarts = new WeakMap();
  const ease = 'cubic-bezier(0.22, 1, 0.36, 1)';
  let observer;
  let preference;

  function stopWithin(target) {
    for (const [animation, record] of active) {
      if (target.contains(record.element) || record.element.contains(target)) {
        animation.cancel();
        record.cleanup();
        active.delete(animation);
      }
    }
  }

  function settlePage() {
    observer?.disconnect();
    stopWithin(document.documentElement);
    blocks.forEach(block => finished.add(block));
  }

  function animate(element, frames, duration, delay = 0, cleanup = () => {}) {
    if (preference.matches || element.contains(document.activeElement)) {
      cleanup();
      return;
    }
    const animation = element.animate(frames, { duration, delay, easing: ease, fill: 'backwards' });
    active.set(animation, { element, cleanup });
    const release = () => {
      cleanup();
      active.delete(animation);
      animation.cancel();
    };
    animation.finished.then(release, release);
  }

  function enter(element, { duration = 460, delay = 0, x = 0, y = 14, opacity = 0.15 } = {}) {
    animate(element, [
      { opacity, transform: `translate(${x}px, ${y}px)` },
      { opacity: 1, transform: 'none' },
    ], duration, delay);
  }

  function enterHero() {
    // Measure the word wrappers once: surnames sharing a visual line start
    // together; when they wrap, the next line receives its own short offset.
    // The h1 contains each name once, without an aria-label or duplicate text.
    const masks = [...document.querySelectorAll('.name-mask')];
    let previousTop = -Infinity;
    let line = -1;
    const lines = masks.map(mask => {
      const top = mask.getBoundingClientRect().top;
      if (Math.abs(top - previousTop) > 4) line += 1;
      previousTop = top;
      return { mask, delay: line * 100 };
    });
    lines.forEach(({ mask, delay }) => {
      mask.classList.add('is-masking');
      animate(mask.querySelector('.name-text'), [
        { transform: 'translateY(110%)', opacity: 0.2 },
        { transform: 'translateY(0)', opacity: 1 },
      ], 680, delay, () => mask.classList.remove('is-masking'));
    });
    enter(document.querySelector('.hero-description'), { duration: 440, delay: 400, y: 12 });
    // Links retain their hit areas and respond immediately. Focus ends effects.
    enter(document.querySelector('.project-cta'), { duration: 360, delay: 560, y: 0, opacity: 0.4 });
    document.querySelectorAll('.site-header nav, .language-switch').forEach(element => {
      enter(element, { duration: 300, delay: 500, y: 0, opacity: 0.4 });
    });
  }

  function enterDiagram(block) {
    const article = block.closest('.project');
    const start = projectStarts.get(article);
    const delay = start === undefined ? 0 : Math.max(0, 130 - (performance.now() - start));
    block.querySelectorAll('[data-flow-step]').forEach(part => {
      const offset = delay + Number(part.dataset.flowStep) * 65;
      if (part.matches('.flow-connectors, .flow-arrow')) {
        animate(part, [
          { opacity: 0, transform: 'scaleY(0.45)' },
          { opacity: 1, transform: 'scaleY(1)' },
        ], 280, offset);
      } else {
        enter(part, { duration: 360, delay: offset, y: 7 });
      }
    });
  }

  function reveal(block) {
    if (finished.has(block)) return;
    finished.add(block);
    observer.unobserve(block);
    if (preference.matches || block.contains(document.activeElement)) return;

    switch (block.dataset.reveal) {
      case 'title':
        enter(block, { duration: 420, y: 12 });
        break;
      case 'project':
        projectStarts.set(block.closest('.project'), performance.now());
        enter(block, { duration: 480, delay: 60, y: 16 });
        break;
      case 'diagram':
        enterDiagram(block);
        break;
      case 'skill': {
        const index = [...block.parentElement.children].indexOf(block);
        enter(block, { duration: 400, delay: 70 + index * 50, x: 12, y: 0 });
        break;
      }
      case 'contact':
        enter(block, { duration: 500, x: -14, y: 0 });
        break;
      default:
        enter(block, { delay: block.matches('.intro-copy, .contact-body') ? 140 : 80 });
    }
  }

  function settleTarget() {
    let target;
    try {
      target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    } catch {
      return;
    }
    if (!target) return;
    stopWithin(target);
    blocks.filter(block => target.contains(block) || block.contains(target)).forEach(block => {
      finished.add(block);
      observer.unobserve(block);
      stopWithin(block);
    });
  }

  try {
    preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (preference.matches) return;
    observer = new IntersectionObserver(entries => {
      try {
        entries.filter(entry => entry.isIntersecting).forEach(entry => reveal(entry.target));
      } catch {
        settlePage();
      }
    }, { threshold: 0.08, rootMargin: '0px 0px -24px 0px' });

    preference.addEventListener('change', event => {
      if (event.matches) settlePage();
    });
    window.addEventListener('beforeprint', settlePage);
    window.addEventListener('pagehide', settlePage);
    window.addEventListener('hashchange', settleTarget);
    document.addEventListener('focusin', event => {
      stopWithin(event.target);
      const block = event.target.closest('[data-reveal]');
      if (block) {
        finished.add(block);
        observer.unobserve(block);
        stopWithin(block);
      }
    });
    // Resizing or zooming can change line breaks: settle any active masks.
    window.addEventListener('resize', () => stopWithin(document.querySelector('.hero')));

    settleTarget();
    blocks.filter(block => !finished.has(block)).forEach(block => observer.observe(block));
    if (!location.hash && window.scrollY < 12) enterHero();
  } catch {
    settlePage();
    document.querySelectorAll('.is-masking').forEach(mask => mask.classList.remove('is-masking'));
  }
})();
