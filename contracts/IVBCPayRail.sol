// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title IVBCPayRail
 * @notice Interface for the VBC Proof-of-Strength payment rail on Base L2
 * @dev Full implementation is deployed and managed by VibraAlto.
 *      This interface allows third-party integrations to interact with the protocol.
 */
interface IVBCPayRail {

    // ── STRUCTS ──

    struct LiftProof {
        address athlete;
        string discipline;     // bench | deadlift | squat | overhead
        uint256 weight;        // in grams (kg * 1000)
        uint256 reps;
        uint256 powerScore;    // 1-99
        uint256 timestamp;
        bytes32 videoHash;     // IPFS hash of verification video
    }

    // ── EVENTS ──

    event LiftRegistered(
        address indexed athlete,
        uint256 powerScore,
        uint256 vbcMinted,
        uint256 condorMinted,
        uint256 condorBurned
    );

    event Transfer007(
        address indexed from,
        address indexed to,
        uint256 usdtAmount,
        uint256 fee
    );

    event PaymentLinkCreated(
        address indexed creator,
        bytes32 linkId,
        uint256 amount
    );

    // ── READ FUNCTIONS ──

    /// @notice Get VBC fuel balance for an athlete
    function vbcBalance(address athlete) external view returns (uint256);

    /// @notice Get Power Score for an athlete
    function powerScore(address athlete) external view returns (uint256);

    /// @notice Get total network power (sum of all athlete scores)
    function networkPower() external view returns (uint256);

    /// @notice Get CONDOR token price (reserve / circulating supply)
    function condorPrice() external view returns (uint256);

    /// @notice Check if a phone number is registered to a wallet
    function phoneToWallet(string calldata phone) external view returns (address);

    // ── WRITE FUNCTIONS ──

    /// @notice Register a verified lift and mint CONDOR
    /// @param proof The lift data signed by the oracle
    /// @param oracleSig EIP-712 signature from the anti-cheat oracle
    function registerLift(LiftProof calldata proof, bytes calldata oracleSig) external;

    /// @notice Execute a transfer via 007 WhatsApp agent
    /// @param from Sender wallet
    /// @param to Recipient wallet
    /// @param usdtAmount Amount in USDT (6 decimals)
    /// @param agentSig Signature from the 007 agent
    function transfer007(
        address from,
        address to,
        uint256 usdtAmount,
        bytes calldata agentSig
    ) external;

    /// @notice Register a phone number to a wallet (for WhatsApp transfers)
    /// @param phone Phone number (international format)
    function registerPhone(string calldata phone) external;

    // ── CONSTANTS ──

    /// @notice Burn percentage per lift (deflationary)
    function BURN_PCT() external pure returns (uint256); // 2

    /// @notice Transfer fee in basis points
    function FEE_BPS() external pure returns (uint256); // 15 (0.15%)
}
