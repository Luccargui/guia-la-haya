# La Haya · guía React

Guía turística de La Haya para el domingo 4 de octubre de 2026.

## Ejecutar

```bash
npm install
npm run dev
```

## Google Maps

Abre `src/App.jsx` y busca:

```js
const GOOGLE_MAPS_LIST_URL = "https://maps.app.goo.gl/cNTVF1s5MeNAzCoMA?g_st=i";
```

La lista ya está conectada: **“La Haya · Lucia”**.

### Importante sobre el iframe
Las listas guardadas normales de Google Maps no disponen de un iframe público de inserción como Google My Maps. Por eso el proyecto:
1. muestra un mapa de Google Maps centrado en cada parada;
2. ofrece el botón de tu lista personal mediante el enlace compartido.

Si lo que tienes es un mapa de **Google My Maps**, puedes usar directamente:

```text
https://www.google.com/maps/d/embed?mid=TU_ID
```

en lugar del `mapEmbed` del componente.

## Audio

El botón «Escuchar» usa la Web Speech API del navegador y genera la lectura en español sin depender de archivos de audio externos.
