(function () {
  var zoomables = document.querySelectorAll('img.zoom');
  if (!zoomables.length) return;

  var overlay = document.createElement('div');
  overlay.className = 'lightbox';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', 'Enlarged image');
  overlay.hidden = true;

  var closeBtn = document.createElement('button');
  closeBtn.type = 'button';
  closeBtn.className = 'lightbox-close';
  closeBtn.setAttribute('aria-label', 'Close');
  closeBtn.textContent = '\u00D7';

  var bigImg = document.createElement('img');
  var caption = document.createElement('p');
  caption.className = 'lightbox-caption';

  overlay.appendChild(closeBtn);
  overlay.appendChild(bigImg);
  overlay.appendChild(caption);
  document.body.appendChild(overlay);

  var lastFocus = null;

  function openBox(el) {
    lastFocus = el;
    bigImg.src = el.currentSrc || el.src;
    bigImg.alt = el.alt;
    var fig = el.closest('figure');
    var cap = fig ? fig.querySelector('figcaption') : null;
    caption.textContent = cap ? cap.textContent : '';
    overlay.hidden = false;
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function closeBox() {
    overlay.hidden = true;
    document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus();
  }

  zoomables.forEach(function (el) {
    el.tabIndex = 0;
    el.setAttribute('role', 'button');
    el.addEventListener('click', function () { openBox(el); });
    el.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openBox(el);
      }
    });
  });

  overlay.addEventListener('click', closeBox);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !overlay.hidden) closeBox();
  });
})();
