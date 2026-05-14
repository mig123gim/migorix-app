let currentPhoneCountry = 'RU';

const phoneMasks = {
  RU: {
    placeholder: '968-019-24-36',
    maxLength: 13,
    format: function(digits) {
      digits = digits.slice(0, 10);
      return [
        digits.slice(0, 3),
        digits.slice(3, 6),
        digits.slice(6, 8),
        digits.slice(8, 10)
      ].filter(Boolean).join('-');
    }
  },
  KZ: {
    placeholder: '701-234-56-78',
    maxLength: 13,
    format: function(digits) {
      digits = digits.slice(0, 10);
      return [
        digits.slice(0, 3),
        digits.slice(3, 6),
        digits.slice(6, 8),
        digits.slice(8, 10)
      ].filter(Boolean).join('-');
    }
  },
  DE: {
    placeholder: '151-23456789',
    maxLength: 12,
    format: function(digits) {
      digits = digits.slice(0, 11);
      return [
        digits.slice(0, 3),
        digits.slice(3, 11)
      ].filter(Boolean).join('-');
    }
  },
  US: {
    placeholder: '202-555-0187',
    maxLength: 12,
    format: function(digits) {
      digits = digits.slice(0, 10);
      return [
        digits.slice(0, 3),
        digits.slice(3, 6),
        digits.slice(6, 10)
      ].filter(Boolean).join('-');
    }
  },
  AE: {
    placeholder: '50-123-4567',
    maxLength: 11,
    format: function(digits) {
      digits = digits.slice(0, 9);
      return [
        digits.slice(0, 2),
        digits.slice(2, 5),
        digits.slice(5, 9)
      ].filter(Boolean).join('-');
    }
  }
};

function toggleCountryMenu() {
  const menu = document.getElementById('countryMenu');
  if (!menu) return;
  menu.classList.toggle('active');
}

function formatPhoneByCountry(value) {
  const mask = phoneMasks[currentPhoneCountry] || phoneMasks.RU;
  const digits = value.replace(/\D/g, '');
  return mask.format(digits);
}

function applyPhoneMask() {
  const phoneInput = document.getElementById('phoneInput');
  if (!phoneInput) return;

  const mask = phoneMasks[currentPhoneCountry] || phoneMasks.RU;
  phoneInput.placeholder = mask.placeholder;
  phoneInput.maxLength = mask.maxLength;
  phoneInput.value = formatPhoneByCountry(phoneInput.value);
}

function selectCountry(countryKey, flag, codeValue) {
  currentPhoneCountry = countryKey;

  const flagEl = document.getElementById('countryFlag');
  const codeEl = document.getElementById('phoneCode');
  const menu = document.getElementById('countryMenu');

  if (flagEl) flagEl.textContent = countryKey;
  if (codeEl) codeEl.textContent = codeValue;
  if (menu) menu.classList.remove('active');

  const phoneInput = document.getElementById('phoneInput');
  if (phoneInput) phoneInput.value = '';

  applyPhoneMask();
}

function initPhoneScreen() {
  const phoneInput = document.getElementById('phoneInput');
  if (!phoneInput) return;

  applyPhoneMask();

  phoneInput.addEventListener('input', function() {
    phoneInput.value = formatPhoneByCountry(phoneInput.value);
  });
}

window.toggleCountryMenu = toggleCountryMenu;
window.selectCountry = selectCountry;
window.MIGoRIXPhone = {
  applyPhoneMask: applyPhoneMask,
  formatPhoneByCountry: formatPhoneByCountry,
  initPhoneScreen: initPhoneScreen
};

document.addEventListener('DOMContentLoaded', initPhoneScreen);
