
export class GermanPensionInsurance {
    /**
     * @param {Number} percent
     * @param {Number} maxAmount
     */
    constructor(percent, maxAmount) {
        this.percent = percent;
        this.maxAmount = maxAmount;

        Object.freeze(this.percent);
        Object.freeze(this.maxAmount);
        Object.freeze(this);
    }
}
