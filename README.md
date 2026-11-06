# FH-Wedding — Fina & Huda

Starter website undangan digital dengan Vite dan Supabase.

## Menjalankan lokal
1. Install Node.js.
2. `npm install`
3. Salin `.env.example` menjadi `.env` dan isi URL proyek Supabase serta publishable/anon key.
4. `npm run dev`

## Deploy GitHub
Upload seluruh isi folder ini ke repository GitHub `FH-Wedding`. Untuk GitHub Pages, build dengan `npm run build`; folder output adalah `dist`.

## Database
Tabel `public.guest_messages` harus tersedia. Website memakai insert saja untuk RSVP; jangan masukkan service-role key ke frontend.

## Musik
File musik tidak disertakan. Tambahkan audio yang kamu punya hak untuk menggunakannya dan implementasikan pemutar setelah itu.
