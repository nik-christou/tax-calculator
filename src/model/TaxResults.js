import { TaxResult } from "./TaxResult.js";

export class TaxResults {
    /**
     * @param {TaxResult} monthlyTaxResult
     * @param {TaxResult} annualTaxResult
     */
    constructor(monthlyTaxResult, annualTaxResult) {
        this.monthlyTaxResult = monthlyTaxResult;
        this.annualTaxResult = annualTaxResult;

        Object.freeze(this.monthlyTaxResult);
        Object.freeze(this.annualTaxResult);
        Object.freeze(this);
    }
}
