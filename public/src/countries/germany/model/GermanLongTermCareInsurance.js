
export class GermanLongTermCareInsurance {
    /**
     * @param {Number} childlessPercent
     * @param {Number} withChildPercent
     * @param {Number} maxAmount
     */
    constructor(childlessPercent, withChildPercent, maxAmount) {
        this.childlessPercent = childlessPercent;
        this.withChildPercent = withChildPercent;
        this.maxAmount = maxAmount;

        Object.freeze(this.childlessPercent);
        Object.freeze(this.withChildPercent);
        Object.freeze(this.maxAmount);
        Object.freeze(this);
    }
}
