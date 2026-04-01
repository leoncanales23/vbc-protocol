/**
 * VBC Protocol · Proof-of-Strength SDK
 * 
 * Public calculator and validation logic.
 * The oracle and signing engine are private.
 * 
 * @license MIT
 * @author León Canales · VibraAlto
 */

// ═══════════════════════════════════════════════════════════════
// WORLD RECORDS — Validation ceiling (updated 2024)
// ═══════════════════════════════════════════════════════════════

const WORLD_RECORDS = {
  bench:    335,   // Julius Maddox (2021)
  deadlift: 501,   // Hafthor Bjornsson (2020)
  squat:    477,   // Ray Williams (2019)
  overhead: 225,   // Lasha Talakhadze (2021)
};

const DISCIPLINES = Object.keys(WORLD_RECORDS);

// ═══════════════════════════════════════════════════════════════
// POWER SCORE CALCULATOR
// ═══════════════════════════════════════════════════════════════

/**
 * Calculate Power Score from a lift.
 * 
 * @param {Object} lift
 * @param {string} lift.discipline - bench | deadlift | squat | overhead
 * @param {number} lift.weight - Weight in kg
 * @param {number} lift.reps - Number of repetitions
 * @returns {Object} Result with powerScore, tier, est1RM, vbc, condor
 */
function calculatePowerScore(lift) {
  const { discipline, weight, reps } = lift;

  // Validate inputs
  if (!DISCIPLINES.includes(discipline)) {
    return { ok: false, error: 'Invalid discipline. Use: ' + DISCIPLINES.join(', ') };
  }
  if (!weight || weight <= 0 || weight > 600) {
    return { ok: false, error: 'Weight must be between 1-600 kg' };
  }
  if (!reps || reps < 1 || reps > 50) {
    return { ok: false, error: 'Reps must be between 1-50' };
  }

  // Epley formula — powerlifting standard
  const est1RM = weight * (1 + reps / 30);
  const worldRecord = WORLD_RECORDS[discipline];
  const pct = est1RM / worldRecord;

  // Anti-cheat: reject if exceeds 90% of world record
  if (pct > 0.90) {
    return {
      ok: false,
      error: 'Exceeds 90% of world record (' + worldRecord + 'kg). Verify your data.',
      est1RM: Math.round(est1RM * 100) / 100,
      pctWorldRecord: Math.round(pct * 1000) / 1000,
    };
  }

  const powerScore = Math.max(1, Math.min(99, Math.round(pct * 99)));

  // Tier classification
  const tier =
    pct > 0.75 ? 'GALÁCTICO' :
    pct > 0.55 ? 'PLATINO' :
    pct > 0.40 ? 'ORO' :
    pct > 0.25 ? 'PLATA' : 'BRONCE';

  // Token economics
  const vbc = powerScore * 10;
  const condor = vbc * 1000;
  const burned = Math.floor(condor * 0.02); // 2% deflationary

  return {
    ok: true,
    powerScore,
    tier,
    discipline,
    weight,
    reps,
    est1RM: Math.round(est1RM * 100) / 100,
    pctWorldRecord: Math.round(pct * 1000) / 1000,
    vbc,
    condor: condor - burned,
    burned,
  };
}

// ═══════════════════════════════════════════════════════════════
// LIFT VALIDATION
// ═══════════════════════════════════════════════════════════════

/**
 * Validate a lift before submitting to the oracle.
 * 
 * @param {Object} lift
 * @returns {Object} Validation result
 */
function validateLift(lift) {
  const errors = [];

  if (!lift.discipline || !DISCIPLINES.includes(lift.discipline)) {
    errors.push('Invalid discipline');
  }
  if (!lift.weight || lift.weight <= 0) {
    errors.push('Weight must be positive');
  }
  if (!lift.reps || lift.reps < 1) {
    errors.push('At least 1 rep required');
  }
  if (lift.reps > 30) {
    errors.push('Max 30 reps per set (endurance is not strength)');
  }
  if (lift.weight > WORLD_RECORDS[lift.discipline] * 0.9) {
    errors.push('Weight exceeds 90% of world record — needs video verification');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

// ═══════════════════════════════════════════════════════════════
// VBC CLIENT — Integration helper
// ═══════════════════════════════════════════════════════════════

/**
 * VBC Protocol client for gym and app integrations.
 * Communicates with the VibraAlto API (engine is private).
 */
class VBCClient {
  /**
   * @param {Object} config
   * @param {string} config.gymId - Your gym identifier
   * @param {string} config.apiKey - API key from vibraalto.cl/vbc/developers
   * @param {string} [config.baseUrl] - API base URL (default: production)
   */
  constructor(config) {
    this.gymId = config.gymId;
    this.apiKey = config.apiKey;
    this.baseUrl = config.baseUrl || 'https://us-central1-vibraaltoai-11f55.cloudfunctions.net/api';
  }

  /**
   * Register a lift through the oracle.
   * Requires video URL for verification.
   */
  async registerLift(lift) {
    const validation = validateLift(lift);
    if (!validation.valid) {
      return { ok: false, errors: validation.errors };
    }

    const score = calculatePowerScore(lift);
    if (!score.ok) {
      return score;
    }

    const response = await fetch(this.baseUrl + '/nerhia/lift', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Gym-Id': this.gymId,
        'X-Api-Key': this.apiKey,
      },
      body: JSON.stringify({
        ...lift,
        ...score,
        videoUrl: lift.videoUrl,
        timestamp: Date.now(),
      }),
    });

    return response.json();
  }

  /**
   * Create a payment link (for receiving payments).
   */
  async createPaymentLink(amount, currency) {
    const response = await fetch(this.baseUrl + '/nerhia/pay-link', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Gym-Id': this.gymId,
        'X-Api-Key': this.apiKey,
      },
      body: JSON.stringify({ amount, currency: currency || 'CLP' }),
    });

    return response.json();
  }

  /**
   * Get leaderboard for a discipline.
   */
  async getLeaderboard(discipline, limit) {
    const response = await fetch(
      this.baseUrl + '/nerhia/leaderboard?discipline=' + (discipline || 'all') + '&limit=' + (limit || 20),
      { headers: { 'X-Api-Key': this.apiKey } }
    );

    return response.json();
  }
}

// ═══════════════════════════════════════════════════════════════
// EXPORTS
// ═══════════════════════════════════════════════════════════════

module.exports = {
  calculatePowerScore,
  validateLift,
  VBCClient,
  WORLD_RECORDS,
  DISCIPLINES,
};
