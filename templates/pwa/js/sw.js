/* eslint-disable no-console */
var CACHE = 'CHERUB0.1'
var cacheList = ['index.html']
var offlineURL = 'offline.html'
// install static assets
function installStaticFiles() {
  return caches.open(CACHE)
    .then(cache => {
      return cache.addAll(cacheList.concat(offlineURL))
    })
}

// clear old caches
function clearOldCaches() {
  return caches.keys()
    .then(keyList => {
      return Promise.all(
        keyList
          .filter(key => key !== CACHE)
          .map(key => caches.delete(key))
      )
    })
}

// is image URL?
let iExt = ['png', 'jpg', 'jpeg', 'gif', 'webp', 'bmp'].map(f => '.' + f)
function isImage(url) {
  return iExt.reduce((ret, ext) => ret || url.endsWith(ext), false)
}

// return offline asset
function offlineAsset(url) {
  if (isImage(url)) {

    // return image
    return new Response(
      '<svg role="img" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg"><title>offline</title><path d="M0 0h400v300H0z" fill="#eee" /><text x="200" y="150" text-anchor="middle" dominant-baseline="middle" font-family="sans-serif" font-size="50" fill="#ccc">offline</text></svg>',
      { headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'no-store'
      }}
    )

  }
  else {
    // return page
    var response = caches.match(offlineURL)
    console.info('response', response)
    return response

  }
}

// application installation
self.addEventListener('install', event => {

  console.log('service worker: install')

  // cache core files
  event.waitUntil(
    installStaticFiles()
      .then(() => self.skipWaiting())
  )

})

self.addEventListener('activate', function(event) {
  console.log('service worker: activate')

  // delete old caches
  event.waitUntil(
    clearOldCaches()
      .then(() => self.clients.claim())
  )
})

self.addEventListener('fetch', function (event) {

  if (event.request.method !== 'GET') return

  let url = event.request.url

  event.respondWith(
    caches.open(CACHE)
      .then(cache => {
        return cache.match(event.request, { ignoreSearch: true })
          .then(function (response) {
            if (response) {
              return response
            }
            var requestToCache = event.request.clone()
            return fetch(requestToCache).then((response) => {
              if (!response || response.status !== 200) {
                return response
              }
              // var responseToCache = response.clone();
              // caches.open(cacheName)
              //   .then(function (cache) {
              //     cache.put(requestToCache, responseToCache)
              //   });
              return response
            })
              .catch(() => offlineAsset(url))
          })
      })
  )
})