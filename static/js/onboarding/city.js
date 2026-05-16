const cityOptions = {
  moscow: { name: 'Москва', country: 'Россия' },
  spb: { name: 'Санкт-Петербург', country: 'Россия' },
  kazan: { name: 'Казань', country: 'Россия' },
  ekb: { name: 'Екатеринбург', country: 'Россия' },
  nsk: { name: 'Новосибирск', country: 'Россия' }
};

let selectedCityKey = 'moscow';
let pendingCityKey = 'moscow';

function getCityElements() {
  return {
    picker: document.getElementById('cityPicker'),
    searchInput: document.getElementById('citySearchInput'),
    cityName: document.getElementById('selectedCityName'),
    cityCountry: document.getElementById('selectedCityCountry'),
    options: document.querySelectorAll('.city-option')
  };
}

function setActiveCityOption(cityKey) {
  const elements = getCityElements();
  elements.options.forEach(function(option) {
    option.classList.toggle('active', option.dataset.city === cityKey);
  });
}

function applyCityToCard(cityKey) {
  const city = cityOptions[cityKey];
  if (!city) return;

  const elements = getCityElements();
  if (elements.cityName) {
    elements.cityName.textContent = city.name;
  }
  if (elements.cityCountry) {
    elements.cityCountry.textContent = city.country;
  }
}

function showCityPicker() {
  const elements = getCityElements();
  pendingCityKey = selectedCityKey;

  if (elements.searchInput) {
    elements.searchInput.value = '';
  }

  setActiveCityOption(pendingCityKey);
  filterCities();

  if (elements.picker) {
    elements.picker.classList.add('active');
  }
}

function hideCityPicker() {
  const elements = getCityElements();
  if (elements.picker) {
    elements.picker.classList.remove('active');
  }
}

function selectCity(cityKey) {
  if (!cityOptions[cityKey]) return;
  pendingCityKey = cityKey;
  setActiveCityOption(pendingCityKey);
}

function confirmCity() {
  selectedCityKey = pendingCityKey;
  applyCityToCard(selectedCityKey);
  hideCityPicker();
}

function filterCities() {
  const elements = getCityElements();
  const query = elements.searchInput ? elements.searchInput.value.trim().toLowerCase() : '';

  elements.options.forEach(function(option) {
    const cityKey = option.dataset.city;
    const city = cityOptions[cityKey];
    const cityName = city ? city.name.toLowerCase() : option.textContent.trim().toLowerCase();
    option.classList.toggle('hidden', query !== '' && !cityName.includes(query));
  });
}

function goToMap() {
  if (window.showScreen) {
    window.showScreen('screen-map');

    requestAnimationFrame(function () {
      setTimeout(function () {
        if (window.MIGoRIXMap) {
          window.MIGoRIXMap.init();
        }
      }, 50);
    });
  }
}

function initCityScreen() {
  applyCityToCard(selectedCityKey);
  setActiveCityOption(selectedCityKey);
  filterCities();
  return true;
}

window.showCityPicker = showCityPicker;
window.selectCity = selectCity;
window.confirmCity = confirmCity;
window.goToMap = goToMap;
window.filterCities = filterCities;

window.MIGoRIXCity = {
  initCityScreen: initCityScreen,
  showCityPicker: showCityPicker,
  hideCityPicker: hideCityPicker,
  selectCity: selectCity,
  confirmCity: confirmCity,
  filterCities: filterCities,
  goToMap: goToMap
};
