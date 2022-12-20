
export class AustraliaNonResidents {
    /**
     * @param {AustraliaTaxBracket[]} taxBrackets
     * @param {Number} medicarePercent
     */
    constructor(taxBrackets, medicarePercent) {
        this.taxBrackets = taxBrackets;
        this.medicarePercent = medicarePercent;

        Object.freeze(this.taxBrackets);
        Object.freeze(this.medicarePercent);
        Object.freeze(this);
    }
}
