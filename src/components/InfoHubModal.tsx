import React, { useState } from 'react';
import {
  BookOpen,
  CheckCircle2,
  Compass,
  Gamepad2,
  Mail,
  MessageSquare,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  Wand2,
  X,
} from 'lucide-react';

export type InfoHubTab = 'komuniti' | 'panduan' | 'carian';

interface InfoHubModalProps {
  isOpen: boolean;
  initialTab: InfoHubTab;
  onClose: () => void;
  onOpenModul: (tab: 'magis-pdf' | 'gamifikasi-pdf') => void;
  onOpenTennis: () => void;
  onOpenPrompter: () => void;
  onOpenCheckout: () => void;
}

const SEARCHABLE_ITEMS = [
  {
    title: 'Modul Magis AI Cikgu Wan (PDF Langkah Demi Langkah)',
    category: 'Modul PDF',
    keywords: 'rph rpt soalan bbm aktiviti latihan dskp modul pdf',
    desc: 'Panduan lengkap 84 muka surat membina RPH, RPT, Soalan & BBM mengikut Standard Pembelajaran KPM.',
    actionType: 'modul-magis' as const,
  },
  {
    title: 'Modul Gamifikasi Magis AI PDF (Escape Room & Kuiz)',
    category: 'Gamifikasi PDF',
    keywords: 'kuiz interaktif kad permainan escape room board game kumpulan semua subjek',
    desc: 'Set templat Kuiz Interaktif, Kad Permainan, Escape Room & Board Game untuk semua subjek.',
    actionType: 'modul-gami' as const,
  },
  {
    title: 'Gelanggang Tenis Cikgu Wan 3D (Kawalan Tangan AI)',
    category: 'Permainan 3D',
    keywords: 'tenis 3d sukan wii sport hand gesture kamera web solo multiplayer kuiz',
    desc: 'Permainan sukan 3D interaktif menggunakan gerakan tangan dengan Mod Latihan, Pertandingan & Kuiz DSKP.',
    actionType: 'tennis' as const,
  },
  {
    title: 'Prompter Magis AI (1-Klik Copy ke Gemini, Claude & ChatGPT)',
    category: 'Aplikasi AI',
    keywords: 'prompter gemini claude chatgpt prompt ai analisis idea pdp',
    desc: 'Aplikasi penjana prompt pintar siap guna untuk disalin terus ke Gemini, Claude dan ChatGPT.',
    actionType: 'prompter' as const,
  },
  {
    title: 'Pakej Hebat 4-Dalam-1 (RM 30.00 · Touch n Go eWallet)',
    category: 'Pakej Istimewa',
    keywords: 'pakej rm30 touch n go tng ewallet beli sekarang emel support group',
    desc: 'Dapatkan kesemua 4 item + Support Group Eksklusif selama 1 tahun penuh dengan penghantaran emel segera.',
    actionType: 'checkout' as const,
  },
];

