/* FALAN LTPN 2026 — shared behavior */

document.addEventListener('DOMContentLoaded', function () {
  initNavToggle();
  markActiveNav();
  initWeekTabs();
  renderMaterials('lectures-root', window.LECTURES, 'lecture', 'presenter');
  renderMaterials('handson-root', window.HANDSON, 'workshop', 'every');
  renderNews('news-root', window.NEWS);
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
 *   { title, presenter, week, day, type: 'drive'|'file'|'note', url, filename, note }
 *
 * type: 'note' items show a text message instead of a file link — use the
 * "note" field for the message body. Plain URLs inside a note are turned
 * into clickable links automatically.
 *
 * breakMode controls the divider line shown between items in the same
 * group:
 *   'presenter' — only when the presenter changes from the previous item
 *                 (used on the Lecture Materials page)
 *   'every'     — before every item except the first (used on the
 *                 Hands-on Materials page, since items in a workshop
 *                 usually share the same presenter)
 */
function renderMaterials(rootId, items, kindLabel, breakMode) {
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
    var lastPresenter = null;
    groups[weekKey].forEach(function (item, index) {
      var presenter = item.presenter || '';
      var isBreak;
      if (breakMode === 'every') {
        isBreak = index > 0;
      } else {
        isBreak = lastPresenter !== null && presenter !== lastPresenter;
      }
      lastPresenter = presenter;
      var breakClass = isBreak ? ' presenter-break' : '';

      if (item.type === 'note') {
        html += '<div class="material-note' + breakClass + '">';
        html += '<span class="title">' + escapeHtml(item.title) + '</span>';
        if (item.presenter || item.day || item.dateAdded) {
          html += '<span class="who">' + escapeHtml(item.presenter || '') + (item.day ? ' &middot; ' + escapeHtml(item.day) : '') + (item.dateAdded ? ' <span class="added-tag">&middot; Added ' + escapeHtml(item.dateAdded) + '</span>' : '') + '</span>';
        }
        html += linkify(escapeHtml(item.note || ''));
        html += '</div>';
        return;
      }
      var href, linkText;
      if (item.type === 'file') {
        href = 'materials/' + item.filename;
        linkText = 'Download';
      } else if (item.type === 'link') {
        href = item.url;
        linkText = item.linkLabel || 'Open link';
      } else {
        href = item.url;
        linkText = 'Open in Drive';
      }
      html += '<div class="material-item' + breakClass + '">';
      html += '<span class="stack">';
      html += '<span class="title">' + escapeHtml(item.title) + '</span>';
      html += '<span class="who">' + escapeHtml(item.presenter || '') + (item.day ? ' &middot; ' + escapeHtml(item.day) : '') + (item.dateAdded ? ' <span class="added-tag">&middot; Added ' + escapeHtml(item.dateAdded) + '</span>' : '') + '</span>';
      html += '</span>';
      html += '<a class="link" href="' + href + '" target="_blank" rel="noopener">' + linkText + ' &rarr;</a>';
      html += '</div>';
    });
    html += '</div>';
  });

  root.innerHTML = html;
}

function linkify(escapedText) {
  var paragraphs = escapedText.split(/\n\s*\n/).map(function (p) {
    return p.replace(/\n/g, '<br>');
  });
  var withLinks = paragraphs.map(function (p) {
    return p.replace(/(https?:\/\/[^\s<]+)/g, '<a href="$1" target="_blank" rel="noopener">$1</a>');
  });
  return withLinks.map(function (p) { return '<p>' + allowBold(p) + '</p>'; }).join('');
}

/**
 * escapeHtml() turns every "<" and ">" into visible text, so a stray
 * bracket anywhere in a data file can never break the page. That means
 * <strong> typed into a "note" or "body" field shows up as literal text
 * instead of making anything bold.
 *
 * This function re-enables JUST <strong> and </strong> (and <b>/</b>)
 * after escaping — so those two tags work as expected, while anything
 * else typed with < or > still shows up safely as plain text.
 */
function allowBold(escapedText) {
  return escapedText
    .replace(/&lt;strong&gt;/g, '<strong>')
    .replace(/&lt;\/strong&gt;/g, '</strong>')
    .replace(/&lt;b&gt;/g, '<strong>')
    .replace(/&lt;\/b&gt;/g, '</strong>');
}

/**
 * Renders the News / Updates page from data/news-data.js.
 * Entries are shown in the order they appear in the array — newest
 * should be listed first there.
 *
 * Optional attachment fields on any entry (same idea as lectures-data.js
 * / handson-data.js — a Drive link OR a small file uploaded to GitHub):
 *   fileType:  "drive" or "file"
 *   url:       the Drive link (only used when fileType is "drive")
 *   filename:  the exact uploaded filename in /materials (only used
 *              when fileType is "file")
 *   fileLabel: optional button text override, e.g. "Download the PDF"
 */
function renderNews(rootId, items) {
  var root = document.getElementById(rootId);
  if (!root) return;

  if (!items || items.length === 0) {
    return; // empty state markup already lives in the page HTML
  }

  var emptyState = root.parentElement.querySelector('.empty-state');
  if (emptyState) emptyState.style.display = 'none';

  var html = '<div class="news-list">';
  items.forEach(function (item) {
    html += '<div class="news-item">';
    html += '<span class="news-date">' + escapeHtml(item.date || '') + '</span>';
    html += '<div>';
    html += '<h3 class="news-title">' + escapeHtml(item.title) + '</h3>';
    if (item.body) {
      html += '<p class="news-body">' + allowBold(escapeHtml(item.body)) + '</p>';
    }
    if (item.fileType) {
      var href = item.fileType === 'file' ? ('materials/' + item.filename) : item.url;
      var label = item.fileLabel || (item.fileType === 'file' ? 'Download' : 'Open in Drive');
      html += '<a class="link news-link" href="' + href + '" target="_blank" rel="noopener">' + escapeHtml(label) + ' &rarr;</a>';
    }
    html += '</div></div>';
  });
  html += '</div>';

  root.innerHTML = html;
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
