// Nama cache versi 1. Ubah ke v2 jika Anda mengupdate file website.
const CACHE_NAME = 'adrteknik-cache-v1';

// DAFTAR ASET YANG HARUS DISIMPAN DALAM CACHE
// MOHON SESUAIKAN DENGAN NAMA FILE DAN LOKASI ANDA DI NETLIFY
const ASSETS_TO_CACHE = [
  '/', 
  '/index.html',
  '/manifest.json',
  // >>> TAMBAHKAN JALUR FILE LOGO ANDA DI BAWAH INI <<<
  '/icons/icon-192x192.png', // Contoh: Ganti dengan nama file logo Anda
  '/icons/icon-512x512.png', // Contoh: Ganti dengan nama file logo Anda
  // >>> JANGAN LUPA TANDA KOMA DI AKHIR SETIAP BARIS <<<
];

// --- JANGAN RUBAH KODE DI BAWAH INI ---

// Event: Menginstal Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Service Worker: Caching required assets');
      return cache.addAll(ASSETS_TO_CACHE);
    }).catch((err) => {
      console.error('Service Worker: Cache addAll failed during install', err);
    })
  );
});

// Event: Mengaktifkan Service Worker (membersihkan cache lama)
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) {
          console.log('Service Worker: Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
});

// Event: Mengambil (Fetch) aset (strategi cache-first)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});
