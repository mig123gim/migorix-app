// Basic logic for opening/closing fullscreen navigation hub

(() => {
  const menuBtn = document.querySelector('.map-menu-btn');
  const hub = document.querySelector('.migorix-hub');
  const closeBtn = document.querySelector('.migorix-hub-close');
  const overlay = document.querySelector('.migorix-hub-overlay');

  if (!menuBtn || !hub || !closeBtn || !overlay) {
    return;
  }

  function openHub(event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    if (hub.classList.contains('is-active')) {
      return;
    }
    hub.classList.add('is-active');
    hub.setAttribute('aria-hidden', 'false');
    document.body.classList.add('migorix-hub-open');
    document.body.style.overflow = 'hidden';
  }

  function closeHub() {
    if (!hub.classList.contains('is-active')) {
      return;
    }
    hub.classList.remove('is-active');
    hub.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('migorix-hub-open');
    document.body.style.overflow = '';
  }

  menuBtn.addEventListener('click', openHub, true); // capture phase
  closeBtn.addEventListener('click', closeHub);
  overlay.addEventListener('click', closeHub);

  document.addEventListener('keydown', (event) => {
    if ((event.key === 'Escape' || event.key === 'Esc') && hub.classList.contains('is-active')) {
      closeHub();
    }
  });
})();

