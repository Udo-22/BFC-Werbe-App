var V='werbeorte-v6',T='werbeorte-tiles-v1',MAXT=600;
var SHELL=['./','index.html','manifest.webmanifest','lib/leaflet.js','lib/leaflet.css','lib/images/layers.png','lib/images/layers-2x.png','lib/images/marker-icon.png','lib/images/marker-shadow.png','icons/icon-192.png','icons/icon-512.png','icons/apple-touch-icon.png'];
self.addEventListener('install',function(e){e.waitUntil(caches.open(V).then(function(c){return c.addAll(SHELL)}).then(function(){return self.skipWaiting()}))});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(ks){return Promise.all(ks.filter(function(k){return k!=V&&k!=T}).map(function(k){return caches.delete(k)}))}).then(function(){return self.clients.claim()}))});
function trim(c){c.keys().then(function(ks){if(ks.length>MAXT)c.delete(ks[0]).then(function(){trim(c)})})}
self.addEventListener('fetch',function(e){var r=e.request;if(r.method!=='GET')return;var u=new URL(r.url);
 if(/(tile\.openstreetmap\.org|server\.arcgisonline\.com|tile\.opentopomap\.org)$/.test(u.hostname)){e.respondWith(caches.open(T).then(function(c){return c.match(r).then(function(m){
  var f=fetch(r).then(function(n){if(n&&n.status===200){c.put(r,n.clone());trim(c)}return n}).catch(function(){return m});return m||f})}));return}
 if(u.origin===location.origin){e.respondWith(caches.match(r,{ignoreSearch:true}).then(function(m){return m||fetch(r)}))}});
