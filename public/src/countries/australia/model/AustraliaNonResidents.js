
export class AustraliaNonResidents {
    /**
     * @param {Array<import('./AustraliaTaxBracket.js').AustraliaTaxBracket>} taxBrackets
     */
    constructor(taxBrackets) {
        this.taxBrackets = taxBrackets;

        Object.freeze(this.taxBrackets);
        Object.freeze(this);
    }
}
