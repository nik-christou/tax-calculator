import { SalaryTypes } from '../model/SalaryTypes.js';
import { TaxResult } from '../model/TaxResult.js';

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
     * @param {TaxResult} annualTax
     * @param {Boolean} includes13thSalary
     */
    static convertAnnualToMonthlyTax(annualTax, includes13thSalary) {

        const numMonths = includes13thSalary ? 13 : 12;

        return new TaxResult(
            annualTax.grossAmount / numMonths,
            annualTax.taxAmount / numMonths,
            annualTax.socialAmount / numMonths,
            annualTax.healthContributionAmount / numMonths,
            annualTax.netAmount / numMonths
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