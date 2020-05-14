/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

importScripts(
  "/precache-manifest.6bc2cc272e2d8f75ae1cef002c6c6410.js"
);

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

workbox.core.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerNavigationRoute(workbox.precaching.getCacheKeyForURL("/index.html"), {
  
  blacklist: [/^\/_/,/\/[^/]+\.[^/]+$/],
});


var cacheName="pis";

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(
        [
          '/css/bootstrap.css',
          '/img/ideaserv.png',
          '/static/css/main.ae9094db.chunks.css',
          '/static/css/main.ae9094db.chunks.css.map',
          '/static/js/2.f1175a05.chunk.js',
          '/static/js/2.f1175a05.chunk.js.map',
          '/static/js/main.a95504a7.chunk.js',
          '/static/js/main.a95504a7.chunk.js.map',
          '/static/js/runtime~main.a8a9905a.js',
          '/static/js/runtime~main.a8a9905a.js.map',
          '/index.html'
        ]
      );
    })
  );
});