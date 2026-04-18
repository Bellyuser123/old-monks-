/**
 * Enhanced Risk Analysis Service
 * Advanced scoring and detection algorithms
 */

export interface RiskComponent {
  weight: number;
  score: number; // 0-100
  factors: string[];
}

export interface DetailedRiskAnalysis {
  total_score: number; // 0-100
  components: {
    contract_risk: RiskComponent;
    value_risk: RiskComponent;
    approval_risk: RiskComponent;
    interaction_risk: RiskComponent;
    network_risk: RiskComponent;
    temporal_risk: RiskComponent;
  };
  flags: {
    critical: string[];
    high: string[];
    medium: string[];
    low: string[];
  };
  recommendations: string[];
}

export class AdvancedRiskAnalyzer {
  /**
   * Honeypot Detection Algorithm
   * Identifies contracts designed to trap funds
   */
  static detectHoneypot(
    contractCode: string,
    contractBehavior: any
  ): { is_honeypot: boolean; confidence: number; reasons: string[] } {
    const reasons: string[] = [];
    let honeypot_score = 0;

    // Pattern 1: Zero balance checks
    if (/balanceOf.*==.*0/i.test(contractCode)) {
      honeypot_score += 25;
      reasons.push('Contract checks for zero balance (trap pattern)');
    }

    // Pattern 2: Blocked transfers
    if (/require.*msg.sender/i.test(contractCode)) {
      honeypot_score += 15;
      reasons.push('Possible transfer restrictions detected');
    }

    // Pattern 3: Owner exclusion
    if (/if.*owner/i.test(contractCode)) {
      honeypot_score += 10;
      reasons.push('Owner may have special privileges');
    }

    // Pattern 4: Token buyback mechanism that favors owner
    if (/transfer.*owner.*100/i.test(contractCode)) {
      honeypot_score += 20;
      reasons.push('Suspicious buyback mechanism detected');
    }

    return {
      is_honeypot: honeypot_score > 50,
      confidence: honeypot_score / 100,
      reasons,
    };
  }

  /**
   * Rug Pull Scoring
   * Analyzes token holder concentration and creator permissions
   */
  static analyzeRugPullRisk(tokenStats: {
    total_supply: string;
    creator_balance_percent: number;
    top_10_percent: number;
    liquidity_locked: boolean;
    mint_function_exists: boolean;
    burn_function_exists: boolean;
  }): { rug_pull_score: number; risk_factors: string[] } {
    const factors: string[] = [];
    let score = 0;

    // Creator holds too much
    if (tokenStats.creator_balance_percent > 50) {
      score += 30;
      factors.push(`Creator holds ${tokenStats.creator_balance_percent}% (extremely risky)`);
    } else if (tokenStats.creator_balance_percent > 20) {
      score += 15;
      factors.push(`Creator holds ${tokenStats.creator_balance_percent}% (high concentration)`);
    }

    // Top 10 holders concentration
    if (tokenStats.top_10_percent > 80) {
      score += 25;
      factors.push('Top 10 holders own >80% (extreme concentration risk)');
    } else if (tokenStats.top_10_percent > 60) {
      score += 12;
      factors.push('Top 10 holders own >60% (high concentration)');
    }

    // Liquidity not locked
    if (!tokenStats.liquidity_locked) {
      score += 20;
      factors.push('Liquidity is not locked (can be withdrawn anytime)');
    }

    // Mint function exists
    if (tokenStats.mint_function_exists) {
      score += 15;
      factors.push('Mint function exists (can inflate supply)');
    }

    // No burn function
    if (!tokenStats.burn_function_exists) {
      score += 5;
      factors.push('No token burn mechanism');
    }

    return {
      rug_pull_score: Math.min(score, 100),
      risk_factors: factors,
    };
  }

  /**
   * Zero Approval Detection
   * Detects contracts that don't properly return balance
   */
  static detectZeroApprovalScam(
    approvalFunction: string,
    tokenContract: string
  ): { is_scam: boolean; reason: string } {
    // Check if approval doesn't actually update allowance
    if (!/allowance\[.*\]\[.*\]/i.test(approvalFunction)) {
      return {
        is_scam: true,
        reason: 'Approval function does not update allowance mapping (classic zero approval scam)',
      };
    }

    return { is_scam: false, reason: '' };
  }

