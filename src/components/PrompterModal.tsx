import React, { useState } from 'react';
import {
  Copy,
  Check,
  Lock,
  Sparkles,
  Wand2,
  X,
  Terminal,
  ShoppingBag,
} from 'lucide-react';
import {
  buildShortPreviewPrompt,
  PromptBuilderConfig,
  PromptCategory,
} from '../utils/magisLogic';
import { CroppedArt } from './CroppedArt';

interface PrompterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenCheckout: () => void;
}

const PRESET_TEMPLATES: Array<{
  label: string;
  subject: string;
  level: string;
  topic: string;
  standardPembelajaran: string;
  category: PromptCategory;
}> = [
  {
    label: 'Sains T4 · Pantulan Cahaya (Permainan 3D)',
    subject: 'Sains',
    level: 'Tahun 4',
    topic: 'Sifat Cahaya: Pantulan & Pembiasan',
    standardPembelajaran: '5.1.2 Membanding dan membezakan bayang-bayang objek legap dan lut cahaya',
    category: 'permainan-3d-tangan',
  },
  {
    label: 'Matematik T5 · Pecahan & Peratus (Kuiz Sukan)',
    subject: 'Matematik',
    level: 'Tahun 5',
    topic: 'Pecahan, Perpuluhan dan Peratus',
    standardPembelajaran: '2.3.1 Menyelesaikan masalah harian melibatkan peratus',
    category: 'kuiz-gamifikasi',
  },
  {
    label: 'Bahasa Melayu T6 · Tatabahasa (Escape Room)',
    subject: 'Bahasa Melayu',
    level: 'Tahun 6',
    topic: 'Kata Kerja Aktif Transitif & Ayat Majmuk',
    standardPembelajaran: '5.1.4 Memahami dan menggunakan kata kerja aktif transitif mengikut konteks',
    category: 'escape-room-kelas',
  },
  {
    label: 'Sejarah Ting. 2 · Kesultanan Melaka (RPH DSKP)',
    subject: 'Sejarah',
    level: 'Tingkatan 2',
    topic: 'Pengasasan Kesultanan Melayu Melaka',
    standardPembelajaran: '5.2.2 Menerangkan faktor kegemilangan Kesultanan Melayu Melaka',
    category: 'rph-lengkap-dskp',
  },
];

