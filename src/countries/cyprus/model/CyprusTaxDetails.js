
export class CyprusTaxDetails {
    /**
     * @param {CyprusTaxBracket[]} taxBrackets
     * @param {CyprusContributions} employedContributions
     * @param {CyprusContributions} selfEmployedContributions
     * @param {Number} maximumAnnualHealthContributionCap
     * @param {Number} maximumAnnualSocialContributionCap
     */
    constructor(taxBrackets, 
        employedContributions, 
        selfEmployedContributions, 
        maximumAnnualHealthContributionCap,
        maximumAnnualSocialContributionCap) {
            
        this.taxBrackets = taxBrackets;
        this.employedContributions = employedContributions;
        this.selfEmployedContributions = selfEmployedContributions;
        this.maximumAnnualHealthContributionCap = maximumAnnualHealthContributionCap;
        this.maximumAnnualSocialContributionCap = maximumAnnualSocialContributionCap;

        Object.freeze(this.taxBrackets);
        Object.freeze(this.employedContributions);
        Object.freeze(this.selfEmployedContributions);
        Object.freeze(this.maximumAnnualHealthContributionCap);
        Object.freeze(this.maximumAnnualSocialContributionCap);
        Object.freeze(this);
    }
}
