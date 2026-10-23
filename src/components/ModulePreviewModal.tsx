import React, { useState } from 'react';
import {
  BookOpen,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  FileText,
  Layers,
  Sparkles,
  X,
} from 'lucide-react';

interface ModulePreviewModalProps {
  isOpen: boolean;
  initialTab?: 'magis-pdf' | 'gamifikasi-pdf';
  onClose: () => void;
  onOpenCheckout: () => void;
}

const MAGIS_PDF_PAGES = [
  {
    page: 'Bab 01 · Muka Surat 1–14',
    title: 'Asas Pantas Magis AI Mengikut Standard Pembelajaran KPM',
    summary:
      'Panduan langkah demi langkah bermula dari sifar: cara menyusun Dokumen Standard Kurikulum dan Pentaksiran (DSKP) supaya AI memahami objektif pengajaran dan kriteria kejayaan dengan tepat.',
    bullets: [
      'Jana RPH & RPT lengkap seminit mengikut format terkini sekolah Malaysia',
      'Formula Struktur Prompt 5-Lapis Cikgu Wan (Peranan, Kurikulum, Aras Murid, Mekanik, Format)',
      'Senarai semak kesesuaian tahap murid Tahun 1 hingga Tingkatan 5',
    ],
  },
  {
    page: 'Bab 02 · Muka Surat 15–42',
    title: 'Bina Permainan 3D Kawalan Tangan (Hand-Gesture) Tanpa Koding Rumit',
    summary:
      'Rahsia membina permainan sukan interaktif seperti Gelanggang Tenis 3D menggunakan kamera web laptop biasa supaya murid boleh berinteraksi secara fizikal di dalam kelas.',
    bullets: [
      'Panduan sambungan kamera laptop ke skrin projektor atau Smartboard sekolah',
      'Cara menukar set soalan kuiz dalam permainan mengikut subjek dalam masa 2 minit',
      'Tetapan kelajuan bola & tahap kesukaran untuk murid pemulihan hingga pengayaan',
    ],
  },
  {
    page: 'Bab 03 · Muka Surat 43–84',
    title: 'Koleksi BBM Interaktif, Lembaran Kerja & Analisis Pentaksiran Bilik Darjah (PBD)',
    summary:
      'Hasilkan bahan bantu mengajar visual, kad imbasan, soalan KBAT dwibahasa (DLP), dan jadual rekod penguasaan PBD secara automatik.',
    bullets: [
      'Templat siap guna untuk Bahasa Melayu, Bahasa Inggeris, Matematik, Sains & Sejarah',
      'Panduan menyimpan permainan secara luar talian (Offline HTML) untuk sekolah kurang internet',
      'Akses kemas kini modul percuma selama 1 tahun penuh',
    ],
  },
];

