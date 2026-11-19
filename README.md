# Arcade Tembak-tembakan 2D — GitHub Pages

File siap deploy ke GitHub Pages (gratis):
- `index.html` — game lengkap (semua aset sudah di dalam file, tanpa permintaan eksternal) + SEO (meta description, keywords, Open Graph, JSON-LD VideoGame).
- `robots.txt` dan `sitemap.xml` — bantu Google mengindeks.

## Cara deploy (butuh akun GitHub)
1. Buat repo baru bernama `Pesawat-Tempur` (public).
2. Upload ketiga file ini ke root repo (atau push via git).
3. Settings → Pages → Source: Deploy from a branch → branch `main`, folder `/ (root)` → Save.
4. Game live di `https://<username>.github.io/Pesawat-Tempur/`.
5. Ganti semua `USERNAME` di `index.html`, `robots.txt`, dan `sitemap.xml` dengan username GitHub yang benar, lalu minta Google mengindeks lewat Google Search Console (gratis, submit URL-nya).

Catatan: leaderboard game ini tersimpan per perangkat (localStorage), bukan online — itu tidak berubah dengan hosting ini.
