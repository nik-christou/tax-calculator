import { SalaryTypes } from '../model/SalaryTypes.js';
import { TaxResult } from '../model/TaxResult.js';
import { TaxBreakdownBracket } from '../model/TaxBreakdownBracket.js';
 
export class TaxCalculatorUtil {

    /**
     * @static
     * @param {import('../model/SalaryDetails.js').SalaryDetails} salaryDetails
     * 
     * @returns the annual gross amount
     */
    static calculateAnnualGrossAmount(salaryDetails) {

        if (salaryDetails.type === SalaryTypes.MONTHLY) {
            if (salaryDetails.includesThirteen) {
                return salaryDetails.amount * 13;
            } else {
                return salaryDetails.amount * 12;
            }
        }

        if (salaryDetails.type === SalaryTypes.ANNUAL) {
            return salaryDetails.amount;
        }
    }

    /**
     * @static
     * @param {TaxResult} annualTaxResult
     * @param {Boolean} includes13thSalary
     */
    static convertAnnualToMonthlyTax(annualTaxResult, includes13thSalary) {

        const numMonths = includes13thSalary ? 13 : 12;

        /**
         * @type {Array<TaxBreakdownBracket>}
         */
        const monthlyTaxBreakdownBrackets = [];

        if(annualTaxResult.taxBreakdownBrackets) {

            const annualTaxBreadownBrackets = annualTaxResult.taxBreakdownBrackets;

            for (let index = 0; index < annualTaxBreadownBrackets.length; index++) {

                const annualTaxBreakdownBracket = annualTaxBreadownBrackets[index];

                /**
                 * @type {TaxBreakdownBracket}
                 */
                const monthlyTaxBreakdownBracket = new TaxBreakdownBracket(
                    annualTaxBreakdownBracket.start, 
                    annualTaxBreakdownBracket.end,
                    annualTaxBreakdownBracket.ratePercent,
                    annualTaxBreakdownBracket.taxAmount / numMonths
                );

                monthlyTaxBreakdownBrackets.push(monthlyTaxBreakdownBracket);
            }
        }

        return new TaxResult(
            annualTaxResult.grossAmount / numMonths,
            annualTaxResult.taxAmount / numMonths,
            annualTaxResult.socialAmount / numMonths,
            annualTaxResult.healthContributionAmount / numMonths,
            annualTaxResult.netAmount / numMonths,
            monthlyTaxBreakdownBrackets
        );
    }

    /**
     * @static
     * @param {TaxResult} monthlyTax
     * @param {Boolean} includes13thSalary
     */
    static convertMontlyToAnnualTax(monthlyTax, includes13thSalary) {
        const numMonths = includes13thSalary ? 13 : 12;

        return new TaxResult(
            monthlyTax.grossAmount * numMonths,
            monthlyTax.taxAmount * numMonths,
            monthlyTax.socialAmount * numMonths,
            monthlyTax.healthContributionAmount * numMonths,
            monthlyTax.netAmount * numMonths
        );
    }
}