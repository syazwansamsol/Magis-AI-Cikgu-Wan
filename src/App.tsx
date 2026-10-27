import React, { useEffect, useState } from 'react';
import {
  Award,
  BookOpen,
  Calendar,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Gamepad2,
  MessageCircle,
  Sparkles,
  Trophy,
  Users,
  Video,
  Wand2,
} from 'lucide-react';
import { CroppedArt, MASTER_UI_IMAGE } from './components/CroppedArt';
import { MagicDoodleBackground } from './components/MagicDoodleBackground';
import { TennisGameModal } from './components/TennisGameModal';
import { PrompterModal } from './components/PrompterModal';
import { ModulePreviewModal } from './components/ModulePreviewModal';
import { CheckoutModal } from './components/CheckoutModal';
import { InfoHubModal, InfoHubTab } from './components/InfoHubModal';
import { SpeakerProfileModal } from './components/SpeakerProfileModal';
import { DeliveryReceipt } from './utils/magisLogic';

type NavKey = 'utama' | 'modul' | 'gamifikasi' | 'prompter' | 'komuniti' | 'panduan';

/**
 * Symmetrical 3D Sporty Long Track Pants Overlay ("baiki simetri seluar panjang")
 * for Card 3 (Gelanggang Tenis Cikgu Wan 3D).
 * Designed with balanced Bezier curves, equal leg widths, 3D knee highlights,
 * and symmetrical twin athletic side stripes down to both white sneakers.
 */
const CikguWanLongPantsOverlay: React.FC = () => (
  <svg
    viewBox="0 0 100 100"
    preserveAspectRatio="none"
    aria-hidden="true"
    className="absolute inset-0 w-full h-full pointer-events-none"
  >
    <defs>
      <linearGradient id="symPantsLeft" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#1e3a8a" />
        <stop offset="55%" stopColor="#172554" />
        <stop offset="100%" stopColor="#0f172a" />
      </linearGradient>
      <linearGradient id="symPantsRight" x1="100%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#1e3a8a" />
        <stop offset="55%" stopColor="#172554" />
        <stop offset="100%" stopColor="#0f172a" />
      </linearGradient>
      <linearGradient id="symPantsHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.32" />
        <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0.05" />
      </linearGradient>
    </defs>

    {/* Symmetrical Upper Shorts-to-Trousers Bridge */}
    <path
      d="M 24.8 37.5 Q 37.5 39.2 50.2 37.5 L 51.0 42.2 Q 37.5 43.8 24.0 42.2 Z"
      fill="#172554"
    />

    {/* Viewer's Left Trouser Leg — Smooth symmetrical taper from shorts hem to left sneaker */}
    <path
      d="M 24.2 39.5 C 20.5 44.2, 16.5 48.2, 12.6 52.0 L 19.8 54.5 C 24.8 49.8, 30.5 45.2, 36.5 41.2 Z"
      fill="url(#symPantsLeft)"
      stroke="#0f172a"
      strokeWidth="0.5"
      strokeLinejoin="round"
    />
    {/* Left Leg 3D Knee Highlight */}
    <path
      d="M 28.5 41.2 Q 22.2 46.8 16.2 52.8"
      fill="none"
      stroke="url(#symPantsHighlight)"
      strokeWidth="2.4"
      strokeLinecap="round"
    />
    {/* Left Leg Symmetrical White + Cyan Sport Stripe */}
    <path
      d="M 25.0 40.0 C 21.2 44.6, 17.2 48.5, 13.5 52.1"
      fill="none"
      stroke="#e0f2fe"
      strokeWidth="0.9"
      strokeLinecap="round"
    />
    {/* Left Leg Ribbed Ankle Cuff */}
    <path
      d="M 12.6 51.9 L 19.8 54.4"
      stroke="#0284c7"
      strokeWidth="1.25"
      strokeLinecap="round"
    />

    {/* Viewer's Right Trouser Leg — Symmetrical coverage over bent right knee down to right sneaker */}
    <path
      d="M 36.5 41.2 C 40.2 44.0, 42.2 46.5, 41.0 49.5 L 48.2 50.8 C 51.8 47.0, 52.8 43.2, 50.5 38.2 Z"
      fill="url(#symPantsRight)"
      stroke="#0f172a"
      strokeWidth="0.5"
      strokeLinejoin="round"
    />
    {/* Right Leg 3D Knee Highlight */}
    <path
      d="M 43.8 40.5 Q 47.2 45.0 44.6 49.8"
      fill="none"
      stroke="url(#symPantsHighlight)"
      strokeWidth="2.4"
      strokeLinecap="round"
    />
    {/* Right Leg Symmetrical White + Cyan Sport Stripe */}
    <path
      d="M 49.6 39.0 C 51.4 43.2, 50.6 46.8, 47.4 50.3"
      fill="none"
      stroke="#e0f2fe"
      strokeWidth="0.9"
      strokeLinecap="round"
    />
    {/* Right Leg Ribbed Ankle Cuff */}
    <path
      d="M 41.0 49.4 L 48.2 50.7"
      stroke="#0284c7"
      strokeWidth="1.25"
      strokeLinecap="round"
    />
  </svg>
);

