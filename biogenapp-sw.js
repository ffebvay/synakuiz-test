// Copyright 2016 Google Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

var dataCacheName = 'quizData-v1'
var cacheName = 'quizShellCache-v1'

var filesToCache = [
    './',
    './public/index.html',
    './src/App.vue',
    './src/main.js',
    './src/router.js',
    './src/store.js',
    './src/_helpers/auth-header.js',
    './src/_helpers/fake-backend.js',
    './src/_helpers/index.js',
    './src/_modules/account.module.js',
    './src/_modules/alert.module.js',
    './src/_modules/users.module.js',
    './src/_services/user.service.js',
    './src/_services/index.js',
    './src/components/Answers.vue',
    './src/components/Game.vue',
    './src/components/Header.vue',
    './src/components/LeaderBoards.vue',
    './src/components/Login.vue',
    './src/components/LogoutControl.vue',
    './src/components/Question.vue',
    './src/components/Register.vue',
    './src/components/Results.vue',
    './src/components/ScoreChart.vue',
    './src/components/Welcome.vue',
    './src/assets/logos-02.png',
    './public/img/icons/apple-icon-57x57.png',
    './public/img/icons/apple-icon-60x60.png',
    './public/img/icons/apple-icon-72x72.png',
    './public/img/icons/apple-icon-76x76.png',
    './public/img/icons/apple-icon-114x114.png',
    './public/img/icons/apple-icon-120x120.png',
    './public/img/icons/apple-icon-144x144.png',
    './public/img/icons/apple-icon-152x152.png',
    './public/img/icons/apple-icon-180x180.png',
    './public/img/icons/android-icon-192x192.png',
    './public/img/icons/favicon-16x16.png',
    './public/img/icons/favicon-32x32.png',
    './public/img/icons/favicon-96x96.png',
    './public/img/icons/ms-icon-144x144.png'
]

self.addEventListener('install', function(e) {
    console.log('[ServiceWorker] Install')
    e.waitUntil(
        caches.open(cacheName).then(function(cache) {
            console.log('[ServiceWorker] Caching app shell')
            return cache.addAll(filesToCache)
        })
    )
})

self.addEventListener('activate', function(e) {
    console.log('[ServiceWorker] Activate')
    e.waitUntil(
        caches.keys().then(function(keyList) {
            return Promise.all(keyList.map(function(key) {
                if (key !== cacheName && key !== dataCacheName) {
                    console.log('[ServiceWorker] Removing old cache', key)
                    return caches.delete(key)
                }
            }))
        })
    )
    /*
     * Fixes a corner case in which the app wasn't returning the latest data.
     * You can reproduce the corner case by commenting out the line below and
     * then doing the following steps: 1) load app for first time so that the
     * initial New York City data is shown 2) press the refresh button on the
     * app 3) go offline 4) reload the app. You expect to see the newer NYC
     * data, but you actually see the initial data. This happens because the
     * service worker is not yet activated. The code below essentially lets
     * you activate the service worker faster.
     */
    return self.clients.claim()
})

self.addEventListener('fetch', function(e) {
    console.log('[Service Worker] Fetching cached data : ', e.request.url)
    var dataUrl = 'https://opentdb.com/api.php?amount=10&category=17'
    if (e.request.url.indexOf(dataUrl) > -1) {
        /*
         * When the request URL contains dataUrl, the app is asking for fresh
         * questions data. In this case, the service worker always goes to the
         * network and then caches the response. This is called the "Cache then
         * network" strategy:
         * https://jakearchibald.com/2014/offline-cookbook/#cache-then-network
         */
        e.respondWith(
            caches.open(dataCacheName).then(function(cache) {
                return fetch(e.request).then(function(response){
                    cache.put(e.request.url, response.clone())
                    return response
                })
            })
        )
    } else {
        /*
         * The app is asking for app shell files. In this scenario the app uses the
         * "Cache, falling back to the network" offline strategy:
         * https://jakearchibald.com/2014/offline-cookbook/#cache-falling-back-to-network
         */
        e.respondWith(
            caches.match(e.request).then(function(response) {
                return response || fetch(e.request)
            })
        )
    }
})

