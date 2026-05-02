const CACHE_NAME = "mutema-v1"; // Change v1 en v2 quand tu fais une grosse mise à jour
const ASSETS_TO_CACHE = [
  "./",
  "./index.html",
  "./manifest.json",
  "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&family=Bebas+Neue&family=JetBrains+Mono&display=swap",
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
];

// Installation : Mise en cache des ressources critiques
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("📦 MUTEMA : Cache ouvert et ressources en cours de stockage");
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting(); // Force le nouveau SW à prendre le contrôle immédiatement
});

// Activation : Nettoyage des anciens caches si la version change
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log("🧹 MUTEMA : Suppression de l'ancien cache", cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Stratégie : Network First, fallback to Cache
// On essaie d'abord de récupérer les données fraîches, si pas de réseau, on prend le cache
self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});
