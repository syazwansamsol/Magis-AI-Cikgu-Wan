export type AITarget = 'Gemini' | 'Claude' | 'ChatGPT';

export type PromptCategory =
  | 'permainan-3d-tangan'
  | 'rph-lengkap-dskp'
  | 'kuiz-gamifikasi'
  | 'escape-room-kelas'
  | 'bbm-visual-interaktif';

export interface PromptBuilderConfig {
  subject: string;
  level: string;
  topic: string;
  standardPembelajaran: string;
  category: PromptCategory;
  aiTarget: 'Gemini' | 'Claude' | 'ChatGPT';
  includeHandGesture: boolean;
  includeLeaderboard: boolean;
}

export interface CheckoutFormInput {
  fullName: string;
  email: string;
  phone: string;
  schoolName?: string;
  tngReference?: string;
  quantity: number;
}

export interface CheckoutValidationResult {
  valid: boolean;
  errors: {
    fullName?: string;
    email?: string;
    phone?: string;
    tngReference?: string;
  };
}

export interface OrderSummary {
  unitPriceRM: number;
  quantity: number;
  subtotalRM: number;
  discountRM: number;
  totalRM: number;
  formattedTotal: string;
  validityLabel: string;
}

export interface DeliveredEntitlement {
  id: string;
  title: string;
  format: string;
  description: string;
  actionLabel: string;
  accessCode: string;
}

export interface DeliveryReceipt {
  orderId: string;
  buyerName: string;
  buyerEmail: string;
  buyerPhone: string;
  schoolName: string;
  paidAmountFormatted: string;
  paymentMethod: string;
  tngRef: string;
  timestampISO: string;
  entitlements: DeliveredEntitlement[];
}

export interface TennisShotResult {
  outcome: 'SMASH MAGIS!' | 'PUKULAN TEPAT' | 'MASUK GELANGGANG' | 'KELUAR GARISAN';
  pointsAwarded: number;
  ballVelocityKmh: number;
  triggersQuizBonus: boolean;
  commentary: string;
}

export const PACKAGE_UNIT_PRICE_RM = 30;

export const SPEAKER_PROFILE_DATA = {
  fullName: 'Muhammad Syazwan Bin Samsol Kahar',
  popularName: 'Cikgu Wan (Syazwan Samsol)',
  location: 'Port Dickson, Negeri Sembilan, Malaysia',
  directoryUrl: 'https://edudirectory.withgoogle.com/profiles/4797697018560512',
  websiteUrl: 'https://syazwansamsolai.webflow.io',
  credlyUrl: 'https://www.credly.com/users/muhammad-syazwan-samsol-kahar/badges#credly',
  workshopInfo: {
    title: 'Bengkel Hands-On 2 Jam: Bina Permainan 3D & Modul Magis AI',
    date: '31 Oktober 2026',
    time: '8:30 Malam – 10:30 Malam',
    platform: 'Google Meet (Langsung + Rakaman Penuh)',
    supportChannel: 'Group Sokongan WhatsApp Eksklusif (Bantuan Coaching One-to-One)',
  },
  certifications: [
    'Google Certified Trainer',
    'Google Certified Educator Level 1 & Level 2',
    'Leader, Google Educator Group (GEG) Port Dickson',
    'Google Educator Advisory Group Member',
    'Guru Pakar Digital KPM & Panel Pembangunan Kurikulum Digital/AI',
    'Google Professional Certificates: AI, Data Analytics, Project Management, Cybersecurity & UX Design',
  ],
  expertise: [
    'Gemini & Generative AI',
    'Google Workspace for Education',
    '3D Interactive Gamification',
    'Chromebooks & Google Classroom',
    'Instructional Leadership & Curriculum DSKP',
    'Data Analytics & Student Wellbeing',
  ],
  endorsements: [
    {
      name: 'YB Datuk Mohd Faizal Bin Ramli',
      role: 'Pengerusi Jawatankuasa Bertindak Warisan, Teknologi, Inovasi dan Digital, Kerajaan Negeri Sembilan',
      quote:
        'Pendekatan baharu yang digunakan untuk menarik minat anak-anak muda dan pelajar sekolah mempelajari ilmu secara interaktif selari dengan teknologi digital hari ini.',
    },
    {
      name: 'Assoc. Prof. Dr. M Tazli Azizan',
      role: 'Associate Professor, Universiti Brunei Darussalam',
      quote:
        'Kisah kejayaan Cikgu Syazwan adalah bukti bahawa dengan bimbingan yang betul dan ilmu yang tepat, kita boleh mengubah landskap pendidikan. Less chalk and talk and more activities!',
    },
    {
      name: 'Assoc. Prof. Dr. Siti Nazuar Sailin',
      role: 'Director, Institute of Excellent Teachers & Leaders in Education (SOE), Universiti Utara Malaysia',
      quote:
        'Sangat menarik! Banyak belajar cara membina bahan pengajaran dan video pantas menggunakan aplikasi AI secara praktikal.',
    },
    {
      name: 'Noor Azura binti Mohd Hanapi',
      role: 'Assistant Director Technology Resources, Kementerian Pendidikan Malaysia (KPM)',
      quote:
        'Gemini amat membantu dalam memudahkan tugasan guru dengan menghasilkan pelbagai Rancangan Pengajaran Harian mengikut kaedah pedagogi terbeza.',
    },
  ],
};

