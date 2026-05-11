# Telegram Mini CRM

Мини CRM на Flask для управления клиентами с авторизацией и SQLite.

## Запуск

1. Соберите и запустите контейнеры:

```bash
docker-compose up --build
```

2. Откройте браузер и перейдите по адресу `http://localhost`.

## Функции

- Авторизация
- Управление клиентами (добавление, редактирование, удаление)
- SQLite база данных
- Bootstrap UI
- Docker + Nginx

## Структура

- `app.py` - основной файл приложения
- `templates/` - HTML шаблоны
- `static/` - статические файлы
- `database.db` - база данных SQLite

## Создание пользователя

Для создания пользователя запустите Python shell внутри контейнера и выполните:

```python
from app import db, User
user = User(username='admin')
user.set_password('yourpassword')
db.session.add(user)
db.session.commit()
```

Затем войдите с этими учетными данными.
