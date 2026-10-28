/* One native, finite entrance. Text is fully visible throughout; CSS owns
   hover/focus. No library, scroll handling, masks or persistent animation. */
(() => {
  const title = document.querySelector('.hero h1');
  const bottom = document.querySelector('.hero-bottom');
  if (!title?.animate || !bottom || !window.matchMedia) return;
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  if (preference.matches || location.hash || document.hidden || scrollY > 12) return;

  const events = new AbortController();
  const animations = [];
  function stop() {
    animations.forEach(animation => animation.cancel());
    events.abort();
  }
  const on = (target, type, listener) =>
    target.addEventListener(type, listener, { signal: events.signal });
  on(preference, 'change', stop);
  on(document, 'focusin', stop);
  on(document, 'portfolio:languagechange', stop);
  on(document, 'visibilitychange', () => { if (document.hidden) stop(); });
  on(document, 'keydown', event => { if (event.key === 'Escape') stop(); });
  on(window, 'pagehide', stop);
  on(window, 'beforeprint', stop);

  try {
    // A shallow settling movement never conceals or fades the introduction.
    for (const [element, distance, duration] of [[title, 10, 620], [bottom, 6, 440]]) {
      animations.push(element.animate([
        { transform: `translateY(${distance}px)` },
        { transform: 'translateY(0)' },
      ], { duration, easing: 'cubic-bezier(.22, 1, .36, 1)' }));
    }
    Promise.allSettled(animations.map(animation => animation.finished)).then(stop);
  } catch {
    stop();
  }
})();
