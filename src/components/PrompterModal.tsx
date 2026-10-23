import React, { useState } from 'react';
import {
  Copy,
  Check,
  Sparkles,
  Wand2,
  X,
  BookOpen,
  Layers,
  Terminal,
} from 'lucide-react';
import {
  buildMagisPrompt,
  PromptBuilderConfig,
  PromptCategory,
} from '../utils/magisLogic';

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
    label: 'Sejarah Ting. 2 · Kesultanan Melayu Melaka (RPH DSKP)',
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

  const generatedPrompt = buildMagisPrompt(config);

  const handleCopyPrompt = (targetName: 'Gemini' | 'Claude' | 'ChatGPT') => {
    const updatedPrompt = buildMagisPrompt({ ...config, aiTarget: targetName });
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
      <div className="relative w-full max-w-5xl rounded-3xl bg-[#0F172A] border-2 border-amber-400/40 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 px-6 py-4 bg-gradient-to-r from-amber-950/80 via-slate-900 to-indigo-950 border-b border-amber-400/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-md">
              <Wand2 className="w-6 h-6 text-slate-950" />
            </div>
            <div>
              <h2 id="prompter-modal-title" className="text-lg sm:text-xl font-extrabold text-white">
                APLIKASI PROMPTER MAGIS AI CIKGU WAN
              </h2>
              <p className="text-xs text-amber-300">
                Jana Prompt Permainan 3D, RPH, Kuiz & BBM — Salin Terus ke Gemini, Claude & ChatGPT
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup tetingkap prompter"
            className="p-2 rounded-xl bg-slate-800 hover:bg-rose-600 text-slate-200 hover:text-white border border-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Configuration Column */}
          <div className="lg:col-span-6 space-y-4">
            <div>
              <label className="block text-xs font-bold text-amber-300 mb-2">
                PILIH TEMPLAT PANTAS IKUT DSKP:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {PRESET_TEMPLATES.map((item) => (
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
                    className="text-left px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-amber-400/60 text-xs font-semibold text-slate-200 transition"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="prompter-subject" className="block text-xs font-bold text-slate-300 mb-1">
                  Mata Pelajaran
                </label>
                <select
                  id="prompter-subject"
                  value={config.subject}
                  onChange={(e) => setConfig({ ...config, subject: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400"
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
                <label htmlFor="prompter-level" className="block text-xs font-bold text-slate-300 mb-1">
                  Tahun / Tingkatan
                </label>
                <select
                  id="prompter-level"
                  value={config.level}
                  onChange={(e) => setConfig({ ...config, level: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400"
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
              <label htmlFor="prompter-category" className="block text-xs font-bold text-slate-300 mb-1">
                Jenis Modul / Permainan AI
              </label>
              <select
                id="prompter-category"
                value={config.category}
                onChange={(e) =>
                  setConfig({ ...config, category: e.target.value as PromptCategory })
                }
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400"
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
              <label htmlFor="prompter-topic" className="block text-xs font-bold text-slate-300 mb-1">
                Tajuk Fokus Pengajaran
              </label>
              <input
                id="prompter-topic"
                type="text"
                value={config.topic}
                onChange={(e) => setConfig({ ...config, topic: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label htmlFor="prompter-sp" className="block text-xs font-bold text-slate-300 mb-1">
                Standard Pembelajaran (DSKP)
              </label>
              <input
                id="prompter-sp"
                type="text"
                value={config.standardPembelajaran}
                onChange={(e) =>
                  setConfig({ ...config, standardPembelajaran: e.target.value })
                }
                className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-1">
              <label className="flex items-center gap-2 text-xs text-slate-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.includeHandGesture}
                  onChange={(e) =>
                    setConfig({ ...config, includeHandGesture: e.target.checked })
                  }
                  className="rounded border-slate-600 text-amber-400 focus:ring-amber-400"
                />
                <span>Masukkan Kawalan Tangan (Hand-Gesture)</span>
              </label>
              <label className="flex items-center gap-2 text-xs text-slate-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.includeLeaderboard}
                  onChange={(e) =>
                    setConfig({ ...config, includeLeaderboard: e.target.checked })
                  }
                  className="rounded border-slate-600 text-amber-400 focus:ring-amber-400"
                />
                <span>Masukkan Papan Markah Kelas</span>
              </label>
            </div>
          </div>

          {/* Right Output & 1-Click Copy Column */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-sky-300 flex items-center gap-1.5">
                  <Terminal className="w-4 h-4" />
                  PRATONTON PROMPT MAGIS SIAP GUNA
                </span>
                <span className="text-xs text-slate-400">
                  Dioptimumkan untuk: <strong className="text-amber-300">{config.aiTarget}</strong>
                </span>
              </div>

              <textarea
                readOnly
                aria-label="Teks Prompt Magis AI"
                value={generatedPrompt}
                rows={11}
                className="w-full p-3.5 rounded-2xl bg-slate-950 border border-sky-500/30 font-mono text-xs text-sky-100 leading-relaxed focus:outline-none"
              />
            </div>

            {/* 1-Click Copy Buttons for Gemini, Claude, ChatGPT */}
            <div className="space-y-2.5">
              <div className="text-xs font-bold text-slate-300">
                KLIK UNTUK SALIN TERUS KE PLATFORM AI PILIHAN:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {(['Gemini', 'Claude', 'ChatGPT'] as const).map((platform) => {
                  const isCopied = copiedPlatform === platform;
                  return (
                    <button
                      key={platform}
                      type="button"
                      onClick={() => handleCopyPrompt(platform)}
                      className={`py-2.5 px-3 rounded-xl font-extrabold text-xs flex items-center justify-center gap-1.5 transition shadow ${
                        isCopied
                          ? 'bg-emerald-500 text-slate-950'
                          : platform === 'Gemini'
                          ? 'bg-sky-500 hover:bg-sky-400 text-slate-950'
                          : platform === 'Claude'
                          ? 'bg-amber-500 hover:bg-amber-400 text-slate-950'
                          : 'bg-teal-500 hover:bg-teal-400 text-slate-950'
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
                  className="p-2.5 rounded-xl bg-emerald-950/90 border border-emerald-400/50 text-xs text-emerald-200 font-semibold flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>
                    Prompt berjaya disalin! Tampal (Paste) terus ke dalam {copiedPlatform} untuk menjana permainan/modul anda.
                  </span>
                </div>
              )}
            </div>

            {/* Upsell Banner for Full 120+ Prompt Library */}
            <div className="p-3.5 rounded-2xl bg-gradient-to-r from-indigo-950 via-slate-900 to-amber-950/50 border border-amber-400/30 flex flex-wrap items-center justify-between gap-3">
              <div className="text-xs text-slate-200">
                <strong className="text-amber-300">Pakej Penuh RM30:</strong> Buka kunci 120+ Templat Prompt Pro untuk semua subjek & permainan 3D!
              </div>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenCheckout();
                }}
                className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs whitespace-nowrap shrink-0"
              >
                Beli Pakej RM30 →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
