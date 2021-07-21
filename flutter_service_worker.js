'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "d0dfe525e93ac27d1d8ee4b64ed752ef",
"assets/assets/fonts/Lato-Black.ttf": "e631d2735799aa943d93d301abf423d2",
"assets/assets/fonts/Lato-Bold.ttf": "85d339d916479f729938d2911b85bf1f",
"assets/assets/fonts/Lato-Italic.ttf": "7582e823ef0d702969ea0cce9afb326d",
"assets/assets/fonts/Lato-Regular.ttf": "2d36b1a925432bae7f3c53a340868c6e",
"assets/assets/images/auth/login.png": "719847d45f0372f5d8d5822d933c956a",
"assets/assets/images/auth/register.png": "0720effae944aff7c52d4e14430dfb82",
"assets/assets/images/home/undraw1.png": "97066fe29e30d2b0e96527f3d0d78d5f",
"assets/assets/images/home/undraw2.png": "8d58e8703665a80e6840aed77c0ab539",
"assets/assets/images/landing/block1.png": "3054432bcc3530d2ced7341ce7e2e33d",
"assets/assets/images/landing/block2.png": "5c0373cf1cc9716ee7b2975e31c7b514",
"assets/assets/images/landing/block3.png": "ebe11f94bd088383601544293facaa69",
"assets/assets/images/landing/hero.png": "02dc79b77b4cf24e643a6b96c72d39a9",
"assets/assets/images/landing/hero2.png": "e00045ad096ddd49921af2504d28edbe",
"assets/assets/svgs/appointees.svg": "8f7473b4fdaa4242b87659be8b42c5a0",
"assets/assets/svgs/appointments.svg": "98d6e088642a1c833a9fc23c74be8013",
"assets/assets/svgs/back.svg": "6fdef9ead401e195fa941f574f92bb23",
"assets/assets/svgs/calender.svg": "d0422b191ec214cb1964f23fb7831ca6",
"assets/assets/svgs/cancel-button.svg": "f9083b01d217007836cff335fe76a92e",
"assets/assets/svgs/clock.svg": "af4d20ed32864e170fdc364859b01bc5",
"assets/assets/svgs/copy.svg": "db32b46f0ed0b511b59eed6b415dca90",
"assets/assets/svgs/dashboard.svg": "3d1f526e5e7187e537236776cb5d1f2e",
"assets/assets/svgs/download.svg": "9279c946120bbbfb11141e5978ff3107",
"assets/assets/svgs/edit.svg": "0f6b947b41a2dfc15990409deaec8c48",
"assets/assets/svgs/facebook.svg": "1ffaf969721eb9775e29874db0750553",
"assets/assets/svgs/indicator.svg": "999adcc833e1561da707ab898761fb40",
"assets/assets/svgs/linkedIn.svg": "d360822e8ab72010a9a9f5a8b03ba1fc",
"assets/assets/svgs/login.svg": "384ef7c2ee899f9a6392d89ffa776689",
"assets/assets/svgs/logout.svg": "608107dead684883b172b7c0b6518bf8",
"assets/assets/svgs/section1.svg": "dd2d79cc613742cb6a1357bf2ff4b2be",
"assets/assets/svgs/section2.svg": "ffd4fcef9fc56b184cd7539b507b62da",
"assets/assets/svgs/send.svg": "d91c3907a73253614ddb102003081cd6",
"assets/assets/svgs/settings.svg": "65420b9a40717dba31d8b0f2567f3654",
"assets/assets/svgs/tick.svg": "fc0f8ec3b9f0beb8337a5cd195c9f190",
"assets/assets/svgs/tip.svg": "33e0b5d34cc1dcadc9813d381d8f7c78",
"assets/assets/svgs/twitter.svg": "a1ed5a05696815e76e9a3a8f74f88c89",
"assets/assets/svgs/undraw.svg": "be7da0afc3a6a3fc10f042340f9bdcc7",
"assets/assets/svgs/youTube.svg": "bbffff195a347b9030a70de4532dfce9",
"assets/FontManifest.json": "574a7c1be47e56d1f4a61dcc4dcf1d54",
"assets/fonts/MaterialIcons-Regular.otf": "4e6447691c9509f7acdbf8a931a85ca1",
"assets/NOTICES": "8f24f234f8cec09d8779cf88c5644cac",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"index.html": "fe5bc37f20abe4aa0b706d62f9dbb661",
"/": "fe5bc37f20abe4aa0b706d62f9dbb661",
"main.dart.js": "d81615ad175e96b0ceaecd148633b1a1",
"manifest.json": "8a520f44ac7694d0f914c0dd783c091f",
"version.json": "b19882aedd40ea9f405e9aff7d96ff87"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "/",
"main.dart.js",
"index.html",
"assets/NOTICES",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache.
        return response || fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
