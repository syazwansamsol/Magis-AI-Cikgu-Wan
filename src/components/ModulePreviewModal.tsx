import React, { useState } from 'react';
import {
  BookOpen,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Copy,
  FileText,
  Lock,
  ShoppingBag,
  Sparkles,
  Wand2,
  X,
} from 'lucide-react';
import { CroppedArt } from './CroppedArt';
import { buildShortPreviewPrompt } from '../utils/magisLogic';

interface ModulePreviewModalProps {
  isOpen: boolean;
  initialTab?: 'magis-pdf' | 'gamifikasi-pdf';
  onClose: () => void;
  onOpenCheckout: () => void;
}

const MAGIS_PDF_PAGES = [
  {
    page: 'Contoh Halaman 04 · Modul Magis AI PDF',
    title: 'Formula 3 Langkah Bina RPH & Permainan 3D Ikut DSKP',
    sampleSnippet:
      'LANGKAH 1: Pilih Standard Pembelajaran (Contoh: Sains Tahun 4 - 5.1.2 Pantulan Cahaya).\nLANGKAH 2: Salin Prompt Ringkas ke Gemini / ChatGPT.\nLANGKAH 3: Muat turun fail permainan HTML 3D & buka terus di Smartboard kelas!',
    bullets: [
      'Contoh RPH & RPT lengkap mengikut format KPM terkini',
      'Panduan bergambar langkah demi langkah (84 muka surat berwarna)',
      'Senarai semak kesesuaian tahap murid Tahun 1 hingga Tingkatan 5',
    ],
    shortPromptConfig: {
      subject: 'Sains',
      level: 'Tahun 4',
      topic: 'Sifat Cahaya: Pantulan & Pembiasan',
      standardPembelajaran: '5.1.2 Membanding dan membezakan bayang-bayang objek legap',
      category: 'permainan-3d-tangan' as const,
    },
  },
  {
    page: 'Contoh Halaman 22 · Modul Magis AI PDF',
    title: 'Tetapan Kamera Web Kawalan Tangan (Hand-Gesture) Di Kelas',
    sampleSnippet:
      'TIP KELAS CIKGU WAN: Letakkan laptop menghadap pemain pada jarak 1.5 meter. Murid hanya perlu menghayun tapak tangan ke kiri atau kanan untuk memukul bola tenis 3D sambil menjawab kuiz!',
    bullets: [
      'Panduan sambungan laptop ke projektor atau TV Pintar sekolah',
      'Cara menukar set soalan kuiz mengikut subjek dalam masa 2 minit',
      'Boleh dimainkan secara Offline tanpa talian internet laju',
    ],
    shortPromptConfig: {
      subject: 'Matematik',
      level: 'Tahun 5',
      topic: 'Pecahan & Peratus',
      standardPembelajaran: '2.3.1 Menyelesaikan masalah harian melibatkan peratus',
      category: 'permainan-3d-tangan' as const,
    },
  },
];

const GAMIFIKASI_PDF_PAGES = [
  {
    page: 'Contoh Halaman 08 · Modul Gamifikasi PDF',
    title: 'Templat Kuiz Interaktif Stadium & Kad Kuasa Pasukan',
    sampleSnippet:
      'CONTOH AKTIVITI: Bahagikan kelas kepada 4 Kumpulan. Setiap kali kumpulan menjawab soalan KBAT dengan tepat, mereka boleh memilih 1 Kad Kuasa (Gandakan Markah / Perisai Bintang).',
    bullets: [
      '30+ Reka bentuk Kad Kuasa & Kad Ganjaran sedia dicetak (PDF)',
      'Papan Markah Digital automatik untuk pertandingan kelas',
      'Sesuai untuk semua subjek Sekolah Rendah & Sekolah Menengah',
    ],
    shortPromptConfig: {
      subject: 'Bahasa Melayu',
      level: 'Tahun 6',
      topic: 'Kata Kerja Aktif Transitif',
      standardPembelajaran: '5.1.4 Menggunakan kata kerja aktif transitif mengikut konteks',
      category: 'kuiz-gamifikasi' as const,
    },
  },
  {
    page: 'Contoh Halaman 19 · Modul Gamifikasi PDF',
    title: 'Misi Bilik Lolos Digital (Escape Room) & Board Game',
    sampleSnippet:
      'MISI BILIK LOLOS: Murid diberi masa 15 minit untuk menyelesaikan 4 kod rahsia berdasarkan topik Sejarah / Sains bagi membuka peti harta karun Cikgu Wan!',
    bullets: [
      '5 Senario Escape Room Lengkap sedia guna di dalam kelas',
      'Papan Permainan (Board Game) boleh cetak saiz A4 / A3',
      'Panduan fasilitator guru langkah demi langkah',
    ],
    shortPromptConfig: {
      subject: 'Sejarah',
      level: 'Tingkatan 2',
      topic: 'Kesultanan Melayu Melaka',
      standardPembelajaran: '5.2.2 Menerangkan faktor kegemilangan Kesultanan Melayu Melaka',
      category: 'escape-room-kelas' as const,
    },
  },
];

