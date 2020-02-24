import { TaxResult } from "../../../results/model/tax-result.js";
import { TaxResults } from "../../../results/model/tax-results.js";
import { SalaryDetails } from "../../../salary/model/salary-details.js";
import { CyprusTaxDetails } from "../entity/CyprusTaxDetails.js";
import { SalaryTypes } from "../../../salary/control/salary-type-enum.js";

export class CyprusTaxCalculator {

    /**
     * @static
     * @param {CyprusTaxDetails} cyprusTaxDetails
     * @param {SalaryDetails} salaryDetails
     */
    static calculateTax(cyprusTaxDetails, salaryDetails) {

        if(salaryDetails.type === SalaryTypes.ANNUAL) {
            return this._calculateTaxFromAnnualIncome(cyprusTaxDetails, salaryDetails);
        }

        return this._calculateTaxFromMonthlyIncome(cyprusTaxDetails, salaryDetails);
    }

    /**
     * @static
     * @param {CyprusTaxDetails} cyprusTaxDetails
     * @param {SalaryDetails} salaryDetails
     */
    static _calculateTaxFromMonthlyIncome(cyprusTaxDetails, salaryDetails) {

        const monthlyTaxResults = this._calculateTax(cyprusTaxDetails, salaryDetails);
        const annualTaxResults = this._convertMontlyToAnnualTax(monthlyTaxResults, salaryDetails.includesThirteen);

        return new TaxResults(monthlyTaxResults, annualTaxResults);
    }

    /**
     * @static
     * @param {CyprusTaxDetails} cyprusTaxDetails
     * @param {SalaryDetails} salaryDetails
     */
    static _calculateTaxFromAnnualIncome(cyprusTaxDetails, salaryDetails) {

        const annualTaxResults = this._calculateTax(cyprusTaxDetails, salaryDetails);
        const monthlyTaxResults = this._convertAnnualToMonthlyTax(annualTaxResults, salaryDetails.includesThirteen);

        return new TaxResults(monthlyTaxResults, annualTaxResults);
    }

    /**
     * @static
     * @param {TaxResult} monthlyTax
     * @param {Boolean} includes13thSalary
     */
    static _convertMontlyToAnnualTax(monthlyTax, includes13thSalary) {

        const numMonths = includes13thSalary ? 13 : 12;

        return new TaxResult(
            monthlyTax.grossAmount * numMonths,
            monthlyTax.taxAmount * numMonths,
            monthlyTax.socialAmount * numMonths,
            monthlyTax.healthContributionAmount * numMonths,
            monthlyTax.netAmount * numMonths);
    }

    /**
     * @static
     * @param {TaxResult} annualTax
     * @param {Boolean} includes13thSalary
     */
    static _convertAnnualToMonthlyTax(annualTax, includes13thSalary) {

        const numMonths = includes13thSalary ? 13 : 12;

        return new TaxResult(
            annualTax.grossAmount / numMonths,
            annualTax.taxAmount / numMonths,
            annualTax.socialAmount / numMonths,
            annualTax.healthContributionAmount / numMonths,
            annualTax.netAmount / numMonths);
    }

    /**
     * @static
     * @param {CyprusTaxDetails} cyprusTaxDetails
     * @param {SalaryDetails} salaryDetails
     *
     * @returns {TaxResult} the tax result
     */
    static _calculateTax(cyprusTaxDetails, salaryDetails) {

        const gross = salaryDetails.amount;
        const lastTaxBracketIndex = cyprusTaxDetails.taxBrackets.length - 1;

        let remainingAmount = gross;
        let totalTax = 0;

        for (let index = lastTaxBracketIndex; index >= 0; index--) {

            const bracket = cyprusTaxDetails.taxBrackets[index];

            if (remainingAmount >= bracket.start && remainingAmount <= bracket.end) {

                const tax = (remainingAmount - bracket.start) * bracket.ratePercent * 0.01;
                totalTax += tax;

                remainingAmount = bracket.start - 1;
            }
        }

        const socialInsurance = gross * cyprusTaxDetails.socialInsuranceContributionPercent * 0.01;
        const nhs = gross * cyprusTaxDetails.healthContributionPercent * 0.01;
        const netAmount = gross - totalTax - socialInsurance - nhs;

        return new TaxResult(
            gross,
            totalTax,
            socialInsurance,
            nhs,
            netAmount);
    }
}
