import {TaxResult} from '../../../model/TaxResult.js';
import {TaxResults} from '../../../model/TaxResults.js';
import {TaxCalculatorUtil} from '../../TaxCalculatorUtil.js';
import {ResidenceTypes} from "../../../model/ResidenceTypes";
import {TaxBreakdownBracket} from "../../../model/TaxBreakdownBracket";

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

        let totalTax = 0;
        let remainingAmount = annualGrossAmount;
        const taxBreakdownBrackets = [australiaResidents.taxBrackets.length];

        for (let index = lastTaxBracketIndex; index >= 0; index--) {

            const bracket = australiaResidents.taxBrackets[index];

            if (remainingAmount >= bracket.start && (remainingAmount <= bracket.end || index === lastTaxBracketIndex)) {

                const tax = (remainingAmount - bracket.start) * bracket.ratePercent * 0.01;
                totalTax += tax;

                remainingAmount = bracket.start - 1;

                taxBreakdownBrackets[index] = new TaxBreakdownBracket(
                    bracket.start,
                    index === lastTaxBracketIndex ? null : bracket.end,
                    bracket.ratePercent, tax);
            }
        }

        const nhs = annualGrossAmount * australiaResidents.medicarePercent * 0.01;
        const netAmount = annualGrossAmount - totalTax - nhs;

        return new TaxResult(annualGrossAmount, totalTax, 0, nhs, netAmount, taxBreakdownBrackets);
    }

    /**
     * @param {AustraliaNonResidents} australiaNonResidents
     * @param {Number} annualGrossAmount
     * @returns {TaxResult}
     */
    #calculateTaxForNonResidents(australiaNonResidents, annualGrossAmount) {
        
        const lastTaxBracketIndex = australiaNonResidents.taxBrackets.length - 1;

        let totalTax = 0;
        let remainingAmount = annualGrossAmount;
        const taxBreakdownBrackets = [australiaNonResidents.taxBrackets.length];

        for (let index = lastTaxBracketIndex; index >= 0; index--) {

            const bracket = australiaNonResidents.taxBrackets[index];

            if (remainingAmount >= bracket.start && (remainingAmount <= bracket.end || index === lastTaxBracketIndex)) {

                const tax = (remainingAmount - bracket.start) * bracket.ratePercent * 0.01;
                totalTax += tax;

                remainingAmount = bracket.start - 1;

                taxBreakdownBrackets[index] = new TaxBreakdownBracket(
                    bracket.start,
                    index === lastTaxBracketIndex ? null : bracket.end,
                    bracket.ratePercent, tax);
            }
        }

        const nhs = annualGrossAmount * australiaNonResidents.medicarePercent * 0.01;
        const netAmount = annualGrossAmount - totalTax - nhs;

        return new TaxResult(annualGrossAmount, totalTax, 0, nhs, netAmount, taxBreakdownBrackets);
    }
}

export const australiaTaxCalculator = Object.freeze(new AustraliaTaxCalculator());
