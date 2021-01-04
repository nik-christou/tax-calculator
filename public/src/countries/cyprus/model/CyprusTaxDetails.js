
export class CyprusTaxDetails {
    /**
     * @param {Array<import('./CyprusTaxBracket.js').CyprusTaxBracket>} taxBrackets
     * @param {import('./CyprusContributions.js').CyprusContributions} employedContributions
     * @param {import('./CyprusContributions.js').CyprusContributions} selfEmployedContributions
     */
    constructor(taxBrackets, employedContributions, selfEmployedContributions) {
        this.taxBrackets = taxBrackets;
        this.employedContributions = employedContributions;
        this.selfEmployedContributions = selfEmployedContributions;

        Object.freeze(this.taxBrackets);
        Object.freeze(this.employedContributions);
        Object.freeze(this.selfEmployedContributions);
        Object.freeze(this);
    }
}
