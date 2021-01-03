import { TaxResult } from '../../../model/TaxResult.js';
import { TaxResults } from '../../../model/TaxResults.js';
import { TaxCalculatorUtil } from '../../TaxCalculatorUtil.js';

export class CyprusTaxCalculator {

    /**
     * @static
     * @param {import('../model/CyprusTaxDetails.js').CyprusTaxDetails} cyprusTaxDetails
     * @param {import('../../../model/SalaryDetails.js').SalaryDetails} salaryDetails
     */
    static calculateTax(cyprusTaxDetails, salaryDetails) {
        
        const annualGrossAmount = TaxCalculatorUtil.calculateAnnualGrossAmount(salaryDetails);

        return this._calculateTaxFromAnnualIncome(cyprusTaxDetails, salaryDetails, annualGrossAmount);
    }

    /**
     * @static
     * @param {import('../model/CyprusTaxDetails.js').CyprusTaxDetails} cyprusTaxDetails
     * @param {import('../../../model/SalaryDetails.js').SalaryDetails} salaryDetails
     * @param {Number} annualGrossAmount
     */
    static _calculateTaxFromAnnualIncome(cyprusTaxDetails, salaryDetails, annualGrossAmount) {
        
        const annualTaxResults = this._calculateAnnualTaxResult(cyprusTaxDetails, annualGrossAmount);
        const monthlyTaxResults = TaxCalculatorUtil.convertAnnualToMonthlyTax(annualTaxResults, salaryDetails.includesThirteen);

        return new TaxResults(monthlyTaxResults, annualTaxResults);
    }

    /**
     * @static
     * 
     * @param {import('../model/CyprusTaxDetails.js').CyprusTaxDetails} cyprusTaxDetails
     * @param {Number} annualGrossAmount
     *
     * @returns {TaxResult} the tax result
     */
    static _calculateAnnualTaxResult(cyprusTaxDetails, annualGrossAmount) {

        const lastTaxBracketIndex = cyprusTaxDetails.taxBrackets.length - 1;

        let remainingAmount = annualGrossAmount;
        let totalTax = 0;

        for (let index = lastTaxBracketIndex; index >= 0; index--) {

            const bracket = cyprusTaxDetails.taxBrackets[index];

            if (remainingAmount >= bracket.start && remainingAmount <= bracket.end) {

                const tax = (remainingAmount - bracket.start) * bracket.ratePercent * 0.01;
                totalTax += tax;

                remainingAmount = bracket.start - 1;
            }
        }

        const socialInsurance = annualGrossAmount * cyprusTaxDetails.socialInsuranceContributionPercent * 0.01;
        const nhs = annualGrossAmount * cyprusTaxDetails.healthContributionPercent * 0.01;
        const netAmount = annualGrossAmount - totalTax - socialInsurance - nhs;

        return new TaxResult(annualGrossAmount, totalTax, socialInsurance, nhs, netAmount);
    }
}
