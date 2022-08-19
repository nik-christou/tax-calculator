
export class GreeceTaxDetails {

    /**
     * @param {GreeceTaxBracket[]} taxBrackets
     * @param {GreeceSocialSecurity} socialSecurity
     */
    constructor(taxBrackets, socialSecurity) {

        this.taxBrackets = taxBrackets;
        this.socialSecurity = socialSecurity;

        Object.freeze(this.taxBrackets);
        Object.freeze(this.socialSecurity);
        Object.freeze(this);
    }
}