export const PrompterModal: React.FC<PrompterModalProps> = ({
  isOpen,
  onClose,
  onOpenCheckout,
}) => {
  const [config, setConfig] = useState<PromptBuilderConfig>({
    subject: 'Sains',
    level: 'Tahun 4',
    topic: 'Sifat Cahaya: Pantulan & Pembiasan',
    standardPembelajaran:
      '5.1.2 Membanding dan membezakan bayang-bayang objek legap dan lut cahaya',
    category: 'permainan-3d-tangan',
    aiTarget: 'Gemini',
    includeHandGesture: true,
    includeLeaderboard: true,
  });

  const [copiedPlatform, setCopiedPlatform] = useState<string | null>(null);

  if (!isOpen) return null;

  const shortPrompt = buildShortPreviewPrompt(config);

  const handleCopyPrompt = (targetName: 'Gemini' | 'Claude' | 'ChatGPT') => {
    const updatedPrompt = buildShortPreviewPrompt({ ...config, aiTarget: targetName });
    setConfig((prev) => ({ ...prev, aiTarget: targetName }));
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(updatedPrompt).catch(() => {});
    }
    setCopiedPlatform(targetName);
    setTimeout(() => {
      setCopiedPlatform(null);
    }, 2800);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85"
      role="dialog"
      aria-modal="true"
      aria-labelledby="prompter-modal-title"
    >
      <div className="relative w-full max-w-5xl rounded-3xl bg-gradient-to-b from-[#0d1f52] via-[#091538] to-[#060d24] border-2 border-sky-400/70 shadow-[0_0_80px_rgba(14,165,233,0.45)] overflow-hidden max-h-[92vh] flex flex-col">
        {/* Console-Style Header Matching Main Interface */}
        <div className="flex items-center justify-between gap-4 px-5 sm:px-6 py-3.5 bg-gradient-to-r from-[#0e225c] via-[#132c73] to-[#0d1e4f] border-b-2 border-sky-400/50">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl overflow-hidden border-2 border-amber-400 shadow-lg shrink-0">
              <CroppedArt
                x={63.8}
                y={49.0}
                w={12.65}
                h={20.0}
                alt="Robot Prompter Magis AI"
                className="w-full h-full"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black uppercase">
                  VERSI PRATONTON RINGKAS
                </span>
                <span className="text-[11px] font-extrabold text-sky-300">
                  GEMINI · CLAUDE · CHATGPT
                </span>
              </div>
              <h2
                id="prompter-modal-title"
                className="text-lg sm:text-xl font-black text-white tracking-tight"
              >
                APLIKASI PROMPTER MAGIS AI CIKGU WAN
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup tetingkap prompter"
            className="p-2 rounded-xl bg-slate-900/90 hover:bg-rose-600 text-slate-200 hover:text-white border border-sky-400/40 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Main Body Styled Like Main Console */}
        <div className="p-5 sm:p-6 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Left Column: 3D Robot Card Visual + Preset & Subject Controls */}
          <div className="lg:col-span-6 space-y-4">
            {/* Mini Visual Showcase Strip Matching Home Page */}
            <div className="rounded-2xl bg-gradient-to-r from-[#102a6b] via-[#163582] to-[#0f2359] border border-sky-300/50 p-3 flex items-center gap-3.5 shadow-inner">
              <div className="relative w-20 sm:w-24 shrink-0 rounded-xl overflow-hidden border border-amber-300/60 shadow-md">
                <CroppedArt
                  x={63.8}
                  y={49.0}
                  w={12.65}
                  h={36.6}
                  alt="Kad Prompter Magis AI"
                  className="w-full"
                />
                {/* Blinking Robot Eyes inside Prompter Card */}
                <div
                  aria-hidden="true"
                  className="animate-robot-blink absolute left-[50.5%] top-[44.5%] w-[6.5%] h-[4.2%] rounded-full bg-[#050b1a] pointer-events-none"
                />
                <div
                  aria-hidden="true"
                  className="animate-robot-blink absolute left-[61.8%] top-[44.5%] w-[6.5%] h-[4.2%] rounded-full bg-[#050b1a] pointer-events-none"
                />
              </div>

              <div className="space-y-1">
                <div className="text-xs font-black text-amber-300 flex items-center gap-1">
                  <Wand2 className="w-3.5 h-3.5" />
                  CONTOH PROMPTER MAGIS AI
                </div>
                <p className="text-xs text-sky-100 leading-relaxed">
                  Cuba jana <strong>Prompt Ringkas</strong> di bawah secara percuma. Untuk membuka kunci <strong>Prompt Master 5-Lapis Penuh (Kod 3D Hand-Gesture + 8 Soalan DSKP + 120 Templat Pro)</strong>, dapatkan Pakej Lengkap RM 30.00!
                </p>
              </div>
            </div>

            {/* Preset DSKP Pills */}
            <div>
              <label className="block text-xs font-extrabold text-amber-300 mb-2">
                1. PILIH CONTOH TOPIK PANTAS (DSKP KPM):
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {PRESET_TEMPLATES.map((item) => {
                  const isSelected = config.topic === item.topic;
                  return (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() =>
                        setConfig((prev) => ({
                          ...prev,
                          subject: item.subject,
                          level: item.level,
                          topic: item.topic,
                          standardPembelajaran: item.standardPembelajaran,
                          category: item.category,
                        }))
                      }
                      className={`text-left px-3 py-2 rounded-xl border text-xs font-bold transition ${
                        isSelected
                          ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white border-white shadow-md'
                          : 'bg-[#0a173d] hover:bg-[#112459] border-sky-400/30 text-sky-100'
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Subject & Level Selectors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="prompter-subject" className="block text-xs font-bold text-sky-200 mb-1">
                  Mata Pelajaran
                </label>
                <select
                  id="prompter-subject"
                  value={config.subject}
                  onChange={(e) => setConfig({ ...config, subject: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#071130] border border-sky-400/40 text-xs sm:text-sm text-white font-semibold focus:outline-none focus:border-amber-400"
                >
                  <option value="Sains">Sains</option>
                  <option value="Matematik">Matematik</option>
                  <option value="Bahasa Melayu">Bahasa Melayu</option>
                  <option value="Bahasa Inggeris">Bahasa Inggeris</option>
                  <option value="Sejarah">Sejarah</option>
                  <option value="Pendidikan Islam">Pendidikan Islam</option>
                  <option value="Reka Bentuk & Teknologi (RBT)">Reka Bentuk & Teknologi (RBT)</option>
                </select>
              </div>

              <div>
                <label htmlFor="prompter-level" className="block text-xs font-bold text-sky-200 mb-1">
                  Tahun / Tingkatan
                </label>
                <select
                  id="prompter-level"
                  value={config.level}
                  onChange={(e) => setConfig({ ...config, level: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#071130] border border-sky-400/40 text-xs sm:text-sm text-white font-semibold focus:outline-none focus:border-amber-400"
                >
                  <option value="Tahun 1">Tahun 1</option>
                  <option value="Tahun 2">Tahun 2</option>
                  <option value="Tahun 3">Tahun 3</option>
                  <option value="Tahun 4">Tahun 4</option>
                  <option value="Tahun 5">Tahun 5</option>
                  <option value="Tahun 6">Tahun 6</option>
                  <option value="Tingkatan 1">Tingkatan 1</option>
                  <option value="Tingkatan 2">Tingkatan 2</option>
                  <option value="Tingkatan 3">Tingkatan 3</option>
                  <option value="Tingkatan 4 & 5">Tingkatan 4 & 5</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="prompter-category" className="block text-xs font-bold text-sky-200 mb-1">
                Jenis Bahan / Permainan AI
              </label>
              <select
                id="prompter-category"
                value={config.category}
                onChange={(e) =>
                  setConfig({ ...config, category: e.target.value as PromptCategory })
                }
                className="w-full px-3 py-2 rounded-xl bg-[#071130] border border-sky-400/40 text-xs sm:text-sm text-white font-semibold focus:outline-none focus:border-amber-400"
              >
                <option value="permainan-3d-tangan">
                  Permainan 3D Kawalan Tangan (Hand-Gesture Sukan)
                </option>
                <option value="kuiz-gamifikasi">
                  Kuiz Gamifikasi Interaktif & Papan Markah Kelas
                </option>
                <option value="escape-room-kelas">
                  Misi Bilik Lolos (Digital Escape Room)
                </option>
                <option value="rph-lengkap-dskp">
                  RPH Lengkap Mengikut Standard Pembelajaran DSKP
                </option>
                <option value="bbm-visual-interaktif">
                  BBM Simulasi Visual & Eksperimen Interaktif
                </option>
              </select>
            </div>

            <div>
              <label htmlFor="prompter-topic" className="block text-xs font-bold text-sky-200 mb-1">
                Tajuk Fokus Pengajaran
              </label>
              <input
                id="prompter-topic"
                type="text"
                value={config.topic}
                onChange={(e) => setConfig({ ...config, topic: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-[#071130] border border-sky-400/40 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          {/* Right Column: Short Preview Prompt + Locked Pro Features + 1-Click Copy */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-amber-300 flex items-center gap-1.5">
                  <Terminal className="w-4 h-4 text-sky-400" />
                  CONTOH PROMPT RINGKAS (VERSI DEMO)
                </span>
                <span className="text-xs text-sky-200">
                  Sasaran AI: <strong className="text-amber-300">{config.aiTarget}</strong>
                </span>
              </div>

              <textarea
                readOnly
                aria-label="Teks Prompt Magis AI Ringkas"
                value={shortPrompt}
                rows={6}
                className="w-full p-3.5 rounded-2xl bg-[#050b1f] border-2 border-sky-400/50 font-mono text-xs text-sky-100 leading-relaxed focus:outline-none shadow-inner"
              />

              {/* Locked Pro Master Prompt Preview Card */}
              <div className="rounded-2xl bg-gradient-to-r from-amber-500/15 via-[#0b1942] to-purple-900/30 border border-amber-400/60 p-3 space-y-1.5">
                <div className="flex items-center justify-between text-xs font-black text-amber-300">
                  <span className="flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-amber-400" />
                    MODUL PROMPT MASTER PRO (TERMASUK DALAM PAKEJ RM30)
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-amber-400/20 text-[10px]">
                    EKSKLUSIF PEMBELI
                  </span>
                </div>
                <p className="text-[11px] text-sky-100 leading-relaxed">
                  Dalam versi berbayar RM 30.00, Cikgu mendapat <strong>Prompt Penuh 5-Lapis (Kod Three.js 3D + MediaPipe Hand-Gesture + Papan Skor + 120 Templat Semua Subjek)</strong> yang menghasilkan permainan 3D penuh seperti Gelanggang Tenis Cikgu Wan!
                </p>
              </div>
            </div>

            {/* 1-Click Copy Buttons for Gemini, Claude, ChatGPT */}
            <div className="space-y-2.5">
              <div className="text-xs font-extrabold text-sky-200">
                2. SALIN PROMPT RINGKAS KE PLATFORM AI PILIHAN:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {(['Gemini', 'Claude', 'ChatGPT'] as const).map((platform) => {
                  const isCopied = copiedPlatform === platform;
                  return (
                    <button
                      key={platform}
                      type="button"
                      onClick={() => handleCopyPrompt(platform)}
                      className={`py-2.5 px-3 rounded-xl font-black text-xs flex items-center justify-center gap-1.5 transition shadow-lg ${
                        isCopied
                          ? 'bg-emerald-400 text-slate-950'
                          : platform === 'Gemini'
                          ? 'bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-300 hover:to-blue-400 text-slate-950'
                          : platform === 'Claude'
                          ? 'bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-slate-950'
                          : 'bg-gradient-to-r from-teal-400 to-emerald-500 hover:from-teal-300 hover:to-emerald-400 text-slate-950'
                      }`}
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-4 h-4" />
                          Disalin ({platform})!
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          Copy ke {platform}
                        </>
                      )}
                    </button>
                  );
                })}
              </div>

              {copiedPlatform && (
                <div
                  role="status"
                  className="p-2.5 rounded-xl bg-emerald-950/90 border border-emerald-400/60 text-xs text-emerald-200 font-bold flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>
                    Prompt ringkas berjaya disalin! Tampal (Paste) ke dalam {copiedPlatform}.
                  </span>
                </div>
              )}
            </div>

            {/* Golden Console CTA Banner */}
            <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 flex flex-wrap items-center justify-between gap-3 shadow-xl">
              <div className="text-xs font-extrabold">
                <div className="text-sm font-black">
                  Buka Kunci Prompter Pro Penuh + 2 Modul PDF + Game 3D!
                </div>
                <div>
                  Termasuk Bengkel Hands-On 31 Okt 2026 (8:30 Mlm) & Group WhatsApp Coaching.
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenCheckout();
                }}
                className="px-4 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-900 text-amber-300 font-black text-xs flex items-center gap-1.5 whitespace-nowrap shrink-0 shadow-md"
              >
                <ShoppingBag className="w-4 h-4" />
                Dapatkan Pakej RM30 →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
