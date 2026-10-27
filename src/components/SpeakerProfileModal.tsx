import React, { useState } from 'react';
import {
  Award,
  Calendar,
  CheckCircle2,
  Copy,
  Check,
  ExternalLink,
  Globe,
  MapPin,
  MessageCircle,
  Sparkles,
  Star,
  Video,
  X,
} from 'lucide-react';
import { CroppedArt } from './CroppedArt';
import { SPEAKER_PROFILE_DATA } from '../utils/magisLogic';

interface SpeakerProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenCheckout: () => void;
}

export const SpeakerProfileModal: React.FC<SpeakerProfileModalProps> = ({
  isOpen,
  onClose,
  onOpenCheckout,
}) => {
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, glareX: 50, glareY: 50 });
  const [copiedUrl, setCopiedUrl] = useState(false);

  if (!isOpen) return null;

  const handleCopyDirectoryUrl = () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(SPEAKER_PROFILE_DATA.directoryUrl).catch(() => {});
    }
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2500);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/90"
      role="dialog"
      aria-modal="true"
      aria-labelledby="speaker-profile-title"
    >
      <div className="relative w-full max-w-5xl rounded-3xl bg-[#0B122C] border-2 border-amber-400/60 shadow-[0_0_90px_rgba(56,189,248,0.45)] overflow-hidden max-h-[92vh] flex flex-col">
        {/* Top Holographic Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 bg-gradient-to-r from-indigo-950 via-blue-950 to-amber-950/80 border-b border-amber-400/40">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-400 via-yellow-300 to-sky-400 flex items-center justify-center shadow-lg">
              <Award className="w-6 h-6 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-black tracking-wider text-amber-300 uppercase">
                  GOOGLE FOR EDUCATION DIRECTORY · PROFIL RASMI PENCERAMAH
                </span>
              </div>
              <h2
                id="speaker-profile-title"
                className="text-lg sm:text-2xl font-black text-white tracking-tight"
              >
                {SPEAKER_PROFILE_DATA.fullName} ({SPEAKER_PROFILE_DATA.popularName})
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup profil penceramah"
            className="p-2 rounded-xl bg-slate-800 hover:bg-rose-600 text-slate-200 hover:text-white border border-slate-700 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* LEFT: Mindblowing 3D Interactive Holographic Collector Card of Cikgu Wan */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const px = (e.clientX - rect.left) / rect.width;
                  const py = (e.clientY - rect.top) / rect.height;
                  setTilt({
                    rx: (0.5 - py) * 16,
                    ry: (px - 0.5) * 16,
                    glareX: px * 100,
                    glareY: py * 100,
                  });
                }}
                onMouseLeave={() => setTilt({ rx: 0, ry: 0, glareX: 50, glareY: 50 })}
                style={{
                  transform: `perspective(900px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
                  transition: 'transform 150ms cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                className="relative rounded-3xl bg-gradient-to-b from-sky-900 via-indigo-950 to-slate-950 border-2 border-amber-300/80 p-4 shadow-[0_0_50px_rgba(251,191,36,0.3)] overflow-hidden h-full flex flex-col justify-between"
              >
                {/* Rainbow Holographic Foil Light Glare */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-35"
                  style={{
                    background: `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(253,224,71,0.55), rgba(56,189,248,0.35) 35%, rgba(244,114,182,0.25) 60%, transparent 80%)`,
                  }}
                />

                {/* Top Verified Badge Row */}
                <div className="relative z-10 flex items-center justify-between text-xs font-extrabold">
                  <span className="text-amber-300 flex items-center gap-1">
                    <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
                    GOOGLE CERTIFIED TRAINER
                  </span>
                  <span className="text-sky-300 font-mono">ID #4797697018560512</span>
                </div>

                {/* 3D Character Portrait Crop with Live Blinking Eyes */}
                <div className="relative z-10 my-3 rounded-2xl overflow-hidden border-2 border-sky-300/50 shadow-xl">
                  <CroppedArt
                    x={0.5}
                    y={14.5}
                    w={22.5}
                    h={47.5}
                    alt="Potret 3D Cikgu Wan — Muhammad Syazwan Bin Samsol Kahar"
                    className="w-full"
                  />
                  {/* Live Blinking Left Eyelid inside Portrait Crop */}
                  <div
                    aria-hidden="true"
                    className="animate-cikgu-blink absolute left-[20.2%] top-[31.6%] w-[10.2%] h-[5.9%] -rotate-[9deg] rounded-full bg-gradient-to-b from-[#d99b72] via-[#e8b088] to-[#c6865e] border-b-2 border-[#3b2316] pointer-events-none"
                  />
                  {/* Live Blinking Right Eyelid inside Portrait Crop */}
                  <div
                    aria-hidden="true"
                    className="animate-cikgu-blink absolute left-[38.9%] top-[28.4%] w-[10.9%] h-[6.1%] -rotate-[9deg] rounded-full bg-gradient-to-b from-[#d99b72] via-[#e8b088] to-[#c6865e] border-b-2 border-[#3b2316] pointer-events-none"
                  />
                </div>

                {/* Location & Official Directory Link */}
                <div className="relative z-10 space-y-2.5">
                  <div className="flex items-center justify-between text-xs text-sky-200">
                    <span className="flex items-center gap-1 font-bold">
                      <MapPin className="w-3.5 h-3.5 text-amber-400" />
                      {SPEAKER_PROFILE_DATA.location}
                    </span>
                    <span className="text-emerald-300 font-extrabold">★ Guru Pakar Digital</span>
                  </div>

                  {/* Direct Clickable Link + Copy Button to Google Edu Directory */}
                  <div className="p-2.5 rounded-2xl bg-slate-950/90 border border-sky-400/40 space-y-2">
                    <div className="text-[11px] font-bold text-slate-300 truncate">
                      {SPEAKER_PROFILE_DATA.directoryUrl}
                    </div>
                    <div className="flex items-center gap-2">
                      <a
                        href={SPEAKER_PROFILE_DATA.directoryUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-300 hover:to-blue-400 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 shadow"
                      >
                        <Globe className="w-3.5 h-3.5" />
                        <span>Buka Profil Rasmi Google</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>

                      <button
                        type="button"
                        onClick={handleCopyDirectoryUrl}
                        className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold text-xs flex items-center gap-1 border border-slate-700"
                      >
                        {copiedUrl ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedUrl ? 'Disalin' : 'Salin'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT: Credentials, Live Workshop (31 Oct 2026, 8:30 PM Google Meet) & 1-to-1 WhatsApp Coaching */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
              {/* Highlighted Live Workshop & WhatsApp Coaching Card */}
              <div className="rounded-2xl bg-gradient-to-r from-amber-500/20 via-indigo-950 to-emerald-950/80 border-2 border-amber-400/70 p-4 space-y-3 shadow-lg">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-black text-amber-300 flex items-center gap-1.5">
                    <Video className="w-4 h-4 text-amber-400" />
                    TERMASUK DALAM PAKEJ RM30 · SESI EKSKLUSIF BERSAMA CIKGU WAN
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-black text-white">
                  {SPEAKER_PROFILE_DATA.workshopInfo.title}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-950/85 border border-sky-400/40 flex items-start gap-2.5">
                    <Calendar className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-extrabold text-white">
                        {SPEAKER_PROFILE_DATA.workshopInfo.date} · {SPEAKER_PROFILE_DATA.workshopInfo.time}
                      </div>
                      <div className="text-sky-300">
                        Platform: {SPEAKER_PROFILE_DATA.workshopInfo.platform}
                      </div>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-950/85 border border-emerald-400/40 flex items-start gap-2.5">
                    <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-extrabold text-white">
                        Group Sokongan WhatsApp VIP
                      </div>
                      <div className="text-emerald-300">
                        Bantuan Coaching One-to-One Terus Bersama Cikgu Wan
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Official Certifications & Roles from Google Edu Directory */}
              <div className="rounded-2xl bg-slate-900/95 border border-slate-800 p-4 space-y-2.5">
                <div className="text-xs font-extrabold text-sky-300">
                  PENTAULIAHAN & PERANAN KEPIMPINAN PENDIDIKAN DIGITAL:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {SPEAKER_PROFILE_DATA.certifications.map((cert) => (
                    <div
                      key={cert}
                      className="flex items-start gap-2 text-xs text-slate-200 font-semibold"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{cert}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Areas of Expertise */}
              <div className="rounded-2xl bg-slate-900/95 border border-slate-800 p-4 space-y-2">
                <div className="text-xs font-extrabold text-amber-300">
                  KEPAKARAN UTAMA (GOOGLE DIRECTORY):
                </div>
                <p className="text-xs text-slate-200 leading-relaxed font-medium">
                  {SPEAKER_PROFILE_DATA.expertise.join(' · ')}
                </p>
              </div>
            </div>
          </div>

          {/* Verified Recommendations from Google for Education Directory */}
          <div className="space-y-3">
            <div className="text-xs font-extrabold text-sky-300 flex items-center gap-1.5">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>
                CADANGAN & PENGIKTIRAFAN RASMI (SUMBER: GOOGLE FOR EDUCATION DIRECTORY)
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {SPEAKER_PROFILE_DATA.endorsements.map((item) => (
                <div
                  key={item.name}
                  className="rounded-2xl bg-slate-900/95 border border-slate-800 p-4 space-y-2"
                >
                  <p className="text-xs text-slate-200 leading-relaxed italic">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                  <div className="text-xs font-extrabold text-amber-300">
                    {item.name}
                  </div>
                  <div className="text-[11px] text-slate-400">{item.role}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Call-to-Action */}
          <div className="rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 p-4 text-slate-950 flex flex-wrap items-center justify-between gap-4 shadow-xl">
            <div>
              <div className="text-sm sm:text-base font-black">
                Sertai Bengkel Hands-On 2 Jam (31 Okt 2026, 8:30 Malam) + Coaching 1-to-1!
              </div>
              <div className="text-xs font-bold text-slate-900">
                Semua termasuk dalam Pakej Lengkap RM 30.00 (Modul PDF + Game 3D + Prompter AI + Google Meet + WhatsApp Coaching).
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenCheckout();
              }}
              className="px-5 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-900 text-amber-300 font-black text-xs sm:text-sm shadow-lg whitespace-nowrap shrink-0"
            >
              Tempah Pakej RM30 Sekarang →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
