# EZ Translate

Traductor ES · DE · EN potenciado por **Claude**, enfocado en lenguaje **cotidiano y real** (no académico): alemán de oficina (Amt-Deutsch), de la calle de Berlín, coloquial, etc. Clasifica el registro de cada traducción y da tips culturales.

App de **un solo archivo** (`index.html`), 100% estática. Funciona en móvil y computadora. Sin servidor, sin build.

## Funciones
- Traducción ES↔DE, EN↔DE, DE↔ES/EN con clasificación de registro y tips.
- **Cámara**: lee texto de fotos (carteles, menús, formularios) y lo traduce (OCR con visión de Claude).
- **Voz**: dictado por micrófono + escuchar la traducción (normal y lento).
- **Historial** de tus traducciones (guardado local en el navegador).

## Cómo usar tu API key
1. Consigue una clave en https://console.anthropic.com/settings/keys
2. Abre la app → toca el badge **FREE** arriba a la derecha → pega tu clave → **GUARDAR**.
3. La clave se guarda **solo en tu navegador** (localStorage). Nunca va a ningún servidor tuyo.

> La app llama a la API de Anthropic directamente desde el navegador usando el header `anthropic-dangerous-direct-browser-access: true`. Es el patrón "bring your own key", ideal para uso personal. **No subas tu API key al repositorio.**

## Publicar en GitHub Pages
1. Crea un repo nuevo (ej. `ez-translate`) y sube `index.html` (y este `README.md`).
2. En GitHub: **Settings → Pages → Source: `Deploy from a branch` → Branch: `main` / `/root` → Save**.
3. En ~1 min tendrás una URL tipo `https://TU-USUARIO.github.io/ez-translate/`.
4. Ábrela en el teléfono y, en Safari/Chrome, "Añadir a pantalla de inicio" para usarla como app.

> La cámara y el micrófono requieren **HTTPS**. GitHub Pages ya sirve por HTTPS, así que funcionarán. En `file://` local no funcionan.

## Probar en local
```bash
# opción simple
python3 -m http.server 8000
# luego abre http://localhost:8000
```

## Modelos
En el modal puedes elegir: **Sonnet 4.6** (recomendado), **Opus 4.7** (máxima calidad) o **Haiku 4.5** (más rápido/barato). Cámbialo según costo/calidad.
