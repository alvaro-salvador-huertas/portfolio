/* Anime.js 4.5.0. Static HTML is the baseline; no CSS pre-hides content.
   Entrances are finite timelines. Scroll timelines use sync:true; a measured
   CSS sticky stage relays the project windows without changing native scroll. */
(() => {
  const api = window.anime;
  if (!api?.createTimeline || !api?.onScroll || !api?.svg?.createDrawable ||
      !window.matchMedia || !window.IntersectionObserver) return;

  const { createTimeline, animate, onScroll, svg } = api;
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  const entrances = [];
  const syncScenes = [];
  const feedback = new Map();
  const originals = new Map();
  const $ = selector => document.querySelector(selector);
  const $$ = selector => [...document.querySelectorAll(selector)];
  const mobile = () => innerWidth < 768;
  let observer, resizeObserver, heroEntry, refreshTimer;
  let failed = false, suspended = false, started = false;
  let projectScene = null, layoutSignature = '', pendingLayout = null;

  function remember(element) {
    if (!originals.has(element)) originals.set(element, element.getAttribute('style'));
    return element;
  }

  function restore(element) {
    const style = originals.get(element);
    if (style == null) element.removeAttribute('style');
    else element.setAttribute('style', style);
  }

  function safely(callback) {
    return (...args) => {
      try { return callback(...args); }
      catch { failed = true; stop(); }
    };
  }

  function finish(scene) {
    scene.played = true;
    if (scene.trigger) observer?.unobserve(scene.trigger);
    scene.timeline?.revert();
    scene.timeline = null;
    scene.masks?.forEach(mask => mask.classList.remove('is-masking'));
  }

  function clearScroll() {
    for (const scene of syncScenes.splice(0)) {
      scene.observer.revert();
      scene.timeline?.revert();
    }
    $$('.flow-trace').forEach(line => line.remove());
    $('.orchestrator-visual').classList.remove('has-scroll-flow');
    const sequence = $('.project-sequence');
    sequence.classList.remove('is-stacked');
    if (originals.has(sequence)) restore(sequence);
    projectScene = null;
  }

  function stop() {
    clearTimeout(refreshTimer);
    pendingLayout = null;
    observer?.disconnect();
    resizeObserver?.disconnect();
    entrances.forEach(scene => { if (scene.timeline) finish(scene); });
    if (heroEntry) finish(heroEntry);
    clearScroll();
    feedback.forEach(animation => animation.cancel());
    feedback.clear();
    originals.forEach((_, element) => restore(element));
    $$('.is-masking').forEach(mask => mask.classList.remove('is-masking'));
    started = false;
  }

  function timelineFor(scene) {
    const timeline = createTimeline({
      autoplay: false,
      defaults: { duration: 700, ease: 'outExpo' },
      onComplete: safely(() => finish(scene)),
    });
    scene.timeline = timeline;
    return timeline;
  }

  function title(timeline, element, at = 0) {
    timeline.add(remember(element), {
      y: [mobile() ? 20 : 32, 0], opacity: [0.4, 1],
      clipPath: ['inset(-12% -2% 85% -2%)', 'inset(-12% -2% -12% -2%)'],
      duration: 650,
    }, at);
  }

  function rule(timeline, element, at = 0) {
    if (element) timeline.add(remember(element), { scaleX: [0.08, 1], opacity: [0.4, 1], duration: 800 }, at);
  }

  function enterHero() {
    const masks = $$('.name-mask');
    heroEntry = { root: $('.hero'), masks, played: false };
    const timeline = timelineFor(heroEntry);
    let top = -Infinity, line = -1;
    masks.forEach(mask => {
      const nextTop = mask.getBoundingClientRect().top;
      if (Math.abs(nextTop - top) > 4) line++;
      top = nextTop;
      mask.classList.add('is-masking');
      timeline.add(remember(mask.querySelector('.name-text')), {
        y: ['105%', '0%'], opacity: [0.2, 1], duration: 650,
      }, line * 100);
    });
    timeline.add(remember($('.hero-description')), { y: [18, 0], opacity: [0.4, 1], duration: 400 }, 360);
    timeline.add(remember($('.project-cta')), { opacity: [0.5, 1], duration: 320 }, 530);
    timeline.add($$('.site-header nav, .language-switch').map(remember), { opacity: [0.5, 1], duration: 300 }, 530);
    // Render every child’s initial state before starting delayed entries.
    timeline.init().play();
  }

  function addEntrance(root, kind, trigger = root) {
    const scene = { root, kind, trigger, played: false, timeline: null };
    entrances.push(scene);
    return scene;
  }

  function reveal(scene) {
    if (scene.played || preference.matches || suspended || failed) return;
    // A window has one owner: scroll in stacked mode, finite entry in flow.
    if (scene.kind === 'project' && projectScene) return;
    scene.played = true;
    observer.unobserve(scene.trigger);
    if (scene.root.contains(document.activeElement)) return;
    const timeline = timelineFor(scene);
    const root = scene.root;
    switch (scene.kind) {
      case 'heading':
        title(timeline, root.querySelector('h2'));
        rule(timeline, root.querySelector('.section-rule'), 100);
        break;
      case 'about':
        timeline.add(remember(root.querySelector('.intro-lead')), { y: [26, 0], opacity: [0.55, 1] });
        break;
      case 'tool':
        // Each group enters when it is visible, including the long mobile flow.
        // Siblings receive a short stagger without moving their hit areas.
        timeline.add(remember(root), { y: [24, 0], opacity: [0.45, 1], duration: 550 },
          [...root.parentElement.children].indexOf(root) * 90);
        break;
      case 'notes':
        timeline.add(remember(root), { opacity: [0.55, 1], duration: 450 });
        break;
      case 'project':
        timeline.add(remember(root), { y: [mobile() ? 32 : 52, 0], opacity: [0.6, 1], duration: 700 });
        break;
      case 'contact':
        title(timeline, root.querySelector('.contact-heading'));
        timeline.add(remember(root.querySelector('.contact-body')), { y: [18, 0], opacity: [0.65, 1], duration: 550 }, 160);
        break;
    }
    // Render every child’s initial state before starting delayed entries.
    timeline.init().play();
  }

  function scrollTimeline(id, target, enter, leave) {
    const scroll = onScroll({ id, target, enter, leave, sync: true });
    const scene = { observer: scroll, timeline: null };
    syncScenes.push(scene); // Track before timeline creation, including partial failures.
    scene.timeline = createTimeline({ autoplay: scroll, defaults: { ease: 'linear' } });
    return scene.timeline;
  }

  function buildScroll() {
    // Hero entry owns name-text; the scroll exit owns only the outer hero.
    scrollTimeline('hero-exit', $('.opening'), 'top top', 'top 70%')
      .add(remember($('.hero')), {
        y: [0, mobile() ? 18 : 52], scale: [1, mobile() ? 0.98 : 0.95], opacity: [1, 0.86], duration: 1000,
      });

    buildProjects();
  }

  function addFlow(timeline, offset = 0, span = 4000) {
    const figure = $('.orchestrator-visual');
    const unit = span / 4;
    // Decorations alone change; labels and the original arrows stay legible.
    figure.querySelectorAll('.flow-highlight').forEach((highlight, i) => {
      timeline.add(remember(highlight), {
        opacity: [
          { from: 0, to: 0, duration: offset + i * unit },
          { from: 0, to: 1, duration: unit * 0.18 },
          { from: 1, to: 1, duration: unit * 0.47 },
          { from: 1, to: 0.2, duration: unit * 0.28 },
          { from: 0.2, to: 0.2, duration: (3 - i) * unit },
          { from: 0.2, to: 0, duration: unit * 0.07 },
        ],
      }, 0);
    });
    figure.querySelectorAll('.orchestrator-connector > line').forEach((line, i) => {
      const trace = line.cloneNode();
      trace.classList.add('flow-trace');
      trace.removeAttribute('marker-end');
      line.after(trace);
      timeline.add(svg.createDrawable(trace), {
        draw: ['0 0', '0 1'], duration: unit * 0.43,
      }, offset + (i + 0.56) * unit);
    });
    figure.classList.add('has-scroll-flow');
  }

  function buildProjects() {
    const sequence = $('.project-sequence');
    const stage = $('.project-stage');
    const stack = $('.project-stack');
    const windows = $$('.project-window');
    const height = Math.max(...windows.map(window => window.getBoundingClientRect().height));
    const headingHeight = stack.getBoundingClientRect().top - stage.getBoundingClientRect().top;
    const stageHeight = headingHeight + height;
    const minMargin = Math.round(Math.min(24, Math.max(16, innerHeight * 0.025)));
    // The complete composition must fit, including the heading and both outer
    // margins. No negative sticky offset or clipped reading area on short screens.
    if (innerWidth < 960 || stageHeight + minMargin * 2 > innerHeight) {
      addFlow(scrollTimeline('orchestrator-flow', $('.project-slot'),
        () => mobile() ? '78% top' : '80% top',
        () => mobile() ? '38% bottom' : '45% bottom'));
      entrances.filter(scene => scene.kind === 'project' && !scene.played)
        .forEach(scene => observer.observe(scene.trigger));
      return;
    }

    // Center the measured heading + stack together. The same offset sets the
    // sticky position and scroll bounds; reading/relay distances stay unchanged.
    const top = (innerHeight - stageHeight) / 2;
    const entry = innerHeight * 0.82 - top;
    const hold = Math.min(240, innerHeight * 0.28);
    const transfer = Math.min(600, innerHeight * 0.72);
    const settledAt = entry + hold + transfer;
    const finalHold = hold;
    const total = settledAt + finalHold;
    const outside = height + 48;
    remember(sequence);
    sequence.style.setProperty('--stage-top', `${top}px`);
    sequence.style.setProperty('--sequence-height', `${stageHeight + hold + transfer + finalHold}px`);
    sequence.classList.add('is-stacked');
    const timeline = scrollTimeline('project-windows', sequence,
      '82% top', `${top + stageHeight} bottom`);
    projectScene = { sequence, windows, timeline, top, headingHeight, stageHeight, entry, hold, transfer,
      settledAt, finalHold, total,
      observer: syncScenes.at(-1).observer };

    // The stable sequence supplies the distance. Only the inner articles move.
    timeline.add(remember(windows[0]), {
      y: [52, 0], duration: entry, ease: 'outQuad',
    }, 0).add(windows[0], {
      scale: [
        { from: 1, to: 1, duration: entry + hold },
        { from: 1, to: 0.96, duration: transfer },
        { from: 0.96, to: 0.96, duration: finalHold },
      ],
    }, 0).add(remember(windows[1]), {
      y: [
        { from: outside, to: outside, duration: entry + hold },
        { from: outside, to: 0, duration: transfer },
        { from: 0, to: 0, duration: finalHold },
      ],
    }, 0);
    // With sync:true these durations map to scroll pixels, not elapsed time.
    // Keep both final transforms throughout the last reading distance; only
    // then does the sequence boundary release the complete sticky stage.
    // Complete the illustrative workflow while the first window is readable,
    // before the next window starts covering it. Both share the same playhead.
    addFlow(timeline, entry * 0.55, entry * 0.45 + hold * 0.92);
    timeline.init();
  }

  function showProject(target) {
    const scene = projectScene;
    const window = target?.closest('.project-window');
    if (!scene || !window) return;
    const time = window === scene.windows[0]
      ? scene.entry + scene.hold * 0.7
      : scene.settledAt + scene.finalHold * 0.5;
    const start = scene.sequence.getBoundingClientRect().top + scrollY - innerHeight * 0.82;
    // Focus and explicit anchors reveal the requested window immediately.
    // CSS also keeps a focused window above its neighbour during later scroll.
    scrollTo({ top: start + time, behavior: 'auto' });
    scene.timeline.seek(time, true);
  }

  function layoutKey() {
    return [document.body.offsetHeight, $('.project-heading').offsetHeight,
      ...$$('.project-window').map(window => window.offsetHeight)].join(':');
  }

  function settleTarget(target) {
    if (!target) return;
    entrances.filter(scene => target.contains(scene.root) || scene.root.contains(target)).forEach(finish);
    if (heroEntry && (target.contains(heroEntry.root) || heroEntry.root.contains(target))) finish(heroEntry);
  }

  function followAnchor() {
    let target;
    try { target = document.getElementById(decodeURIComponent(location.hash.slice(1))); }
    catch { return; }
    settleTarget(target);
    showProject(target);
    // Refresh bounds after native anchor navigation; sync scenes remain reversible.
    syncScenes.forEach(scene => { if (scene.observer.target) scene.observer.refresh(); });
  }

  function refreshLayout() {
    if (!started) return;
    if (heroEntry) finish(heroEntry);
    entrances.filter(scene => scene.timeline).forEach(finish);
    // Capture before browser scroll anchoring/old bounds can change progress
    // during the debounce, and keep this snapshot across ResizeObserver events.
    if (!pendingLayout) {
      const rect = $('.project-sequence').getBoundingClientRect();
      const anchor = $$('.project-window').findLast(window => window.getBoundingClientRect().top < innerHeight * 0.5)
        || $('.project-window');
      pendingLayout = {
        within: rect.top < innerHeight * 0.5 && rect.bottom > innerHeight * 0.5,
        progress: projectScene ? projectScene.timeline.currentTime / projectScene.total : null,
        anchor, before: anchor.getBoundingClientRect().top,
      };
      projectScene?.observer.revert();
    }
    clearTimeout(refreshTimer);
    refreshTimer = setTimeout(safely(() => {
      if (!started) return;
      const sequence = $('.project-sequence');
      const { within, progress, anchor, before } = pendingLayout;
      pendingLayout = null;
      clearScroll();
      buildScroll();
      if (within) {
        if (projectScene && progress != null) {
          const start = sequence.getBoundingClientRect().top + scrollY - innerHeight * 0.82;
          const time = progress * projectScene.total;
          scrollTo({ top: start + time, behavior: 'auto' });
          projectScene.timeline.seek(time, true);
        } else if (projectScene) showProject(anchor);
        else scrollBy({ top: anchor.getBoundingClientRect().top - before, behavior: 'auto' });
      }
      showProject(document.activeElement);
      layoutSignature = layoutKey();
    }), 120);
  }

  function start() {
    if (started || failed || suspended || preference.matches) return;
    started = true;
    observer = new IntersectionObserver(safely(entries => {
      entries.filter(entry => entry.isIntersecting).forEach(entry => {
        const scene = entrances.find(item => item.trigger === entry.target);
        if (scene) reveal(scene);
      });
    }), { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });
    buildScroll();
    followAnchor();
    entrances.filter(scene => !scene.played).forEach(scene => observer.observe(scene.trigger));
    if (!heroEntry && !location.hash && scrollY < 12) enterHero();
    if (window.ResizeObserver) {
      // Observe intrinsic panel sizes as well: the sticky track itself has a
      // measured height, so font/language changes must also inspect its children.
      layoutSignature = layoutKey();
      resizeObserver = new ResizeObserver(safely(() => {
        const next = layoutKey();
        if (layoutSignature !== next) { layoutSignature = next; refreshLayout(); }
      }));
      $$('.project-window').forEach(window => resizeObserver.observe(window));
      resizeObserver.observe(document.body);
    }
  }

  function interaction(control, active) {
    if (!started) return;
    const arrow = control.querySelector('.link-arrow');
    const target = arrow || (control.matches('[data-language]') ? control : null);
    if (!target) return;
    remember(target);
    feedback.get(target)?.cancel();
    const values = arrow ? {
      x: active && !arrow.matches('.arrow-down, .arrow-up') ? 3 : 0,
      y: active ? (arrow.matches('.arrow-down') ? 3 : -3) : 0,
    } : { backgroundColor: active ? '#e8d9d1' : 'rgba(232, 217, 209, 0)' };
    feedback.set(target, animate(target, {
      ...values, duration: 180, ease: 'outQuad',
      onComplete: safely(() => { feedback.delete(target); if (!active) restore(target); }),
    }));
  }

  try {
    // The compact projects heading stays readable and still for the entire relay.
    $$('.section-heading:not(.project-heading)').forEach(root => addEntrance(root, 'heading'));
    addEntrance($('.about-layout'), 'about');
    $$('.tool-group').forEach(root => addEntrance(root, 'tool'));
    addEntrance($('.tool-notes'), 'notes');
    $$('.project-window').forEach(root => addEntrance(root, 'project', root.parentElement));
    addEntrance($('.contact-layout'), 'contact');
    $$('a, button').forEach(control => {
      control.addEventListener('pointerenter', safely(() => interaction(control, true)));
      control.addEventListener('pointerleave', safely(() => interaction(control, control.matches(':focus-visible'))));
      control.addEventListener('focus', safely(() => interaction(control, true)));
      control.addEventListener('blur', safely(() => interaction(control, false)));
    });
    document.addEventListener('focusin', safely(event => {
      entrances.filter(scene => scene.root.contains(event.target)).forEach(finish);
      if (heroEntry && ($('.opening').contains(event.target))) finish(heroEntry);
      showProject(event.target);
    }));
    document.addEventListener('portfolio:languagechange', safely(refreshLayout));
    window.addEventListener('resize', safely(refreshLayout));
    window.addEventListener('hashchange', safely(followAnchor));
    preference.addEventListener('change', safely(() => preference.matches ? stop() : start()));
    window.addEventListener('beforeprint', safely(() => { suspended = true; stop(); }));
    window.addEventListener('afterprint', safely(() => { suspended = false; start(); }));
    window.addEventListener('pagehide', safely(() => { suspended = true; stop(); }));
    window.addEventListener('pageshow', safely(event => { if (event.persisted) { suspended = false; start(); } }));
    safely(start)();
    document.fonts?.ready.then(safely(() => {
      if (started && layoutSignature !== layoutKey()) refreshLayout();
      else syncScenes.forEach(scene => { if (scene.observer.target) scene.observer.refresh(); });
    }));
  } catch { failed = true; stop(); }
})();