const GAMIFIKASI_PDF_PAGES = [
  {
    page: 'Set Gamifikasi 01 · Kuiz & Kad Permainan',
    title: 'Kuiz Interaktif Stadium & Kad Cabaran Berpasukan',
    summary:
      'Ubah sesi ulang kaji yang membosankan menjadi pertandingan kuiz berpasukan lengkap dengan kiraan masa, bunyi buzzer, dan kad kuasa istimewa.',
    bullets: [
      '30+ Reka bentuk Kad Kuasa & Kad Ganjaran Murid sedia dicetak (PDF)',
      'Papan Markah Digital automatik untuk 4 hingga 6 kumpulan di dalam kelas',
      'Sesuai untuk aktiviti pembelajaran abad ke-21 (PAK21)',
    ],
  },
  {
    page: 'Set Gamifikasi 02 · Misi Escape Room & Board Game',
    title: 'Bilik Lolos Digital (Escape Room) & Papan Permainan Ilmu',
    summary:
      'Murid perlu menyelesaikan teka-teki berasaskan topik pelajaran untuk membuka kunci peti harta karun dan memenangi misi kumpulan.',
    bullets: [
      '5 Senario Escape Room Lengkap (Makmal Sains, Ekspedisi Sejarah, Pulau Matematik)',
      'Papan Permainan (Board Game) boleh cetak saiz A3/A4 untuk aktiviti meja kumpulan',
      'Panduan fasilitator guru langkah demi langkah',
    ],
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

  if (!isOpen) return null;

  const pages = tab === 'magis-pdf' ? MAGIS_PDF_PAGES : GAMIFIKASI_PDF_PAGES;
  const safeIdx = Math.min(pageIdx, pages.length - 1);
  const current = pages[safeIdx];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85"
      role="dialog"
      aria-modal="true"
      aria-labelledby="module-modal-title"
    >
      <div className="relative w-full max-w-4xl rounded-3xl bg-[#0F172A] border-2 border-sky-400/40 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 bg-gradient-to-r from-sky-950 via-slate-900 to-emerald-950 border-b border-sky-400/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-400 to-emerald-500 flex items-center justify-center shadow-md">
              <BookOpen className="w-6 h-6 text-slate-950" />
            </div>
            <div>
              <h2 id="module-modal-title" className="text-lg sm:text-xl font-extrabold text-white">
                PRATONTON ISI KANDUNGAN MODUL PDF CIKGU WAN
              </h2>
              <p className="text-xs text-sky-300">
                Panduan Langkah Demi Langkah Mengikut Standard Pembelajaran KPM
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setTab('magis-pdf');
                setPageIdx(0);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                tab === 'magis-pdf'
                  ? 'bg-sky-500 text-slate-950'
                  : 'bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              Modul Magis AI PDF
            </button>
            <button
              type="button"
              onClick={() => {
                setTab('gamifikasi-pdf');
                setPageIdx(0);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                tab === 'gamifikasi-pdf'
                  ? 'bg-emerald-500 text-slate-950'
                  : 'bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              Modul Gamifikasi PDF
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Tutup pratonton modul"
              className="p-2 rounded-xl bg-slate-800 hover:bg-rose-600 text-slate-200 hover:text-white border border-slate-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          <div className="rounded-2xl bg-slate-900/95 border border-sky-500/30 p-6 space-y-4">
            <div className="flex items-center justify-between text-xs font-bold text-amber-300">
              <span className="flex items-center gap-1.5">
                <FileText className="w-4 h-4" />
                {current.page}
              </span>
              <span className="tabular-nums">
                Bahagian {safeIdx + 1} / {pages.length}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-extrabold text-white">
              {current.title}
            </h3>

            <p className="text-sm text-slate-200 leading-relaxed">
              {current.summary}
            </p>

            <div className="pt-2 space-y-2.5">
              <div className="text-xs font-bold text-sky-300">
                APA YANG CIKGU AKAN PELAJARI & DAPAT:
              </div>
              {current.bullets.map((b) => (
                <div key={b} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{b}</span>
                </div>
              ))}
            </div>

            {/* Page Flipper Controls */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setPageIdx((i) => (i - 1 + pages.length) % pages.length)}
                className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white flex items-center gap-1.5"
              >
                <ChevronLeft className="w-4 h-4" />
                Bab Sebelumnya
              </button>

              <button
                type="button"
                onClick={() => setPageIdx((i) => (i + 1) % pages.length)}
                className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white flex items-center gap-1.5"
              >
                Bab Seterusnya
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="rounded-2xl bg-gradient-to-r from-amber-500/20 via-slate-900 to-sky-500/20 border border-amber-400/40 p-4 flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="text-sm font-extrabold text-white flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-400" />
                Kedua-dua Modul PDF Ini Termasuk Dalam Pakej 4-Dalam-1 (RM 30.00)!
              </div>
              <p className="text-xs text-slate-300">
                Dihantar terus ke emel anda sebaik sahaja pembayaran Touch 'n Go eWallet disahkan.
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenCheckout();
              }}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-extrabold text-xs sm:text-sm shadow-lg whitespace-nowrap shrink-0"
            >
              Dapatkan Semua Sekarang (RM 30) →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
