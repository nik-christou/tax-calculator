import {TaxResult} from '../../../model/TaxResult.js';
import {TaxResults} from '../../../model/TaxResults.js';
import {TaxCalculatorUtil} from '../../TaxCalculatorUtil.js';
import {ResidenceTypes} from "../../../model/ResidenceTypes";

class AustraliaTaxCalculator {

    /**
     * @param {AustraliaTaxDetails} australiaTaxDetails
     * @param {AustraliaTaxOptions} australiaTaxOptions
     * @param {SalaryDetails} salaryDetails
     */
    calculateTax(australiaTaxDetails, australiaTaxOptions, salaryDetails) {

        const annualGrossAmount = TaxCalculatorUtil.calculateAnnualGrossAmount(salaryDetails);
        return this.#calculateTaxFromAnnualIncome(australiaTaxDetails, australiaTaxOptions, salaryDetails, annualGrossAmount);
    }

    /**
     * @param {AustraliaTaxDetails} australiaTaxDetails
     * @param {AustraliaTaxOptions} australiaTaxOptions
     * @param {SalaryDetails} salaryDetails
     * @param {Number} annualGrossAmount
     */
    #calculateTaxFromAnnualIncome(australiaTaxDetails, australiaTaxOptions, salaryDetails, annualGrossAmount) {

        if (australiaTaxOptions.residenceType.type === ResidenceTypes.RESIDENT.type) {

            const annualTaxResults = this.#calculateTaxForResidents(australiaTaxDetails.residents, annualGrossAmount);
            const monthlyTaxResults = TaxCalculatorUtil.convertAnnualToMonthlyTax(annualTaxResults, salaryDetails.includesThirteen);

            return new TaxResults(monthlyTaxResults, annualTaxResults);
        }

        const annualTaxResults = this.#calculateTaxForNonResidents(australiaTaxDetails.nonResidents, annualGrossAmount);
        const monthlyTaxResults = TaxCalculatorUtil.convertAnnualToMonthlyTax(annualTaxResults, salaryDetails.includesThirteen);

        return new TaxResults(monthlyTaxResults, annualTaxResults);
    }

    /**
     * @param {AustraliaResidents} australiaResidents
     * @param {Number} annualGrossAmount
     * @returns {TaxResult}
     */
    #calculateTaxForResidents(australiaResidents, annualGrossAmount) {

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
     * @param {AustraliaNonResidents} australiaNonResidents
     * @param {Number} annualGrossAmount
     * @returns {TaxResult}
     */
    #calculateTaxForNonResidents(australiaNonResidents, annualGrossAmount) {
        
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

export const australiaTaxCalculator = Object.freeze(new AustraliaTaxCalculator());
