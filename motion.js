/* Progressive enhancement: blocks are visible even without this file or API.
   An intersection starts a finite CSS animation; it never unlocks content. */
(() => {
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const hero = [...document.querySelectorAll('.hero-name, .hero-surname, .hero-description')];
  const settleHero = () => hero.forEach(element => element.classList.add('has-entered'));

  // Completed entries stay completed when motion preferences change later.
  if (preference.matches) settleHero();
  document.addEventListener('animationend', event => {
    if (hero.includes(event.target)) event.target.classList.add('has-entered');
  });
  preference.addEventListener('change', event => {
    if (event.matches) settleHero();
  });
  if (preference.matches || !('IntersectionObserver' in window)) return;

  const blocks = [...document.querySelectorAll('[data-reveal]')];
  const finished = new WeakSet();
  let observer;

  function finish(block, animate = false) {
    if (finished.has(block)) {
      if (!animate) block.classList.remove('is-revealing');
      return;
    }
    finished.add(block);
    observer?.unobserve(block);
    if (animate) block.classList.add('is-revealing');
  }

  function revealTarget() {
    let target;
    try {
      target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    } catch {
      return;
    }
    if (!target) return;
    blocks.filter(block => target.contains(block) || block.contains(target))
      .forEach(block => finish(block));
  }

  try {
    observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) finish(entry.target, !preference.matches);
      });
    }, { threshold: 0, rootMargin: '0px 0px -32px 0px' });

    // Deep links show their entire destination immediately.
    revealTarget();
    blocks.filter(block => !finished.has(block)).forEach(block => observer.observe(block));

    document.addEventListener('focusin', event => {
      const block = event.target.closest('[data-reveal]');
      if (block) finish(block);
    });
    window.addEventListener('hashchange', revealTarget);
    document.addEventListener('animationend', event => {
      if (event.animationName === 'enter') event.target.classList.remove('is-revealing');
    });
    preference.addEventListener('change', event => {
      if (!event.matches) return;
      observer.disconnect();
      blocks.forEach(block => finish(block));
    });
  } catch {
    // Unsupported or interrupted enhancement leaves the whole page readable.
    observer?.disconnect();
    blocks.forEach(block => block.classList.remove('is-revealing'));
  }
})();
