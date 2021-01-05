export class GermanTaxBracket {
    /**
     * @param {Number} start
     * @param {Number} end
     * @param {Number} ratePercent
     */
    constructor(start, end, ratePercent) {
        this.start = start;
        this.end = end;
        this.ratePercent = ratePercent;

        Object.freeze(this.start);
        Object.freeze(this.end);
        Object.freeze(this.ratePercent);
        Object.freeze(this);
    }
}
