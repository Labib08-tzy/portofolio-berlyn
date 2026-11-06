# Product Requirements Document (PRD)

**Proyek:** Website Portofolio Pribadi
**Pemilik:** Berlyn Tiara Hapsari (Siswa SMK Negeri 1 Giritontro - Jurusan TJKT)
**Tema:** Ocean Blue, Frank Ocean Aesthetic, & Antigravity Design
**Teknologi:** HTML, CSS, JavaScript (Statis, Tanpa Framework)
**Versi:** 1.2

## 1. Ringkasan

Proyek ini adalah pembuatan situs web portofolio statis pribadi untuk Berlyn Tiara Hapsari. Website ini difokuskan sebagai identitas digital untuk menonjolkan keahlian dasar di bidang Teknik Jaringan Komputer dan Telekomunikasi (TJKT). Portofolio ini dibalut dengan sentuhan estetika musik Frank Ocean, warna biru samudra, dan animasi "Antigravity" (melayang) yang memberikan kesan modern dan kreatif.

## 2. Tujuan

* **Utama:** Menyediakan platform online profesional untuk menampilkan profil dan keahlian jaringan/IT siswa SMK.
* **Akademis/Karier:** Mempermudah pencarian tempat Praktik Kerja Lapangan (PKL) dan menarik perhatian perekrut magang.
* **Branding:** Membangun kehadiran digital yang berkarakter, menggabungkan sisi teknis (TJKT) dengan visual artistik (musik, laut, antigravitasi).

## 3. Target Pengguna

* **Perekrut dan Perusahaan IT:** Yang mencari kandidat siswa magang/PKL di bidang infrastruktur jaringan.
* **Guru/Pembimbing Industri:** Yang mengevaluasi kelayakan siswa.
* **Kolega/Siswa Lain:** Sebagai referensi portofolio kreatif.

## 4. Fitur dan Halaman

Menggunakan format **Single Page Application (SPA) / One-page layout** dengan navigasi *smooth scroll*.

* **Beranda (Hero Section):**
  * Foto profil dengan sentuhan warna biru (*ocean tone*).
  * Nama: Berlyn Tiara Hapsari.
  * *Tagline*: "TJKT Student | Network Enthusiast | Frank Ocean Listener".
  * Tombol CTA: "Lihat Profil" dan "Unduh CV".

* **Tentang Saya ("Liner Notes"):**
  * Perkenalan sebagai siswa SMK N 1 Giritontro yang memiliki minat tinggi pada teknologi jaringan komputer dan telekomunikasi.

* **Keterampilan ("Tracklist"):**
  * Daftar kemampuan teknis yang dipelajari di sekolah (misal: Perakitan PC, Crimping Kabel LAN, Dasar Topologi, Cisco Packet Tracer dasar).
  * Ditampilkan dengan gaya visual menyerupai *tracklist* album musik.

* **Praktikum & Jurnal ("Discography"):**
  * Menggantikan bagian proyek berat. Berisi galeri tugas sekolah atau dokumentasi praktikum.
  * Contoh isi: "Simulasi Jaringan Kelas", "Praktek Crimping RJ45", atau sekadar catatan/artikel pendek tentang jaringan.
  * Kartu (card) didesain mirip *cover* piringan hitam (*vinyl*) atau album.

* **Kontak ("Outro"):**
  * Informasi kontak (Email, WhatsApp, LinkedIn/Instagram).
  * Widget kecil "Now Playing" statis yang menampilkan lagu favorit Frank Ocean (misal: *Nights*, *Pink + White*, atau *Swim Good*).

## 5. Kebutuhan Non-Fungsional

* **Responsif:** Tampilan beradaptasi sempurna dari layar HP hingga Desktop.
* **Cepat:** Tanpa *framework* berat, memastikan situs dimuat dalam hitungan detik.
* **Aksesibilitas:** Teks mudah dibaca dengan kontras yang baik meskipun menggunakan tema warna *moody*.

## 6. Gaya Desain & Animasi (Antigravity)

* **Warna Utama:** Biru Samudra (*Deep Ocean Blue*), aksen putih/silver.
* **Konsep Visual:** *Moody*, *Nostalgic*, dan minimalis ala *cover* album alternatif R&B.
* **Efek Antigravity:** 
  * Menggunakan CSS Animation (seperti `transform: translateY` secara berulang) pada elemen tertentu (seperti foto profil atau kartu "Discography") agar terlihat bergerak naik-turun secara perlahan, seolah melayang di dalam air atau ruang hampa.
* **Tipografi:** Font *sans-serif* yang bersih namun tegas (seperti *Helvetica Neue* atau *Inter*) untuk menjaga kesan profesional teknologi.

## 7. Struktur Folder

```
portofolio-berlyn/
│
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── assets/
│   ├── img/            # Foto profil, dokumentasi praktikum
│   ├── icons/          # Ikon UI
│   └── docs/           # File CV (.pdf)
└── README.md
```

## 8. Kriteria Selesai

* \[ \] Semua bagian informasi tersampaikan dengan jelas.
* \[ \] Animasi *antigravity* berjalan mulus (halus) dan tidak membuat pusing (subtle).
* \[ \] Nuansa Frank Ocean dan warna laut terlihat jelas.
* \[ \] Website dapat diakses dengan rapi melalui *smartphone*.