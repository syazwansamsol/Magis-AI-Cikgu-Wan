import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateOrderSummary,
  validateCheckoutForm,
  buildMagisPrompt,
  generateDeliveryReceipt,
  computeTennisRallyOutcome,
  SPEAKER_PROFILE_DATA,
} from './magisLogic';

test('calculateOrderSummary computes RM30 package price and promo codes accurately', () => {
  const single = calculateOrderSummary(1);
  assert.equal(single.unitPriceRM, 30);
  assert.equal(single.totalRM, 30);
  assert.equal(single.formattedTotal, 'RM 30.00');

  const discounted = calculateOrderSummary(1, 'CIKGUWAN5');
  assert.equal(discounted.discountRM, 5);
  assert.equal(discounted.totalRM, 25);
  assert.equal(discounted.formattedTotal, 'RM 25.00');
});

test('validateCheckoutForm rejects empty inputs and accepts valid Malaysian teacher info', () => {
  const invalid = validateCheckoutForm({
    fullName: 'Ab',
    email: 'bukan-emel',
    phone: '123',
    quantity: 1,
  });
  assert.equal(invalid.valid, false);
  assert.ok(invalid.errors.fullName);
  assert.ok(invalid.errors.email);
  assert.ok(invalid.errors.phone);

  const valid = validateCheckoutForm(
    {
      fullName: 'Cikgu Siti Sarah',
      email: 'sitisarah@moe.edu.my',
      phone: '012-3456789',
      tngReference: '8829',
      quantity: 1,
    },
    true
  );
  assert.equal(valid.valid, true);
  assert.equal(Object.keys(valid.errors).length, 0);
});

test('buildMagisPrompt builds complete curriculum prompt for Gemini, Claude, or ChatGPT', () => {
  const prompt = buildMagisPrompt({
    subject: 'Sains',
    level: 'Tahun 4',
    topic: 'Sifat Cahaya (Pantulan & Pembiasan)',
    standardPembelajaran: '5.1.2 Membanding dan membezakan bayang-bayang',
    category: 'permainan-3d-tangan',
    aiTarget: 'Gemini',
    includeHandGesture: true,
    includeLeaderboard: true,
  });

  assert.ok(prompt.includes('GEMINI'));
  assert.ok(prompt.includes('Sains'));
  assert.ok(prompt.includes('Tahun 4'));
  assert.ok(prompt.includes('5.1.2 Membanding dan membezakan bayang-bayang'));
  assert.ok(prompt.includes('Hand-Gesture Tracking'));
  assert.equal(prompt.toLowerCase().includes('nintendo'), false);
});

test('generateDeliveryReceipt creates 6 complete entitlements including Google Meet workshop and WhatsApp coaching', () => {
  const receipt = generateDeliveryReceipt(
    {
      fullName: 'Cikgu Ahmad Faiz',
      email: 'faiz@sekolah.edu.my',
      phone: '0198765432',
      schoolName: 'SK Taman Melawati',
      tngReference: '9941',
      quantity: 1,
    },
    'CW-778899'
  );

  assert.equal(receipt.orderId, 'CW-778899');
  assert.equal(receipt.buyerEmail, 'faiz@sekolah.edu.my');
  assert.equal(receipt.entitlements.length, 6);
  assert.equal(receipt.entitlements[4].id, 'bengkel-hands-on-google-meet');
  assert.ok(receipt.entitlements[4].title.includes('31 Oktober 2026'));
  assert.equal(receipt.entitlements[5].id, 'whatsapp-coaching-1to1');
});

test('SPEAKER_PROFILE_DATA contains verified Google Edu Directory URL and workshop details', () => {
  assert.equal(
    SPEAKER_PROFILE_DATA.directoryUrl,
    'https://edudirectory.withgoogle.com/profiles/4797697018560512'
  );
  assert.equal(SPEAKER_PROFILE_DATA.workshopInfo.date, '31 Oktober 2026');
  assert.equal(SPEAKER_PROFILE_DATA.workshopInfo.time, '8:30 Malam – 10:30 Malam');
});

test('computeTennisRallyOutcome scores Smash Magis, Pukulan Tepat, and Keluar Garisan properly', () => {
  const smash = computeTennisRallyOutcome(0.05, 0.1, 'sederhana');
  assert.equal(smash.outcome, 'SMASH MAGIS!');
  assert.equal(smash.pointsAwarded, 30);
  assert.equal(smash.triggersQuizBonus, true);

  const out = computeTennisRallyOutcome(0.85, 0.99, 'sederhana');
  assert.equal(out.outcome, 'KELUAR GARISAN');
  assert.equal(out.pointsAwarded, 0);
});