export default function App() {
  const [activeNav, setActiveNav] = useState<NavKey>('utama');
  const [heroSlide, setHeroSlide] = useState<0 | 1 | 2>(0);
  const [activeFeaturePill, setActiveFeaturePill] = useState<string | null>(null);
  const [mysteryToast, setMysteryToast] = useState<string | null>(null);

  // Interactive Modals
  const [tennisModalOpen, setTennisModalOpen] = useState(false);
  const [tennisInitialMode, setTennisInitialMode] = useState<'trailer' | 'play'>('play');
  const [prompterModalOpen, setPrompterModalOpen] = useState(false);
  const [moduleModalOpen, setModuleModalOpen] = useState(false);
  const [moduleInitialTab, setModuleInitialTab] = useState<'magis-pdf' | 'gamifikasi-pdf'>('magis-pdf');
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [infoHubOpen, setInfoHubOpen] = useState(false);
  const [infoHubTab, setInfoHubTab] = useState<InfoHubTab>('komuniti');
  const [speakerProfileOpen, setSpeakerProfileOpen] = useState(false);

  // Instant Email Delivery State
  const [deliveredReceipt, setDeliveredReceipt] = useState<DeliveryReceipt | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('autostart') === '1') {
      setTennisInitialMode('play');
      setTennisModalOpen(true);
    }
    if (params.get('profile') === '1') {
      setSpeakerProfileOpen(true);
    }
  }, []);

  const handleNavigation = (key: NavKey) => {
    setActiveNav(key);
    if (key === 'utama') {
      setHeroSlide(0);
    } else if (key === 'modul') {
      setModuleInitialTab('magis-pdf');
      setModuleModalOpen(true);
    } else if (key === 'gamifikasi') {
      setTennisInitialMode('play');
      setTennisModalOpen(true);
    } else if (key === 'prompter') {
      setPrompterModalOpen(true);
    } else if (key === 'komuniti') {
      setInfoHubTab('komuniti');
      setInfoHubOpen(true);
    } else if (key === 'panduan') {
      setInfoHubTab('panduan');
      setInfoHubOpen(true);
    }
  };

  const handleTriggerMysteryBox = () => {
    const messages = [
      'KOD DISKAUN RAHSIA: Gunakan kod "CIKGUWAN5" semasa bayaran Touch \'n Go eWallet untuk diskaun RM5!',
      'BENGKEL HANDS-ON LIVE: 31 Oktober 2026, Jam 8:30 Malam di Google Meet + Group WhatsApp Coaching 1-to-1!',
      'PROFIL PENCERAMAH: Klik lencana Google Certified Trainer Cikgu Wan untuk melihat profil rasmi Google Edu!',
    ];
    setMysteryToast((prev) => {
      const idx = prev ? (messages.indexOf(prev) + 1) % messages.length : 0;
      return messages[idx];
    });
  };

  const slide0FeatureDetails = [
    'Grafik 3D Interaktif: Gelanggang sukan 3D lancar dengan pengesanan gerakan tangan kamera web & tetikus.',
    'Mode Solo & Multiplayer: Sesuai untuk ulang kaji kendiri atau pertandingan antara kumpulan di dalam kelas.',
    'Kuiz & Cabaran: Soalan Standard Pembelajaran (DSKP) muncul secara automatik setiap kali mata seri!',
    'Sesuai Semua Mata Pelajaran: Boleh digunakan untuk BM, BI, Matematik, Sains, Sejarah & Pendidikan Islam.',
  ];

  const slide1Pills = [
    { icon: Video, label: 'Kamera & Mouse', detail: 'Kawalan Tangan AI melalui kamera web laptop atau gerakan tetikus.' },
    { icon: Trophy, label: 'Skor & Pasukan', detail: 'Papan markah langsung untuk pertandingan antara kumpulan murid.' },
    { icon: Gamepad2, label: 'Kuiz DSKP KPM', detail: 'Soalan objektif muncul secara automatik setiap kali rali tenis.' },
    { icon: Users, label: 'Mesra Smartboard', detail: 'Paparan skrin penuh yang lancar di projektor & Smartboard kelas.' },
  ];

  const slide2Pills = [
    { icon: BookOpen, label: 'Contoh Modul PDF', detail: 'Pratonton halaman modul langkah demi langkah mengikut DSKP.' },
    { icon: Wand2, label: 'Prompter Ringkas', detail: 'Salin contoh prompt ringkas terus ke Gemini, Claude & ChatGPT.' },
    { icon: Calendar, label: 'Bengkel 31 Okt', detail: 'Bengkel Hands-On 2 Jam: 31 Okt 2026, 8:30 Malam di Google Meet.' },
    { icon: MessageCircle, label: 'Coaching 1-to-1', detail: 'Group Sokongan WhatsApp VIP bersama Cikgu Wan.' },
  ];

  return (
    <div className="min-h-screen w-full bg-[#090F26] text-white relative overflow-x-hidden flex flex-col justify-center items-center select-none">
      {/* Blurred Warm Room Ambient Backdrop + Moving Cute Magic Doodles */}
      <div
        className="fixed inset-0 bg-cover bg-center opacity-35 blur-2xl scale-110 pointer-events-none"
        style={{ backgroundImage: `url(${MASTER_UI_IMAGE})` }}
        aria-hidden="true"
      />
      <MagicDoodleBackground />

      {/* Floating Notification Banner for Mystery [?] Block or Feature Pill Info */}
      {(mysteryToast || activeFeaturePill !== null) && (
        <div
          role="status"
          className="fixed top-3 left-1/2 -translate-x-1/2 z-40 max-w-xl w-[92%] rounded-2xl bg-slate-950/95 border-2 border-amber-400 px-4 py-2.5 shadow-2xl flex items-center justify-between gap-3"
        >
          <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-amber-300">
            <Sparkles className="w-4 h-4 shrink-0 text-amber-400 animate-spin" />
            <span>{mysteryToast || activeFeaturePill}</span>
          </div>
          <button
            type="button"
            onClick={() => {
              setMysteryToast(null);
              setActiveFeaturePill(null);
            }}
            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 shrink-0"
          >
            Tutup
          </button>
        </div>
      )}

      {/* =======================================================================
          DESKTOP & TABLET LANDSCAPE EXACT 1:1 CONSOLE INTERFACE (md:block)
          Matches 8F379228-3588-4F86-9EC6-403D3998BC11.PNG 100%
         ======================================================================= */}
      <main className="hidden md:block relative z-10 w-full max-w-[1672px] mx-auto px-1 sm:px-2 py-1">
        <div className="relative w-full aspect-[1672/941] rounded-2xl overflow-hidden shadow-[0_0_70px_rgba(14,165,233,0.35)] border border-sky-300/30">
          {/* Base Full-Resolution Master Interface Artwork */}
          <img
            src={MASTER_UI_IMAGE}
            alt="Antaramuka Rasmi Magis AI Cikgu Wan"
            referrerPolicy="no-referrer"
            draggable={false}
            className="w-full h-full object-cover pointer-events-none"
          />

          {/* ===================================================================
              1A. LIVE ANIMATED BLINKING EYES (CIKGU WAN + ROBOTS) — NEUTRAL SMILE
             =================================================================== */}
          {/* Left Mascot Cikgu Wan — Blinking Left Eyelid (inside glasses) */}
          <div
            aria-hidden="true"
            className="animate-cikgu-blink absolute left-[5.05%] top-[29.5%] w-[2.3%] h-[2.8%] -rotate-[9deg] rounded-full bg-gradient-to-b from-[#d99b72] via-[#e8b088] to-[#c6865e] border-b-2 border-[#3b2316] pointer-events-none z-20"
          />
          {/* Left Mascot Cikgu Wan — Blinking Right Eyelid (inside glasses) */}
          <div
            aria-hidden="true"
            className="animate-cikgu-blink absolute left-[9.25%] top-[28.0%] w-[2.45%] h-[2.9%] -rotate-[9deg] rounded-full bg-gradient-to-b from-[#d99b72] via-[#e8b088] to-[#c6865e] border-b-2 border-[#3b2316] pointer-events-none z-20"
          />

          {/* Hero Banner Cikgu Wan — Blinking Eyes */}
          <div
            aria-hidden="true"
            className="animate-cikgu-blink absolute left-[52.3%] top-[23.8%] w-[1.5%] h-[2.0%] -rotate-[5deg] rounded-full bg-gradient-to-b from-[#d99b72] via-[#e8b088] to-[#c6865e] border-b border-[#3b2316] pointer-events-none z-20"
          />
          <div
            aria-hidden="true"
            className="animate-cikgu-blink absolute left-[54.8%] top-[23.2%] w-[1.6%] h-[2.0%] -rotate-[5deg] rounded-full bg-gradient-to-b from-[#d99b72] via-[#e8b088] to-[#c6865e] border-b border-[#3b2316] pointer-events-none z-20"
          />

          {/* Right Sidebar Treasure Chest Cute Robot — Blinking Digital Visor Eyes */}
          <div
            aria-hidden="true"
            className="animate-robot-blink absolute left-[89.6%] top-[43.2%] w-[0.9%] h-[1.1%] rounded-full bg-[#050b1a] pointer-events-none z-20"
          />
          <div
            aria-hidden="true"
            className="animate-robot-blink absolute left-[91.2%] top-[43.2%] w-[0.9%] h-[1.1%] rounded-full bg-[#050b1a] pointer-events-none z-20"
          />

          {/* Clicking Cikgu Wan's Character Face/Body opens his Mindblowing Google Edu Speaker Profile */}
          <button
            type="button"
            onClick={() => setSpeakerProfileOpen(true)}
            aria-label="Lihat Profil Penceramah Cikgu Wan — Google Certified Trainer"
            className="absolute left-[1.8%] top-[19.0%] w-[17.5%] h-[18.0%] rounded-3xl z-20 group focus:outline-none"
          >
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute -top-2 left-1/2 -translate-x-1/2 whitespace-nowrap px-2.5 py-1 rounded-full bg-slate-950/95 border border-amber-400 text-[10px] font-black text-amber-300 shadow-lg">
              ★ Klik Profil Penceramah (Google Edu)
            </span>
          </button>

          {/* Interactive Speaker Profile Badge next to Cikgu Wan */}
          <button
            type="button"
            onClick={() => setSpeakerProfileOpen(true)}
            className="shimmer-btn absolute left-[12.2%] top-[62.8%] w-[8.8%] h-[10.8%] z-20 rounded-2xl bg-gradient-to-br from-amber-400 via-yellow-300 to-amber-500 border-2 border-white shadow-[0_0_25px_rgba(251,191,36,0.85)] hover:scale-105 transition-transform flex flex-col items-center justify-center p-1 text-slate-950 text-center"
          >
            <Award className="w-4 h-4 text-slate-950 shrink-0 mb-0.5" />
            <span className="text-[7.5px] lg:text-[9px] font-black uppercase leading-tight">
              PROFIL PENCERAMAH
            </span>
            <span className="text-[7px] lg:text-[8px] font-extrabold text-indigo-950 leading-tight">
              Google Certified ★
            </span>
          </button>

          {/* 1B. Animated Floating Emblem (Top-Left) */}
          <button
            type="button"
            onClick={() => {
              setTennisInitialMode('trailer');
              setTennisModalOpen(true);
            }}
            aria-label="Tonton Trailer Magis AI Cikgu Wan"
            className="absolute left-[5.0%] top-[1.2%] w-[15.5%] h-[16.8%] rounded-3xl hover:scale-105 transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-amber-400 group"
          >
            <span className="sr-only">Magis AI Cikgu Wan</span>
            <div className="w-full h-full rounded-3xl group-hover:shadow-[0_0_28px_rgba(56,189,248,0.65)] transition-shadow" />
          </button>

          {/* Handheld Console Screen Interactive Glow */}
          <button
            type="button"
            onClick={() => {
              setTennisInitialMode('play');
              setTennisModalOpen(true);
            }}
            aria-label="Lihat Demo Sekarang Konsol Magis AI Cikgu Wan"
            className="absolute left-[4.4%] top-[36.8%] w-[19.2%] h-[15.2%] -rotate-6 rounded-2xl hover:scale-105 transition-transform duration-300 group focus:outline-none z-20"
          >
            <div className="w-full h-full rounded-2xl shimmer-btn group-hover:ring-2 group-hover:ring-sky-400/80" />
          </button>

          {/* 2. Top Navigation Bar Interactive Buttons */}
          <nav aria-label="Navigasi Utama Konsol">
            <button
              type="button"
              onClick={() => handleNavigation('utama')}
              className={`absolute left-[26.1%] top-[5.6%] w-[7.4%] h-[6.6%] rounded-full transition-all ${
                activeNav === 'utama'
                  ? 'ring-2 ring-sky-300 shadow-[0_0_20px_rgba(56,189,248,0.6)]'
                  : 'hover:bg-white/10'
              }`}
            >
              <span className="sr-only">Utama</span>
            </button>

            <button
              type="button"
              onClick={() => handleNavigation('modul')}
              className={`absolute left-[33.9%] top-[5.6%] w-[6.6%] h-[6.6%] rounded-full transition-all ${
                activeNav === 'modul'
                  ? 'bg-sky-400/20 ring-2 ring-sky-300'
                  : 'hover:bg-white/10'
              }`}
            >
              <span className="sr-only">Modul</span>
            </button>

            <button
              type="button"
              onClick={() => handleNavigation('gamifikasi')}
              className={`absolute left-[40.8%] top-[5.6%] w-[8.0%] h-[6.6%] rounded-full transition-all ${
                activeNav === 'gamifikasi'
                  ? 'bg-sky-400/20 ring-2 ring-sky-300'
                  : 'hover:bg-white/10'
              }`}
            >
              <span className="sr-only">Gamifikasi</span>
            </button>

            <button
              type="button"
              onClick={() => handleNavigation('prompter')}
              className={`absolute left-[49.1%] top-[5.6%] w-[7.4%] h-[6.6%] rounded-full transition-all ${
                activeNav === 'prompter'
                  ? 'bg-sky-400/20 ring-2 ring-sky-300'
                  : 'hover:bg-white/10'
              }`}
            >
              <span className="sr-only">Prompter</span>
            </button>

            <button
              type="button"
              onClick={() => handleNavigation('komuniti')}
              className={`absolute left-[56.8%] top-[5.6%] w-[7.8%] h-[6.6%] rounded-full transition-all ${
                activeNav === 'komuniti'
                  ? 'bg-sky-400/20 ring-2 ring-sky-300'
                  : 'hover:bg-white/10'
              }`}
            >
              <span className="sr-only">Komuniti</span>
            </button>

            <button
              type="button"
              onClick={() => handleNavigation('panduan')}
              className={`absolute left-[65.0%] top-[5.6%] w-[7.5%] h-[6.6%] rounded-full transition-all ${
                activeNav === 'panduan'
                  ? 'bg-sky-400/20 ring-2 ring-sky-300'
                  : 'hover:bg-white/10'
              }`}
            >
              <span className="sr-only">Panduan</span>
            </button>

            {/* Search Icon Button */}
            <button
              type="button"
              onClick={() => {
                setInfoHubTab('carian');
                setInfoHubOpen(true);
              }}
              aria-label="Cari Modul & Prompt"
              className="absolute left-[82.0%] top-[5.2%] w-[3.4%] h-[6.8%] rounded-full hover:bg-white/15 transition"
            />

            {/* Cart Icon Button */}
            <button
              type="button"
              onClick={() => setCheckoutModalOpen(true)}
              aria-label="Buka Troli & Semak Pesanan"
              className="absolute left-[85.8%] top-[4.8%] w-[4.8%] h-[7.2%] rounded-full hover:scale-105 transition"
            >
              {deliveredReceipt && (
                <span className="absolute -top-0.5 right-1 px-1.5 py-0.5 rounded-full bg-emerald-500 text-slate-950 font-black text-[10px]">
                  ✓
                </span>
              )}
            </button>

            {/* Cikgu Wan Profile Avatar Button (Top Right) -> Opens Speaker Profile Modal */}
            <button
              type="button"
              onClick={() => setSpeakerProfileOpen(true)}
              aria-label="Profil Penceramah Cikgu Wan (Google for Education Directory)"
              className="absolute left-[91.1%] top-[4.2%] w-[4.5%] h-[8.2%] rounded-full ring-2 ring-amber-400/80 hover:scale-110 shadow-[0_0_20px_rgba(251,191,36,0.65)] transition"
            />
          </nav>

          {/* 3. Left Vertical Quick-Menu Dock (Bottom-Left) */}
          <div role="navigation" aria-label="Menu Pantas Kiri">
            <button
              type="button"
              onClick={() => handleNavigation('utama')}
              className="absolute left-[1.6%] top-[63.2%] w-[10.3%] h-[5.1%] rounded-xl hover:bg-white/10 transition"
            >
              <span className="sr-only">Menu Utama</span>
            </button>
            <button
              type="button"
              onClick={() => handleNavigation('modul')}
              className="absolute left-[1.6%] top-[68.6%] w-[10.3%] h-[4.5%] rounded-xl hover:bg-white/10 transition"
            >
              <span className="sr-only">Menu Modul</span>
            </button>
            <button
              type="button"
              onClick={() => handleNavigation('gamifikasi')}
              className="absolute left-[1.6%] top-[73.3%] w-[10.3%] h-[4.5%] rounded-xl hover:bg-white/10 transition"
            >
              <span className="sr-only">Menu Gamifikasi</span>
            </button>
            <button
              type="button"
              onClick={() => handleNavigation('prompter')}
              className="absolute left-[1.6%] top-[78.0%] w-[10.3%] h-[4.5%] rounded-xl hover:bg-white/10 transition"
            >
              <span className="sr-only">Menu Prompter</span>
            </button>
            <button
              type="button"
              onClick={() => handleNavigation('komuniti')}
              className="absolute left-[1.6%] top-[82.7%] w-[10.3%] h-[4.5%] rounded-xl hover:bg-white/10 transition"
            >
              <span className="sr-only">Menu Komuniti</span>
            </button>
            <button
              type="button"
              onClick={() => setCheckoutModalOpen(true)}
              className="absolute left-[1.6%] top-[87.4%] w-[10.3%] h-[4.6%] rounded-xl hover:bg-white/10 transition"
            >
              <span className="sr-only">Pakej Istimewa</span>
            </button>
          </div>

          {/* Interactive Yellow [?] Mystery Question Block (Next to Left Menu) */}
          <button
            type="button"
            onClick={handleTriggerMysteryBox}
            aria-label="Klik Kotak Kejutan Magis untuk Kod Diskaun & Tip"
            className="absolute left-[11.9%] top-[74.5%] w-[8.2%] h-[17.5%] rounded-2xl hover:-translate-y-1.5 hover:scale-105 transition-transform duration-300 group"
          >
            <div className="w-full h-full rounded-2xl group-hover:shadow-[0_0_30px_rgba(251,191,36,0.75)]" />
          </button>

          {/* ===================================================================
              4. HERO BANNER SLIDER STAGE (Center-Top: x=21.8%, y=13.8%, w=54.4%, h=33.8%)
              Slaid 1, Slaid 2 & Slaid 3 all share the sleek 3D game banner aesthetic!
             =================================================================== */}
          <div className="absolute left-[21.8%] top-[13.8%] w-[54.4%] h-[33.8%] rounded-[22px] overflow-hidden">
            {/* SLAID 2: Concise & Styled Just Like Slaid 1 (3D Title Badge + 4 Glass Pills + Bottom CTA) */}
            {heroSlide === 1 && (
              <>
                {/* Left 3D Game Title Badge replacing the Slide 1 title area cleanly */}
                <div className="absolute left-[7.2%] top-[5.8%] w-[41.8%] h-[50.5%] rounded-2xl bg-gradient-to-b from-[#0b1d52] via-[#0e296b] to-[#081538] border-2 border-sky-300/80 shadow-[0_10px_28px_rgba(2,132,199,0.65)] p-2.5 flex flex-col items-center justify-center text-center -rotate-2 z-20">
                  <span className="px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-400 to-yellow-300 text-slate-950 font-black text-[9px] lg:text-[11px] uppercase tracking-wider shadow">
                    KAWALAN TANGAN AI
                  </span>
                  <div className="font-display font-black text-base lg:text-2xl text-white drop-shadow-[0_2px_8px_rgba(56,189,248,0.8)] leading-none mt-1">
                    SUKAN TENIS 3D
                  </div>
                  <div className="mt-1.5 px-2.5 py-0.5 rounded-full bg-sky-500/30 border border-sky-300/60 text-[8.5px] lg:text-[10px] font-bold text-sky-100 truncate max-w-full">
                    Hayun Tangan · Jawab Kuiz · Skor!
                  </div>
                </div>

                {/* Right 4 Sleek Glass Feature Pills (matching Slide 1 layout with 100% opaque backing) */}
                {slide1Pills.map((pill, idx) => {
                  const Icon = pill.icon;
                  return (
                    <button
                      key={pill.label}
                      type="button"
                      onClick={() => setActiveFeaturePill(pill.detail)}
                      style={{ top: `${15.8 + idx * 17.5}%` }}
                      className="absolute z-20 left-[74.0%] w-[21.6%] h-[16.2%] rounded-full bg-[#091538] hover:bg-[#10255e] border border-sky-300/70 px-2.5 flex items-center gap-2 text-left shadow-md transition hover:scale-105"
                    >
                      <span className="w-5 h-5 rounded-full bg-sky-400/20 border border-sky-300/60 flex items-center justify-center shrink-0">
                        <Icon className="w-3 h-3 text-sky-300" />
                      </span>
                      <span className="text-[9px] lg:text-[10.5px] font-extrabold text-white leading-tight truncate">
                        {pill.label}
                      </span>
                    </button>
                  );
                })}
              </>
            )}

            {/* SLAID 3: Concise & Styled Just Like Slaid 1 (3D Title Badge + 4 Glass Pills + Bottom CTA) */}
            {heroSlide === 2 && (
              <>
                {/* Left 3D Game Title Badge */}
                <div className="absolute left-[7.2%] top-[5.8%] w-[41.8%] h-[50.5%] rounded-2xl bg-gradient-to-b from-[#1e1b4b] via-[#172554] to-[#081538] border-2 border-amber-300/85 shadow-[0_10px_28px_rgba(251,191,36,0.5)] p-2.5 flex flex-col items-center justify-center text-center -rotate-2 z-20">
                  <span className="px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-400 to-orange-400 text-slate-950 font-black text-[9px] lg:text-[11px] uppercase tracking-wider shadow">
                    MODUL & PROMPTER AI
                  </span>
                  <div className="font-display font-black text-base lg:text-2xl text-white drop-shadow-[0_2px_8px_rgba(251,191,36,0.6)] leading-none mt-1">
                    BENGKEL LIVE 31 OKT
                  </div>
                  <div className="mt-1.5 px-2.5 py-0.5 rounded-full bg-amber-400/25 border border-amber-300/60 text-[8.5px] lg:text-[10px] font-bold text-amber-200 truncate max-w-full">
                    8:30 Malam · Google Meet + WhatsApp
                  </div>
                </div>

                {/* Right 4 Sleek Glass Feature Pills (matching Slide 1 layout with 100% opaque backing) */}
                {slide2Pills.map((pill, idx) => {
                  const Icon = pill.icon;
                  return (
                    <button
                      key={pill.label}
                      type="button"
                      onClick={() => setActiveFeaturePill(pill.detail)}
                      style={{ top: `${15.8 + idx * 17.5}%` }}
                      className="absolute z-20 left-[74.0%] w-[21.6%] h-[16.2%] rounded-full bg-[#091538] hover:bg-[#10255e] border border-amber-300/70 px-2.5 flex items-center gap-2 text-left shadow-md transition hover:scale-105"
                    >
                      <span className="w-5 h-5 rounded-full bg-amber-400/20 border border-amber-300/60 flex items-center justify-center shrink-0">
                        <Icon className="w-3 h-3 text-amber-300" />
                      </span>
                      <span className="text-[9px] lg:text-[10.5px] font-extrabold text-white leading-tight truncate">
                        {pill.label}
                      </span>
                    </button>
                  );
                })}
              </>
            )}

            {/* Animated Glowing Tennis Ball Pulse */}
            <div
              className="absolute left-[27.8%] top-[55.5%] w-[8.2%] h-[23%] rounded-full pointer-events-none animate-pulse"
              style={{
                boxShadow: '0 0 32px 10px rgba(163, 230, 53, 0.55)',
              }}
            />

            {/* Left Slider Arrow `<` */}
            <button
              type="button"
              onClick={() => setHeroSlide((s) => ((s + 2) % 3) as 0 | 1 | 2)}
              aria-label="Slaid Hero Sebelumnya"
              className="absolute z-30 left-[2.0%] top-[41.5%] w-[5.2%] h-[15.5%] rounded-full bg-slate-950/50 hover:bg-slate-950/85 border border-white/40 flex items-center justify-center transition hover:scale-110"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>

            {/* Right Slider Arrow `>` */}
            <button
              type="button"
              onClick={() => setHeroSlide((s) => ((s + 1) % 3) as 0 | 1 | 2)}
              aria-label="Slaid Hero Seterusnya"
              className="absolute z-30 left-[93.0%] top-[48.0%] w-[5.2%] h-[15.5%] rounded-full bg-slate-950/50 hover:bg-slate-950/85 border border-white/40 flex items-center justify-center transition hover:scale-110"
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>

            {/* Center-Bottom Glowing Pink Pill CTA Button ("Lihat Demo Sekarang" / "Lihat Contoh Modul") */}
            <button
              type="button"
              onClick={() => {
                if (heroSlide === 2) {
                  setModuleInitialTab('magis-pdf');
                  setModuleModalOpen(true);
                } else {
                  setTennisInitialMode('play');
                  setTennisModalOpen(true);
                }
              }}
              className="shimmer-btn absolute z-20 left-[38.8%] top-[78.2%] w-[31.2%] h-[19.2%] rounded-full bg-gradient-to-b from-[#ff4d8d] via-[#f4256d] to-[#c81051] border-2 border-pink-200/90 shadow-[0_0_28px_rgba(244,37,109,0.85)] hover:scale-105 transition-transform duration-200 flex items-center justify-center gap-2 px-3 focus:outline-none focus:ring-2 focus:ring-pink-200"
            >
              <Gamepad2 className="w-4 h-4 lg:w-5 lg:h-5 text-white shrink-0" />
              <span className="text-[11px] lg:text-[14px] font-black text-white tracking-wide whitespace-nowrap drop-shadow">
                {heroSlide === 2 ? 'Lihat Contoh Modul' : 'Lihat Demo Sekarang'}
              </span>
            </button>

            {/* Slide Indicator Dots at Top-Right of Hero Banner */}
            <div className="absolute z-20 right-[4.5%] top-[5.5%] flex items-center gap-1.5 bg-slate-950/60 px-2 py-1 rounded-full border border-white/20">
              {[0, 1, 2].map((dot) => (
                <button
                  key={dot}
                  type="button"
                  onClick={() => setHeroSlide(dot as 0 | 1 | 2)}
                  aria-label={`Pergi ke Slaid ${dot + 1}`}
                  className={`h-2 rounded-full transition-all ${
                    heroSlide === dot ? 'w-5 bg-amber-400' : 'w-2 bg-white/50 hover:bg-white'
                  }`}
                />
              ))}
            </div>

            {/* 4 Interactive Feature Pills on the Right of Hero Banner (Slide 0) */}
            {heroSlide === 0 &&
              [0, 1, 2, 3].map((pillIdx) => (
                <button
                  key={pillIdx}
                  type="button"
                  onClick={() => setActiveFeaturePill(slide0FeatureDetails[pillIdx])}
                  aria-label={slide0FeatureDetails[pillIdx]}
                  style={{
                    top: `${16.5 + pillIdx * 17.5}%`,
                  }}
                  className="absolute z-20 left-[75.4%] w-[17.0%] h-[15.2%] rounded-full hover:ring-2 hover:ring-sky-300 hover:bg-sky-400/15 transition"
                />
              ))}
          </div>

          {/* 5. THE 4 INTERACTIVE FEATURE CARDS (Exact Cropped 3D Cards + Blinking Robots + Symmetrical Long Pants) */}
          {/* Card 1: MODUL MAGIS AI CIKGU WAN (with Blinking Robot Eyes) */}
          <button
            type="button"
            onClick={() => {
              setModuleInitialTab('magis-pdf');
              setModuleModalOpen(true);
            }}
            className="absolute left-[22.25%] top-[49.0%] w-[13.35%] h-[36.6%] rounded-[22px] overflow-hidden shadow-lg hover:-translate-y-2 hover:scale-[1.025] hover:shadow-[0_14px_34px_rgba(14,165,233,0.55)] transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-sky-400"
          >
            <div className="relative w-full h-full">
              <CroppedArt
                x={22.25}
                y={49.0}
                w={13.35}
                h={36.6}
                alt="Modul Magis AI Cikgu Wan — RPH, RPT, Soalan, BBM, Aktiviti, Latihan — Lihat Modul"
                className="w-full h-full"
              />
              {/* Blinking Robot Visor Eyes on Card 1 */}
              <div
                aria-hidden="true"
                className="animate-robot-blink absolute left-[47.5%] top-[46.8%] w-[6.2%] h-[4.5%] rounded-full bg-[#050b1a] pointer-events-none"
              />
              <div
                aria-hidden="true"
                className="animate-robot-blink absolute left-[58.2%] top-[46.8%] w-[6.2%] h-[4.5%] rounded-full bg-[#050b1a] pointer-events-none"
              />
            </div>
            <div className="shimmer-btn absolute inset-x-[6%] bottom-[3.5%] h-[13%] rounded-full group-hover:ring-2 group-hover:ring-white/80" />
          </button>

          {/* Card 2: MODUL GAMIFIKASI MAGIS AI PDF */}
          <button
            type="button"
            onClick={() => {
              setModuleInitialTab('gamifikasi-pdf');
              setModuleModalOpen(true);
            }}
            className="absolute left-[36.1%] top-[49.0%] w-[13.35%] h-[36.6%] rounded-[22px] overflow-hidden shadow-lg hover:-translate-y-2 hover:scale-[1.025] hover:shadow-[0_14px_34px_rgba(16,185,129,0.55)] transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-emerald-400"
          >
            <CroppedArt
              x={36.1}
              y={49.0}
              w={13.35}
              h={36.6}
              alt="Modul Gamifikasi Magis AI PDF — Kuiz Interaktif, Kad Permainan, Escape Room, Board Game — Lihat Modul"
              className="w-full h-full"
            />
            <div className="shimmer-btn absolute inset-x-[6%] bottom-[3.5%] h-[13%] rounded-full group-hover:ring-2 group-hover:ring-white/80" />
          </button>

          {/* Card 3: GELANGGANG TENIS CIKGU WAN 3D (Symmetrical Long Pants + "Lihat Demo Sekarang") */}
          <button
            type="button"
            onClick={() => {
              setTennisInitialMode('play');
              setTennisModalOpen(true);
            }}
            className="absolute left-[50.0%] top-[49.0%] w-[13.35%] h-[36.6%] rounded-[22px] overflow-hidden shadow-lg hover:-translate-y-2 hover:scale-[1.025] hover:shadow-[0_14px_34px_rgba(168,85,247,0.6)] transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            <div className="relative w-full h-full">
              <CroppedArt
                x={50.0}
                y={49.0}
                w={13.35}
                h={36.6}
                alt="Gelanggang Tenis Cikgu Wan 3D — Lihat Demo Sekarang"
                className="w-full h-full"
              />
              {/* Symmetrical 3D Sporty Long Track Pants Overlay on Cikgu Wan */}
              <CikguWanLongPantsOverlay />
            </div>
            {/* Updated CTA Pill: "Lihat Demo Sekarang" replacing "Main Sekarang" */}
            <div className="shimmer-btn absolute inset-x-[5.5%] bottom-[3.3%] h-[13.2%] rounded-full bg-gradient-to-r from-purple-600 via-fuchsia-600 to-purple-500 border border-purple-200/80 shadow-md flex items-center justify-center gap-1 px-2 group-hover:ring-2 group-hover:ring-white/90">
              <span className="text-[9.5px] lg:text-[11px] font-black text-white tracking-tight whitespace-nowrap">
                Lihat Demo Sekarang ›
              </span>
            </div>
          </button>

          {/* Card 4: PROMPTER MAGIS AI (with Blinking Robot Eyes) */}
          <button
            type="button"
            onClick={() => setPrompterModalOpen(true)}
            className="absolute left-[63.8%] top-[49.0%] w-[12.65%] h-[36.6%] rounded-[22px] overflow-hidden shadow-lg hover:-translate-y-2 hover:scale-[1.025] hover:shadow-[0_14px_34px_rgba(249,115,22,0.6)] transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-amber-400"
          >
            <div className="relative w-full h-full">
              <CroppedArt
                x={63.8}
                y={49.0}
                w={12.65}
                h={36.6}
                alt="Prompter Magis AI — RPH, Soalan, BBM, Aktiviti, Gamifikasi, Analisis — Cuba Prompter"
                className="w-full h-full"
              />
              {/* Blinking Robot Visor Eyes on Card 4 */}
              <div
                aria-hidden="true"
                className="animate-robot-blink absolute left-[50.5%] top-[44.5%] w-[6.5%] h-[4.2%] rounded-full bg-[#050b1a] pointer-events-none"
              />
              <div
                aria-hidden="true"
                className="animate-robot-blink absolute left-[61.8%] top-[44.5%] w-[6.5%] h-[4.2%] rounded-full bg-[#050b1a] pointer-events-none"
              />
            </div>
            <div className="shimmer-btn absolute inset-x-[6%] bottom-[3.5%] h-[13%] rounded-full group-hover:ring-2 group-hover:ring-white/80" />
          </button>

          {/* 6. RIGHT SIDEBAR: PAKEJ HEBAT! (Updated with Bengkel Hands-On 31 Okt 2026 & WhatsApp Coaching 1-to-1) */}
          <div className="absolute left-[76.8%] top-[11.2%] w-[21.6%] h-[75.0%] rounded-[26px] pointer-events-none">
            {/* Upgraded Package Checklist Box inside Right Panel (100% Solid Opaque Navy Gradient) */}
            <div
              onClick={() => setCheckoutModalOpen(true)}
              className="pointer-events-auto cursor-pointer absolute left-[5.5%] top-[53.5%] w-[89%] h-[22.6%] rounded-xl bg-gradient-to-b from-[#0d1f52] via-[#0a163d] to-[#07102c] border border-sky-300/70 px-2 py-1.5 flex flex-col justify-between shadow-lg hover:border-amber-300 transition"
            >
              <div className="grid grid-cols-2 gap-x-1 gap-y-0.5 text-[8.5px] lg:text-[10px] font-bold text-white leading-tight">
                <span className="flex items-center gap-1 truncate">
                  <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400 shrink-0" />
                  Modul Magis PDF
                </span>
                <span className="flex items-center gap-1 truncate">
                  <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400 shrink-0" />
                  Gamifikasi PDF
                </span>
                <span className="flex items-center gap-1 truncate">
                  <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400 shrink-0" />
                  Game 3D Tenis
                </span>
                <span className="flex items-center gap-1 truncate">
                  <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400 shrink-0" />
                  Prompter AI
                </span>
              </div>

              {/* Highlighted Bengkel Hands-On 2 Jam (31 Okt 2026, 8:30 Malam Google Meet) */}
              <div className="rounded-lg bg-amber-400/20 border border-amber-300/70 px-1.5 py-0.5 flex items-center gap-1 text-[8.5px] lg:text-[9.5px] font-black text-amber-200 leading-tight">
                <Calendar className="w-3 h-3 text-amber-300 shrink-0" />
                <span className="truncate">
                  Bengkel 2 Jam: 31 Okt 2026, 8:30 Mlm (Google Meet)
                </span>
              </div>

              {/* Highlighted Group Sokongan WhatsApp Coaching One-to-One */}
              <div className="rounded-lg bg-emerald-500/20 border border-emerald-400/70 px-1.5 py-0.5 flex items-center gap-1 text-[8.5px] lg:text-[9.5px] font-black text-emerald-200 leading-tight">
                <MessageCircle className="w-3 h-3 text-emerald-300 shrink-0" />
                <span className="truncate">
                  Group WhatsApp: Bantuan Coaching One-to-One
                </span>
              </div>
            </div>

            {/* Touch 'n Go eWallet Interactive Button */}
            <button
              type="button"
              onClick={() => setCheckoutModalOpen(true)}
              aria-label="Bayar dengan Touch n Go eWallet RM30"
              className="pointer-events-auto absolute left-[7.5%] top-[76.8%] w-[85%] h-[10.8%] rounded-2xl hover:ring-2 hover:ring-sky-300 transition"
            />

            {/* Golden "Beli Sekarang" Shimmer CTA Button */}
            <button
              type="button"
              onClick={() => setCheckoutModalOpen(true)}
              className="shimmer-btn pointer-events-auto absolute left-[7.5%] top-[88.2%] w-[85%] h-[10.2%] rounded-full hover:scale-105 hover:shadow-[0_0_30px_rgba(251,191,36,0.85)] transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-amber-300"
            >
              <span className="sr-only">Beli Sekarang Pakej Lengkap Hanya RM30</span>
            </button>
          </div>

          {/* 7. BOTTOM TRUST BAR INTERACTIVE STRIP & SPEAKER PROFILE BADGE */}
          <button
            type="button"
            onClick={() => {
              setInfoHubTab('panduan');
              setInfoHubOpen(true);
            }}
            aria-label="Jaminan Pembayaran Selamat Touch n Go eWallet & Akses Segera Selepas Pembayaran"
            className="absolute left-[27.2%] top-[87.2%] w-[41.5%] h-[8.4%] rounded-2xl hover:ring-1 hover:ring-sky-400/50 transition"
          />

          {/* Bottom-Right "Dikembangkan oleh Cikgu Wan - Guru Pakar Digital" -> Opens Mindblowing Speaker Profile */}
          <button
            type="button"
            onClick={() => setSpeakerProfileOpen(true)}
            aria-label="Buka Profil Penceramah Cikgu Wan — Guru Pakar Digital (Google for Education Directory)"
            className="absolute left-[69.0%] top-[87.2%] w-[28.5%] h-[8.4%] rounded-2xl hover:ring-2 hover:ring-amber-400 transition group"
          >
            <span className="sr-only">Dikembangkan oleh Cikgu Wan — Klik untuk Profil Penceramah Google Directory</span>
          </button>
        </div>
      </main>

      {/* =======================================================================
          MOBILE RESPONSIVE VIEW (md:hidden)
          Uses the exact same visual panels + Blinking Eyes + Symmetrical Long Pants
         ======================================================================= */}
      <main className="md:hidden relative z-10 w-full max-w-md mx-auto px-3 py-3 space-y-3">
        {/* Top Mobile Header with Mascot Logo & Quick Nav */}
        <div className="rounded-2xl bg-[#0D183A]/95 border border-sky-400/40 p-2.5 flex items-center justify-between gap-2 shadow-lg">
          <button
            type="button"
            onClick={() => handleNavigation('utama')}
            className="w-24 shrink-0"
          >
            <CroppedArt
              x={5.2}
              y={1.5}
              w={15.2}
              h={16.5}
              alt="Logo Magis AI Cikgu Wan"
              className="w-full rounded-xl"
            />
          </button>

          <div className="flex flex-wrap items-center justify-end gap-1.5">
            <button
              type="button"
              onClick={() => setSpeakerProfileOpen(true)}
              className="px-2.5 py-1.5 rounded-lg bg-amber-400/20 border border-amber-400/60 text-[11px] font-black text-amber-300 flex items-center gap-1"
            >
              <Award className="w-3.5 h-3.5" />
              Profil
            </button>
            <button
              type="button"
              onClick={() => handleNavigation('modul')}
              className="px-2.5 py-1.5 rounded-lg bg-sky-500/20 border border-sky-400/40 text-[11px] font-bold text-sky-200"
            >
              Modul
            </button>
            <button
              type="button"
              onClick={() => handleNavigation('prompter')}
              className="px-2.5 py-1.5 rounded-lg bg-purple-500/20 border border-purple-400/40 text-[11px] font-bold text-purple-200"
            >
              Prompter
            </button>
            <button
              type="button"
              onClick={() => setCheckoutModalOpen(true)}
              className="px-3 py-1.5 rounded-lg bg-amber-400 text-slate-950 text-[11px] font-black shadow"
            >
              RM30
            </button>
          </div>
        </div>

        {/* Mobile Speaker Profile & Live Workshop Banner */}
        <button
          type="button"
          onClick={() => setSpeakerProfileOpen(true)}
          className="w-full rounded-2xl bg-gradient-to-r from-indigo-950 via-sky-950 to-amber-950/90 border-2 border-amber-400/70 p-3 text-left flex items-center justify-between gap-3 shadow-lg"
        >
          <div className="space-y-0.5">
            <div className="text-[10px] font-black text-amber-300 uppercase flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              GOOGLE CERTIFIED TRAINER · PROFIL PENCERAMAH
            </div>
            <div className="text-xs font-black text-white">
              Cikgu Wan (Muhammad Syazwan) · Bengkel 31 Okt 2026 (8:30 Mlm)
            </div>
            <div className="text-[11px] text-emerald-300 font-bold">
              ✓ Google Meet 2 Jam + Group WhatsApp Coaching 1-to-1
            </div>
          </div>
          <span className="px-2.5 py-1.5 rounded-xl bg-amber-400 text-slate-950 font-black text-[11px] shrink-0">
            Buka →
          </span>
        </button>

        {/* Exact Hero Banner Crop (`GELANGGANG TENIS CIKGU WAN 3D`) with "Lihat Demo Sekarang" */}
        <div className="relative rounded-2xl overflow-hidden border-2 border-sky-400/50 shadow-xl">
          <CroppedArt
            x={21.8}
            y={13.8}
            w={54.4}
            h={33.8}
            alt="Gelanggang Tenis Cikgu Wan 3D — Lihat Demo Sekarang"
            className="w-full"
          />
          <button
            type="button"
            onClick={() => {
              setTennisInitialMode('play');
              setTennisModalOpen(true);
            }}
            aria-label="Lihat Demo Sekarang Gelanggang Tenis 3D"
            className="shimmer-btn absolute left-[38.8%] top-[78.2%] w-[31.2%] h-[19.2%] rounded-full bg-gradient-to-b from-[#ff4d8d] via-[#f4256d] to-[#c81051] border border-pink-200 flex items-center justify-center gap-1 px-2 shadow-lg"
          >
            <Gamepad2 className="w-3.5 h-3.5 text-white shrink-0" />
            <span className="text-[10px] font-black text-white whitespace-nowrap">
              Lihat Demo Sekarang
            </span>
          </button>
        </div>

        {/* 2x2 Grid of the 4 Exact Feature Cards from the Image */}
        <div className="grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => {
              setModuleInitialTab('magis-pdf');
              setModuleModalOpen(true);
            }}
            className="relative rounded-2xl overflow-hidden shadow-lg border border-sky-400/40 active:scale-95 transition"
          >
            <CroppedArt
              x={22.25}
              y={49.0}
              w={13.35}
              h={36.6}
              alt="Modul Magis AI Cikgu Wan"
              className="w-full"
            />
            <div
              aria-hidden="true"
              className="animate-robot-blink absolute left-[47.5%] top-[46.8%] w-[6.2%] h-[4.5%] rounded-full bg-[#050b1a] pointer-events-none"
            />
            <div
              aria-hidden="true"
              className="animate-robot-blink absolute left-[58.2%] top-[46.8%] w-[6.2%] h-[4.5%] rounded-full bg-[#050b1a] pointer-events-none"
            />
          </button>

          <button
            type="button"
            onClick={() => {
              setModuleInitialTab('gamifikasi-pdf');
              setModuleModalOpen(true);
            }}
            className="rounded-2xl overflow-hidden shadow-lg border border-emerald-400/40 active:scale-95 transition"
          >
            <CroppedArt
              x={36.1}
              y={49.0}
              w={13.35}
              h={36.6}
              alt="Modul Gamifikasi Magis AI PDF"
              className="w-full"
            />
          </button>

          {/* Card 3 on Mobile with Symmetrical Long Pants + "Lihat Demo Sekarang" */}
          <button
            type="button"
            onClick={() => {
              setTennisInitialMode('play');
              setTennisModalOpen(true);
            }}
            className="relative rounded-2xl overflow-hidden shadow-lg border border-purple-400/40 active:scale-95 transition"
          >
            <CroppedArt
              x={50.0}
              y={49.0}
              w={13.35}
              h={36.6}
              alt="Gelanggang Tenis Cikgu Wan 3D"
              className="w-full"
            />
            <CikguWanLongPantsOverlay />
            <div className="shimmer-btn absolute inset-x-[5.5%] bottom-[3.3%] h-[13.2%] rounded-full bg-gradient-to-r from-purple-600 via-fuchsia-600 to-purple-500 border border-purple-200/80 flex items-center justify-center px-2">
              <span className="text-[9px] font-black text-white whitespace-nowrap">
                Lihat Demo Sekarang ›
              </span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setPrompterModalOpen(true)}
            className="relative rounded-2xl overflow-hidden shadow-lg border border-amber-400/40 active:scale-95 transition"
          >
            <CroppedArt
              x={63.8}
              y={49.0}
              w={12.65}
              h={36.6}
              alt="Prompter Magis AI"
              className="w-full"
            />
            <div
              aria-hidden="true"
              className="animate-robot-blink absolute left-[50.5%] top-[44.5%] w-[6.5%] h-[4.2%] rounded-full bg-[#050b1a] pointer-events-none"
            />
            <div
              aria-hidden="true"
              className="animate-robot-blink absolute left-[61.8%] top-[44.5%] w-[6.5%] h-[4.2%] rounded-full bg-[#050b1a] pointer-events-none"
            />
          </button>
        </div>

        {/* Exact Package Panel Crop (RM30 · Touch 'n Go eWallet · Beli Sekarang) */}
        <button
          type="button"
          onClick={() => setCheckoutModalOpen(true)}
          className="relative w-full rounded-3xl overflow-hidden shadow-2xl border-2 border-amber-400/70 block active:scale-98 transition"
        >
          <CroppedArt
            x={76.8}
            y={11.2}
            w={21.6}
            h={75.0}
            alt="Pakej Hebat Hanya RM30 — Touch n Go eWallet — Beli Sekarang"
            className="w-full"
          />
        </button>

        {/* Bottom Trust Bar Crop */}
        <button
          type="button"
          onClick={() => setSpeakerProfileOpen(true)}
          className="w-full rounded-xl overflow-hidden border border-sky-400/30 block"
        >
          <CroppedArt
            x={27.2}
            y={87.2}
            w={54.4}
            h={8.4}
            alt="Pembayaran Selamat TNG eWallet dan Akses Segera"
            className="w-full"
          />
        </button>
      </main>

      {/* Interactive Modals (3D Tennis Game & Trailer, Prompter AI, PDF Module Preview, TnG Checkout, InfoHub, Speaker Profile) */}
      <TennisGameModal
        isOpen={tennisModalOpen}
        initialMode={tennisInitialMode}
        onClose={() => setTennisModalOpen(false)}
        onOpenCheckout={() => setCheckoutModalOpen(true)}
      />

      <PrompterModal
        isOpen={prompterModalOpen}
        onClose={() => setPrompterModalOpen(false)}
        onOpenCheckout={() => setCheckoutModalOpen(true)}
      />

      <ModulePreviewModal
        isOpen={moduleModalOpen}
        initialTab={moduleInitialTab}
        onClose={() => setModuleModalOpen(false)}
        onOpenCheckout={() => setCheckoutModalOpen(true)}
      />

      <CheckoutModal
        isOpen={checkoutModalOpen}
        onClose={() => setCheckoutModalOpen(false)}
        onPaymentSuccess={(receipt) => setDeliveredReceipt(receipt)}
        existingReceipt={deliveredReceipt}
        onLaunchTennis={() => {
          setTennisInitialMode('play');
          setTennisModalOpen(true);
        }}
        onLaunchPrompter={() => setPrompterModalOpen(true)}
        onLaunchModulePreview={() => {
          setModuleInitialTab('magis-pdf');
          setModuleModalOpen(true);
        }}
      />

      <InfoHubModal
        isOpen={infoHubOpen}
        initialTab={infoHubTab}
        onClose={() => setInfoHubOpen(false)}
        onOpenModul={(tab) => {
          setModuleInitialTab(tab);
          setModuleModalOpen(true);
        }}
        onOpenTennis={() => {
          setTennisInitialMode('play');
          setTennisModalOpen(true);
        }}
        onOpenPrompter={() => setPrompterModalOpen(true)}
        onOpenCheckout={() => setCheckoutModalOpen(true)}
      />

      <SpeakerProfileModal
        isOpen={speakerProfileOpen}
        onClose={() => setSpeakerProfileOpen(false)}
        onOpenCheckout={() => setCheckoutModalOpen(true)}
      />
    </div>
  );
}
