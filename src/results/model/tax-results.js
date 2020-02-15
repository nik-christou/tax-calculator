// @ts-check

export class TaxResults {

    /**
     * @param {Number} grossAmount
     * @param {Number} taxAmount
     * @param {Number} socialAmount
     * @param {Number} healthContributionAmount
     * @param {Number} netAmount
     */
    constructor(grossAmount, taxAmount, socialAmount, healthContributionAmount, netAmount) {

        this.grossAmount = grossAmount;
        this.taxAmount = taxAmount;
        this.socialAmount = socialAmount;
        this.healthContributionAmount = healthContributionAmount;
        this.netAmount = netAmount;

        Object.freeze(this.grossAmount);
        Object.freeze(this.taxAmount);
        Object.freeze(this.socialAmount);
        Object.freeze(this.healthContributionAmount);
        Object.freeze(this.netAmount);
        Object.freeze(this);
    }
}
