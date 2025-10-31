const qEl = document.getElementById('q');
const goEl = document.getElementById('go');
const results = document.getElementById('results');
const preview = document.getElementById('preview');
const previewCard = document.getElementById('previewCard');
const previewToggle = document.getElementById('previewToggle');

const engines = {
  google: q => `https://www.google.com/search?q=${encodeURIComponent(q)}`,
  ddg: q => `https://duckduckgo.com/?q=${encodeURIComponent(q)}`,
  bing: q => `https://www.bing.com/search?q=${encodeURIComponent(q)}`,
  wiki: q => `https://en.wikipedia.org/wiki/Special:Search?search=${encodeURIComponent(q)}`,
  yt: q => `https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`,
  mdn: q => `https://developer.mozilla.org/en-US/search?q=${encodeURIComponent(q)}`,
  so: q => `https://stackoverflow.com/search?q=${encodeURIComponent(q)}`,
};

let lastEngine = 'google';
document.querySelectorAll('.chip').forEach(btn => {
  btn.addEventListener('click', () => { lastEngine = btn.dataset.engine; doSearch(); });
});
goEl.addEventListener('click', doSearch);
qEl.addEventListener('keydown', e => { if (e.key === 'Enter') doSearch(); });

function doSearch() {
  const q = qEl.value.trim();
  if (!q) return;
  results.innerHTML = '';
  const list = [lastEngine in engines ? lastEngine : 'google', 'wiki', 'mdn'];
  for (const key of list) {
    const url = engines[key](q);
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = url; a.target = "_blank"; a.rel = "noopener";
    a.textContent = `${key.toUpperCase()}: ${url}`;
    li.appendChild(a);

    if (previewToggle.checked && window.SEARCH_BACKEND) {
      const openBtn = document.createElement('button');
      openBtn.textContent = 'Preview';
      openBtn.className = 'chip';
      openBtn.addEventListener('click', () => {
        const u = new URL(url);
        // Only try preview for allowed hosts; the backend enforces whitelist anyway
        preview.src = `${window.SEARCH_BACKEND}/preview?url=${encodeURIComponent(url)}`;
        previewCard.hidden = false;
      });
      li.appendChild(openBtn);
    }
    results.appendChild(li);
  }
  if (!(previewToggle.checked && window.SEARCH_BACKEND)) previewCard.hidden = true;
}

// Load query from URL (?q=)
const params = new URLSearchParams(location.search);
if (params.has('q')) { qEl.value = params.get('q'); doSearch(); }
