import React, { useState } from 'react';
import {
  CheckCircle2,
  CreditCard,
  Download,
  ExternalLink,
  Gift,
  Mail,
  ShieldCheck,
  Sparkles,
  UserCheck,
  X,
  Zap,
} from 'lucide-react';
import {
  calculateOrderSummary,
  CheckoutFormInput,
  DeliveryReceipt,
  generateDeliveryReceipt,
  validateCheckoutForm,
} from '../utils/magisLogic';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPaymentSuccess: (receipt: DeliveryReceipt) => void;
  existingReceipt: DeliveryReceipt | null;
  onLaunchTennis: () => void;
  onLaunchPrompter: () => void;
  onLaunchModulePreview: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  onPaymentSuccess,
  existingReceipt,
  onLaunchTennis,
  onLaunchPrompter,
  onLaunchModulePreview,
}) => {
  const [step, setStep] = useState<'details' | 'tng-pay' | 'delivered'>(
    existingReceipt ? 'delivered' : 'details'
  );
  const [form, setForm] = useState<CheckoutFormInput>({
    fullName: '',
    email: '',
    phone: '',
    schoolName: '',
    tngReference: '',
    quantity: 1,
  });
  const [promoCode, setPromoCode] = useState('');
  const [errors, setErrors] = useState<{
    fullName?: string;
    email?: string;
    phone?: string;
    tngReference?: string;
  }>({});
  const [receipt, setReceipt] = useState<DeliveryReceipt | null>(existingReceipt);
  const [downloadedItem, setDownloadedItem] = useState<string | null>(null);

  if (!isOpen) return null;

  const summary = calculateOrderSummary(form.quantity, promoCode);

  const handleProceedToTng = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateCheckoutForm(form, false);
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }
    setErrors({});
    setStep('tng-pay');
  };

  const handleConfirmTngPayment = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateCheckoutForm(form, true);
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }
    setErrors({});
    const generated = generateDeliveryReceipt(form);
    setReceipt(generated);
    onPaymentSuccess(generated);
    setStep('delivered');
  };

  const handleDownloadPrintableGuide = (itemTitle: string) => {
    setDownloadedItem(itemTitle);
    const activeReceipt = receipt;
    if (!activeReceipt) return;

    const content = [
      `===================================================================`,
      `PAKEJ MODUL MAGIS AI CIKGU WAN (4-DALAM-1) — SIJIL & AKSES RASMI`,
      `===================================================================`,
      `No. Pesanan: ${activeReceipt.orderId}`,
      `Nama Pembeli: ${activeReceipt.buyerName}`,
      `Emel Rasmi: ${activeReceipt.buyerEmail}`,
      `Sekolah / Institusi: ${activeReceipt.schoolName}`,
      `Status Bayaran: DISAHKAN (${activeReceipt.paidAmountFormatted} melalui Touch 'n Go eWallet)`,
      `No. Rujukan TnG: ${activeReceipt.tngRef}`,
      ``,
      `PAUTAN & AKSES MODUL ANDA:`,
      ...activeReceipt.entitlements.map(
        (ent, idx) =>
          `${idx + 1}. ${ent.title}\n   Format: ${ent.format}\n   Kod Akses: ${ent.accessCode}\n   Keterangan: ${ent.description}\n`
      ),
      `Terima kasih kerana menyokong inovasi pendidikan Magis AI Cikgu Wan!`,
    ].join('\n');

    try {
      const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Akses-Magis-AI-${activeReceipt.orderId}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      // Fallback handled via UI notification
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85"
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkout-modal-title"
    >
      <div className="relative w-full max-w-4xl rounded-3xl bg-[#0F172A] border-2 border-amber-400/50 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        {/* Top Bar */}
        <div className="flex items-center justify-between gap-4 px-6 py-4 bg-gradient-to-r from-blue-950 via-slate-900 to-amber-950/70 border-b border-amber-400/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center shadow-md">
              <Gift className="w-6 h-6 text-slate-950" />
            </div>
            <div>
              <h2 id="checkout-modal-title" className="text-lg sm:text-xl font-extrabold text-white">
                {step === 'delivered'
                  ? 'TAHNIAH! PAKEJ MAGIS AI TELAH DIHANTAR KE EMEL ANDA'
                  : 'KAUNTER EKSPRES PAKEJ 4-DALAM-1 MAGIS AI CIKGU WAN'}
              </h2>
              <p className="text-xs text-amber-300">
                Pembayaran Pantas Touch &apos;n Go eWallet · Penghantaran Automatik Segera Ke Emel
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup tetingkap pembayaran"
            className="p-2 rounded-xl bg-slate-800 hover:bg-rose-600 text-slate-200 hover:text-white border border-slate-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Indicator */}
        <div className="px-6 py-2.5 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between text-xs font-bold">
          <div className={step === 'details' ? 'text-amber-300' : 'text-emerald-400'}>
            1. Maklumat Emel Pembeli
          </div>
          <span className="text-slate-600">→</span>
          <div
            className={
              step === 'tng-pay'
                ? 'text-amber-300'
                : step === 'delivered'
                ? 'text-emerald-400'
                : 'text-slate-400'
            }
          >
            2. Imbas Touch &apos;n Go eWallet (RM 30.00)
          </div>
          <span className="text-slate-600">→</span>
          <div className={step === 'delivered' ? 'text-amber-300' : 'text-slate-400'}>
            3. Emel & Akses Segera Dibuka!
          </div>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6 overflow-y-auto">
          {step === 'details' && (
            <form onSubmit={handleProceedToTng} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Form Fields */}
              <div className="lg:col-span-7 space-y-4">
                <div>
                  <label htmlFor="buyer-name" className="block text-xs font-bold text-slate-200 mb-1">
                    Nama Penuh Cikgu / Pembeli *
                  </label>
                  <input
                    id="buyer-name"
                    type="text"
                    placeholder="Contoh: Cikgu Nurul Izzah binti Ahmad"
                    value={form.fullName}
                    onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                  {errors.fullName && (
                    <p role="alert" className="text-xs text-rose-400 mt-1 font-semibold">
                      {errors.fullName}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="buyer-email" className="block text-xs font-bold text-slate-200 mb-1">
                    Alamat Emel (Untuk Penghantaran Modul PDF & Pautan 3D) *
                  </label>
                  <input
                    id="buyer-email"
                    type="email"
                    placeholder="Contoh: cikgunurul@moe.edu.my atau gmail.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                  {errors.email && (
                    <p role="alert" className="text-xs text-rose-400 mt-1 font-semibold">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="buyer-phone" className="block text-xs font-bold text-slate-200 mb-1">
                      No. Telefon WhatsApp *
                    </label>
                    <input
                      id="buyer-phone"
                      type="tel"
                      placeholder="Contoh: 0123456789"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-amber-400"
                    />
                    {errors.phone && (
                      <p role="alert" className="text-xs text-rose-400 mt-1 font-semibold">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="buyer-school" className="block text-xs font-bold text-slate-200 mb-1">
                      Nama Sekolah / Institusi (Pilihan)
                    </label>
                    <input
                      id="buyer-school"
                      type="text"
                      placeholder="Contoh: SK Putrajaya Presint 9"
                      value={form.schoolName}
                      onChange={(e) => setForm({ ...form, schoolName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div>
                    <label htmlFor="buyer-qty" className="block text-xs font-bold text-slate-300 mb-1">
                      Bilangan Lesen Pakej
                    </label>
                    <input
                      id="buyer-qty"
                      type="number"
                      min={1}
                      max={50}
                      value={form.quantity}
                      onChange={(e) =>
                        setForm({ ...form, quantity: Math.max(1, Number(e.target.value) || 1) })
                      }
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white tabular-nums"
                    />
                  </div>

                  <div>
                    <label htmlFor="buyer-promo" className="block text-xs font-bold text-slate-300 mb-1">
                      Kod Promosi (Pilihan)
                    </label>
                    <input
                      id="buyer-promo"
                      type="text"
                      placeholder="Contoh: CIKGUWAN5"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white uppercase"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 font-extrabold text-sm shadow-xl hover:brightness-105 transition flex items-center justify-center gap-2"
                  >
                    <CreditCard className="w-5 h-5" />
                    Teruskan Ke Bayaran Touch &apos;n Go eWallet ({summary.formattedTotal}) →
                  </button>
                </div>
              </div>

              {/* Right Order Summary Box */}
              <div className="lg:col-span-5 rounded-2xl bg-slate-900/95 border border-amber-400/30 p-5 space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="text-xs font-extrabold text-amber-300">
                    RINGKASAN PAKEJ HEBAT MAGIS AI CIKGU WAN
                  </div>
                  <ul className="space-y-2 text-xs text-slate-200">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Modul Magis AI Cikgu Wan (Langkah Demi Langkah PDF)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Modul Gamifikasi Magis AI PDF (Escape Room & Kuiz)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>PERCUMA Permainan 3D Gelanggang Tenis Cikgu Wan</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Aplikasi Magis Prompter Permainan AI (Akses 1 Tahun)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                      <span className="font-bold text-amber-200">
                        Sesi Bengkel Hands-On 2 Jam (31 Okt 2026, 8:30 Malam · Google Meet)
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span className="font-bold text-emerald-200">
                        Group Sokongan WhatsApp (Bantuan Coaching One-to-One)
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="pt-4 border-t border-slate-800 space-y-1.5 text-xs">
                  <div className="flex justify-between text-slate-300">
                    <span>Harga Pakej ({summary.quantity}x Lesen)</span>
                    <span className="font-mono tabular-nums">RM {summary.subtotalRM.toFixed(2)}</span>
                  </div>
                  {summary.discountRM > 0 && (
                    <div className="flex justify-between text-emerald-400 font-semibold">
                      <span>Diskaun Kod Promosi</span>
                      <span className="font-mono tabular-nums">- RM {summary.discountRM.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-base font-extrabold text-amber-300 pt-2 border-t border-slate-800">
                    <span>Jumlah Bayaran</span>
                    <span className="font-mono tabular-nums">{summary.formattedTotal}</span>
                  </div>
                </div>
              </div>
            </form>
          )}

          {step === 'tng-pay' && (
            <form onSubmit={handleConfirmTngPayment} className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* Left: Interactive Touch 'n Go eWallet QR Card */}
              <div className="lg:col-span-6 rounded-2xl bg-gradient-to-b from-blue-700 via-blue-800 to-blue-950 border-2 border-sky-300/60 p-6 text-center space-y-4 shadow-xl">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-xl bg-white text-blue-900 font-extrabold text-sm shadow">
                  <span>Touch &apos;n Go eWallet</span>
                </div>

                <h3 className="text-lg font-extrabold text-white">
                  Imbas Kod QR Rasmi Cikgu Wan
                </h3>

                {/* Stylized High-Contrast QR Box */}
                <div className="mx-auto w-48 h-48 rounded-2xl bg-white p-3 shadow-inner flex flex-col items-center justify-center">
                  <svg viewBox="0 0 120 120" className="w-full h-full">
                    <rect width="120" height="120" fill="#ffffff" />
                    <rect x="10" y="10" width="32" height="32" fill="none" stroke="#1e3a8a" strokeWidth="6" />
                    <rect x="20" y="20" width="12" height="12" fill="#1e3a8a" />
                    <rect x="78" y="10" width="32" height="32" fill="none" stroke="#1e3a8a" strokeWidth="6" />
                    <rect x="88" y="20" width="12" height="12" fill="#1e3a8a" />
                    <rect x="10" y="78" width="32" height="32" fill="none" stroke="#1e3a8a" strokeWidth="6" />
                    <rect x="20" y="88" width="12" height="12" fill="#1e3a8a" />
                    <rect x="50" y="16" width="8" height="8" fill="#0284c7" />
                    <rect x="50" y="32" width="16" height="8" fill="#1e3a8a" />
                    <rect x="46" y="48" width="28" height="24" rx="4" fill="#f59e0b" />
                    <text x="60" y="63" textAnchor="middle" fill="#0f172a" fontSize="9" fontWeight="bold">
                      RM30
                    </text>
                    <rect x="16" y="52" width="20" height="8" fill="#1e3a8a" />
                    <rect x="82" y="52" width="22" height="10" fill="#0284c7" />
                    <rect x="52" y="82" width="12" height="24" fill="#1e3a8a" />
                    <rect x="74" y="80" width="32" height="12" fill="#1e3a8a" />
                    <rect x="74" y="98" width="18" height="12" fill="#0284c7" />
                  </svg>
                </div>

                <div className="text-xs text-sky-100 space-y-1">
                  <div className="font-extrabold text-amber-300 text-base tabular-nums">
                    Jumlah: {summary.formattedTotal}
                  </div>
                  <div>Penerima: MAGIS AI ENTERPRISE (CIKGU WAN)</div>
                </div>
              </div>

              {/* Right: Payment Verification & Instant Auto-Delivery Trigger */}
              <div className="lg:col-span-6 space-y-4">
                <div className="rounded-2xl bg-slate-900 border border-slate-800 p-4 space-y-2 text-xs text-slate-300">
                  <div className="font-bold text-white flex items-center gap-2">
                    <Mail className="w-4 h-4 text-sky-400" />
                    Emel Penerima: <span className="text-amber-300">{form.email}</span>
                  </div>
                  <p>
                    Sebaik sahaja anda mengesahkan bayaran di bawah, sistem akan menghantar kesemua 4 item pakej terus ke emel anda dan membuka akses serta-merta!
                  </p>
                </div>

                <div>
                  <label htmlFor="tng-ref-input" className="block text-xs font-bold text-slate-200 mb-1">
                    Masukkan 4 Digit Terakhir Rujukan Resit Touch &apos;n Go eWallet *
                  </label>
                  <div className="flex gap-2">
                    <input
                      id="tng-ref-input"
                      type="text"
                      placeholder="Contoh: 8829 atau TNG-9012"
                      value={form.tngReference}
                      onChange={(e) => setForm({ ...form, tngReference: e.target.value })}
                      className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white font-mono focus:outline-none focus:border-amber-400"
                    />
                    <button
                      type="button"
                      onClick={() => setForm({ ...form, tngReference: 'TNG8899' })}
                      className="px-3 py-2 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 border border-sky-400/40 text-sky-300 text-xs font-bold whitespace-nowrap shrink-0"
                    >
                      Isi Kod Demo
                    </button>
                  </div>
                  {errors.tngReference && (
                    <p role="alert" className="text-xs text-rose-400 mt-1 font-semibold">
                      {errors.tngReference}
                    </p>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setStep('details')}
                    className="px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold"
                  >
                    ← Kemas Kini Maklumat
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3.5 px-5 rounded-xl bg-gradient-to-r from-emerald-400 via-teal-400 to-sky-400 text-slate-950 font-extrabold text-sm shadow-xl hover:brightness-105 transition flex items-center justify-center gap-2"
                  >
                    <Zap className="w-5 h-5" />
                    Sahkan Bayaran & Hantar Ke Emel Sekarang!
                  </button>
                </div>
              </div>
            </form>
          )}

          {step === 'delivered' && receipt && (
            <div className="space-y-6" data-testid="delivery-success-view">
              {/* Celebratory Email Sent Banner */}
              <div className="rounded-2xl bg-gradient-to-r from-emerald-950 via-teal-950 to-slate-900 border-2 border-emerald-400/60 p-5 flex flex-wrap items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="text-xs font-extrabold text-emerald-300 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4" />
                    PEMBAYARAN TOUCH &apos;N GO EWALLET BERJAYA DISAHKAN ({receipt.orderId})
                  </div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-white">
                    Emel Rasmi Telah Dihantar Ke: <span className="text-amber-300">{receipt.buyerEmail}</span>
                  </h3>
                  <p className="text-xs text-slate-200">
                    Tahniah <strong>{receipt.buyerName}</strong>! Anda juga boleh terus membuka dan memuat turun kesemua modul & pautan eksklusif anda di bawah sekarang:
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleDownloadPrintableGuide('Sijil & Pautan Penuh')}
                  className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs flex items-center gap-1.5 shadow-lg whitespace-nowrap shrink-0"
                >
                  <Download className="w-4 h-4" />
                  Muat Turun Salinan Resit & Pautan (.TXT)
                </button>
              </div>

              {downloadedItem && (
                <div
                  role="status"
                  className="p-3 rounded-xl bg-sky-950/90 border border-sky-400/50 text-xs text-sky-200 font-semibold"
                >
                  Fail akses untuk <strong>{downloadedItem}</strong> telah dijana dan dimuat turun ke peranti anda!
                </div>
              )}

              {/* 5 Unlocked Digital Entitlements */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {receipt.entitlements.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-2xl bg-slate-900/95 border border-slate-700/80 p-4 flex flex-col justify-between space-y-3"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs text-amber-300 font-mono">
                        <span>{item.format}</span>
                        <span>Kod: {item.accessCode}</span>
                      </div>
                      <h4 className="text-sm sm:text-base font-extrabold text-white">
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <div className="pt-2 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          if (item.id === 'gelanggang-tenis-3d') {
                            onClose();
                            onLaunchTennis();
                          } else if (item.id === 'prompter-magis-ai') {
                            onClose();
                            onLaunchPrompter();
                          } else if (
                            item.id === 'modul-magis-pdf' ||
                            item.id === 'modul-gamifikasi-pdf'
                          ) {
                            onClose();
                            onLaunchModulePreview();
                          } else {
                            handleDownloadPrintableGuide(item.title);
                          }
                        }}
                        className="flex-1 py-2 px-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-1.5 transition"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        {item.actionLabel}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDownloadPrintableGuide(item.title)}
                        aria-label={`Muat turun ${item.title}`}
                        className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
