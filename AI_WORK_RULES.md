# Правила работы с MIGoRIX

## 1. Проект

* MIGoRIX — mobile-first realtime city map UI.
* Главный экран карты должен ощущаться как Uber/live-map, а не CRM.
* Основная карта — настоящая 2GIS MapGL.
* Fake overlay больше не использовать без отдельного согласования.

## 2. Важные файлы

* templates/index.html — структура экранов и подключение JS/CSS.
* static/js/map/map.js — инициализация 2GIS MapGL.
* static/js/onboarding/city.js — переход CITY → MAP.
* static/js/map/map-bottom-panel.js — bottom panel, tabs, handle.
* static/js/map/map-controls.js — правые controls.
* static/css/map/map.css — только базовый слой карты и скрытие fake overlay.
* static/css/map/map-bottom-panel.css — стили bottom panel.
* static/css/map/map-controls.css — правые кнопки.

## 3. Критические правила

* Не удалять подключение /static/js/map/map.js из templates/index.html.
* Не добавлять второй MAPGL_API_KEY.
* MAPGL_API_KEY должен быть объявлен ДО подключения map.js.
* Не писать console.log(MAPGL_API_KEY) до объявления константы.
* Не трогать initMapScreen без анализа.
* После перехода на screen-map должен запускаться общий init, а не только initMapGL.
* Не возвращать _initialized guard в map-bottom-panel.js без необходимости.
* Bottom panel должен уметь повторно инициализироваться после показа MAP.
* Не ломать нижнее меню data-map-tab.
* Не скрывать topbar, weather, right controls, bottom panel, нижнее меню.

## 4. История проблем

* map.js не был подключён в index.html → window.MIGoRIXMap был undefined.
* duplicate MAPGL_API_KEY перезаписывал правильный ключ.
* console.log до объявления MAPGL_API_KEY ломал весь map.js.
* вызов только initMapGL не запускал panel/menu.
* _initialized guard мешал повторной инициализации bottom panel.
* fake overlay закрывал 2GIS и мешал карте.
* CSS overrides вставлялись в середину файла и ломали структуру.
* Правки надо делать только после поиска реального файла/селектора.

## 5. Текущий рабочий UI

* 2GIS карта чистая.
* fake route, fake dots, fake markers, current-position и decorative grid скрыты.
* Верхняя панель видна.
* Погода видна.
* Правые кнопки видны.
* Нижнее меню работает.
* Bottom panel работает.
* map.css очищен примерно до 90 строк.

## 6. Правила git

* Одна задача = один commit.
* Перед изменениями показывать файлы, которые будут затронуты.
* Перед commit показывать git diff.
* Не пушить без подтверждения, если задача рискованная.
* После стабильного состояния делать backup tag.
* Не работать в случайной ветке. Проверять git branch.
* main обновлять только проверенными изменениями.

## 7. Рабочий процесс

* Сначала анализ.
* Потом план.
* Потом минимальная правка.
* Потом diff.
* Потом commit.
* Потом push.
* Потом проверка на сервере.
