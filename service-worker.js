const CACHES = 'todo-today-cache-v1';
const urlsToCache = [
    '/',
    'index.html',
    'styles.css',
    'scripts.js',
    'android-192x192.png',
    'pc-512x512.png',
    'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHES)
        .then(cache => {
            console.log('Cache aberto');
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHES];
    event.waitUntil(
        caches.keys().then(cachesN =>{
            return Promise.all(
                cachesN.map(cachesN => {
                    if(!cacheWhitelist.includes(cachesN)){
                        return caches.delete(cachesN)
                    }
                })
            )
        })
    )
})


self.addEventListener('fetch', event =>{
    event.respondWith(
        caches.match(event.request)
        .then(response =>{
            if(response){
                return response;
            }
            return fetch(event.request);
        })
    )
})

