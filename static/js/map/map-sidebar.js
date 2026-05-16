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
      <div class="migorix-sidebar-profile">
        <div class="migorix-sidebar-avatar"></div>
        <div class="migorix-sidebar-profile-info">
          <strong>Михаил</strong>
          <span class="migorix-sidebar-status">Онлайн</span>
        </div>
      </div>
      <button id="migorix-sidebar-close"
              class="migorix-sidebar-close"
              aria-label="Закрыть меню">×</button>
    </header>

    <nav class="migorix-sidebar-menu">
      <ul>
        <li>
          <button class="migorix-sidebar-item"
                  data-menu-item="profile">
            <span class="migorix-sidebar-item-icon">👤</span>
            <span class="migorix-sidebar-item-text">Профиль</span>
          </button>
        </li>

        <li>
          <button class="migorix-sidebar-item"
                  data-menu-item="orders">
            <span class="migorix-sidebar-item-icon">🕘</span>
            <span class="migorix-sidebar-item-text">История заказов</span>
          </button>
        </li>

        <li>
          <button class="migorix-sidebar-item"
                  data-menu-item="favorites">
            <span class="migorix-sidebar-item-icon">♡</span>
            <span class="migorix-sidebar-item-text">Избранное</span>
          </button>
        </li>

        <li>
          <button class="migorix-sidebar-item"
                  data-menu-item="balance">
            <span class="migorix-sidebar-item-icon">▣</span>
            <span class="migorix-sidebar-item-text">Баланс / Оплата</span>
          </button>
        </li>

        <li>
          <button class="migorix-sidebar-item"
                  data-menu-item="settings">
            <span class="migorix-sidebar-item-icon">⚙</span>
            <span class="migorix-sidebar-item-text">Настройки</span>
          </button>
        </li>

        <li>
          <button class="migorix-sidebar-item"
                  data-menu-item="ai">
            <span class="migorix-sidebar-item-icon">AI</span>
            <span class="migorix-sidebar-item-text">AI помощник</span>
          </button>
        </li>

        <li>
          <button class="migorix-sidebar-item active"
                  data-menu-item="update">
            <span class="migorix-sidebar-item-icon">⬆</span>
            <span class="migorix-sidebar-item-text">Обновление приложения</span>
          </button>
        </li>

        <li>
          <button class="migorix-sidebar-item"
                  data-menu-item="support">
            <span class="migorix-sidebar-item-icon">☎</span>
            <span class="migorix-sidebar-item-text">Поддержка</span>
          </button>
        </li>

        <li>
          <button class="migorix-sidebar-item"
                  data-menu-item="about">
            <span class="migorix-sidebar-item-icon">ⓘ</span>
            <span class="migorix-sidebar-item-text">О проекте</span>
          </button>
        </li>
      </ul>

      <div class="migorix-sidebar-update-message"
           id="updateMessage"
           style="display:none;">
        Функция обновления в разработке.
      </div>

      <div class="migorix-sidebar-info-card">
        <div class="migorix-sidebar-info-icon">⚡</div>
        <div class="migorix-sidebar-info-content">
          <strong>Будьте в курсе новых функций</strong>
          <span>Мы делаем MIGoRIX лучше для вас</span>
        </div>
      </div>
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
