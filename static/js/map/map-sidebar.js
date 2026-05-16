// MIGoRIX Sidebar Menu JS

(() => {
  const overlay = document.createElement('div');
  overlay.id = 'migorix-sidebar-overlay';
  overlay.className = 'migorix-sidebar-overlay';
  document.body.appendChild(overlay);

  const sidebar = document.createElement('aside');
  sidebar.id = 'migorix-sidebar';
  sidebar.className = 'migorix-sidebar';
  sidebar.setAttribute('aria-hidden', 'true');
  sidebar.setAttribute('role', 'navigation');

  sidebar.innerHTML = `
    <header class="migorix-sidebar-header">
      <h2>Меню</h2>
      <button id="migorix-sidebar-close" class="migorix-sidebar-close" aria-label="Закрыть меню">×</button>
    </header>
    <nav class="migorix-sidebar-menu">
      <ul>
        <li><button class="migorix-sidebar-item" data-menu-item="profile">Профиль</button></li>
        <li><button class="migorix-sidebar-item" data-menu-item="orders">История заказов</button></li>
        <li><button class="migorix-sidebar-item" data-menu-item="favorites">Избранное</button></li>
        <li><button class="migorix-sidebar-item" data-menu-item="balance">Баланс / Оплата</button></li>
        <li><button class="migorix-sidebar-item" data-menu-item="settings">Настройки</button></li>
        <li><button class="migorix-sidebar-item" data-menu-item="ai">AI помощник</button></li>
        <li><button class="migorix-sidebar-item" data-menu-item="update">Обновление приложения</button></li>
        <li><button class="migorix-sidebar-item" data-menu-item="support">Поддержка</button></li>
        <li><button class="migorix-sidebar-item" data-menu-item="about">О проекте</button></li>
      </ul>
      <div class="migorix-sidebar-update-message" id="updateMessage" style="display:none;">Функция обновления в разработке.</div>
    </nav>
  `;

  document.body.appendChild(sidebar);

  const openBtn = document.querySelector('.map-menu-btn');
  const closeBtn = document.getElementById('migorix-sidebar-close');

  function openSidebar() {
    overlay.classList.add('active');
    sidebar.classList.add('active');
    sidebar.setAttribute('aria-hidden', 'false');
  }

  function closeSidebar() {
    overlay.classList.remove('active');
    sidebar.classList.remove('active');
    sidebar.setAttribute('aria-hidden', 'true');
    hideUpdateMessage();
  }

  function toggleSidebar() {
    if (sidebar.classList.contains('active')) {
      closeSidebar();
    } else {
      openSidebar();
    }
  }

  function showUpdateMessage() {
    const msg = document.getElementById('updateMessage');
    if (msg) {
      msg.style.display = 'block';
      console.log('Обновление приложения: функция в разработке');
    }
  }

  function hideUpdateMessage() {
    const msg = document.getElementById('updateMessage');
    if (msg) {
      msg.style.display = 'none';
    }
  }

  openBtn.addEventListener('click', toggleSidebar);
  closeBtn.addEventListener('click', closeSidebar);
  overlay.addEventListener('click', closeSidebar);

  // Обработка клика по пункту "Обновление приложения"
  sidebar.querySelector('[data-menu-item="update"]').addEventListener('click', () => {
    showUpdateMessage();
  });

  // TODO: добавить обработку swipe для закрытия меню

})();
