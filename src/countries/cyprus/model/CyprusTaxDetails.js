
export class CyprusTaxDetails {
    /**
     * @param {Array<import('./CyprusTaxBracket.js').CyprusTaxBracket>} taxBrackets
     * @param {import('./CyprusContributions.js').CyprusContributions} employedContributions
     * @param {import('./CyprusContributions.js').CyprusContributions} selfEmployedContributions
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
