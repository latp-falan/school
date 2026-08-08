/* FALAN LTPN 2026 — shared behavior */

document.addEventListener('DOMContentLoaded', function () {
  initNavToggle();
  markActiveNav();
  initWeekTabs();
  renderMaterials('lectures-root', window.LECTURES, 'lecture');
  renderMaterials('handson-root', window.HANDSON, 'workshop');
});

function initNavToggle() {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.primary-nav');
  if (!toggle || !nav) return;
  toggle.addEventListener('click', function () {
    nav.classList.toggle('open');
    var expanded = nav.classList.contains('open');
    toggle.setAttribute('aria-expanded', expanded ? 'true' : 'false');
  });
}

function markActiveNav() {
  var here = (location.pathname.split('/').pop() || 'index.html');
  document.querySelectorAll('.primary-nav a').forEach(function (a) {
    var target = a.getAttribute('href');
    if (target === here || (here === '' && target === 'index.html')) {
      a.classList.add('active');
    }
  });
}

function initWeekTabs() {
  var tabWraps = document.querySelectorAll('.week-tabs');
  tabWraps.forEach(function (wrap) {
    var buttons = wrap.querySelectorAll('button');
    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var group = wrap.getAttribute('data-group');
        var target = btn.getAttribute('data-target');
        buttons.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        document.querySelectorAll('.week-panel[data-group="' + group + '"]').forEach(function (panel) {
          panel.classList.toggle('active', panel.id === target);
        });
      });
    });
  });
}

/**
 * Renders material cards (lectures or hands-on workshops) grouped by "week".
 * Falls back to a friendly empty state when the array is empty.
 *
 * Expected item shape (see data/lectures-data.js and data/handson-data.js
 * for the exact fields and worked examples):
 *   { title, presenter, week, day, type: 'drive'|'file', url, filename }
 */
function renderMaterials(rootId, items, kindLabel) {
  var root = document.getElementById(rootId);
  if (!root) return;

  if (!items || items.length === 0) {
    return; // empty state markup already lives in the page HTML
  }

  // hide the empty state, show the list
  var emptyState = root.parentElement.querySelector('.empty-state');
  if (emptyState) emptyState.style.display = 'none';

  var groups = {};
  var order = [];
  items.forEach(function (item) {
    var key = item.week || 'Materials';
    if (!groups[key]) { groups[key] = []; order.push(key); }
    groups[key].push(item);
  });

  var html = '';
  order.forEach(function (weekKey) {
    html += '<div class="materials-group">';
    html += '<h3>' + escapeHtml(weekKey) + '</h3>';
    groups[weekKey].forEach(function (item) {
      var href = item.type === 'file'
        ? ('materials/' + item.filename)
        : item.url;
      var linkText = item.type === 'file' ? 'Download' : 'Open in Drive';
      html += '<div class="material-item">';
      html += '<span class="stack">';
      html += '<span class="title">' + escapeHtml(item.title) + '</span>';
      html += '<span class="who">' + escapeHtml(item.presenter || '') + (item.day ? ' &middot; ' + escapeHtml(item.day) : '') + '</span>';
      html += '</span>';
      html += '<a class="link" href="' + href + '" target="_blank" rel="noopener">' + linkText + ' &rarr;</a>';
      html += '</div>';
    });
    html += '</div>';
  });

  root.innerHTML = html;
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
