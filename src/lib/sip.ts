export interface YearlyBreakdown {
  year: number;
  invested: number;
  value: number;
  profit: number;
}

export interface SIPInputs {
  initialInvestment: number;
  monthlyInvestment: number;
  expectedReturn: number;
  tenure: number;
  stepUp: number;
}

/**
 * Computes year-by-year breakdown for SIP with monthly compounding and step-up
 * @param P0 - Initial investment (lump sum)
 * @param M - Monthly investment amount (base)
 * @param annualRate - Expected annual return rate (as percentage, e.g., 12 for 12%)
 * @param years - Investment tenure in years
 * @param stepUp - Annual step-up percentage (e.g., 10 for 10%)
 * @returns Array of yearly breakdown objects
 */
export function computeYearlyBreakdown(
  P0: number,
  M: number,
  annualRate: number,
  years: number,
  stepUp: number = 0
): YearlyBreakdown[] {
  const results: YearlyBreakdown[] = [];
  
  // Monthly interest rate
  const i = annualRate / 100 / 12;
  const stepUpFactor = stepUp / 100;
  
  let cumulativeInvested = P0;
  let portfolioValue = P0;
  
  for (let y = 1; y <= years; y++) {
    // Monthly investment for this year with step-up
    const monthlyForYear = M * Math.pow(1 + stepUpFactor, y - 1);
    
    // Add this year's contributions to cumulative invested
    cumulativeInvested += monthlyForYear * 12;
    
    // Calculate portfolio value at end of this year
    if (i === 0) {
      // Handle 0% return case
      portfolioValue += monthlyForYear * 12;
    } else {
      // Grow previous portfolio value for 12 months
      portfolioValue *= Math.pow(1 + i, 12);
      
      // Add future value of this year's monthly contributions
      const yearContributions = monthlyForYear * ((Math.pow(1 + i, 12) - 1) / i);
      portfolioValue += yearContributions;
    }
    
    const profit = portfolioValue - cumulativeInvested;
    
    results.push({
      year: y,
      invested: cumulativeInvested,
      value: portfolioValue,
      profit: profit,
    });
  }
  
  return results;
}

/**
 * Validates SIP inputs
 */
export function validateInputs(inputs: SIPInputs): string | null {
  if (inputs.initialInvestment < 0) {
    return "Initial investment cannot be negative";
  }
  if (inputs.monthlyInvestment < 0) {
    return "Monthly investment cannot be negative";
  }
  if (inputs.initialInvestment === 0 && inputs.monthlyInvestment === 0) {
    return "At least one investment amount must be greater than 0";
  }
  if (inputs.expectedReturn < 0) {
    return "Expected return cannot be negative";
  }
  if (inputs.tenure < 1) {
    return "Tenure must be at least 1 year";
  }
  if (!Number.isInteger(inputs.tenure)) {
    return "Tenure must be a whole number";
  }
  if (inputs.stepUp < 0) {
    return "Step-up percentage cannot be negative";
  }
  return null;
}
