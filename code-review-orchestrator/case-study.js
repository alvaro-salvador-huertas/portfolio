/* Language links and the story work without scripts; persistence is optional. */
(() => {
  try { localStorage.setItem('portfolio-language', document.documentElement.lang); }
  catch { /* Blocked storage does not prevent reading or navigating the case. */ }
})();
