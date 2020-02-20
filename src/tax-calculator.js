import { TaxResult } from "./results/model/tax-result.js";
import { TaxResults } from "./results/model/tax-results.js";
import { SalaryDetails } from "./salary/model/salary-details.js";
import { Country } from "./country/model/country.js";

import { default as currency } from "currency";

export class TaxCalculator {

    /**
     * @static
     * @param {Country} selectedCountry
     * @param {SalaryDetails} salaryDetails
     */
    static calculateTaxFromMonthlyIncome(selectedCountry, salaryDetails) {

        const monthlyTaxResults = this._calculateTax(selectedCountry, salaryDetails);
        const annualTaxResults = this._convertMontlyToAnnualTax(monthlyTaxResults, salaryDetails.includesThirteen);

        return new TaxResults(monthlyTaxResults, annualTaxResults);
    }

    /**
     * @static
     * @param {Country} selectedCountry
     * @param {SalaryDetails} salaryDetails
     */
    static calculateTaxFromAnnualIncome(selectedCountry, salaryDetails) {

        const annualTaxResults = this._calculateTax(selectedCountry, salaryDetails);
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
            currency(monthlyTax.grossAmount * numMonths).value,
            currency(monthlyTax.taxAmount * numMonths).value,
            currency(monthlyTax.socialAmount * numMonths).value,
            currency(monthlyTax.healthContributionAmount * numMonths).value,
            currency(monthlyTax.netAmount * numMonths).value);
    }

    /**
     * @static
     * @param {TaxResult} annualTax
     * @param {Boolean} includes13thSalary
     */
    static _convertAnnualToMonthlyTax(annualTax, includes13thSalary) {

        const numMonths = includes13thSalary ? 13 : 12;

        return new TaxResult(
            currency(annualTax.grossAmount / numMonths).value,
            currency(annualTax.taxAmount / numMonths).value,
            currency(annualTax.socialAmount / numMonths).value,
            currency(annualTax.healthContributionAmount / numMonths).value,
            currency(annualTax.netAmount / numMonths).value);
    }

    /**
     * @static
     * @param {Country} selectedCountry
     * @param {SalaryDetails} salaryDetails
     *
     * @returns {TaxResult} the tax result
     */
    static _calculateTax(selectedCountry, salaryDetails) {

        const gross = salaryDetails.amount;
        const lastTaxBracketIndex = selectedCountry.taxBrackets.length - 1;

        let remainingAmount = gross;
        let totalTax = 0;

        for (let index = lastTaxBracketIndex; index >= 0; index--) {

            const bracket = selectedCountry.taxBrackets[index];

            if (remainingAmount >= bracket.start && remainingAmount <= bracket.end) {

                const tax = (remainingAmount - bracket.start) * bracket.ratePercent * 0.01;
                totalTax += tax;

                remainingAmount = bracket.start - 1;
            }
        }

        const socialInsurance = gross * selectedCountry.socialInsuranceContributionPercent * 0.01;
        const nhs = gross * selectedCountry.healthContributionPercent * 0.01;
        const netAmount = gross - totalTax - socialInsurance - nhs;

        return new TaxResult(
            currency(gross).value,
            currency(totalTax).value,
            currency(socialInsurance).value,
            currency(nhs).value,
            currency(netAmount).value);
    }
}
