/*
 * AI Atlas — app logic.
 * Vanilla classic script. Views: #/ (home) · #/browse · #/favorites · #/tool/<id> (modal).
 * Favorites persist in localStorage; no network calls anywhere.
 */
(function () {
  'use strict';

  var DATA = window.ATLAS_DATA || { tools: [], categories: [], picks: [], shelf: [] };
  var tools = DATA.tools;
  var categories = DATA.categories;
  var toolById = {};
  var catBySlug = {};
  tools.forEach(function (t) { toolById[t.id] = t; });
  categories.forEach(function (c, i) { c.index = i; catBySlug[c.slug] = c; });

  function $(sel, scope) { return (scope || document).querySelector(sel); }
  function $$(sel, scope) { return Array.prototype.slice.call((scope || document).querySelectorAll(sel)); }
  function icon(name) { return '<svg class="ic" aria-hidden="true"><use href="#i-' + name + '"></use></svg>'; }
  function priceLabel(p) { return p.charAt(0).toUpperCase() + p.slice(1); }
  function catName(slug) { return (catBySlug[slug] || {}).name || slug; }
  function initials(name) {
    var words = name.replace(/[^A-Za-z0-9 .]/g, ' ').split(/\s+/).filter(function (w) { return /[A-Za-z]/.test(w); });
    if (words.length >= 2) { return (words[0].charAt(0) + words[1].charAt(0)).toUpperCase(); }
    if (words.length === 1) { return words[0].charAt(0).toUpperCase(); }
    return name.charAt(0).toUpperCase();
  }
  function reducedMotion() {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  /* ── favorites store ─────────────────────────────────────────────── */
  var store = (function () {
    var KEY = 'aiatlas.favorites.v1';
    var mem = { ids: [], last: null };
    var ok = true;
    try {
      var raw = window.localStorage.getItem(KEY);
      if (raw) {
        var d = JSON.parse(raw);
        if (d && Object.prototype.toString.call(d.ids) === '[object Array]') {
          mem.ids = d.ids.filter(function (x) { return typeof x === 'string'; });
          mem.last = typeof d.last === 'string' ? d.last : (mem.ids[mem.ids.length - 1] || null);
        }
      }
    } catch (e) { ok = false; }
    function persist() {
      if (!ok) { return; }
      try { window.localStorage.setItem(KEY, JSON.stringify(mem)); } catch (e) { ok = false; }
    }
    return {
      list: function () { return mem.ids.slice(); },
      count: function () { return mem.ids.length; },
      last: function () { return mem.last; },
      has: function (id) { return mem.ids.indexOf(id) >= 0; },
      toggle: function (id) {
        var i = mem.ids.indexOf(id);
        if (i >= 0) {
          mem.ids.splice(i, 1);
          if (mem.last === id) { mem.last = mem.ids[mem.ids.length - 1] || null; }
          persist();
          return false;
        }
        mem.ids.push(id);
        mem.last = id;
        persist();
        return true;
      },
      clear: function () { mem.ids = []; mem.last = null; persist(); }
    };
  })();

  /* ── toast ───────────────────────────────────────────────────────── */
  var toastTimer = null;
  var toastToken = 0;
  function showToast(msg) {
    var t = $('#toast');
    toastToken += 1;
    var tok = toastToken;
    t.innerHTML = icon('heart-fill') + '<span>' + msg + '</span>';
    t.hidden = false;
    window.requestAnimationFrame(function () { t.classList.add('toast-show'); });
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () { if (tok === toastToken) { hideToast(); } }, 2000);
  }
  function hideToast() {
    var t = $('#toast');
    t.classList.remove('toast-show');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () { t.hidden = true; }, 240);
  }
  function pauseToast() { window.clearTimeout(toastTimer); }
  function resumeToast() {
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(hideToast, 1400);
  }

  /* ── favorite button rendering & sync ────────────────────────────── */
  function heartBtn(t, size) {
    var on = store.has(t.id);
    return '<button class="fav-btn' + (on ? ' is-on' : '') + (size ? ' ' + size : '') + '" type="button" data-fav-id="' + t.id + '"' +
      ' aria-pressed="' + (on ? 'true' : 'false') + '"' +
      ' aria-label="' + (on ? 'Remove ' + t.name + ' from favorites' : 'Save ' + t.name + ' to favorites') + '">' +
      '<svg class="ic" aria-hidden="true"><use href="' + (on ? '#i-heart-fill' : '#i-heart') + '"></use></svg></button>';
  }
  function modalFavBtn(t) {
    var on = store.has(t.id);
    return '<button class="btn btn-secondary" type="button" data-fav-id="' + t.id + '" data-fav-text="1"' +
      ' aria-pressed="' + (on ? 'true' : 'false') + '"' +
      ' aria-label="' + (on ? 'Remove ' + t.name + ' from favorites' : 'Save ' + t.name + ' to favorites') + '">' +
      '<svg class="ic" aria-hidden="true"><use href="' + (on ? '#i-heart-fill' : '#i-heart') + '"></use></svg>' +
      '<span class="fav-text">' + (on ? 'Saved' : 'Save') + '</span></button>';
  }
  function syncFavButton(btn, t, on, pop) {
    btn.classList.toggle('is-on', on);
    btn.setAttribute('aria-pressed', on ? 'true' : 'false');
    btn.setAttribute('aria-label', (on ? 'Remove ' + t.name + ' from favorites' : 'Save ' + t.name + ' to favorites'));
    var use = btn.querySelector('use');
    if (use) { use.setAttribute('href', on ? '#i-heart-fill' : '#i-heart'); }
    var ft = btn.querySelector('.fav-text');
    if (ft) { ft.textContent = on ? 'Saved' : 'Save'; }
    if (pop) {
      btn.classList.remove('pop');
      void btn.offsetWidth;
      btn.classList.add('pop');
      window.setTimeout(function () { btn.classList.remove('pop'); }, 320);
    }
  }
  function syncFavButtonsFor(id, on, pop) {
    var t = toolById[id];
    if (!t) { return; }
    $$('[data-fav-id="' + id + '"]').forEach(function (btn) { syncFavButton(btn, t, on, pop); });
  }
  function syncAllFavButtons() {
    $$('[data-fav-id]').forEach(function (btn) {
      var t = toolById[btn.getAttribute('data-fav-id')];
      if (t) { syncFavButton(btn, t, store.has(t.id), false); }
    });
  }
  function updateNavCount() {
    var c = store.count();
    var el = $('#favCount');
    el.textContent = String(c);
    el.hidden = c === 0;
  }

  /* ── recommendations ─────────────────────────────────────────────── */
  function computeRecs(limit) {
    var favIds = store.list();
    var favTools = favIds.map(function (id) { return toolById[id]; }).filter(Boolean);
    if (!favTools.length) { return []; }
    var ex = {};
    favIds.forEach(function (id) { ex[id] = 1; });
    var catc = {};
    var tagc = {};
    favTools.forEach(function (t) {
      catc[t.category] = (catc[t.category] || 0) + 1;
      t.tags.forEach(function (tg) { tagc[tg] = (tagc[tg] || 0) + 1; });
    });
    var scored = [];
    tools.forEach(function (t, i) {
      if (ex[t.id]) { return; }
      var s = 0;
      if (catc[t.category]) { s += 3 * catc[t.category]; }
      t.tags.forEach(function (tg) { if (tagc[tg]) { s += tagc[tg]; } });
      if (s > 0) { scored.push({ t: t, s: s, i: i }); }
    });
    scored.sort(function (a, b) { return b.s !== a.s ? b.s - a.s : a.i - b.i; });
    return scored.slice(0, limit).map(function (x) { return x.t; });
  }

  /* ── html builders ───────────────────────────────────────────────── */
  function cardHtml(t) {
    var tags = t.tags.slice(0, 3).map(function (tg) { return '<span class="tag">' + tg + '</span>'; });
    if (t.tags.length > 3) { tags.push('<span class="tag">+' + (t.tags.length - 3) + '</span>'); }
    return '<article class="tool-card tone-' + t.category + '">' +
      '<div class="tc-top"><div class="monogram">' + initials(t.name) + '</div>' + heartBtn(t) + '</div>' +
      '<h2 class="tc-name">' + t.name + '</h2>' +
      '<p class="tc-tagline clamp-2">' + t.tagline + '</p>' +
      '<div class="tag-row">' + tags.join('') + '</div>' +
      '<div class="tc-foot"><span class="price-label">' + priceLabel(t.pricing) + '</span>' +
      '<span class="tc-cat">' + catName(t.category) + '</span></div>' +
      '<a class="stretched" href="#/tool/' + t.id + '" aria-label="Open ' + t.name + '"></a>' +
      '</article>';
  }
  function rowHtml(t, rv) {
    return '<div class="row-item tone-' + t.category + '" data-tool="' + t.id + '"' + (rv ? ' data-rv' : '') + '>' +
      '<div class="monogram sm">' + initials(t.name) + '</div>' +
      '<div class="ri-mid"><a class="ri-name" href="#/tool/' + t.id + '">' + t.name + '</a>' +
      '<p class="ri-line">' + t.tagline + '</p></div>' + heartBtn(t) + '</div>';
  }
  function simRowHtml(t) {
    return '<div class="row-item tone-' + t.category + '" data-tool="' + t.id + '">' +
      '<div class="monogram sm">' + initials(t.name) + '</div>' +
      '<div class="ri-mid"><a class="ri-name" href="#/tool/' + t.id + '" data-modal-link="1">' + t.name + '</a>' +
      '<p class="ri-line">' + t.tagline + '</p></div>' + heartBtn(t) + '</div>';
  }

  /* ── reveal on scroll ────────────────────────────────────────────── */
  var io = ('IntersectionObserver' in window)
    ? new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { en.target.classList.add('rv-in'); io.unobserve(en.target); }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -4% 0px' })
    : null;
  function armReveal(scope) {
    if (!io) { return; }
    var els = $$('[data-rv]', scope || document);
    els.forEach(function (el, i) {
      el.classList.add('rv');
      el.style.setProperty('--d', (Math.min(i, 8) * 60) + 'ms');
      io.observe(el);
    });
  }

  /* ── home view ───────────────────────────────────────────────────── */
  function renderPicks() {
    var html = (DATA.picks || []).map(function (p, i) {
      var t = toolById[p.id];
      if (!t) { return ''; }
      return '<article class="pick-row tone-' + t.category + '" data-tool="' + t.id + '" data-rv>' +
        '<span class="pick-num num">' + ('0' + (i + 1)).slice(-2) + '</span>' +
        '<div class="monogram">' + initials(t.name) + '</div>' +
        '<div class="pick-mid">' +
        '<h3 class="pick-name"><a href="#/tool/' + t.id + '">' + t.name + '</a></h3>' +
        '<p class="pick-tag">' + t.tagline + '</p>' +
        '<p class="pick-note">Why it’s here — ' + p.note + '</p>' +
        '</div>' +
        '<div class="pick-side"><span class="tag">' + catName(t.category) + '</span>' +
        '<span class="price-label">' + priceLabel(t.pricing) + '</span>' + heartBtn(t) + '</div>' +
        '</article>';
    }).join('');
    $('#picksList').innerHTML = html;
    armReveal($('#picksList'));
  }
  function renderCatGrid() {
    var html = categories.map(function (c) {
      var list = tools.filter(function (t) { return t.category === c.slug; });
      var sample = list.slice(0, 2).map(function (t) { return t.name; }).join(', ') + (list.length > 2 ? '…' : '');
      return '<a class="cat-tile tone-' + c.slug + '" href="#/browse?cat=' + c.slug + '" data-rv>' +
        '<span class="cat-head"><span class="cat-dot"></span><span class="cat-name">' + c.name + '</span></span>' +
        '<span class="cat-count num">' + list.length + ' tools</span>' +
        '<span class="cat-sample">' + sample + '</span>' +
        '<span class="cat-arrow">' + icon('arrow-right') + '</span></a>';
    }).join('');
    $('#catGrid').innerHTML = html;
    armReveal($('#catGrid'));
  }
  function renderShelf() {
    var html = (DATA.shelf || []).map(function (id) {
      var t = toolById[id];
      return t ? rowHtml(t, true) : '';
    }).join('');
    $('#shelfList').innerHTML = html;
    armReveal($('#shelfList'));
  }
  function renderForYou() {
    var wrap = $('#forYou');
    var ids = store.list().filter(function (id) { return toolById[id]; });
    var html = '';
    if (ids.length) {
      var lastT = toolById[store.last()] || toolById[ids[ids.length - 1]];
      var recs = computeRecs(4);
      html += '<div class="sec-head"><div><h2>For you</h2>' +
        '<p class="dek">Because you saved ' + lastT.name + '.</p></div>' +
        '<a class="more-link" href="#/favorites">View all favorites' + icon('arrow-right') + '</a></div>';
      if (recs.length) {
        html += '<div class="rec-list">' + recs.map(function (t) { return rowHtml(t, true); }).join('') + '</div>';
      } else {
        html += '<div class="empty"><p class="empty-title">You’ve saved everything in these areas.</p>' +
          '<p class="empty-sub">Try another category for fresh picks.</p>' +
          '<a class="btn btn-secondary" href="#/browse">Browse all tools</a></div>';
      }
    } else {
      html += '<div class="sec-head"><div><h2>For you</h2>' +
        '<p class="dek">Recommendations build from your shortlist.</p></div></div>' +
        '<div class="empty"><p class="empty-title">Nothing saved yet.</p>' +
        '<p class="empty-sub">Tap the heart on any tool — saves stay in this browser, no account needed.</p>' +
        '<a class="btn btn-primary" href="#/browse">Browse all tools</a></div>';
    }
    wrap.innerHTML = html;
    armReveal(wrap);
  }

  /* ── browse view ─────────────────────────────────────────────────── */
  var bstate = { q: '', cat: 'all', price: 'any', sort: 'curated' };

  function renderChips() {
    var html = '<button class="chip is-on" type="button" data-cat="all" aria-pressed="true">All</button>';
    categories.forEach(function (c) {
      html += '<button class="chip tone-' + c.slug + '" type="button" data-cat="' + c.slug + '" aria-pressed="false">' +
        '<span class="dot"></span>' + c.name + '</button>';
    });
    $('#catChips').innerHTML = html;
  }
  function setChipState(activeCat) {
    $$('#catChips .chip').forEach(function (c) {
      var on = c.getAttribute('data-cat') === activeCat;
      c.classList.toggle('is-on', on);
      c.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
  }
  function filteredTools() {
    var q = bstate.q.toLowerCase().trim();
    var list = tools.filter(function (t) {
      if (bstate.cat !== 'all' && t.category !== bstate.cat) { return false; }
      if (bstate.price !== 'any' && t.pricing !== bstate.price) { return false; }
      if (q) {
        var hay = (t.name + ' ' + t.maker + ' ' + t.tagline + ' ' + t.desc + ' ' + t.tags.join(' ')).toLowerCase();
        if (hay.indexOf(q) < 0) { return false; }
      }
      return true;
    });
    if (bstate.sort === 'az') {
      list.sort(function (a, b) { return a.name.toLowerCase().localeCompare(b.name.toLowerCase()); });
    } else if (bstate.sort === 'category') {
      list.sort(function (a, b) {
        var ca = (catBySlug[a.category] || {}).index || 0;
        var cb = (catBySlug[b.category] || {}).index || 0;
        if (ca !== cb) { return ca - cb; }
        return tools.indexOf(a) - tools.indexOf(b);
      });
    }
    return list;
  }
  function syncBrowseHash() {
    var p = [];
    if (bstate.q) { p.push('q=' + encodeURIComponent(bstate.q)); }
    if (bstate.cat !== 'all') { p.push('cat=' + bstate.cat); }
    if (bstate.price !== 'any') { p.push('price=' + bstate.price); }
    if (bstate.sort !== 'curated') { p.push('sort=' + bstate.sort); }
    var nh = '#/browse' + (p.length ? ('?' + p.join('&')) : '');
    lastBase = nh;
    if (location.hash !== nh) {
      try { history.replaceState(null, '', nh); } catch (e) { location.hash = nh; }
    }
  }
  function updateClearSearch() {
    var bs = $('#browseSearch');
    $('#browseClear').hidden = !(bs && bs.value);
  }
  function renderBrowse() {
    var list = filteredTools();
    $('#toolGrid').innerHTML = list.map(cardHtml).join('');
    $('#browseCount').textContent = 'Showing ' + list.length + ' of ' + tools.length + ' tools';
    $('#browseEmpty').hidden = list.length > 0;
    $('#browseEmptyTitle').textContent = bstate.q ? 'No tools match your search.' : 'No tools match your filters.';
    var dirty = !!(bstate.q || bstate.cat !== 'all' || bstate.price !== 'any' || bstate.sort !== 'curated');
    $('#resetBtn').hidden = !dirty;
    updateClearSearch();
  }
  function applyBrowseParams(params) {
    bstate.q = typeof params.q === 'string' ? params.q.slice(0, 120) : '';
    bstate.cat = catBySlug[params.cat] ? params.cat : 'all';
    bstate.price = ['free', 'freemium', 'paid'].indexOf(params.price) >= 0 ? params.price : 'any';
    bstate.sort = ['az', 'category'].indexOf(params.sort) >= 0 ? params.sort : 'curated';
    var bs = $('#browseSearch');
    if (bs && bs.value !== bstate.q) { bs.value = bstate.q; }
    setChipState(bstate.cat);
    $('#priceSel').value = bstate.price;
    $('#sortSel').value = bstate.sort;
  }
  function resetBrowse() {
    bstate.q = '';
    bstate.cat = 'all';
    bstate.price = 'any';
    bstate.sort = 'curated';
    $('#browseSearch').value = '';
    $('#priceSel').value = 'any';
    $('#sortSel').value = 'curated';
    setChipState('all');
    syncBrowseHash();
    renderBrowse();
  }

  /* ── favorites view ──────────────────────────────────────────────── */
  function renderFavorites() {
    var ids = store.list().filter(function (id) { return toolById[id]; });
    var favTools = ids.map(function (id) { return toolById[id]; });
    $('#favMeta').textContent = ids.length + ' saved · stored in this browser';
    $('#clearFavBtn').hidden = ids.length === 0;
    $('#favGrid').innerHTML = favTools.map(cardHtml).join('');
    $('#favEmpty').hidden = ids.length > 0;
    var recs = ids.length ? computeRecs(4) : [];
    var sec = $('#favRecsSection');
    sec.hidden = recs.length === 0;
    if (recs.length) {
      $('#favRecs').innerHTML = recs.map(function (t) { return rowHtml(t, true); }).join('');
      armReveal($('#favRecs'));
    }
  }

  /* ── modal ───────────────────────────────────────────────────────── */
  var modalId = null;
  var modalReturnFocus = null;
  var lastBase = '#/';

  function metaCell(label, value) {
    return '<div class="mp-meta-cell"><p class="mp-meta-label">' + label + '</p><p class="mp-meta-value">' + value + '</p></div>';
  }
  function buildModal(t) {
    var pick = (DATA.picks || []).filter(function (p) { return p.id === t.id; })[0];
    var sim = tools.filter(function (x) { return x.category === t.category && x.id !== t.id; }).slice(0, 3);
    var html = '<div class="modal">' +
      '<div class="modal-scrim" data-close></div>' +
      '<div class="modal-panel" role="dialog" aria-modal="true" aria-labelledby="mpName" tabindex="-1">' +
        '<div class="mp-head">' +
          '<div class="monogram lg tone-' + t.category + '">' + initials(t.name) + '</div>' +
          '<div class="mp-id"><h2 class="mp-name" id="mpName">' + t.name + '</h2>' +
          '<p class="mp-maker">' + t.maker + ' · ' + priceLabel(t.pricing) + '</p></div>' +
          '<button class="mp-close" type="button" data-close aria-label="Close">' + icon('close') + '</button>' +
        '</div>' +
        '<div class="mp-chips"><span class="tag">' + catName(t.category) + '</span>' +
        '<span class="tag">' + priceLabel(t.pricing) + '</span></div>' +
        '<p class="mp-desc">' + t.desc + '</p>' +
        (pick ? '<div class="mp-note"><p class="mp-note-label">Editor’s note</p>' +
          '<p class="mp-note-text">' + pick.note + '</p></div>' : '') +
        '<div class="mp-tags tag-row">' + t.tags.map(function (tg) { return '<span class="tag">' + tg + '</span>'; }).join('') + '</div>' +
        '<div class="mp-meta">' + metaCell('Maker', t.maker) + metaCell('Pricing', priceLabel(t.pricing)) + metaCell('Category', catName(t.category)) + '</div>' +
        '<div class="mp-actions">' +
          '<a class="btn btn-primary" href="' + t.url + '" target="_blank" rel="noopener">Visit ' + t.name + ' ' + icon('arrow-ur') + '</a>' +
          modalFavBtn(t) +
        '</div>' +
        (sim.length ? '<div class="mp-similar"><p class="mp-similar-label">More in ' + catName(t.category) + '</p>' +
          sim.map(simRowHtml).join('') + '</div>' : '') +
      '</div></div>';
    var root = $('#modalRoot');
    root.innerHTML = html;
    root.hidden = false;
    document.body.style.overflow = 'hidden';
    var panel = $('.modal-panel', root);
    panel.focus();
    panel.addEventListener('keydown', function (e) { trapTab(e, panel); });
  }
  function openModal(id) {
    var t = toolById[id];
    if (!t || modalId === id) { return; }
    if (modalId === null) { modalReturnFocus = document.activeElement; }
    modalId = id;
    buildModal(t);
  }
  function closeModalUI() {
    $('#modalRoot').hidden = true;
    $('#modalRoot').innerHTML = '';
    document.body.style.overflow = '';
    modalId = null;
    if (modalReturnFocus && modalReturnFocus.isConnected) {
      try { modalReturnFocus.focus(); } catch (e) { /* noop */ }
    }
    modalReturnFocus = null;
  }
  function requestModalClose() {
    if (!modalId) { return; }
    if (location.hash.indexOf('#/tool/') === 0) {
      location.hash = lastBase || '#/';
    } else {
      closeModalUI();
    }
  }
  function trapTab(e, panel) {
    if (e.key !== 'Tab') { return; }
    var f = $$('a[href], button:not([disabled]), select, input, [tabindex]:not([tabindex="-1"])', panel)
      .filter(function (el) { return el.offsetParent !== null || el === document.activeElement; });
    if (!f.length) { e.preventDefault(); panel.focus(); return; }
    var first = f[0];
    var last = f[f.length - 1];
    if (e.shiftKey && (document.activeElement === first || document.activeElement === panel)) {
      e.preventDefault(); last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault(); first.focus();
    }
  }

  /* ── routing ─────────────────────────────────────────────────────── */
  var currentView = 'home';
  var pendingFocusSearch = false;

  function parseHash() {
    var h = location.hash || '#/';
    if (h.charAt(0) === '#') { h = h.slice(1); }
    if (h === '' || h === '/') { return { view: 'home', params: {} }; }
    var qi = h.indexOf('?');
    var path = qi >= 0 ? h.slice(0, qi) : h;
    var qs = qi >= 0 ? h.slice(qi + 1) : '';
    var params = {};
    if (qs) {
      new window.URLSearchParams(qs).forEach(function (v, k) { params[k] = v; });
    }
    var parts = path.split('/').filter(Boolean);
    if (!parts.length) { return { view: 'home', params: params }; }
    if (parts[0] === 'browse') { return { view: 'browse', params: params }; }
    if (parts[0] === 'favorites') { return { view: 'favorites', params: params }; }
    if (parts[0] === 'tool' && parts[1]) { return { view: 'tool', id: decodeURIComponent(parts[1]), params: params }; }
    return { view: 'home', params: params };
  }
  function showView(v) {
    ['home', 'browse', 'favorites'].forEach(function (name) {
      var el = $('#view-' + name);
      if (el) { el.hidden = name !== v; }
    });
  }
  function updateNavCurrent(v) {
    $$('.nav-links a[data-nav]').forEach(function (a) {
      if (a.getAttribute('data-nav') === v) { a.setAttribute('aria-current', 'page'); }
      else { a.removeAttribute('aria-current'); }
    });
  }
  function route() {
    var r = parseHash();
    if (r.view === 'tool') {
      if (toolById[r.id]) { openModal(r.id); }
      else { location.hash = lastBase || '#/'; }
      return;
    }
    lastBase = location.hash || '#/';
    if (modalId) { closeModalUI(); }
    var prev = currentView;
    currentView = r.view;
    if (r.view === 'browse') {
      applyBrowseParams(r.params);
      renderBrowse();
    } else if (r.view === 'favorites') {
      renderFavorites();
    } else {
      renderForYou();
    }
    showView(r.view);
    updateNavCurrent(r.view);
    if (prev !== r.view) { window.scrollTo(0, 0); }
    if (pendingFocusSearch && r.view === 'browse') {
      pendingFocusSearch = false;
      var bs = $('#browseSearch');
      if (bs) { bs.focus(); }
    }
  }

  /* ── favorite toggling ───────────────────────────────────────────── */
  function onToggleFav(id) {
    var t = toolById[id];
    if (!t) { return; }
    var added = store.toggle(id);
    syncFavButtonsFor(id, added, true);
    updateNavCount();
    showToast(added ? 'Saved to your favorites' : 'Removed from your favorites');
    if (currentView === 'home') { renderForYou(); }
    if (currentView === 'favorites') { renderFavorites(); }
  }
  function clearAllFavorites() {
    var n = store.count();
    if (!n) { return; }
    if (!window.confirm('Remove all ' + n + ' tools from your favorites?')) { return; }
    store.clear();
    syncAllFavButtons();
    updateNavCount();
    showToast('Removed from your favorites');
    if (currentView === 'favorites') { renderFavorites(); }
    if (currentView === 'home') { renderForYou(); }
  }

  /* ── events ──────────────────────────────────────────────────────── */
  function wireEvents() {
    document.addEventListener('click', function (e) {
      var fav = e.target.closest('[data-fav-id]');
      if (fav) { e.preventDefault(); onToggleFav(fav.getAttribute('data-fav-id')); return; }
      var ml = e.target.closest('a[data-modal-link]');
      if (ml) {
        e.preventDefault();
        var nid = ml.getAttribute('href').replace('#/tool/', '');
        try { history.replaceState(null, '', '#/tool/' + nid); } catch (err) { location.hash = '#/tool/' + nid; }
        openModal(nid);
        return;
      }
      var cl = e.target.closest('[data-close]');
      if (cl && modalId) { e.preventDefault(); requestModalClose(); return; }
      if (e.target.closest('#toTop')) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: reducedMotion() ? 'auto' : 'smooth' });
        return;
      }
      if (e.target.closest('#resetBtn') || e.target.closest('#emptyResetBtn')) { e.preventDefault(); resetBrowse(); return; }
      if (e.target.closest('#clearFavBtn')) { e.preventDefault(); clearAllFavorites(); return; }
      if (e.target.closest('#browseClear')) {
        var bs = $('#browseSearch');
        bs.value = '';
        bstate.q = '';
        syncBrowseHash();
        renderBrowse();
        bs.focus();
        return;
      }
      var chip = e.target.closest('#catChips .chip');
      if (chip) {
        bstate.cat = chip.getAttribute('data-cat');
        setChipState(bstate.cat);
        syncBrowseHash();
        renderBrowse();
        return;
      }
      var row = e.target.closest('[data-tool]');
      if (row && !e.target.closest('a,button,select,input')) {
        location.hash = '#/tool/' + row.getAttribute('data-tool');
        return;
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        if (modalId) { e.preventDefault(); requestModalClose(); return; }
        var ae = document.activeElement;
        if (ae && ae.id === 'browseSearch') {
          ae.value = '';
          bstate.q = '';
          syncBrowseHash();
          renderBrowse();
          ae.blur();
          return;
        }
        if (ae && ae.id === 'heroSearch') { ae.value = ''; ae.blur(); }
        return;
      }
      if (e.key === '/' && !e.metaKey && !e.ctrlKey && !e.altKey) {
        var t = e.target;
        var tag = (t.tagName || '').toLowerCase();
        if (tag === 'input' || tag === 'textarea' || tag === 'select' || t.isContentEditable) { return; }
        e.preventDefault();
        if (currentView === 'browse') {
          var bs = $('#browseSearch');
          if (bs) { bs.focus(); }
        } else if (currentView === 'home') {
          var hs = $('#heroSearch');
          if (hs) { hs.focus(); }
        } else {
          pendingFocusSearch = true;
          location.hash = '#/browse';
        }
      }
    });

    $('#browseSearch').addEventListener('input', function () {
      bstate.q = this.value;
      syncBrowseHash();
      renderBrowse();
    });
    $('#browseSearchForm').addEventListener('submit', function (e) { e.preventDefault(); });
    $('#heroSearchForm').addEventListener('submit', function (e) {
      e.preventDefault();
      var v = $('#heroSearch').value.trim();
      location.hash = '#/browse' + (v ? ('?q=' + encodeURIComponent(v)) : '');
    });
    $('#priceSel').addEventListener('change', function () {
      bstate.price = this.value;
      syncBrowseHash();
      renderBrowse();
    });
    $('#sortSel').addEventListener('change', function () {
      bstate.sort = this.value;
      syncBrowseHash();
      renderBrowse();
    });

    var toast = $('#toast');
    toast.addEventListener('mouseenter', pauseToast);
    toast.addEventListener('mouseleave', resumeToast);
    toast.addEventListener('focusin', pauseToast);
    toast.addEventListener('focusout', resumeToast);
  }

  /* ── init ────────────────────────────────────────────────────────── */
  function init() {
    $$('[data-count="tools"]').forEach(function (el) { el.textContent = String(tools.length); });
    $$('[data-count="cats"]').forEach(function (el) { el.textContent = String(categories.length); });
    $$('[data-count="free"]').forEach(function (el) {
      el.textContent = String(tools.filter(function (t) { return t.pricing !== 'paid'; }).length);
    });
    $$('[data-count="edition"]').forEach(function (el) {
      el.textContent = (DATA.edition && DATA.edition.label) || 'Edition 01';
    });

    updateNavCount();
    renderPicks();
    renderCatGrid();
    renderShelf();
    renderForYou();
    renderChips();
    wireEvents();
    route();
  }

  init();
})();