export function calculateOrderSummary(quantity: number, promoCode?: string): OrderSummary {
  const safeQty = Math.max(1, Math.min(50, Math.floor(quantity || 1)));
  const subtotalRM = safeQty * PACKAGE_UNIT_PRICE_RM;
  const normalizedCode = (promoCode || '').trim().toUpperCase();

  let discountRM = 0;
  if (normalizedCode === 'CIKGUWAN5' && safeQty >= 1) {
    discountRM = 5;
  } else if (normalizedCode === 'PANITIA10' && safeQty >= 2) {
    discountRM = 10;
  }

  const totalRM = Math.max(0, subtotalRM - discountRM);

  return {
    unitPriceRM: PACKAGE_UNIT_PRICE_RM,
    quantity: safeQty,
    subtotalRM,
    discountRM,
    totalRM,
    formattedTotal: `RM ${totalRM.toFixed(2)}`,
    validityLabel: 'Sah untuk 1 tahun (Termasuk Bengkel Google Meet & Coaching WhatsApp)',
  };
}

export function validateCheckoutForm(
  input: CheckoutFormInput,
  requireTngRef = false
): CheckoutValidationResult {
  const errors: CheckoutValidationResult['errors'] = {};

  const trimmedName = (input.fullName || '').trim();
  const trimmedEmail = (input.email || '').trim();
  const trimmedPhone = (input.phone || '').trim();
  const trimmedRef = (input.tngReference || '').trim();

  if (trimmedName.length < 3) {
    errors.fullName = 'Sila masukkan nama penuh Cikgu / Pembeli (sekurang-kurangnya 3 aksara).';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmedEmail)) {
    errors.email = 'Sila masukkan alamat emel yang sah untuk penghantaran modul & pautan Google Meet.';
  }

  const digitsOnlyPhone = trimmedPhone.replace(/[^0-9]/g, '');
  if (digitsOnlyPhone.length < 9 || digitsOnlyPhone.length > 13) {
    errors.phone = 'Sila masukkan nombor telefon WhatsApp yang sah untuk jemputan Group Coaching 1-to-1.';
  }

  if (requireTngRef && trimmedRef.length < 4) {
    errors.tngReference = "Sila masukkan 4 digit terakhir No. Rujukan Resit Touch 'n Go eWallet.";
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function buildMagisPrompt(config: PromptBuilderConfig): string {
  const categoryTitles: Record<PromptCategory, string> = {
    'permainan-3d-tangan': 'Permainan Sukan 3D Interaktif Kawalan Tangan (WebCam Hand-Gesture & Mouse)',
    'rph-lengkap-dskp': 'Rancangan Pengajaran Harian (RPH) & Aktiviti Didik Hibur Ikut DSKP',
    'kuiz-gamifikasi': 'Aplikasi Kuiz Gamifikasi Interaktif Berpasukan & Papan Markah',
    'escape-room-kelas': 'Misi Bilik Lolos (Digital Escape Room) Mengikut Standard Pembelajaran',
    'bbm-visual-interaktif': 'Bahan Bantu Mengajar (BBM) Simulasi Visual & Eksperimen Interaktif',
  };

  const targetInstructions: Record<'Gemini' | 'Claude' | 'ChatGPT', string> = {
    Gemini:
      'Gunakan keupayaan penuh kod HTML5 + Three.js + MediaPipe Hand Tracking dalam satu fail lengkap yang sedia dimainkan di pelayar web.',
    Claude:
      'Hasilkan kod penuh dalam satu komponen interaktif (Artifact) lengkap dengan animasi lancar, bunyi Web Audio API, dan kuiz interaktif.',
    ChatGPT:
      'Berikan kod lengkap HTML/CSS/JS dalam satu blok kod tunggal tanpa sebarang bahagian yang dipotong (tiada placeholder) supaya boleh terus dibuka di pelayar.',
  };

  const gestureClause = config.includeHandGesture
    ? '- Integrasikan kawalan pergerakan tangan kamera web (Hand-Gesture Tracking) serta sokongan klik/ayunan tetikus sebagai alternatif mesra semua peranti.'
    : '- Gunakan kawalan sentuhan skrin pintar (Touch) dan tetikus yang responsif untuk papan pintar bilik darjah.';

  const leaderboardClause = config.includeLeaderboard
    ? '- Sediakan Papan Markah (Leaderboard) untuk Mode Solo & Pertandingan Kumpulan berserta kesan bunyi sorakan apabila murid menjawab betul.'
    : '- Paparkan maklum balas segera berserta penerangan jawapan setiap kali murid menyelesaikan cabaran.';

  return [
    `[PROMPT MAGIS AI CIKGU WAN — DIOPTIMUMKAN UNTUK ${config.aiTarget.toUpperCase()}]`,
    `Peranan Anda: Pakar Pembangun Permainan Pendidikan 3D & Guru Inovatif KPM.`,
    `Mod Binaan: ${categoryTitles[config.category]}`,
    ``,
    `1. MAKLUMAT KURIKULUM & STANDARD PEMBELAJARAN:`,
    `- Mata Pelajaran: ${config.subject}`,
    `- Tahun / Tingkatan: ${config.level}`,
    `- Tajuk Fokus: ${config.topic}`,
    `- Standard Pembelajaran (DSKP): ${config.standardPembelajaran}`,
    ``,
    `2. SPESIFIKASI INTERAKTIF & MEKANIK PERMAINAN:`,
    gestureClause,
    leaderboardClause,
    `- Reka bentuk antaramuka bertemakan "Gelanggang & Makmal Magis Cikgu Wan" yang ceria, berwarna-warni, berfokus jelas, dan mempunyai butang kawalan besar untuk murid.`,
    `- Masukkan sekurang-kurangnya 8 soalan KBAT & pengukuhan berdasarkan Standard Pembelajaran "${config.standardPembelajaran}" yang muncul setiap kali pemain mendapat mata.`,
    ``,
    `3. ARAHAN OUTPUT (${config.aiTarget}):`,
    targetInstructions[config.aiTarget],
    `Pastikan semua teks adalah dalam Bahasa Melayu yang tepat dan mesra murid.`,
  ].join('\n');
}

export function buildShortPreviewPrompt(config: PromptBuilderConfig): string {
  const categoryShortNames: Record<PromptCategory, string> = {
    'permainan-3d-tangan': 'Permainan Mini 3D Interaktif',
    'rph-lengkap-dskp': 'Ringkasan RPH DSKP KPM',
    'kuiz-gamifikasi': 'Kuiz Gamifikasi Kelas',
    'escape-room-kelas': 'Misi Mini Escape Room',
    'bbm-visual-interaktif': 'Simulasi BBM Visual',
  };

  return [
    `[CONTOH PROMPT RINGKAS (${config.aiTarget.toUpperCase()}) — VERSI PRATONTON]`,
    `Bina ${categoryShortNames[config.category]} untuk subjek ${config.subject} (${config.level}) bertajuk "${config.topic}" mengikut DSKP: ${config.standardPembelajaran}.`,
    `Sertakan 3 soalan kuiz interaktif mudah dalam Bahasa Melayu.`,
    ``,
    `🔒 [PROMPT MASTER PENUH 5-LAPIS DSKP + KOD 3D HAND-GESTURE + 120 TEMPLAT PRO TERKUNCI — Dapatkan Pakej Lengkap RM 30.00]`,
  ].join('\n');
}

export function generateDeliveryReceipt(
  input: CheckoutFormInput,
  customOrderId?: string
): DeliveryReceipt {
  const summary = calculateOrderSummary(input.quantity);
  const cleanId =
    customOrderId ||
    `CW-${Math.floor(100000 + Math.random() * 900000)}`;

  return {
    orderId: cleanId,
    buyerName: input.fullName.trim(),
    buyerEmail: input.email.trim(),
    buyerPhone: input.phone.trim(),
    schoolName: (input.schoolName || 'Komuniti Pendidik Malaysia').trim(),
    paidAmountFormatted: summary.formattedTotal,
    paymentMethod: "Touch 'n Go eWallet",
    tngRef: (input.tngReference || 'TNG-VERIFIED-INSTANT').trim().toUpperCase(),
    timestampISO: new Date().toISOString(),
    entitlements: [
      {
        id: 'modul-magis-pdf',
        title: 'Modul Magis AI Cikgu Wan (Edisi Langkah Demi Langkah PDF)',
        format: 'Fail PDF Interaktif · 84 Muka Surat Lengkap',
        description:
          'Panduan bergambar langkah demi langkah membina RPH, RPT, Soalan, BBM & Permainan 3D mengikut DSKP KPM.',
        actionLabel: 'Buka & Muat Turun Modul PDF',
        accessCode: `MODUL-${cleanId}`,
      },
      {
        id: 'modul-gamifikasi-pdf',
        title: 'Modul Gamifikasi Magis AI PDF (Kuiz, Escape Room & Board Game)',
        format: 'Set Templat PDF & Panduan Aktiviti Kelas',
        description:
          'Koleksi templat Kuiz Interaktif, Kad Permainan, Escape Room & Board Game untuk semua subjek Tahun 1 hingga Tingkatan 5.',
        actionLabel: 'Buka Modul Gamifikasi PDF',
        accessCode: `GAMI-${cleanId}`,
      },
      {
        id: 'gelanggang-tenis-3d',
        title: 'Permainan 3D "Gelanggang Tenis Cikgu Wan" (Akses Penuh)',
        format: 'Aplikasi Web 3D · Kawalan Tangan (Hand-Gesture) & Mouse',
        description:
          'Permainan sukan tenis 3D setaraf konsol sukan dengan Mod Latihan, Mod Pertandingan Kelas & Kuiz Standard Pembelajaran.',
        actionLabel: 'Main Gelanggang Tenis 3D Sekarang',
        accessCode: `TENIS3D-${cleanId}`,
      },
      {
        id: 'prompter-magis-ai',
        title: 'Aplikasi Magis Prompter Permainan AI (Akses Pro 1 Tahun)',
        format: 'Aplikasi Penjana Prompt Pintar (Gemini, Claude & ChatGPT)',
        description:
          'Jana prompt siap guna dalam 1 klik untuk membina permainan 3D, RPH, analisis murid dan aktiviti PdP interaktif.',
        actionLabel: 'Buka Aplikasi Prompter Pro',
        accessCode: `PROMPTER-${cleanId}`,
      },
      {
        id: 'bengkel-hands-on-google-meet',
        title: 'Pas Sesi Bengkel Hands-On 2 Jam (31 Oktober 2026 · 8:30 Malam)',
        format: 'Siaran Langsung Google Meet + Rakaman Penuh',
        description:
          'Bimbingan praktikal langkah demi langkah bersama Cikgu Wan (Google Certified Trainer) pada 31 Oktober 2026, jam 8:30 Malam di Google Meet.',
        actionLabel: 'Simpan Pautan Google Meet (31 Okt)',
        accessCode: `MEET-${cleanId}`,
      },
      {
        id: 'whatsapp-coaching-1to1',
        title: 'Group Sokongan WhatsApp (Bantuan Coaching One-to-One)',
        format: 'Akses VIP WhatsApp Coaching & Komuniti Guru Kreatif',
        description:
          'Sertai Group WhatsApp rasmi untuk bantuan teknikal, soal jawab terus, dan bimbingan coaching one-to-one bersama Cikgu Wan.',
        actionLabel: 'Sertai Group WhatsApp Coaching',
        accessCode: `WA-VIP-${cleanId}`,
      },
    ],
  };
}

export function computeTennisRallyOutcome(
  shotTimingDelta: number,
  aimOffsetNormalized: number,
  difficulty: 'mudah' | 'sederhana' | 'cabar' = 'sederhana'
): TennisShotResult {
  const absTiming = Math.abs(shotTimingDelta);
  const absAim = Math.abs(aimOffsetNormalized);

  const toleranceMultiplier =
    difficulty === 'mudah' ? 1.25 : difficulty === 'cabar' ? 0.8 : 1.0;

  if (absAim > 0.95 * toleranceMultiplier || absTiming > 0.65 * toleranceMultiplier) {
    return {
      outcome: 'KELUAR GARISAN',
      pointsAwarded: 0,
      ballVelocityKmh: 68,
      triggersQuizBonus: false,
      commentary: 'Ayunan sedikit lewat! Cuba hayun raket apabila bola memasuki zon cahaya emas.',
    };
  }

  if (absTiming <= 0.14 * toleranceMultiplier && absAim <= 0.35 * toleranceMultiplier) {
    return {
      outcome: 'SMASH MAGIS!',
      pointsAwarded: 30,
      ballVelocityKmh: 142,
      triggersQuizBonus: true,
      commentary: 'SMASH MAGIS PADU! Pukulan kencang tepat ke penjuru gelanggang + Bonus Kuiz DSKP!',
    };
  }

  if (absTiming <= 0.32 * toleranceMultiplier) {
    return {
      outcome: 'PUKULAN TEPAT',
      pointsAwarded: 15,
      ballVelocityKmh: 112,
      triggersQuizBonus: true,
      commentary: 'Pukulan Forehand yang kemas! Robot AI Cikgu Wan terpaksa berlari pantas!',
    };
  }

  return {
    outcome: 'MASUK GELANGGANG',
    pointsAwarded: 10,
    ballVelocityKmh: 88,
    triggersQuizBonus: false,
    commentary: 'Bola melepasi jaring dengan selamat! Teruskan rali untuk kumpul mata.',
  };
}
