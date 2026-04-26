/* =====================================================
   promo.js — DevForge Friday Promo (Auto Rotating)

   Cara kerja:
   - Setiap Jumat, script cek tanggal hari ini (WIB)
   - Cocokkan ke jadwal promo di bawah
   - Kalau ada jadwal → tampilkan promo itu
   - Kalau tanggal habis → pakai promo DEFAULT
   - Hari lain → tidak ada yang tampil sama sekali

   Mau tambah/edit promo?
   Tambah baris baru di bagian JADWAL dengan format:
   "YYYY-MM-DD": { title, subtitle, items: [...] }
   Pastikan tanggalnya hari Jumat.
===================================================== */

(function () {
  'use strict';

  const WA_URL   = 'https://wa.me/6287738441668?text=Halo%20min%2C%20mau%20klaim%20promo%20Jumat!';
  const TIMEZONE = 'Asia/Jakarta';

  /* ═══════════════════════════════════════════════════
     JADWAL PROMO — sudah diisi sampai Desember 2025
     Ganti promo cukup edit di sini, upload sekali,
     jalan otomatis setiap Jumat sesuai tanggal.
  ═══════════════════════════════════════════════════ */
  const JADWAL = {

    // ── MEI 2025 ──
    "2025-05-02": {
      title: "JUMAT HEMAT.",
      subtitle: "Diskon buat yang butuh web cepet.",
      items: [
        { label: "Web Development",    original: "100K", promo: "75K",  discount: "25%" },
        { label: "Bug Fix & Debug",    original: "50K",  promo: "30K",  discount: "40%" },
        { label: "Database & Backend", original: "80K",  promo: "60K",  discount: "25%" },
      ]
    },
    "2025-05-09": {
      title: "JUMAT MOBILE.",
      subtitle: "Minggu ini fokus ke Mobile App.",
      items: [
        { label: "Mobile App",         original: "150K", promo: "110K", discount: "27%" },
        { label: "Bug Fix & Debug",    original: "50K",  promo: "25K",  discount: "50%" },
        { label: "Web Development",    original: "100K", promo: "80K",  discount: "20%" },
      ]
    },
    "2025-05-16": {
      title: "JUMAT DATA.",
      subtitle: "Promo spesial buat anak Data Science.",
      items: [
        { label: "Data Science & ML",  original: "120K", promo: "85K",  discount: "29%" },
        { label: "Database & Backend", original: "80K",  promo: "55K",  discount: "31%" },
        { label: "Bug Fix & Debug",    original: "50K",  promo: "30K",  discount: "40%" },
      ]
    },
    "2025-05-23": {
      title: "JUMAT FULLSTACK.",
      subtitle: "Web + Backend sekaligus, harga miring.",
      items: [
        { label: "Web Development",    original: "100K", promo: "70K",  discount: "30%" },
        { label: "Database & Backend", original: "80K",  promo: "55K",  discount: "31%" },
        { label: "Mobile App",         original: "150K", promo: "120K", discount: "20%" },
      ]
    },
    "2025-05-30": {
      title: "JUMAT AKHIR BULAN.",
      subtitle: "Flash sale tutup bulan. Hari ini aja.",
      items: [
        { label: "Bug Fix & Debug",    original: "50K",  promo: "20K",  discount: "60%" },
        { label: "Web Development",    original: "100K", promo: "65K",  discount: "35%" },
        { label: "Data Science & ML",  original: "120K", promo: "90K",  discount: "25%" },
      ]
    },

    // ── JUNI 2025 ──
    "2025-06-06": {
      title: "JUMAT HEMAT.",
      subtitle: "Buka Juni dengan promo spesial.",
      items: [
        { label: "Web Development",    original: "100K", promo: "75K",  discount: "25%" },
        { label: "Mobile App",         original: "150K", promo: "115K", discount: "23%" },
        { label: "Bug Fix & Debug",    original: "50K",  promo: "30K",  discount: "40%" },
      ]
    },
    "2025-06-13": {
      title: "JUMAT ML.",
      subtitle: "Spesial Data Science & Machine Learning.",
      items: [
        { label: "Data Science & ML",  original: "120K", promo: "80K",  discount: "33%" },
        { label: "Database & Backend", original: "80K",  promo: "55K",  discount: "31%" },
        { label: "Bug Fix & Debug",    original: "50K",  promo: "25K",  discount: "50%" },
      ]
    },
    "2025-06-20": {
      title: "JUMAT MOBILE.",
      subtitle: "Mau app Android atau Flutter? Ini waktunya.",
      items: [
        { label: "Mobile App",         original: "150K", promo: "100K", discount: "33%" },
        { label: "Web Development",    original: "100K", promo: "80K",  discount: "20%" },
        { label: "Bug Fix & Debug",    original: "50K",  promo: "30K",  discount: "40%" },
      ]
    },
    "2025-06-27": {
      title: "JUMAT AKHIR BULAN.",
      subtitle: "Last Friday Juni. Promo gede sebelum Juli.",
      items: [
        { label: "Bug Fix & Debug",    original: "50K",  promo: "20K",  discount: "60%" },
        { label: "Web Development",    original: "100K", promo: "60K",  discount: "40%" },
        { label: "Mobile App",         original: "150K", promo: "110K", discount: "27%" },
      ]
    },

    // ── JULI 2025 ──
    "2025-07-04": {
      title: "JUMAT HEMAT.",
      subtitle: "Awal Juli, promo langsung gas.",
      items: [
        { label: "Web Development",    original: "100K", promo: "75K",  discount: "25%" },
        { label: "Database & Backend", original: "80K",  promo: "55K",  discount: "31%" },
        { label: "Bug Fix & Debug",    original: "50K",  promo: "30K",  discount: "40%" },
      ]
    },
    "2025-07-11": {
      title: "JUMAT BACKEND.",
      subtitle: "Spesial Database, API, dan Backend.",
      items: [
        { label: "Database & Backend", original: "80K",  promo: "50K",  discount: "38%" },
        { label: "Web Development",    original: "100K", promo: "80K",  discount: "20%" },
        { label: "Bug Fix & Debug",    original: "50K",  promo: "25K",  discount: "50%" },
      ]
    },
    "2025-07-18": {
      title: "JUMAT DATA.",
      subtitle: "Data Science dan ML minggu ini.",
      items: [
        { label: "Data Science & ML",  original: "120K", promo: "85K",  discount: "29%" },
        { label: "Database & Backend", original: "80K",  promo: "60K",  discount: "25%" },
        { label: "Bug Fix & Debug",    original: "50K",  promo: "30K",  discount: "40%" },
      ]
    },
    "2025-07-25": {
      title: "JUMAT AKHIR BULAN.",
      subtitle: "Tutup Juli dengan flash sale.",
      items: [
        { label: "Bug Fix & Debug",    original: "50K",  promo: "20K",  discount: "60%" },
        { label: "Web Development",    original: "100K", promo: "65K",  discount: "35%" },
        { label: "Mobile App",         original: "150K", promo: "110K", discount: "27%" },
      ]
    },

    // ── AGUSTUS 2025 ──
    "2025-08-01": {
      title: "JUMAT HEMAT.",
      subtitle: "Agustus dimulai dengan promo spesial.",
      items: [
        { label: "Web Development",    original: "100K", promo: "70K",  discount: "30%" },
        { label: "Mobile App",         original: "150K", promo: "115K", discount: "23%" },
        { label: "Bug Fix & Debug",    original: "50K",  promo: "30K",  discount: "40%" },
      ]
    },
    "2025-08-08": {
      title: "JUMAT MOBILE.",
      subtitle: "App Android & Flutter diskon gede.",
      items: [
        { label: "Mobile App",         original: "150K", promo: "100K", discount: "33%" },
        { label: "Database & Backend", original: "80K",  promo: "55K",  discount: "31%" },
        { label: "Bug Fix & Debug",    original: "50K",  promo: "25K",  discount: "50%" },
      ]
    },
    "2025-08-15": {
      title: "JUMAT MERDEKA.",
      subtitle: "17 Agustus sebentar lagi. Promo kemerdekaan!",
      items: [
        { label: "Web Development",    original: "100K", promo: "60K",  discount: "40%" },
        { label: "Mobile App",         original: "150K", promo: "100K", discount: "33%" },
        { label: "Data Science & ML",  original: "120K", promo: "80K",  discount: "33%" },
      ]
    },
    "2025-08-22": {
      title: "JUMAT PASCA MERDEKA.",
      subtitle: "Semangat 17an masih ada. Promo lanjut.",
      items: [
        { label: "Bug Fix & Debug",    original: "50K",  promo: "25K",  discount: "50%" },
        { label: "Database & Backend", original: "80K",  promo: "55K",  discount: "31%" },
        { label: "Web Development",    original: "100K", promo: "75K",  discount: "25%" },
      ]
    },
    "2025-08-29": {
      title: "JUMAT AKHIR BULAN.",
      subtitle: "Tutup Agustus, flash sale terakhir bulan ini.",
      items: [
        { label: "Bug Fix & Debug",    original: "50K",  promo: "20K",  discount: "60%" },
        { label: "Web Development",    original: "100K", promo: "65K",  discount: "35%" },
        { label: "Data Science & ML",  original: "120K", promo: "85K",  discount: "29%" },
      ]
    },

    // ── SEPTEMBER 2025 ──
    "2025-09-05": {
      title: "JUMAT HEMAT.",
      subtitle: "September datang, promo tetap jalan.",
      items: [
        { label: "Web Development",    original: "100K", promo: "75K",  discount: "25%" },
        { label: "Mobile App",         original: "150K", promo: "110K", discount: "27%" },
        { label: "Bug Fix & Debug",    original: "50K",  promo: "30K",  discount: "40%" },
      ]
    },
    "2025-09-12": {
      title: "JUMAT BACKEND.",
      subtitle: "API, database, backend — semua miring.",
      items: [
        { label: "Database & Backend", original: "80K",  promo: "50K",  discount: "38%" },
        { label: "Web Development",    original: "100K", promo: "80K",  discount: "20%" },
        { label: "Bug Fix & Debug",    original: "50K",  promo: "25K",  discount: "50%" },
      ]
    },
    "2025-09-19": {
      title: "JUMAT ML.",
      subtitle: "Data Science & Machine Learning week.",
      items: [
        { label: "Data Science & ML",  original: "120K", promo: "80K",  discount: "33%" },
        { label: "Database & Backend", original: "80K",  promo: "60K",  discount: "25%" },
        { label: "Bug Fix & Debug",    original: "50K",  promo: "30K",  discount: "40%" },
      ]
    },
    "2025-09-26": {
      title: "JUMAT AKHIR BULAN.",
      subtitle: "Tutup September dengan promo gila.",
      items: [
        { label: "Bug Fix & Debug",    original: "50K",  promo: "20K",  discount: "60%" },
        { label: "Web Development",    original: "100K", promo: "60K",  discount: "40%" },
        { label: "Mobile App",         original: "150K", promo: "110K", discount: "27%" },
      ]
    },

    // ── OKTOBER 2025 ──
    "2025-10-03": {
      title: "JUMAT HEMAT.",
      subtitle: "Oktober buka dengan promo spesial.",
      items: [
        { label: "Web Development",    original: "100K", promo: "70K",  discount: "30%" },
        { label: "Database & Backend", original: "80K",  promo: "55K",  discount: "31%" },
        { label: "Bug Fix & Debug",    original: "50K",  promo: "30K",  discount: "40%" },
      ]
    },
    "2025-10-10": {
      title: "JUMAT MOBILE.",
      subtitle: "Mobile App diskon, ambil sekarang.",
      items: [
        { label: "Mobile App",         original: "150K", promo: "105K", discount: "30%" },
        { label: "Web Development",    original: "100K", promo: "80K",  discount: "20%" },
        { label: "Bug Fix & Debug",    original: "50K",  promo: "25K",  discount: "50%" },
      ]
    },
    "2025-10-17": {
      title: "JUMAT DATA.",
      subtitle: "ML dan Data Science special week.",
      items: [
        { label: "Data Science & ML",  original: "120K", promo: "85K",  discount: "29%" },
        { label: "Database & Backend", original: "80K",  promo: "55K",  discount: "31%" },
        { label: "Bug Fix & Debug",    original: "50K",  promo: "30K",  discount: "40%" },
      ]
    },
    "2025-10-24": {
      title: "JUMAT FULLSTACK.",
      subtitle: "Web + Backend combo minggu ini.",
      items: [
        { label: "Web Development",    original: "100K", promo: "70K",  discount: "30%" },
        { label: "Database & Backend", original: "80K",  promo: "50K",  discount: "38%" },
        { label: "Mobile App",         original: "150K", promo: "115K", discount: "23%" },
      ]
    },
    "2025-10-31": {
      title: "JUMAT HALLOWEEN.",
      subtitle: "Trick or treat? Ini treat dari kita.",
      items: [
        { label: "Bug Fix & Debug",    original: "50K",  promo: "15K",  discount: "70%" },
        { label: "Web Development",    original: "100K", promo: "60K",  discount: "40%" },
        { label: "Data Science & ML",  original: "120K", promo: "80K",  discount: "33%" },
      ]
    },

    // ── NOVEMBER 2025 ──
    "2025-11-07": {
      title: "JUMAT HEMAT.",
      subtitle: "November hadir dengan promo fresh.",
      items: [
        { label: "Web Development",    original: "100K", promo: "75K",  discount: "25%" },
        { label: "Mobile App",         original: "150K", promo: "110K", discount: "27%" },
        { label: "Bug Fix & Debug",    original: "50K",  promo: "30K",  discount: "40%" },
      ]
    },
    "2025-11-14": {
      title: "JUMAT BACKEND.",
      subtitle: "Database dan API week, mumpung murah.",
      items: [
        { label: "Database & Backend", original: "80K",  promo: "50K",  discount: "38%" },
        { label: "Web Development",    original: "100K", promo: "80K",  discount: "20%" },
        { label: "Bug Fix & Debug",    original: "50K",  promo: "25K",  discount: "50%" },
      ]
    },
    "2025-11-21": {
      title: "JUMAT ML.",
      subtitle: "Data Science dan Machine Learning miring.",
      items: [
        { label: "Data Science & ML",  original: "120K", promo: "80K",  discount: "33%" },
        { label: "Database & Backend", original: "80K",  promo: "60K",  discount: "25%" },
        { label: "Bug Fix & Debug",    original: "50K",  promo: "30K",  discount: "40%" },
      ]
    },
    "2025-11-28": {
      title: "JUMAT BLACK FRIDAY.",
      subtitle: "Black Friday ala DevForge. Promo paling gede tahun ini.",
      items: [
        { label: "Bug Fix & Debug",    original: "50K",  promo: "15K",  discount: "70%" },
        { label: "Web Development",    original: "100K", promo: "55K",  discount: "45%" },
        { label: "Mobile App",         original: "150K", promo: "100K", discount: "33%" },
      ]
    },

    // ── DESEMBER 2025 ──
    "2025-12-05": {
      title: "JUMAT HEMAT.",
      subtitle: "Desember dimulai, promo tetap on.",
      items: [
        { label: "Web Development",    original: "100K", promo: "70K",  discount: "30%" },
        { label: "Database & Backend", original: "80K",  promo: "55K",  discount: "31%" },
        { label: "Bug Fix & Debug",    original: "50K",  promo: "30K",  discount: "40%" },
      ]
    },
    "2025-12-12": {
      title: "JUMAT MOBILE.",
      subtitle: "Mau selesai sebelum libur? Gas sekarang.",
      items: [
        { label: "Mobile App",         original: "150K", promo: "100K", discount: "33%" },
        { label: "Web Development",    original: "100K", promo: "75K",  discount: "25%" },
        { label: "Bug Fix & Debug",    original: "50K",  promo: "25K",  discount: "50%" },
      ]
    },
    "2025-12-19": {
      title: "JUMAT PRA NATAL.",
      subtitle: "Last order sebelum libur panjang!",
      items: [
        { label: "Bug Fix & Debug",    original: "50K",  promo: "20K",  discount: "60%" },
        { label: "Web Development",    original: "100K", promo: "65K",  discount: "35%" },
        { label: "Data Science & ML",  original: "120K", promo: "85K",  discount: "29%" },
      ]
    },
    "2025-12-26": {
      title: "JUMAT AKHIR TAHUN.",
      subtitle: "Promo penutup 2025. Kejar deadline sebelum 2026!",
      items: [
        { label: "Bug Fix & Debug",    original: "50K",  promo: "15K",  discount: "70%" },
        { label: "Web Development",    original: "100K", promo: "55K",  discount: "45%" },
        { label: "Mobile App",         original: "150K", promo: "100K", discount: "33%" },
      ]
    },

  };

  /* ─────────────────────────────────────────────────
     PROMO DEFAULT — pakai ini kalau jadwal habis
  ───────────────────────────────────────────────── */
  const DEFAULT = {
    title: "JUMAT HEMAT.",
    subtitle: "Promo khusus hari ini aja.",
    items: [
      { label: "Web Development",    original: "100K", promo: "75K",  discount: "25%" },
      { label: "Bug Fix & Debug",    original: "50K",  promo: "30K",  discount: "40%" },
      { label: "Database & Backend", original: "80K",  promo: "60K",  discount: "25%" },
      { label: "Mobile App",         original: "150K", promo: "110K", discount: "27%" },
    ]
  };

  /* ─────────────────────────────────────────────────
     UTILS
  ───────────────────────────────────────────────── */
  function getWIB() {
    return new Date(new Date().toLocaleString('en-US', { timeZone: TIMEZONE }));
  }
  function isFriday() { return getWIB().getDay() === 5; }
  function todayKey() {
    const d = getWIB();
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
  }
  function getPromo() { return JADWAL[todayKey()] || DEFAULT; }
  function timeLeft() {
    const now = getWIB(), mid = new Date(now);
    mid.setHours(24,0,0,0);
    const d = mid - now;
    const h = Math.floor(d/3600000), m = Math.floor((d%3600000)/60000), s = Math.floor((d%60000)/1000);
    return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
  }
  function firstVisitToday() {
    const k = 'dfp_seen', t = todayKey();
    if (localStorage.getItem(k) === t) return false;
    localStorage.setItem(k, t); return true;
  }

  /* ─────────────────────────────────────────────────
     STYLES
  ───────────────────────────────────────────────── */
  function injectStyles() {
    const s = document.createElement('style');
    s.textContent = `
      #promo-banner{position:fixed;top:0;left:0;right:0;z-index:1000;background:#fff;color:#000;padding:9px 20px;display:flex;align-items:center;justify-content:center;gap:10px;font-family:'JetBrains Mono',monospace;font-size:.68rem;font-weight:600;letter-spacing:.06em;text-transform:uppercase;border-bottom:1px solid rgba(0,0,0,.08);animation:pBannerIn .4s ease both;white-space:nowrap;overflow:hidden}
      .pb-dot{width:6px;height:6px;border-radius:50%;background:#000;animation:pblink 1.3s ease infinite;flex-shrink:0}
      .pb-badge{background:#000;color:#fff;padding:3px 8px;border-radius:4px;font-size:.6rem;font-weight:700;letter-spacing:.1em;flex-shrink:0}
      .pb-text{overflow:hidden;text-overflow:ellipsis}
      .pb-link{color:#000;text-decoration:underline;font-weight:700;flex-shrink:0;cursor:pointer;transition:opacity .2s}
      .pb-link:hover{opacity:.6}
      @keyframes pBannerIn{from{transform:translateY(-100%);opacity:0}to{transform:translateY(0);opacity:1}}
      @keyframes pblink{0%,100%{opacity:1}50%{opacity:.15}}
      body.has-promo nav{top:46px!important}
      body.has-promo .mob-nav{top:122px!important}
      #pm-overlay{position:fixed;inset:0;z-index:1200;background:rgba(0,0,0,.88);backdrop-filter:blur(16px);display:flex;align-items:center;justify-content:center;padding:20px;animation:pmOvIn .3s ease both}
      @keyframes pmOvIn{from{opacity:0}to{opacity:1}}
      #pm-box{background:#080808;border:1px solid rgba(255,255,255,.14);border-radius:22px;width:100%;max-width:500px;position:relative;overflow:hidden;animation:pmBoxIn .45s cubic-bezier(.34,1.56,.64,1) both;box-shadow:0 32px 80px rgba(0,0,0,.7)}
      @keyframes pmBoxIn{from{opacity:0;transform:scale(.86) translateY(28px)}to{opacity:1;transform:scale(1) translateY(0)}}
      #pm-box::before{content:'';position:absolute;top:0;left:10%;right:10%;height:1px;background:linear-gradient(90deg,transparent,rgba(255,255,255,.32),transparent)}
      .pmh{padding:26px 26px 18px;border-bottom:1px solid rgba(255,255,255,.07);position:relative}
      .pmh-badge{display:inline-flex;align-items:center;gap:7px;background:#fff;color:#000;font-family:'JetBrains Mono',monospace;font-size:.6rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;padding:4px 12px;border-radius:4px;margin-bottom:14px}
      .pmh-bdot{width:5px;height:5px;border-radius:50%;background:#000;animation:pblink 1.3s ease infinite}
      .pmh-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(1.8rem,5vw,2.8rem);letter-spacing:.04em;line-height:1;color:#fff;margin-bottom:6px}
      .pmh-sub{font-size:.82rem;font-weight:500;color:rgba(255,255,255,.45);line-height:1.65}
      .pm-x{position:absolute;top:18px;right:18px;width:30px;height:30px;border-radius:8px;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.1);display:flex;align-items:center;justify-content:center;cursor:pointer;color:rgba(255,255,255,.4);font-size:.75rem;transition:all .2s}
      .pm-x:hover{background:rgba(255,255,255,.12);color:#fff}
      .pmb{padding:20px 26px 26px}
      .pm-items{display:flex;flex-direction:column;gap:8px;margin-bottom:20px}
      .pm-item{display:flex;align-items:center;justify-content:space-between;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:12px;padding:12px 16px;gap:12px;transition:border-color .2s}
      .pm-item:hover{border-color:rgba(255,255,255,.18)}
      .pm-lbl{font-family:'Plus Jakarta Sans',sans-serif;font-size:.82rem;font-weight:600;color:rgba(255,255,255,.8)}
      .pm-prices{display:flex;align-items:center;gap:8px;flex-shrink:0}
      .pm-orig{font-family:'JetBrains Mono',monospace;font-size:.68rem;color:rgba(255,255,255,.25);text-decoration:line-through}
      .pm-new{font-family:'Bebas Neue',sans-serif;font-size:1.15rem;letter-spacing:.04em;color:#fff}
      .pm-disc{font-family:'JetBrains Mono',monospace;font-size:.58rem;font-weight:700;color:#000;background:#fff;padding:2px 7px;border-radius:4px;letter-spacing:.06em}
      .pm-note{font-family:'JetBrains Mono',monospace;font-size:.6rem;color:rgba(255,255,255,.2);text-align:center;margin-bottom:12px;letter-spacing:.04em}
      .pm-timer{font-family:'JetBrains Mono',monospace;font-size:.62rem;font-weight:600;color:rgba(255,255,255,.28);text-align:center;margin-bottom:20px;letter-spacing:.04em}
      .pm-timer .v{color:rgba(255,255,255,.7);font-size:.8rem}
      .pm-cta{display:flex;align-items:center;justify-content:center;gap:9px;width:100%;padding:13px;background:#fff;color:#000;border:none;border-radius:12px;font-family:'Plus Jakarta Sans',sans-serif;font-weight:700;font-size:.88rem;text-decoration:none;cursor:pointer;transition:all .25s}
      .pm-cta:hover{background:rgba(255,255,255,.88);transform:translateY(-2px);box-shadow:0 6px 24px rgba(255,255,255,.12)}
      #promo-strip-sec{position:relative;z-index:2;padding:0 24px 80px;background:#000}
      .ps-in{max-width:1080px;margin:0 auto}
      .ps-wrap{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.14);border-radius:20px;padding:28px;position:relative;overflow:hidden}
      .ps-wrap::before{content:'';position:absolute;top:0;left:10%;right:10%;height:1px;background:linear-gradient(90deg,transparent,rgba(255,255,255,.28),transparent)}
      .ps-row{display:flex;align-items:center;justify-content:space-between;gap:20px;flex-wrap:wrap}
      .ps-left{display:flex;align-items:center;gap:16px}
      .ps-badge{font-family:'JetBrains Mono',monospace;font-size:.6rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;background:#fff;color:#000;padding:4px 12px;border-radius:5px;flex-shrink:0}
      .ps-title{font-family:'Bebas Neue',sans-serif;font-size:1.4rem;letter-spacing:.04em;color:#fff}
      .ps-sub{font-size:.78rem;font-weight:500;color:rgba(255,255,255,.4);margin-top:2px}
      .ps-cta{display:inline-flex;align-items:center;gap:8px;background:#fff;color:#000;padding:10px 22px;border-radius:10px;font-family:'Plus Jakarta Sans',sans-serif;font-weight:700;font-size:.82rem;text-decoration:none;transition:all .25s;flex-shrink:0;white-space:nowrap}
      .ps-cta:hover{background:rgba(255,255,255,.88);transform:translateY(-1px)}
      @media(max-width:639px){
        #promo-banner{font-size:.6rem;gap:6px;padding:8px 12px}
        #promo-banner .pb-link{display:none}
        body.has-promo nav{top:42px!important}
        body.has-promo .mob-nav{top:116px!important}
        .pmh{padding:20px 18px 14px}
        .pmb{padding:16px 18px 20px}
        #promo-strip-sec{padding:0 16px 60px}
        .ps-wrap{padding:20px}
        .ps-row{flex-direction:column;align-items:flex-start}
      }
      @media(min-width:768px){#promo-strip-sec{padding:0 40px 80px}}
      @media(min-width:1024px){#promo-strip-sec{padding:0 0 80px}}
    `;
    document.head.appendChild(s);
  }

  /* ─────────────────────────────────────────────────
     RENDER
  ───────────────────────────────────────────────── */
  function injectBanner(p) {
    const el = document.createElement('div');
    el.id = 'promo-banner';
    el.innerHTML = `<div class="pb-dot"></div><span class="pb-badge">FRIDAY DEAL</span><span class="pb-text">${p.title} ${p.subtitle}</span><span class="pb-link" id="pb-open">Lihat Detail &rarr;</span>`;
    document.body.prepend(el);
    document.body.classList.add('has-promo');
    document.getElementById('pb-open').addEventListener('click', openModal);
  }

  function injectStrip(p) {
    const anchor = document.getElementById('contact');
    if (!anchor) return;
    const sec = document.createElement('section');
    sec.id = 'promo-strip-sec';
    sec.innerHTML = `<div class="ps-in"><div class="ps-wrap"><div class="ps-row"><div class="ps-left"><span class="ps-badge">FRIDAY DEAL</span><div><div class="ps-title">${p.title} ${p.subtitle}</div><div class="ps-sub">Promo berlaku hari ini saja. Besok kembali ke harga normal.</div></div></div><a href="${WA_URL}" class="ps-cta" target="_blank" rel="noopener"><i class="fa-brands fa-whatsapp"></i> Klaim Promo via WA</a></div></div></div>`;
    anchor.parentNode.insertBefore(sec, anchor);
  }

  let _modal = null, _timer = null;

  function openModal() {
    if (_modal) return;
    const p = getPromo();
    const items = p.items.map(i => `<div class="pm-item"><span class="pm-lbl">${i.label}</span><div class="pm-prices"><span class="pm-orig">${i.original}</span><span class="pm-new">${i.promo}</span><span class="pm-disc">-${i.discount}</span></div></div>`).join('');
    const ov = document.createElement('div');
    ov.id = 'pm-overlay';
    ov.innerHTML = `<div id="pm-box"><div class="pmh"><div class="pmh-badge"><div class="pmh-bdot"></div>FRIDAY DEAL</div><div class="pmh-title">${p.title}</div><div class="pmh-sub">${p.subtitle} Harga balik normal besok.</div><div class="pm-x" id="pm-close"><i class="fa-solid fa-xmark"></i></div></div><div class="pmb"><div class="pm-items">${items}</div><div class="pm-note"><i class="fa-solid fa-clock fa-xs"></i> Promo berlaku hari ini saja.</div><div class="pm-timer">Sisa waktu: <span class="v" id="pm-cd">${timeLeft()}</span></div><a href="${WA_URL}" class="pm-cta" target="_blank" rel="noopener"><i class="fa-brands fa-whatsapp"></i> Klaim Promo via WA</a></div></div>`;
    document.body.appendChild(ov);
    _modal = ov;
    document.getElementById('pm-close').addEventListener('click', closeModal);
    ov.addEventListener('click', e => { if (e.target === ov) closeModal(); });
    document.addEventListener('keydown', onEsc);
    _timer = setInterval(() => { const el = document.getElementById('pm-cd'); if (el) el.textContent = timeLeft(); }, 1000);
  }

  function closeModal() {
    if (!_modal) return;
    _modal.style.cssText = 'opacity:0;transition:opacity .2s ease';
    setTimeout(() => { if (_modal) { _modal.remove(); _modal = null; } }, 200);
    if (_timer) { clearInterval(_timer); _timer = null; }
    document.removeEventListener('keydown', onEsc);
  }

  function onEsc(e) { if (e.key === 'Escape') closeModal(); }

  /* ─────────────────────────────────────────────────
     INIT
  ───────────────────────────────────────────────── */
  function init() {
    if (!isFriday()) return;
    const promo = getPromo();
    injectStyles();
    injectBanner(promo);
    injectStrip(promo);
    if (firstVisitToday()) setTimeout(openModal, 1500);
  }

  document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', init)
    : init();

})();