  /**
   * Phishing Address Detection
   * Identifies addresses similar to known contracts
   */
  static detectAddressMimicry(
    target_address: string,
    known_addresses: { [key: string]: string }
  ): { is_mimic: boolean; similar_address: string; difference: string } | null {
    const similarity_threshold = 38; // Out of 40 characters (excluding 0x)

    for (const [name, known_addr] of Object.entries(known_addresses)) {
      let matching_chars = 0;
      for (let i = 0; i < Math.min(target_address.length, known_addr.length); i++) {
        if (target_address[i] === known_addr[i]) matching_chars++;
      }

      if (matching_chars >= similarity_threshold) {
        // Find the different character
        const diff_index = [...target_address].findIndex(
          (char, i) => char !== known_addr[i]
        );

        return {
          is_mimic: true,
          similar_address: known_addr,
          difference: `Character at position ${diff_index}`,
        };
      }
    }

    return null;
  }

  /**
   * Comprehensive Risk Scoring
   * Combines multiple risk factors
   */
  static calculateComprehensiveScore(factors: {
    contract_age_days: number;
    is_verified: boolean;
    audit_count: number;
    exploit_history: boolean;
    holder_count: number;
    liquidity_percent: number;
    transaction_volume_24h: number;
  }): DetailedRiskAnalysis {
    const analysis: DetailedRiskAnalysis = {
      total_score: 0,
      components: {
        contract_risk: { weight: 0.25, score: 0, factors: [] },
        value_risk: { weight: 0.2, score: 0, factors: [] },
        approval_risk: { weight: 0.2, score: 0, factors: [] },
        interaction_risk: { weight: 0.2, score: 0, factors: [] },
        network_risk: { weight: 0.1, score: 0, factors: [] },
        temporal_risk: { weight: 0.05, score: 0, factors: [] },
      },
      flags: { critical: [], high: [], medium: [], low: [] },
      recommendations: [],
    };

    // Contract Risk
    if (factors.contract_age_days < 7) {
      analysis.components.contract_risk.score = 85;
      analysis.components.contract_risk.factors.push('Very new contract');
      analysis.flags.high.push('contract_age_less_than_week');
    } else if (factors.contract_age_days < 30) {
      analysis.components.contract_risk.score = 60;
      analysis.components.contract_risk.factors.push('Relatively new contract');
    } else {
      analysis.components.contract_risk.score = 20;
    }

    if (!factors.is_verified) {
      analysis.components.contract_risk.score += 20;
      analysis.components.contract_risk.factors.push('Contract not verified on Etherscan');
    }

    if (factors.audit_count === 0) {
      analysis.components.contract_risk.score += 15;
      analysis.components.contract_risk.factors.push('No audit reports found');
    }

    if (factors.exploit_history) {
      analysis.components.contract_risk.score += 30;
      analysis.flags.critical.push('contract_exploit_history');
      analysis.recommendations.push(
        'This contract has had exploits. Extreme caution advised.'
      );
    }

    // Normalize scores
    Object.keys(analysis.components).forEach((key: string) => {
      const component = analysis.components[key as keyof typeof analysis.components];
      component.score = Math.min(component.score, 100);
    });

    // Calculate total weighted score
    analysis.total_score =
      analysis.components.contract_risk.score *
        analysis.components.contract_risk.weight +
      analysis.components.value_risk.score * analysis.components.value_risk.weight +
      analysis.components.approval_risk.score *
        analysis.components.approval_risk.weight +
      analysis.components.interaction_risk.score *
        analysis.components.interaction_risk.weight +
      analysis.components.network_risk.score *
        analysis.components.network_risk.weight +
      analysis.components.temporal_risk.score *
        analysis.components.temporal_risk.weight;

    // Add general recommendations
    if (analysis.total_score > 70) {
      analysis.recommendations.push('Consider NOT proceeding with this transaction');
    } else if (analysis.total_score > 40) {
      analysis.recommendations.push('Proceed with extreme caution');
    }

    return analysis;
  }
}

export default AdvancedRiskAnalyzer;
