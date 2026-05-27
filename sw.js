/* EZ Translate — service worker
   Cachea la "cáscara" de la app para que abra rápido / sin red.
   NUNCA cachea las traducciones (esas siempre van en vivo al proxy). */
const CACHE = "ez-translate-v1";
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png"
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const url = e.request.url;
  // Nunca interceptar llamadas a la API / proxy: siempre en vivo.
  if (url.includes("workers.dev") || url.includes("anthropic.com") || e.request.method !== "GET") {
    return; // deja pasar normal a la red
  }
  // Para los archivos de la app: primero red, si falla usa caché.
  e.respondWith(
    fetch(e.request)
      .then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(e.request, copy)).catch(() => {});
        return res;
      })
      .catch(() => caches.match(e.request).then((r) => r || caches.match("./index.html")))
  );
});
