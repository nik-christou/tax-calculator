
export class AustraliaNonResidents {
    /**
     * @param {AustraliaTaxBracket[]} taxBrackets
     */
    constructor(taxBrackets) {
        this.taxBrackets = taxBrackets;

        Object.freeze(this.taxBrackets);
        Object.freeze(this);
    }
}
