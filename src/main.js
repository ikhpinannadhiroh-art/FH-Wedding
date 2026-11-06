import { createClient } from '@supabase/supabase-js';
import './style.css';
// Isi URL dan anon key Supabase setelah proyek dibuat. Jangan gunakan service_role key di browser.
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
const db = SUPABASE_URL && SUPABASE_ANON_KEY ? createClient(SUPABASE_URL,SUPABASE_ANON_KEY) : null;
const params = new URLSearchParams(location.search);
const guest = params.get('to') || 'Tamu Undangan';
document.querySelector('#app').innerHTML = `
<section class="hero"><small>THE WEDDING OF</small><h1>Fina <span>&</span> Huda</h1><p>Senin, 11 Januari 2027</p><div class="ornament">❦</div><p>Kepada Yth. ${escapeHtml(guest)}</p><button id="open">Buka Undangan</button></section>
<section class="content"><h2>Assalamu'alaikum Warahmatullaahi Wabarakaatuh</h2><p>Dengan memohon rahmat dan ridho Allah SWT, kami mengundang Bapak/Ibu/Saudara/i untuk hadir di acara pernikahan kami.</p><h2>Ikhpinan Nadhiroh</h2><p>Putri dari Bapak Muhlisin & Ibu Nurhayati</p><h2>Moch. Kholidul Huda</h2><p>Putra dari Bapak Abdul Karim (Alm.) & Ibu Sururiyah</p><h2>Akad Nikah</h2><p>Senin, 11 Januari 2027 · 09.00 WIB – selesai</p><h2>Resepsi</h2><p>Senin, 11 Januari 2027 · 13.00 WIB – selesai</p><p>Kediaman Mempelai Wanita, Dsn. Jatisari RT.001/RW.036, Ds. Wonorejo, Kec. Kencong, Kab. Jember</p><a href="https://maps.app.goo.gl/pTqzMtJLBg27RPMX7?g_st=aw" target="_blank">Buka Google Maps</a>
<h2>Konfirmasi Kehadiran & Ucapan</h2><form id="rsvp"><input name="guest_name" required maxlength="100" placeholder="Nama"><select name="attendance"><option>Hadir</option><option>Tidak Hadir</option></select><input name="guest_count" type="number" min="0" max="10" value="1"><textarea name="message" maxlength="1000" placeholder="Ucapan dan doa"></textarea><button>Kirim</button></form><p id="status"></p><footer>Dengan penuh cinta, Fina & Huda</footer></section>`;
function escapeHtml(s){return s.replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));}
document.querySelector('#open').onclick=()=>document.querySelector('.content').scrollIntoView({behavior:'smooth'});
document.querySelector('#rsvp').onsubmit=async e=>{e.preventDefault();if(!db){document.querySelector('#status').textContent='Database belum dikonfigurasi. Tambahkan VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY.';return;}const f=new FormData(e.target);const row={guest_name:f.get('guest_name'),attendance:f.get('attendance'),guest_count:Number(f.get('guest_count')),message:f.get('message')};const {error}=await db.from('guest_messages').insert(row);document.querySelector('#status').textContent=error?'Gagal mengirim. Coba lagi.':'Terima kasih, RSVP terkirim!';if(!error)e.target.reset();};
