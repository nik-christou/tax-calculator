
export class GreeceTaxDetails {

    /**
     * @param {Array<import('./GreeceTaxBracket.js').GreeceTaxBracket>} taxBrackets
     * @param {import('./GreeceSocialSecurity.js').GreeceSocialSecurity} socialSecurity
     */
    constructor(taxBrackets, socialSecurity) {

        this.taxBrackets = taxBrackets;
        this.socialSecurity = socialSecurity;

        Object.freeze(this.taxBrackets);
        Object.freeze(this.socialSecurity);
        Object.freeze(this);
    }
}