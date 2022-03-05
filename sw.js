var CACHE_NAME = 'my-ednabu';
var urlsToCache = [
    '/',
    '/index.html',
    '/style.css',
    '/main.js',
    '/data/signs.json',
    '/data/sux.json',
    '/fonts/newfont.ttf',
    '/fonts/Assurbanipal.ttf',
    '/fonts/NotoSansCuneiform.ttf',
    '/fonts/UR3.ttf'
];

self.addEventListener('install', function(event) {
    // Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(function(cache) {
            console.log('Opened cache');
            return cache.addAll(urlsToCache);
        })
    );
});
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
        .then(function(response) {
            // Cache hit - return response
            if (response) {
                return response;
            }
            return fetch(event.request);
        })
    );
});
cache.addAll(urlsToPrefetch.map(function(urlToPrefetch) {
    return new Request(urlToPrefetch, { mode: 'no-cors' });
})).then(function() {
    console.log('All resources have been fetched and cached.');
});