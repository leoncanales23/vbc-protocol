# ⚡ VBC Protocol · Proof-of-Strength

**Tu fuerza es tu firma.**

The first protocol where digital value is generated through verifiable physical effort — and transferred through conversational messaging.

```
LIFT → POWER SCORE → VBC FUEL → CONDOR TOKEN → REAL MONEY
```

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Base L2](https://img.shields.io/badge/Chain-Base_L2-blue.svg)](https://base.org)
[![Open Source](https://img.shields.io/badge/Open-Source-green.svg)](https://github.com/leoncanales23/vbc-protocol)

---

## What is Proof-of-Strength?

Not Proof-of-Work (electricity). Not Proof-of-Stake (capital). **Proof-of-Strength: real human force.**

An athlete records a lift (bench press, deadlift, squat, overhead press). The system calculates a **Power Score (1-99)** based on weight, reps, and discipline — validated against real world records. That score generates **VBC fuel**, which converts to **CONDOR tokens** on Base L2.

No apps. No crypto knowledge. Just your body and a video.

## Quick Start

### For Athletes (no code required)

1. **Record** your exercise (any phone, any angle, 10-60 seconds)
2. **Upload** at [vibraalto.cl/vbc](https://vibraalto.cl/vbc) — video file or Instagram/YouTube/TikTok link
3. **Receive** your Power Score and VBC fuel automatically

### For Developers

```bash
npm install vbc-protocol
```

```javascript
const { calculatePowerScore, validateLift } = require('vbc-protocol');

// Calculate Power Score from a lift
const result = calculatePowerScore({
  discipline: 'bench',  // bench | deadlift | squat | overhead
  weight: 100,          // kg
  reps: 8
});

console.log(result);
// {
//   ok: true,
//   powerScore: 42,
//   tier: 'ORO',
//   est1RM: 126.67,
//   pctWorldRecord: 0.378,
//   vbc: 420,
//   condor: 420000
// }
```

### For Gym Integrations

```javascript
const { VBCClient } = require('vbc-protocol');

const vbc = new VBCClient({
  gymId: 'your-gym-id',
  apiKey: 'your-api-key'  // Get at vibraalto.cl/vbc/developers
});

// Register a lift from your gym's system
const lift = await vbc.registerLift({
  athlete: 'athlete-wallet-or-phone',
  discipline: 'squat',
  weight: 140,
  reps: 5,
  videoUrl: 'https://...'  // Required for oracle validation
});
```

## Architecture

```
┌─────────────────────────────────────────────────┐
│                  PUBLIC (this repo)               │
│                                                   │
│  Power Score Calculator ← World Record Oracle     │
│  Smart Contract ABI     ← VBCPayRail interface    │
│  SDK (npm)              ← Integration helpers     │
│  Whitepaper + Landing   ← vibraalto.cl/vbc        │
│                                                   │
├─────────────────────────────────────────────────┤
│                  PRIVATE (engine)                  │
│                                                   │
│  NERHIA Engine          ← Urban intelligence       │
│  007 Agent              ← WhatsApp bridge          │
│  Oracle Signer          ← EIP-712 validation       │
│  Claude API Proxy       ← AI analysis              │
│                                                   │
└─────────────────────────────────────────────────┘
```

**This repo contains the public SDK and interface.** The engine runs on VibraAlto infrastructure.

## Power Score Formula

Based on the [Epley formula](https://en.wikipedia.org/wiki/One-repetition_maximum) — the powerlifting standard:

```
est1RM = weight × (1 + reps / 30)
pct = est1RM / WORLD_RECORD[discipline]
powerScore = round(pct × 99)
```

### World Records (validation ceiling)

| Discipline | Record (kg) | Holder | Year |
|---|---|---|---|
| Bench Press | 335 | Julius Maddox | 2021 |
| Deadlift | 501 | Hafthor Bjornsson | 2020 |
| Squat | 477 | Ray Williams | 2019 |
| Overhead Press | 225 | Lasha Talakhadze | 2021 |

**Anti-cheat:** Any lift exceeding 90% of the world record is rejected. Rate limit: 3 lifts/hour.

### Tier System

| Power Score | Tier | % World Record |
|---|---|---|
| 75-99 | ⭐ GALÁCTICO | >75% |
| 55-74 | 💎 PLATINO | 55-75% |
| 40-54 | 🥇 ORO | 40-55% |
| 25-39 | 🥈 PLATA | 25-40% |
| 1-24 | 🥉 BRONCE | <25% |

## Token Economics

```
VBC (fuel)  = powerScore × 10
CONDOR      = VBC × 1000
Burn rate   = 2% per lift (deflationary)
Transfer fee = 0.15% (revenue)
```

**CONDOR price** = Reserve ÷ Circulating Supply. More athletes → more CONDOR burned → price rises for all holders.

## Smart Contract

**VBCPayRail.sol** on Base L2:

```solidity
// Register a verified lift → mint CONDOR
function registerLift(LiftProof calldata proof, bytes calldata oracleSig) external;

// Transfer via 007 agent (WhatsApp → Base L2)
function transfer007(address from, address to, uint256 amount, bytes calldata agentSig) external;
```

Full ABI in [`contracts/VBCPayRail.json`](contracts/VBCPayRail.json).

## WhatsApp Integration (007 Agent)

The 007 agent operates on WhatsApp via Twilio. Users interact in natural language:

| Command | Action |
|---|---|
| `007 balance` | Check VBC, CONDOR, and wallet balance |
| `007 enviar 5000 a Juan` | Send 5,000 CLP (~5.26 USDT) to Juan |
| `007 cobrar 10000 a María` | Generate payment link for María |
| `007 stake 500` | Stake 500 VBC for boost |

**The 007 engine is private.** To integrate WhatsApp payments in your app, use the SDK's `VBCClient.createPaymentLink()`.

## Project Structure

```
vbc-protocol/
├── contracts/          # Smart contract ABI + interface
│   ├── VBCPayRail.json
│   └── IVBCPayRail.sol
├── sdk/                # npm package source
│   ├── index.js        # Main SDK
│   ├── powerScore.js   # Calculator
│   └── validate.js     # Lift validation
├── docs/               # Technical documentation
│   ├── whitepaper.md
│   ├── economics.md
│   └── integration.md
├── examples/           # Integration examples
│   ├── gym-basic/
│   └── web-widget/
├── public/             # Landing page (vibraalto.cl/vbc)
│   └── index.html
├── LICENSE             # MIT
└── README.md           # This file
```

## Contributing

We welcome contributions. The protocol grows with the community.

1. Fork this repo
2. Create a feature branch
3. Submit a pull request

**Areas where we need help:**
- More disciplines (swimming, running, cycling — expand the Power Score formula)
- Multi-language support for the landing page
- Gym integration examples
- Mobile SDK (React Native, Flutter)
- Oracle improvements for video analysis

## Links

- **Landing:** [vibraalto.cl/vbc](https://vibraalto.cl/vbc)
- **NERHIA (Urban Intelligence):** [vibraalto.cl/nerhia](https://vibraalto.cl/nerhia)
- **Main Repo:** [github.com/leoncanales23/vibraalto-core](https://github.com/leoncanales23/vibraalto-core)
- **WhatsApp 007:** Active on Twilio sandbox (beta)

## License

MIT — Use it, fork it, build on it. Attribution appreciated.

**Built with muscle in Santiago, Chile.** 🇨🇱

---

*VibraAlto · VibraOS · NERHIA · Proof-of-Strength · 2025*
