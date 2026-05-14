# MIGoRIX Onboarding

MIGoRIX mobile onboarding prototype is a Flask-based single-page onboarding flow for a mobile CRM experience.

The current runtime is fully modular:

- HTML: `templates/index.html`
- CSS source of truth: `static/css/onboarding/*.css`
- JS source of truth: `static/js/onboarding/*.js`

Legacy `main.css` and `app.js` are no longer used by the application.

## Stack

- Flask
- HTML
- CSS
- JavaScript
- Docker
- nginx

## Project Structure

```text
crm-test/
├─ app.py
├─ requirements.txt
├─ Dockerfile
├─ docker-compose.yml
├─ nginx.conf
├─ templates/
│  └─ index.html
├─ static/
│  ├─ css/
│  │  └─ onboarding/
│  │     ├─ base.css
│  │     ├─ shared.css
│  │     ├─ phone.css
│  │     ├─ sms.css
│  │     ├─ geo.css
│  │     └─ city.css
│  ├─ js/
│  │  └─ onboarding/
│  │     ├─ shared.js
│  │     ├─ phone.js
│  │     ├─ sms.js
│  │     ├─ geo.js
│  │     └─ city.js
│  └─ img/
│     ├─ migorix-city.png
│     ├─ sms-city.png
│     ├─ geo-map.png
│     └─ city-confirm.png
└─ backups/
```

## Onboarding Screens

The prototype contains four onboarding screens:

- `PHONE`: phone number entry and country selection
- `SMS`: SMS confirmation code and resend timer
- `GEO`: geolocation permission request
- `CITY`: detected city confirmation

## CSS Source Of Truth

All active styles live in:

```text
static/css/onboarding/
```

Files:

- `base.css`: reset, app shell, screen visibility, typography, base buttons, brand mark
- `shared.css`: shared brand spacing and title styles
- `phone.css`: PHONE screen, phone input, country menu, policy text
- `sms.css`: SMS screen, OTP boxes, timer, resend button
- `geo.css`: GEO screen layout and controls
- `city.css`: CITY screen layout and city card

## JS Source Of Truth

All active onboarding scripts live in:

```text
static/js/onboarding/
```

Files:

- `shared.js`: screen switching
- `phone.js`: country menu, country selection, phone formatting
- `sms.js`: SMS phone display, resend timer, progress ring
- `geo.js`: GEO screen initializer
- `city.js`: CITY screen initializer

Inline handlers in `templates/index.html` rely on window-level functions exported by these modules.

## Legacy Files

The old monolithic files are no longer part of runtime:

- `static/css/main.css`
- `static/js/app.js`

Historical versions and cleanup checkpoints are stored under:

```text
backups/archive/
```

The final working backup after CSS and JS modularization is:

```text
backups/working_after_css_and_js_modules/
```

## Local Run

Install dependencies:

```bash
pip install -r requirements.txt
```

Run Flask:

```bash
python app.py
```

Open:

```text
http://127.0.0.1:5000/
```

## Docker Compose

Build and run:

```bash
docker-compose up --build
```

Open:

```text
http://127.0.0.1:5000/
```
