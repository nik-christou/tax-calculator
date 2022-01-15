
export class TaxResults {
    /**
     * @param {import('./TaxResult.js').TaxResult} monthlyTaxResult
     * @param {import('./TaxResult.js').TaxResult} annualTaxResult
     */
    constructor(monthlyTaxResult, annualTaxResult) {

        this.monthlyTaxResult = monthlyTaxResult;
        this.annualTaxResult = annualTaxResult;

        Object.freeze(this.monthlyTaxResult);
        Object.freeze(this.annualTaxResult);
        Object.freeze(this);
    }
}
