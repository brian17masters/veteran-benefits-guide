
export interface RiskProfile {
  stocks: number;
  bonds: number;
  cash: number;
  expectedReturn: number;
}

const riskProfiles = {
  conservative: { stocks: 30, bonds: 60, cash: 10, expectedReturn: 5 },
  moderate: { stocks: 60, bonds: 35, cash: 5, expectedReturn: 7 },
  aggressive: { stocks: 80, bonds: 15, cash: 5, expectedReturn: 9 }
};

export const getRiskProfile = (riskTolerance: number): RiskProfile => {
  if (riskTolerance < 33) {
    return riskProfiles.conservative;
  } else if (riskTolerance < 66) {
    return riskProfiles.moderate;
  } else {
    return riskProfiles.aggressive;
  }
};
