import React, { useEffect, useRef, useState } from 'react';
import {
  Play,
  Pause,
  Trophy,
  Sparkles,
  Hand,
  Volume2,
  VolumeX,
  RotateCcw,
  CheckCircle2,
  X,
  Gamepad2,
  Film,
} from 'lucide-react';
import { computeTennisRallyOutcome, TennisShotResult } from '../utils/magisLogic';

interface TennisGameModalProps {
  isOpen: boolean;
  initialMode?: 'trailer' | 'play';
  onClose: () => void;
  onOpenCheckout: () => void;
}

interface QuizQuestion {
  subject: string;
  standard: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const DSKP_QUIZ_POOL: QuizQuestion[] = [
  {
    subject: 'Sains Tahun 4',
    standard: 'SP 5.1.2 Sifat Cahaya',
    question: 'Apakah yang berlaku apabila cahaya bergerak melalui dua medium yang berbeza ketumpatan?',
    options: [
      'Cahaya dibiaskan (Pembiasan Cahaya)',
      'Cahaya hilang serta-merta',
      'Cahaya bertukar menjadi bunyi',
    ],
    correctIndex: 0,
    explanation: 'Tepat sekali! Cahaya membengkok (dibiaskan) apabila merentasi medium berbeza ketumpatan seperti udara ke air.',
  },
  {
    subject: 'Matematik Tahun 5',
    standard: 'SP 2.1.1 Pecahan & Peratus',
    question: 'Cikgu Wan memenangi 4 daripada 5 set perlawanan tenis. Berapakah peratus kemenangan tersebut?',
    options: ['60%', '80%', '95%'],
    correctIndex: 1,
    explanation: 'Padu! (4 ÷ 5) × 100% = 80% kemenangan di Gelanggang Cikgu Wan!',
  },
  {
    subject: 'Bahasa Melayu Tahun 6',
    standard: 'SP 5.1.4 Kata Kerja Aktif Transitif',
    question: 'Pilih ayat yang menggunakan Kata Kerja Aktif Transitif dengan betul:',
    options: [
      'Murid-murid sedang tidur di khemah.',
      'Cikgu Wan memukul bola tenis itu dengan deras.',
      'Bola tenis itu bergolek ke tepi padang.',
    ],
    correctIndex: 1,
    explanation: 'Tahniah! "Memukul" ialah kata kerja aktif transitif yang diikuti objek "bola tenis itu".',
  },
];

const TRAILER_SCENES = [
  {
    id: 0,
    tag: 'BABAK 01 · KAWALAN TANGAN AI (HAND-GESTURE)',
    title: 'Hayun Tangan Di Hadapan Kamera Laptop — Tanpa Alat Tambahan!',
    desc: 'Menggunakan teknologi pengesanan tangan kamera web (MediaPipe AI), murid hanya perlu menghayun tangan di udara seperti permainan sukan konsol untuk memukul bola tenis 3D di skrin atau Smartboard kelas.',
    highlight: 'Mesra Semua Laptop Guru, Chromebook & Papan Pintar Sekolah',
  },
  {
    id: 1,
    tag: 'BABAK 02 · KUIZ DSKP BILA MATA SERI (DEUCE)',
    title: 'Gabungan Sukan 3D + Soalan Standard Pembelajaran KPM',
    desc: 'Setiap kali murid berjaya melakukan pukulan Smash Magis atau memenangi rali, sistem memaparkan cabaran Kuiz Interaktif mengikut subjek (BM, BI, Sains, Matematik, Sejarah, Pendidikan Islam).',
    highlight: 'Soalan Boleh Diubah Suai 100% Ikut Tajuk Mengajar Cikgu',
  },
  {
    id: 2,
    tag: 'BABAK 03 · MODE SOLO & PERTANDINGAN KUMPULAN',
    title: 'Ubah Bilik Darjah Jadi Stadium Sukan Ilmu Yang Gamat!',
    desc: 'Sokongan Mode Latihan Kendiri dan Mode Pertandingan Antara Kumpulan lengkap dengan papan markah langsung, bunyi sorakan stadium, dan trofi pencapaian.',
    highlight: 'Mengatasi Masalah Murid Mengantuk & Kurang Fokus Dalam Kelas',
  },
];

export const TennisGameModal: React.FC<TennisGameModalProps> = ({
  isOpen,
  initialMode = 'play',
  onClose,
  onOpenCheckout,
}) => {
  const [activeTab, setActiveTab] = useState<'trailer' | 'play'>(initialMode);
  const [trailerScene, setTrailerScene] = useState(0);
  const [isTrailerPlaying, setIsTrailerPlaying] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [gestureSimulated, setGestureSimulated] = useState(true);

  // Tennis Mini-Game State
  const [playerScore, setPlayerScore] = useState(0);
  const [robotScore, setRobotScore] = useState(0);
  const [streakCount, setStreakCount] = useState(0);
  const [lastShotResult, setLastShotResult] = useState<TennisShotResult | null>(null);
  const [activeQuiz, setActiveQuiz] = useState<QuizQuestion | null>(null);
  const [quizFeedback, setQuizFeedback] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ballStateRef = useRef({
    x: 0.5,
    y: 0.25,
    z: 0.2,
    vx: 0.0035,
    vy: 0.0085,
    racketX: 0.5,
    swingAnim: 0,
    flashTimer: 0,
  });

  useEffect(() => {
    setActiveTab(initialMode);
  }, [initialMode, isOpen]);

  // Auto-advance trailer scenes
  useEffect(() => {
    if (!isOpen || activeTab !== 'trailer' || !isTrailerPlaying) return;
    const timer = setInterval(() => {
      setTrailerScene((prev) => (prev + 1) % TRAILER_SCENES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isOpen, activeTab, isTrailerPlaying]);

  // Procedural Web Audio sound effect helper
  const playSynthTone = (type: 'hit' | 'smash' | 'score' | 'miss') => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      const now = ctx.currentTime;
      if (type === 'smash') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(520, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.18);
        gain.gain.setValueAtTime(0.18, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
        osc.start(now);
        osc.stop(now + 0.22);
      } else if (type === 'hit') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(380, now);
        osc.frequency.exponentialRampToValueAtTime(540, now + 0.12);
        gain.gain.setValueAtTime(0.14, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
        osc.start(now);
        osc.stop(now + 0.14);
      } else if (type === 'score') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.setValueAtTime(660, now + 0.1);
        gain.gain.setValueAtTime(0.16, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
        osc.start(now);
        osc.stop(now + 0.28);
      } else {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(200, now);
        osc.frequency.exponentialRampToValueAtTime(110, now + 0.18);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
        osc.start(now);
        osc.stop(now + 0.2);
      }
    } catch {
      // Ignore audio errors if blocked by autoplay policy
    }
  };

  // Interactive 3D Perspective Tennis Court Loop
  useEffect(() => {
    if (!isOpen || activeTab !== 'play') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId = 0;

    const renderLoop = () => {
      const w = canvas.width;
      const h = canvas.height;
      const st = ballStateRef.current;

      // Update ball physics when no quiz is blocking
      if (!activeQuiz) {
        st.x += st.vx;
        st.y += st.vy;

        if (st.x < 0.18 || st.x > 0.82) {
          st.vx = -st.vx;
        }
        // Robot AI returns ball at top of court
        if (st.y < 0.18) {
          st.y = 0.18;
          st.vy = Math.abs(st.vy);
        }
        // If ball passes player baseline
        if (st.y > 0.94) {
          st.y = 0.25;
          st.x = 0.5;
          st.vy = 0.0075;
          st.vx = (Math.random() - 0.5) * 0.007;
        }
      }

      if (st.swingAnim > 0) st.swingAnim = Math.max(0, st.swingAnim - 0.08);
      if (st.flashTimer > 0) st.flashTimer = Math.max(0, st.flashTimer - 0.06);

      // Draw Stadium Sky & Crowd Backdrop
      const skyGrad = ctx.createLinearGradient(0, 0, 0, h);
      skyGrad.addColorStop(0, '#0f172a');
      skyGrad.addColorStop(0.35, '#1e1b4b');
      skyGrad.addColorStop(1, '#064e3b');
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, w, h);

      // Perspective 3D Tennis Court Trapezoid
      const topY = h * 0.22;
      const bottomY = h * 0.92;
      const topLeftX = w * 0.26;
      const topRightX = w * 0.74;
      const botLeftX = w * 0.08;
      const botRightX = w * 0.92;

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(topLeftX, topY);
      ctx.lineTo(topRightX, topY);
      ctx.lineTo(botRightX, bottomY);
      ctx.lineTo(botLeftX, bottomY);
      ctx.closePath();

      const courtGrad = ctx.createLinearGradient(0, topY, 0, bottomY);
      courtGrad.addColorStop(0, '#0284c7');
      courtGrad.addColorStop(0.5, '#059669');
      courtGrad.addColorStop(1, '#10b981');
      ctx.fillStyle = courtGrad;
      ctx.fill();
      ctx.lineWidth = 3;
      ctx.strokeStyle = '#f8fafc';
      ctx.stroke();

      // Center Service Line & Net
      const netY = h * 0.52;
      ctx.beginPath();
      ctx.moveTo(w * 0.5, topY);
      ctx.lineTo(w * 0.5, bottomY);
      ctx.strokeStyle = 'rgba(255,255,255,0.65)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Golden Hit Zone Indicator near player baseline
      const hitZoneY = h * 0.78;
      ctx.fillStyle = 'rgba(250, 204, 21, 0.16)';
      ctx.fillRect(w * 0.14, hitZoneY - 18, w * 0.72, 36);

      // Net Mesh
      ctx.beginPath();
      ctx.moveTo(w * 0.18, netY);
      ctx.lineTo(w * 0.82, netY);
      ctx.strokeStyle = '#fde047';
      ctx.lineWidth = 4;
      ctx.stroke();

      // Draw Opponent: Robot Magis AI at top of court
      const oppX = w * st.x;
      const oppY = topY - 8;
      ctx.fillStyle = '#38bdf8';
      ctx.beginPath();
      ctx.roundRect(oppX - 22, oppY - 24, 44, 30, 8);
      ctx.fill();
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(oppX - 14, oppY - 18, 28, 14);
      ctx.fillStyle = '#fde047';
      ctx.beginPath();
      ctx.arc(oppX - 6, oppY - 11, 3, 0, Math.PI * 2);
      ctx.arc(oppX + 6, oppY - 11, 3, 0, Math.PI * 2);
      ctx.fill();

      // Draw 3D Tennis Ball with Perspective Scale & Shadow
      const ballScreenX = w * st.x;
      const ballScreenY = topY + (bottomY - topY) * st.y;
      const ballRadius = 7 + st.y * 10;

      // Shadow
      ctx.fillStyle = 'rgba(0,0,0,0.35)';
      ctx.beginPath();
      ctx.ellipse(ballScreenX, ballScreenY + ballRadius + 6, ballRadius * 0.9, ballRadius * 0.4, 0, 0, Math.PI * 2);
      ctx.fill();

      // Glowing Ball
      ctx.fillStyle = st.flashTimer > 0 ? '#fde047' : '#a3e635';
      ctx.beginPath();
      ctx.arc(ballScreenX, ballScreenY, ballRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#ffffff';
      ctx.stroke();

      // Draw Player 3D Hand-Gesture Racket
      const racketScreenX = w * st.racketX;
      const racketScreenY = h * 0.83 - st.swingAnim * 28;
      ctx.save();
      ctx.translate(racketScreenX, racketScreenY);
      ctx.rotate((st.racketX - 0.5) * 0.5 - st.swingAnim * 0.4);

      // Racket Head
      ctx.strokeStyle = '#f43f5e';
      ctx.lineWidth = 4;
      ctx.fillStyle = 'rgba(244, 63, 94, 0.2)';
      ctx.beginPath();
      ctx.ellipse(0, -18, 24, 30, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Handle
      ctx.strokeStyle = '#fbbf24';
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.moveTo(0, 12);
      ctx.lineTo(0, 34);
      ctx.stroke();
      ctx.restore();

      ctx.restore();

      animId = requestAnimationFrame(renderLoop);
    };

    animId = requestAnimationFrame(renderLoop);
    return () => cancelAnimationFrame(animId);
  }, [isOpen, activeTab, activeQuiz]);

  const handleSwingRacket = () => {
    if (activeQuiz) return;
    const st = ballStateRef.current;
    st.swingAnim = 1;

    // Calculate timing delta relative to ideal hit zone (y = 0.76)
    const timingDelta = st.y - 0.76;
    const aimDelta = st.racketX - st.x;

    const shot = computeTennisRallyOutcome(timingDelta, aimDelta, 'mudah');
    setLastShotResult(shot);

    if (shot.pointsAwarded > 0) {
      st.vy = -Math.abs(st.vy) * (shot.outcome === 'SMASH MAGIS!' ? 1.25 : 1.05);
      st.vx = (st.racketX - 0.5) * 0.012;
      st.flashTimer = 1;
      const newPoints = playerScore + shot.pointsAwarded;
      setPlayerScore(newPoints);
      setStreakCount((prev) => prev + 1);
      playSynthTone(shot.outcome === 'SMASH MAGIS!' ? 'smash' : 'hit');

      // Trigger Educational Quiz Bonus every 2 successful hits
      if (shot.triggersQuizBonus && (streakCount + 1) % 2 === 0) {
        const randomQ = DSKP_QUIZ_POOL[(streakCount + 1) % DSKP_QUIZ_POOL.length];
        setActiveQuiz(randomQ);
        setQuizFeedback(null);
      }
    } else {
      setRobotScore((prev) => prev + 10);
      setStreakCount(0);
      playSynthTone('miss');
    }
  };

  const handleAnswerQuiz = (idx: number) => {
    if (!activeQuiz) return;
    if (idx === activeQuiz.correctIndex) {
      setPlayerScore((prev) => prev + 50);
      setQuizFeedback(`BETUL! +50 Mata Bonus DSKP — ${activeQuiz.explanation}`);
      playSynthTone('score');
    } else {
      setQuizFeedback(`Cuba lagi! Jawapan tepat: ${activeQuiz.options[activeQuiz.correctIndex]}`);
      playSynthTone('miss');
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85"
      role="dialog"
      aria-modal="true"
      aria-labelledby="tennis-modal-title"
    >
      <div className="relative w-full max-w-5xl rounded-3xl bg-[#0F172A] border-2 border-sky-400/40 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        {/* Top Modal Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-950 border-b border-sky-500/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-amber-500 flex items-center justify-center shadow-md">
              <Gamepad2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 id="tennis-modal-title" className="text-lg sm:text-xl font-extrabold tracking-tight text-white">
                GELANGGANG TENIS CIKGU WAN 3D
              </h2>
              <p className="text-xs text-sky-300">
                Main · Belajar · Ulang Kaji · Lepas Stress (Kawalan Tangan AI & Kuiz DSKP)
              </p>
            </div>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex items-center gap-2">
            <div className="flex items-center p-1 rounded-xl bg-slate-950/90 border border-slate-700">
              <button
                type="button"
                onClick={() => setActiveTab('play')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                  activeTab === 'play'
                    ? 'bg-pink-600 text-white shadow'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <Gamepad2 className="w-4 h-4" />
                Cuba Main 3D
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('trailer')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                  activeTab === 'trailer'
                    ? 'bg-sky-500 text-slate-950 shadow'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <Film className="w-4 h-4" />
                Trailer & Fungsi
              </button>
            </div>

            <button
              type="button"
              onClick={() => setSoundEnabled((s) => !s)}
              aria-label={soundEnabled ? 'Matikan bunyi' : 'Hidupkan bunyi'}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            <button
              type="button"
              onClick={onClose}
              aria-label="Tutup tetingkap permainan"
              className="p-2 rounded-xl bg-rose-600/20 hover:bg-rose-600 text-rose-200 hover:text-white border border-rose-500/40 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5">
          {activeTab === 'trailer' ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              {/* Animated Video Trailer Stage */}
              <div className="lg:col-span-7 rounded-2xl bg-gradient-to-br from-indigo-950 via-slate-900 to-emerald-950 border border-sky-400/30 p-6 flex flex-col justify-between relative overflow-hidden min-h-[340px]">
                <div className="relative z-10 flex items-center justify-between text-xs text-sky-300 font-semibold">
                  <span>{TRAILER_SCENES[trailerScene].tag}</span>
                  <span className="tabular-nums">
                    Babak {trailerScene + 1} / {TRAILER_SCENES.length}
                  </span>
                </div>

                <div className="relative z-10 my-6 space-y-3">
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                    {TRAILER_SCENES[trailerScene].title}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                    {TRAILER_SCENES[trailerScene].desc}
                  </p>
                  <div className="pt-2 text-xs font-bold text-amber-300 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 shrink-0" />
                    <span>{TRAILER_SCENES[trailerScene].highlight}</span>
                  </div>
                </div>

                {/* Trailer Controls */}
                <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/10">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setIsTrailerPlaying((p) => !p)}
                      className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-1.5"
                    >
                      {isTrailerPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      {isTrailerPlaying ? 'Jeda Trailer' : 'Mainkan Trailer'}
                    </button>
                    {TRAILER_SCENES.map((sc, idx) => (
                      <button
                        key={sc.id}
                        type="button"
                        onClick={() => setTrailerScene(idx)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                          trailerScene === idx
                            ? 'bg-amber-400 text-slate-950'
                            : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        Babak {idx + 1}
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => setActiveTab('play')}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-400 hover:to-rose-400 text-white text-xs font-extrabold shadow-lg whitespace-nowrap shrink-0"
                  >
                    Cuba Main Sekarang →
                  </button>
                </div>
              </div>

              {/* Right Column: Game Features & Package Value */}
              <div className="lg:col-span-5 rounded-2xl bg-slate-900/90 border border-slate-800 p-5 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <h4 className="text-base font-extrabold text-amber-300">
                    Kenapa Murid & Guru Jatuh Cinta Dengan Permainan 3D Ini?
                  </h4>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-slate-200">
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>
                        <strong>Kawalan Tangan AI (Hand Gesture):</strong> Murid berdiri dan hayun tangan untuk memukul bola—pembelajaran kinestetik yang aktif!
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>
                        <strong>Boleh Ubah Soalan Ikut Subjek:</strong> Masukkan soalan Sains, Matematik, BM, BI, Sejarah atau Pendidikan Islam dengan mudah.
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>
                        <strong>Percuma Dalam Pakej RM30:</strong> Anda dapat pautan penuh permainan ini + kod sumber + Modul Magis AI PDF + Prompter AI!
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="pt-3 border-t border-slate-800 flex flex-col gap-2.5">
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onOpenCheckout();
                    }}
                    className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 font-extrabold text-sm shadow-lg hover:brightness-105 transition"
                  >
                    Dapatkan Pakej 4-Dalam-1 (RM 30.00)
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Interactive 3D Court Canvas */}
              <div className="lg:col-span-8 space-y-3">
                <div className="relative rounded-2xl overflow-hidden border-2 border-sky-400/50 bg-slate-950 shadow-inner">
                  {/* Top HUD Overlay */}
                  <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none">
                    <div className="px-3.5 py-1.5 rounded-xl bg-slate-950/85 border border-sky-400/40 text-xs font-bold flex items-center gap-3">
                      <span className="text-sky-300">
                        CIKGU WAN: <strong className="text-white text-sm tabular-nums">{playerScore}</strong>
                      </span>
                      <span className="text-slate-500">·</span>
                      <span className="text-rose-300">
                        ROBOT AI: <strong className="text-white text-sm tabular-nums">{robotScore}</strong>
                      </span>
                    </div>

                    <div className="px-3 py-1.5 rounded-xl bg-slate-950/85 border border-amber-400/40 text-xs font-bold text-amber-300 flex items-center gap-1.5">
                      <Hand className="w-3.5 h-3.5" />
                      <span>{gestureSimulated ? 'Mod Gerakan Tangan & Mouse Aktif' : 'Mod Klik Pantas'}</span>
                    </div>
                  </div>

                  <canvas
                    ref={canvasRef}
                    width={680}
                    height={380}
                    data-testid="tennis-3d-canvas"
                    onMouseMove={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const normX = Math.max(0.12, Math.min(0.88, (e.clientX - rect.left) / rect.width));
                      ballStateRef.current.racketX = normX;
                    }}
                    onClick={handleSwingRacket}
                    className="w-full h-[300px] sm:h-[360px] block cursor-pointer"
                  />

                  {/* Quiz Pop-up Overlay inside Court when triggered */}
                  {activeQuiz && (
                    <div className="absolute inset-0 z-20 bg-slate-950/90 p-5 flex flex-col justify-center items-center text-center">
                      <div className="max-w-lg w-full rounded-2xl bg-slate-900 border-2 border-amber-400 p-5 space-y-3 shadow-2xl">
                        <div className="text-xs font-bold text-amber-300">
                          CABARAN KUIZ DSKP · {activeQuiz.subject} ({activeQuiz.standard})
                        </div>
                        <h4 className="text-base sm:text-lg font-extrabold text-white">
                          {activeQuiz.question}
                        </h4>
                        <div className="space-y-2 text-left">
                          {activeQuiz.options.map((opt, i) => (
                            <button
                              key={opt}
                              type="button"
                              onClick={() => handleAnswerQuiz(i)}
                              className="w-full px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-sky-600 text-xs sm:text-sm font-semibold text-white transition flex items-center justify-between"
                            >
                              <span>{opt}</span>
                              <span className="text-xs text-sky-300">Pilih →</span>
                            </button>
                          ))}
                        </div>
                        {quizFeedback && (
                          <div className="p-3 rounded-xl bg-emerald-950/90 border border-emerald-400/50 text-xs text-emerald-200 font-semibold space-y-2">
                            <p>{quizFeedback}</p>
                            <button
                              type="button"
                              onClick={() => setActiveQuiz(null)}
                              className="px-4 py-1.5 rounded-lg bg-emerald-500 text-slate-950 font-extrabold text-xs"
                            >
                              Sambung Perlawanan Tenis →
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Primary Interactive Controls Below Court */}
                <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/90 p-3.5 rounded-2xl border border-slate-800">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleSwingRacket}
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-400 hover:to-rose-400 text-white font-extrabold text-xs sm:text-sm shadow-lg whitespace-nowrap shrink-0"
                    >
                      🎾 Hayun Raket / Smash Bola!
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveQuiz(DSKP_QUIZ_POOL[0]);
                        setQuizFeedback(null);
                      }}
                      className="px-3.5 py-2.5 rounded-xl bg-amber-400/15 hover:bg-amber-400/25 border border-amber-400/40 text-amber-300 font-bold text-xs whitespace-nowrap shrink-0"
                    >
                      Uji Kuiz DSKP
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setPlayerScore(0);
                      setRobotScore(0);
                      setStreakCount(0);
                      setLastShotResult(null);
                    }}
                    className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Reset Markah
                  </button>
                </div>
              </div>

              {/* Right Column: Live Shot Telemetry & Classroom Guide */}
              <div className="lg:col-span-4 space-y-4">
                <div className="rounded-2xl bg-slate-900/95 border border-slate-800 p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-sky-400">STATUS PUKULAN TERKINI</span>
                    <Trophy className="w-4 h-4 text-amber-400" />
                  </div>

                  {lastShotResult ? (
                    <div className="space-y-2">
                      <div className="text-lg font-extrabold text-amber-300">
                        {lastShotResult.outcome} (+{lastShotResult.pointsAwarded} Mata)
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {lastShotResult.commentary}
                      </p>
                      <div className="text-xs text-sky-300 font-mono tabular-nums">
                        Kelajuan Bola: {lastShotResult.ballVelocityKmh} km/j · Kombo: {streakCount}x
                      </div>
                    </div>
                  ) : (
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Gerakkan kursor di atas gelanggang dan klik <strong>"Hayun Raket / Smash Bola!"</strong> apabila bola menghampiri garisan emas!
                    </p>
                  )}
                </div>

                <div className="rounded-2xl bg-gradient-to-br from-amber-500/15 via-slate-900 to-indigo-950 border border-amber-400/40 p-4 space-y-3">
                  <h4 className="text-sm font-extrabold text-white">
                    Miliki Permainan Penuh + Modul PDF!
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Versi penuh dalam pakej RM30 dilengkapi pengesanan kamera tangan automatik (Hand-Gesture Webcam) & editor soalan semua subjek.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onOpenCheckout();
                    }}
                    className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-extrabold text-xs shadow-md hover:brightness-105 transition"
                  >
                    Beli Pakej 4-Dalam-1 (RM 30) →
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
