/* Progressive enhancement: the complete published data lives in the HTML table.
   This selector displays observations; it never sends or simulates requests. */
(() => {
  const language = document.documentElement.lang;
  try { localStorage.setItem('portfolio-language', language); } catch { /* Optional. */ }

  const select = document.querySelector('#batch-size');
  const controls = document.querySelector('.batch-controls');
  const totals = document.querySelector('#comparison-totals');
  if (!select || !controls || !totals) return;

  const rows = [...document.querySelectorAll('.case-table tbody tr')];
  const levels = [...select.options].map(option => option.value);
  if (!levels.every(level => ['reject', 'fifo'].every(policy =>
    rows.some(row => row.dataset.batch === level && row.dataset.policy === policy)
  ))) return;

  const seconds = new Intl.NumberFormat(language, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  function update() {
    const batch = select.value;
    const total = Number(batch) * 3;
    totals.textContent = language === 'es'
      ? `3 tandas de ${batch} solicitudes: ${total} solicitudes en total por política.`
      : `3 batches of ${batch} requests: ${total} requests in total per policy.`;
    for (const policy of ['reject', 'fifo']) {
      const row = rows.find(row => row.dataset.batch === batch && row.dataset.policy === policy);
      const target = document.querySelector(`[data-result="${policy}"]`);
      target.querySelector('.result-count').textContent = `${row.dataset.results}/${total}`;
      target.querySelector('.result-time').textContent = language === 'es'
        ? `Último JSON recibido: ${seconds.format(Number(row.dataset.maxSeconds))} s (máximo observado entre los resultados correctos).`
        : `Last JSON received: ${seconds.format(Number(row.dataset.maxSeconds))} s (observed maximum among successful results).`;
    }
  }
  select.addEventListener('change', update);
  // Browsers may restore the native select after navigating back.
  window.addEventListener('pageshow', update);
  update();
  controls.hidden = false;
})();
