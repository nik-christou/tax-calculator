import { TaxResult } from '../../../model/TaxResult.js';
import { TaxResults } from '../../../model/TaxResults.js';
import { TaxCalculatorUtil } from '../../TaxCalculatorUtil.js';

export class AustraliaTaxCalculator {

    /**
     * @param {import('../model/AustraliaTaxDetails.js').AustraliaTaxDetails} australiaTaxDetails
     * @param {import('../model/AustraliaTaxOptions.js').AustraliaOptions} australiaTaxOptions
     * @param {import('../../../model/SalaryDetails.js').SalaryDetails} salaryDetails
     */
    static calculateTax(australiaTaxDetails, australiaTaxOptions, salaryDetails) {

        const annualGrossAmount = TaxCalculatorUtil.calculateAnnualGrossAmount(salaryDetails);

        return this._calculateTaxFromAnnualIncome(australiaTaxDetails, australiaTaxOptions, salaryDetails, annualGrossAmount);
    }

    /**
     * @param {import('../model/AustraliaTaxDetails.js').AustraliaTaxDetails} australiaTaxDetails
     * @param {import('../model/AustraliaTaxOptions.js').AustraliaOptions} australiaTaxOptions
     * @param {import('../../../model/SalaryDetails.js').SalaryDetails} salaryDetails
     * @param {Number} annualGrossAmount
     */
    static _calculateTaxFromAnnualIncome(australiaTaxDetails, australiaTaxOptions, salaryDetails, annualGrossAmount) {

        if (australiaTaxOptions.isResident) {

            const annualTaxResults = this._calculateTaxForResidents(australiaTaxDetails.residents, annualGrossAmount);
            const monthlyTaxResults = TaxCalculatorUtil.convertAnnualToMonthlyTax(annualTaxResults, salaryDetails.includesThirteen);

            return new TaxResults(monthlyTaxResults, annualTaxResults);
        }

        const annualTaxResults = this._calculateTaxForNonResidents(australiaTaxDetails.nonResidents, annualGrossAmount);
        const monthlyTaxResults = TaxCalculatorUtil.convertAnnualToMonthlyTax(annualTaxResults, salaryDetails.includesThirteen);

        return new TaxResults(monthlyTaxResults, annualTaxResults);
    }

    /**
     * @param {import('../model/AustraliaResidents.js').AustraliaResidents} australiaResidents
     * @param {Number} annualGrossAmount
     *
     * @returns {TaxResult} the tax result
     */
    static _calculateTaxForResidents(australiaResidents, annualGrossAmount) {

        const lastTaxBracketIndex = australiaResidents.taxBrackets.length - 1;

        let remainingAmount = annualGrossAmount;
        let totalTax = 0;

        for (let index = lastTaxBracketIndex; index >= 0; index--) {

            const bracket = australiaResidents.taxBrackets[index];

            if (remainingAmount >= bracket.start && remainingAmount <= bracket.end) {
                const tax = (remainingAmount - bracket.start) * bracket.ratePercent * 0.01;
                totalTax += tax;

                remainingAmount = bracket.start - 1;
            }
        }

        const nhs = annualGrossAmount * australiaResidents.medicarePercent * 0.01;
        const netAmount = annualGrossAmount - totalTax - nhs;

        return new TaxResult(annualGrossAmount, totalTax, 0, nhs, netAmount);
    }

    /**
     * @param {import('../model/AustraliaNonResidents.js').AustraliaNonResidents} australiaNonResidents
     * @param {Number} annualGrossAmount
     *
     * @returns {TaxResult} the tax result
     */
    static _calculateTaxForNonResidents(australiaNonResidents, annualGrossAmount) {
        
        const lastTaxBracketIndex = australiaNonResidents.taxBrackets.length - 1;

        let remainingAmount = annualGrossAmount;
        let totalTax = 0;

        for (let index = lastTaxBracketIndex; index >= 0; index--) {

            const bracket = australiaNonResidents.taxBrackets[index];

            if (remainingAmount >= bracket.start && remainingAmount <= bracket.end) {
                const tax = (remainingAmount - bracket.start) * bracket.ratePercent * 0.01;
                totalTax += tax;

                remainingAmount = bracket.start - 1;
            }
        }

        const netAmount = annualGrossAmount - totalTax;

        return new TaxResult(annualGrossAmount, totalTax, 0, 0, netAmount);
    }
}