export const ModulePreviewModal: React.FC<ModulePreviewModalProps> = ({
  isOpen,
  initialTab = 'magis-pdf',
  onClose,
  onOpenCheckout,
}) => {
  const [tab, setTab] = useState<'magis-pdf' | 'gamifikasi-pdf'>(initialTab);
  const [pageIdx, setPageIdx] = useState(0);
  const [copiedAI, setCopiedAI] = useState<string | null>(null);

  if (!isOpen) return null;

  const pages = tab === 'magis-pdf' ? MAGIS_PDF_PAGES : GAMIFIKASI_PDF_PAGES;
  const safeIdx = Math.min(pageIdx, pages.length - 1);
  const current = pages[safeIdx];

  const sampleShortPrompt = buildShortPreviewPrompt({
    ...current.shortPromptConfig,
    aiTarget: 'Gemini',
    includeHandGesture: true,
    includeLeaderboard: true,
  });

  const handleCopyShortPrompt = (aiTarget: 'Gemini' | 'Claude' | 'ChatGPT') => {
    const text = buildShortPreviewPrompt({
      ...current.shortPromptConfig,
      aiTarget,
      includeHandGesture: true,
      includeLeaderboard: true,
    });
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).catch(() => {});
    }
    setCopiedAI(aiTarget);
    setTimeout(() => setCopiedAI(null), 2500);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85"
      role="dialog"
      aria-modal="true"
      aria-labelledby="module-modal-title"
    >
      <div className="relative w-full max-w-5xl rounded-3xl bg-gradient-to-b from-[#0d1f52] via-[#091538] to-[#060d24] border-2 border-sky-400/70 shadow-[0_0_80px_rgba(14,165,233,0.45)] overflow-hidden max-h-[92vh] flex flex-col">
        {/* Console Header Matching Main Interface */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-5 sm:px-6 py-3.5 bg-gradient-to-r from-[#0e225c] via-[#132c73] to-[#0d1e4f] border-b-2 border-sky-400/50">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-sky-400 to-emerald-400 flex items-center justify-center shadow-lg">
              <BookOpen className="w-6 h-6 text-slate-950" />
            </div>
            <div>
              <div className="text-[10px] font-black text-amber-300 uppercase tracking-wider">
                PRATONTON CONTOH MODUL & PROMPTER RINGKAS
              </div>
              <h2 id="module-modal-title" className="text-base sm:text-xl font-black text-white">
                CONTOH MODUL PDF + PROMPTER MAGIS AI CIKGU WAN
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setTab('magis-pdf');
                setPageIdx(0);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition ${
                tab === 'magis-pdf'
                  ? 'bg-sky-400 text-slate-950 shadow'
                  : 'bg-[#091538] text-sky-200 border border-sky-400/30 hover:text-white'
              }`}
            >
              Contoh Modul Magis PDF
            </button>
            <button
              type="button"
              onClick={() => {
                setTab('gamifikasi-pdf');
                setPageIdx(0);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition ${
                tab === 'gamifikasi-pdf'
                  ? 'bg-emerald-400 text-slate-950 shadow'
                  : 'bg-[#091538] text-sky-200 border border-sky-400/30 hover:text-white'
              }`}
            >
              Contoh Modul Gamifikasi
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Tutup pratonton modul"
              className="p-2 rounded-xl bg-slate-900 hover:bg-rose-600 text-slate-200 hover:text-white border border-sky-400/40"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body: Left = Contoh Modul Page Preview, Right = Built-in Prompter Ringkas */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
            {/* LEFT: Contoh Modul PDF Preview Card */}
            <div className="lg:col-span-7 rounded-2xl bg-[#081336] border-2 border-sky-400/40 p-5 flex flex-col justify-between space-y-4 shadow-inner">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-black text-amber-300">
                  <span className="flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-sky-400" />
                    {current.page}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-200">
                    Contoh {safeIdx + 1} / {pages.length}
                  </span>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="relative w-20 sm:w-24 shrink-0 rounded-xl overflow-hidden border border-sky-300/50 shadow-md">
                    {tab === 'magis-pdf' ? (
                      <>
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
                      </>
                    ) : (
                      <CroppedArt
                        x={36.1}
                        y={49.0}
                        w={13.35}
                        h={36.6}
                        alt="Modul Gamifikasi Magis AI PDF"
                        className="w-full"
                      />
                    )}
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-base sm:text-lg font-black text-white leading-snug">
                      {current.title}
                    </h3>
                    <div className="p-3 rounded-xl bg-[#050b1f] border border-sky-400/30 font-mono text-[11px] text-sky-100 whitespace-pre-line leading-relaxed">
                      {current.sampleSnippet}
                    </div>
                  </div>
                </div>

                <div className="pt-1 space-y-2">
                  <div className="text-xs font-extrabold text-sky-300">
                    ISI KANDUNGAN MODUL PENUH (DALAM PAKEJ BERBAYAR RM30):
                  </div>
                  {current.bullets.map((b) => (
                    <div key={b} className="flex items-start gap-2 text-xs text-slate-200 font-semibold">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Page Flipper Controls */}
              <div className="pt-3 border-t border-sky-400/20 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setPageIdx((i) => (i - 1 + pages.length) % pages.length)}
                  className="px-3 py-1.5 rounded-xl bg-[#0e225c] hover:bg-[#163280] border border-sky-400/40 text-xs font-bold text-white flex items-center gap-1"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Contoh Sebelumnya
                </button>

                <span className="text-[11px] text-amber-300 font-bold flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5" />
                  80+ Muka Surat Penuh Dalam Pakej RM30
                </span>

                <button
                  type="button"
                  onClick={() => setPageIdx((i) => (i + 1) % pages.length)}
                  className="px-3 py-1.5 rounded-xl bg-[#0e225c] hover:bg-[#163280] border border-sky-400/40 text-xs font-bold text-white flex items-center gap-1"
                >
                  Contoh Seterusnya
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* RIGHT: Built-in Contoh Prompter Magis AI (Prompt Ringkas Sahaja) */}
            <div className="lg:col-span-5 rounded-2xl bg-[#081336] border-2 border-amber-400/60 p-5 flex flex-col justify-between space-y-3 shadow-inner">
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-amber-300 flex items-center gap-1.5">
                    <Wand2 className="w-4 h-4 text-amber-400" />
                    PROMPTER MAGIS AI (PROMPT RINGKAS)
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-amber-400/20 text-[10px] font-black text-amber-200">
                    DEMO PERCUMA
                  </span>
                </div>

                <p className="text-xs text-sky-100 leading-relaxed">
                  Salin contoh <strong>Prompt Ringkas</strong> bagi halaman modul ini ke Gemini, Claude atau ChatGPT:
                </p>

                <textarea
                  readOnly
                  aria-label="Contoh Prompt Ringkas Modul"
                  value={sampleShortPrompt}
                  rows={6}
                  className="w-full p-3 rounded-xl bg-[#050b1f] border border-sky-400/40 font-mono text-[11px] text-sky-100 leading-relaxed focus:outline-none"
                />
              </div>

              <div className="space-y-2">
                <div className="grid grid-cols-3 gap-2">
                  {(['Gemini', 'Claude', 'ChatGPT'] as const).map((platform) => {
                    const isCopied = copiedAI === platform;
                    return (
                      <button
                        key={platform}
                        type="button"
                        onClick={() => handleCopyShortPrompt(platform)}
                        className={`py-2 px-2 rounded-xl font-black text-[11px] flex items-center justify-center gap-1 transition shadow ${
                          isCopied
                            ? 'bg-emerald-400 text-slate-950'
                            : platform === 'Gemini'
                            ? 'bg-sky-400 hover:bg-sky-300 text-slate-950'
                            : platform === 'Claude'
                            ? 'bg-amber-400 hover:bg-amber-300 text-slate-950'
                            : 'bg-teal-400 hover:bg-teal-300 text-slate-950'
                        }`}
                      >
                        {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{isCopied ? 'Disalin!' : platform}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="p-2.5 rounded-xl bg-amber-500/15 border border-amber-400/40 text-[11px] text-amber-200 font-semibold flex items-start gap-2">
                  <Lock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Nota Pakej Berbayar:</strong> Prompt penuh 5-lapis untuk membina permainan 3D kawalan tangan & 120+ templat DSKP disertakan eksklusif kepada pembeli Pakej RM 30.00.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Call-To-Action Banner */}
          <div className="rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 p-4 text-slate-950 flex flex-wrap items-center justify-between gap-4 shadow-xl">
            <div className="space-y-0.5">
              <div className="text-sm sm:text-base font-black flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-slate-950" />
                Dapatkan Modul PDF Penuh + Prompter Pro + Game 3D + Bengkel Google Meet (RM 30.00)!
              </div>
              <p className="text-xs font-bold text-slate-900">
                Termasuk Bengkel Hands-On 2 Jam (31 Oktober 2026, 8:30 Malam) & Group WhatsApp Coaching 1-to-1.
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenCheckout();
              }}
              className="px-5 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-900 text-amber-300 font-black text-xs sm:text-sm shadow-lg flex items-center gap-1.5 whitespace-nowrap shrink-0"
            >
              <ShoppingBag className="w-4 h-4" />
              Beli Pakej Lengkap RM 30 →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
