# MIGoRIX Current Working State

## 1. Текущее стабильное состояние:

- 2GIS MapGL работает
- API key читается
- map.js подключён
- нижнее меню работает
- bottom panel работает
- fake realtime overlay работает поверх 2GIS
- backup tag: backup-mapgl-working-full

## 2. Ключевые файлы:

- templates/index.html
- static/js/map/map.js
- static/js/onboarding/city.js
- static/js/map/map-bottom-panel.js
- static/js/map/map-controls.js
- static/css/map/map.css
- static/css/map/map-bottom-panel.css

## 3. Важные правила:

- не удалять map.js из index.html
- не трогать initMapScreen хаотично
- не возвращать _initialized guard в map-bottom-panel.js
- не добавлять второй MAPGL_API_KEY блок
- не менять CSS overlay без отдельной проверки
- не трогать bottom panel при работе с картой
- одна задача = один коммит

## 4. Что было причиной проблем:

- map.js не был подключён в index.html
- duplicate MAPGL_API_KEY перезаписывал правильный ключ
- console.log MAPGL_API_KEY до объявления ломал весь map.js
- _initialized guard ломал повторную инициализацию bottom panel
- вызов только initMapGL не запускал menu/panel, нужен общий init

## 5. Следующий план:

- убрать debug logs
- смягчить overlay поверх 2GIS
- скрыть стандартные 2GIS controls
- сделать тестовые realtime-маркеры
- сделать клик по маркеру  bottom panel

