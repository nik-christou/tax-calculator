export class TaxBreakdownBracket {

    /**
     * @param {Number} start the tax bracket start
     * @param {Number} end the tax bracket end
     * @param {Number} ratePercent the tax bracket rate percent
     * @param {Number} taxAmount the amount 
     */
    constructor(start, end, ratePercent, taxAmount) {
        this.start = start;
        this.end = end;
        this.ratePercent = ratePercent;
        this.taxAmount = taxAmount;

        Object.freeze(this.start);
        Object.freeze(this.end);
        Object.freeze(this.ratePercent);
        Object.freeze(taxAmount);
        Object.freeze(this);
    }
}