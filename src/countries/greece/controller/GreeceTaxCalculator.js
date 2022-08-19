import {TaxResult} from '../../../model/TaxResult.js';
import {TaxResults} from '../../../model/TaxResults.js';
import {TaxCalculatorUtil} from '../../TaxCalculatorUtil.js';

class GreeceTaxCalculator {

    /**
     * @param {GreeceTaxDetails} taxDetails
     * @param {SalaryDetails} salaryDetails
     */
    calculateTax(taxDetails, salaryDetails) {

        const annualGrossAmount = TaxCalculatorUtil.calculateAnnualGrossAmount(salaryDetails);
        return this.#calculateTaxFromAnnualIncome(taxDetails, salaryDetails, annualGrossAmount);
    }

    /**
     * @param {GreeceTaxDetails} taxDetails
     * @param {SalaryDetails} salaryDetails
     * @param {Number} annualGrossAmount
     */
    #calculateTaxFromAnnualIncome(taxDetails, salaryDetails, annualGrossAmount) {

        const annualTaxResults = this.#calculateAnnualTaxResult(taxDetails, annualGrossAmount);
        const monthlyTaxResults = TaxCalculatorUtil.convertAnnualToMonthlyTax(annualTaxResults, salaryDetails.includesThirteen);
        return new TaxResults(monthlyTaxResults, annualTaxResults);
    }

    /**
     * @param {GreeceTaxDetails} taxDetails
     * @param {Number} annualGrossAmount
     * @returns {TaxResult} the tax result
     */
    #calculateAnnualTaxResult(taxDetails, annualGrossAmount) {

        const lastTaxBracketIndex = taxDetails.taxBrackets.length - 1;

        let remainingAmount = annualGrossAmount;
        let totalTax = 0;

        for (let index = lastTaxBracketIndex; index >= 0; index--) {

            const bracket = taxDetails.taxBrackets[index];

            if (remainingAmount >= bracket.start && remainingAmount <= bracket.end) {

                const tax = (remainingAmount - bracket.start) * bracket.ratePercent * 0.01;
                totalTax += tax;

                remainingAmount = bracket.start - 1;
            }
        }

        const socialInsuranceAmount = this.#calculateSocialSecurityAmount(annualGrossAmount, taxDetails);

        const netAmount = annualGrossAmount - totalTax - socialInsuranceAmount;

        return new TaxResult(annualGrossAmount, totalTax, socialInsuranceAmount, 0, netAmount);
    }

    /**
     * @param {Number} annualGrossAmount the annual gross amount
     * @param {GreeceTaxDetails} greeceTaxDetails
     * @returns the social insurance contribution
     */
    #calculateSocialSecurityAmount(annualGrossAmount, greeceTaxDetails) {

        const socialSecurityAmount = annualGrossAmount * greeceTaxDetails.socialSecurity.percent * 0.01;

        if (socialSecurityAmount > greeceTaxDetails.socialSecurity.maxAmount) {
            return greeceTaxDetails.socialSecurity.maxAmount;
        }

        return socialSecurityAmount;
    }
}

export const greeceTaxCalculator = Object.freeze(new GreeceTaxCalculator());