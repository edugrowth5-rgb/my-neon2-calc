const CACHE_NAME = 'citizen-neon-v-final';
const assets = [
  './',
  './index.html',
  './manifest.json'
];

// इंस्टॉल करते समय फाइलों को ऑफलाइन स्टोर करना
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Caching assets for offline use...');
      return cache.addAll(assets);
    })
  );
});

// ऑफलाइन होने पर स्टोर की गई फाइलों को दिखाना
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// पुराने वर्जन को डिलीट करके नया वर्जन एक्टिवेट करना
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key))
      );
    })
  );
});
