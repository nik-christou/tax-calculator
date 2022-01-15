export class TaxResult {
    /**
     * @param {Number} grossAmount
     * @param {Number} taxAmount
     * @param {Number} socialAmount
     * @param {Number} healthContributionAmount
     * @param {Number} netAmount
     * @param {Array<import('./TaxBreakdownBracket.js').TaxBreakdownBracket>} taxBreakdownBrackets 
     */
    constructor(
        grossAmount, 
        taxAmount, 
        socialAmount, 
        healthContributionAmount, 
        netAmount,
        taxBreakdownBrackets) {

        this.grossAmount = grossAmount;
        this.taxAmount = taxAmount;
        this.socialAmount = socialAmount;
        this.healthContributionAmount = healthContributionAmount;
        this.netAmount = netAmount;
        this.taxBreakdownBrackets = taxBreakdownBrackets;

        Object.freeze(this.grossAmount);
        Object.freeze(this.taxAmount);
        Object.freeze(this.socialAmount);
        Object.freeze(this.healthContributionAmount);
        Object.freeze(this.netAmount);
        Object.freeze(taxBreakdownBrackets);
        Object.freeze(this);
    }
}