export const InfoHubModal: React.FC<InfoHubModalProps> = ({
  isOpen,
  initialTab,
  onClose,
  onOpenModul,
  onOpenTennis,
  onOpenPrompter,
  onOpenCheckout,
}) => {
  const [tab, setTab] = useState<InfoHubTab>(initialTab);
  const [searchQuery, setSearchQuery] = useState('');

  React.useEffect(() => {
    setTab(initialTab);
  }, [initialTab, isOpen]);

  if (!isOpen) return null;

  const filteredItems = SEARCHABLE_ITEMS.filter((item) => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return true;
    return (
      item.title.toLowerCase().includes(q) ||
      item.keywords.includes(q) ||
      item.desc.toLowerCase().includes(q)
    );
  });

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85"
      role="dialog"
      aria-modal="true"
      aria-labelledby="info-hub-title"
    >
      <div className="relative w-full max-w-4xl rounded-3xl bg-[#0F172A] border-2 border-sky-400/50 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Top Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 bg-gradient-to-r from-sky-950 via-slate-900 to-indigo-950 border-b border-sky-400/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center shadow-md">
              <Compass className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 id="info-hub-title" className="text-lg sm:text-xl font-extrabold text-white">
                PUSAT KOMUNITI, PANDUAN & CARIAN MAGIS AI
              </h2>
              <p className="text-xs text-sky-300">
                Dikembangkan oleh Cikgu Wan · Sokongan Penuh Semua Tahun & Subjek
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setTab('komuniti')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                tab === 'komuniti'
                  ? 'bg-sky-500 text-slate-950'
                  : 'bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              Komuniti Guru
            </button>
            <button
              type="button"
              onClick={() => setTab('panduan')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                tab === 'panduan'
                  ? 'bg-amber-400 text-slate-950'
                  : 'bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              Panduan Akses
            </button>
            <button
              type="button"
              onClick={() => setTab('carian')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                tab === 'carian'
                  ? 'bg-emerald-400 text-slate-950'
                  : 'bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              Carian Pantas
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Tutup tetingkap"
              className="p-2 rounded-xl bg-slate-800 hover:bg-rose-600 text-slate-200 hover:text-white border border-slate-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          {tab === 'komuniti' && (
            <div className="space-y-5">
              <div className="rounded-2xl bg-gradient-to-r from-indigo-950 via-slate-900 to-sky-950 border border-sky-400/30 p-5 flex flex-wrap items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="text-xs font-extrabold text-amber-300 flex items-center gap-1.5">
                    <Users className="w-4 h-4" />
                    PLATFORM KOMUNITI SOKONGAN GURU KREATIF MALAYSIA
                  </div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-white">
                    Lebih 2,400+ Guru Berkongsi Bahan PdP & Permainan 3D Setiap Minggu
                  </h3>
                  <p className="text-xs text-slate-300">
                    Pembeli Pakej 4-dalam-1 RM30 mendapat jemputan terus ke Support Group Eksklusif Cikgu Wan.
                  </p>
                </div>
                <div className="text-xs font-mono text-amber-300 bg-slate-950/80 px-3.5 py-2 rounded-xl border border-amber-400/30">
                  Penilaian Guru: 4.9 / 5.0
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="rounded-2xl bg-slate-900 border border-slate-800 p-4 space-y-2">
                  <p className="text-xs text-slate-200 leading-relaxed">
                    &ldquo;Murid kelas saya sangat teruja main Gelanggang Tenis 3D Cikgu Wan di Smartboard. Sambil hayun tangan pukul bola, mereka berebut jawab kuiz Sains!&rdquo;
                  </p>
                  <div className="text-xs font-bold text-sky-300">
                    Cikgu Haziq Rahman · SK Seksyen 7 Shah Alam
                  </div>
                </div>

                <div className="rounded-2xl bg-slate-900 border border-slate-800 p-4 space-y-2">
                  <p className="text-xs text-slate-200 leading-relaxed">
                    &ldquo;Prompter Magis AI sangat membantu! Pilih subjek dan klik Copy ke Gemini atau ChatGPT, terus siap bahan kuiz interaktif ikut DSKP.&rdquo;
                  </p>
                  <div className="text-xs font-bold text-emerald-300">
                    Cikgu Rohana Ismail · SK Taman Daya Johor Bahru
                  </div>
                </div>

                <div className="rounded-2xl bg-slate-900 border border-slate-800 p-4 space-y-2">
                  <p className="text-xs text-slate-200 leading-relaxed">
                    &ldquo;Bayar RM30 guna Touch &apos;n Go eWallet sangat lancar. Terus dapat emel mengandungi Modul PDF, pautan Game 3D dan Support Group!&rdquo;
                  </p>
                  <div className="text-xs font-bold text-amber-300">
                    Ustazah Siti Munirah · SMK Agama Kedah
                  </div>
                </div>
              </div>
            </div>
          )}

          {tab === 'panduan' && (
            <div className="space-y-4">
              <h3 className="text-lg font-extrabold text-white">
                Cara Pembelian & Penghantaran Segera Ke Emel (3 Langkah Mudah)
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="rounded-2xl bg-slate-900 border border-sky-400/30 p-4 space-y-2">
                  <div className="text-xs font-black text-sky-400">LANGKAH 01</div>
                  <div className="text-sm font-extrabold text-white">
                    Klik &ldquo;Beli Sekarang&rdquo; & Isi Emel
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Masukkan nama penuh, alamat emel aktif, dan nombor telefon WhatsApp anda pada borang pesanan.
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-900 border border-amber-400/30 p-4 space-y-2">
                  <div className="text-xs font-black text-amber-400">LANGKAH 02</div>
                  <div className="text-sm font-extrabold text-white">
                    Imbas Touch &apos;n Go eWallet (RM 30.00)
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Buat bayaran RM 30.00 (sah untuk 1 tahun) melalui kod QR Touch &apos;n Go eWallet Cikgu Wan dan masukkan rujukan resit.
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-900 border border-emerald-400/30 p-4 space-y-2">
                  <div className="text-xs font-black text-emerald-400">LANGKAH 03</div>
                  <div className="text-sm font-extrabold text-white">
                    Terima Emel & Akses Serta-Merta!
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Sistem menghantar Modul Magis AI PDF, Modul Gamifikasi PDF, Pautan Gelanggang Tenis 3D & Aplikasi Prompter terus ke emel anda!
                  </p>
                </div>
              </div>
            </div>
          )}

          {tab === 'carian' && (
            <div className="space-y-4">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder="Cari modul, RPH, Gelanggang Tenis 3D, Escape Room, atau Prompter..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-sky-400"
                />
              </div>

              <div className="space-y-2.5">
                {filteredItems.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl bg-slate-900 border border-slate-800 p-3.5 flex flex-wrap items-center justify-between gap-3"
                  >
                    <div className="space-y-0.5">
                      <div className="text-[11px] font-bold text-amber-300">{item.category}</div>
                      <div className="text-sm font-extrabold text-white">{item.title}</div>
                      <div className="text-xs text-slate-300">{item.desc}</div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        if (item.actionType === 'modul-magis') onOpenModul('magis-pdf');
                        else if (item.actionType === 'modul-gami') onOpenModul('gamifikasi-pdf');
                        else if (item.actionType === 'tennis') onOpenTennis();
                        else if (item.actionType === 'prompter') onOpenPrompter();
                        else onOpenCheckout();
                      }}
                      className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-extrabold text-xs whitespace-nowrap shrink-0"
                    >
                      Buka Sekarang →
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Footer CTA inside Modal */}
          <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-4">
            <span className="text-xs text-slate-300">
              Pakej 4-Dalam-1 · Hanya RM 30.00 (Sah untuk 1 tahun)
            </span>
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenCheckout();
              }}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-extrabold text-xs shadow-lg"
            >
              Beli Pakej 4-Dalam-1 Sekarang →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
