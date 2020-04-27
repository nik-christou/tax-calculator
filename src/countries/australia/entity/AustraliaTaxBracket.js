export class AustraliaTaxBracket {
    /**
     * @param {Number} start
     * @param {Number} end
     * @param {Number} fixedCharge
     * @param {Number} ratePercent
     */
    constructor(start, end, fixedCharge, ratePercent) {
        this.start = start;
        this.end = end;
        this.fixedCharge = fixedCharge;
        this.ratePercent = ratePercent;

        Object.freeze(this.start);
        Object.freeze(this.end);
        Object.freeze(this.fixedCharge);
        Object.freeze(this.ratePercent);
        Object.freeze(this);
    }
}
