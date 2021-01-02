
export class CyprusTaxDetails {
    /**
     * @param {Array<import('./CyprusTaxBracket.js').CyprusTaxBracket>} taxBrackets
     * @param {Number} socialInsuranceContributionPercent
     * @param {Number} healthContributionPercent
     */
    constructor(taxBrackets, socialInsuranceContributionPercent, healthContributionPercent) {
        this.taxBrackets = taxBrackets;
        this.socialInsuranceContributionPercent = socialInsuranceContributionPercent;
        this.healthContributionPercent = healthContributionPercent;

        Object.freeze(this.taxBrackets);
        Object.freeze(this.socialInsuranceContributionPercent);
        Object.freeze(this.healthContributionPercent);
        Object.freeze(this);
    }
}
