import { TaxResult } from "../../../model/TaxResult.js";
import { TaxResults } from "../../../model/TaxResults.js";
import { SalaryDetails } from "../../../model/SalaryDetails.js";
import { SalaryTypes } from "../../../model/SalaryTypes.js";
import { AustraliaTaxDetails } from "../entity/AustraliaTaxDetails.js";
import { AustraliaResidents } from "../entity/AustraliaResidents.js";
import { AustraliaNonResidents } from "../entity/AustraliaNonResidents.js";

export class AustraliaTaxCalculator {
    /**
     * @static
     * @param {AustraliaTaxDetails} australiaTaxDetails
     * @param {SalaryDetails} salaryDetails
     * @param {Boolean} resident
     */
    static calculateTax(australiaTaxDetails, salaryDetails, resident) {

        if (salaryDetails.type === SalaryTypes.ANNUAL) {
            return this._calculateTaxFromAnnualIncome(australiaTaxDetails, salaryDetails, resident);
        }

        return this._calculateTaxFromMonthlyIncome(australiaTaxDetails, salaryDetails, resident);
    }

    /**
     * @static
     * @param {AustraliaTaxDetails} australiaTaxDetails
     * @param {SalaryDetails} salaryDetails
     * @param {Boolean} resident
     */
    static _calculateTaxFromMonthlyIncome(australiaTaxDetails, salaryDetails, resident) {

        if(resident) {
            const monthlyTaxResults = this._calculateTaxForResidents(australiaTaxDetails.residents, salaryDetails);
            const annualTaxResults = this._convertMontlyToAnnualTax(monthlyTaxResults, salaryDetails.includesThirteen);
            return new TaxResults(monthlyTaxResults, annualTaxResults);
        }

        const monthlyTaxResults = this._calculateTaxForNonResidents(australiaTaxDetails.nonResidents, salaryDetails);
        const annualTaxResults = this._convertMontlyToAnnualTax(monthlyTaxResults, salaryDetails.includesThirteen);
        return new TaxResults(monthlyTaxResults, annualTaxResults);
    }

    /**
     * @static
     * @param {AustraliaTaxDetails} australiaTaxDetails
     * @param {SalaryDetails} salaryDetails
     * @param {Boolean} resident
     */
    static _calculateTaxFromAnnualIncome(australiaTaxDetails, salaryDetails, resident) {

        if(resident) {
            const annualTaxResults = this._calculateTaxForResidents(australiaTaxDetails.residents, salaryDetails);
            const monthlyTaxResults = this._convertAnnualToMonthlyTax(annualTaxResults, salaryDetails.includesThirteen);
            return new TaxResults(monthlyTaxResults, annualTaxResults);
        }

        const annualTaxResults = this._calculateTaxForNonResidents(australiaTaxDetails.nonResidents, salaryDetails);
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
            monthlyTax.netAmount * numMonths
        );
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
            annualTax.netAmount / numMonths
        );
    }

    /**
     * @static
     * @param {AustraliaResidents} australiaResidents
     * @param {SalaryDetails} salaryDetails
     *
     * @returns {TaxResult} the tax result
     */
    static _calculateTaxForResidents(australiaResidents, salaryDetails) {
        const gross = salaryDetails.amount;
        const lastTaxBracketIndex = australiaResidents.taxBrackets.length - 1;

        let remainingAmount = gross;
        let totalTax = 0;

        for (let index = lastTaxBracketIndex; index >= 0; index--) {
            const bracket = australiaResidents.taxBrackets[index];

            if (remainingAmount >= bracket.start && remainingAmount <= bracket.end) {
                const tax = (remainingAmount - bracket.start) * bracket.ratePercent * 0.01;
                totalTax += tax;

                remainingAmount = bracket.start - 1;
            }
        }

        const nhs = gross * australiaResidents.medicarePercent * 0.01;
        const netAmount = gross - totalTax - nhs;

        return new TaxResult(gross, totalTax, 0, nhs, netAmount);
    }

    /**
     * @static
     * @param {AustraliaNonResidents} australiaNonResidents
     * @param {SalaryDetails} salaryDetails
     *
     * @returns {TaxResult} the tax result
     */
    static _calculateTaxForNonResidents(australiaNonResidents, salaryDetails) {
        const gross = salaryDetails.amount;
        const lastTaxBracketIndex = australiaNonResidents.taxBrackets.length - 1;

        let remainingAmount = gross;
        let totalTax = 0;

        for (let index = lastTaxBracketIndex; index >= 0; index--) {
            const bracket = australiaNonResidents.taxBrackets[index];

            if (remainingAmount >= bracket.start && remainingAmount <= bracket.end) {
                const tax = (remainingAmount - bracket.start) * bracket.ratePercent * 0.01;
                totalTax += tax;

                remainingAmount = bracket.start - 1;
            }
        }

        const netAmount = gross - totalTax;

        return new TaxResult(gross, totalTax, 0, 0, netAmount);
    }
}
