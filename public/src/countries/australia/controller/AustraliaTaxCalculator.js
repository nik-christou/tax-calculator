import { TaxResult } from "../../../model/TaxResult.js";
import { TaxResults } from "../../../model/TaxResults.js";
import { SalaryDetails } from "../../../model/SalaryDetails.js";
import { SalaryTypes } from "../../../model/SalaryTypes.js";
import { AustraliaTaxDetails } from "../model/AustraliaTaxDetails.js";
import { AustraliaResidents } from "../model/AustraliaResidents.js";
import { AustraliaNonResidents } from "../model/AustraliaNonResidents.js";
import { AustraliaOptions } from "../model/AustraliaTaxOptions.js";

export class AustraliaTaxCalculator {
    /**
     * @param {AustraliaTaxDetails} australiaTaxDetails
     * @param {AustraliaOptions} australiaTaxOptions
     * @param {SalaryDetails} salaryDetails
     */
    static calculateTax(australiaTaxDetails, australiaTaxOptions, salaryDetails) {
        if (salaryDetails.type === SalaryTypes.ANNUAL) {
            return this._calculateTaxFromAnnualIncome(australiaTaxDetails, australiaTaxOptions, salaryDetails);
        }

        return this._calculateTaxFromMonthlyIncome(australiaTaxDetails, australiaTaxOptions, salaryDetails);
    }

    /**
     * @param {AustraliaTaxDetails} australiaTaxDetails
     * @param {AustraliaOptions} australiaTaxOptions
     * @param {SalaryDetails} salaryDetails
     */
    static _calculateTaxFromMonthlyIncome(australiaTaxDetails, australiaTaxOptions, salaryDetails) {
        if (australiaTaxOptions.isResident) {
            const monthlyTaxResults = this._calculateTaxForResidents(australiaTaxDetails.residents, salaryDetails);
            const annualTaxResults = this._convertMontlyToAnnualTax(monthlyTaxResults, salaryDetails.includesThirteen);
            return new TaxResults(monthlyTaxResults, annualTaxResults);
        }

        const monthlyTaxResults = this._calculateTaxForNonResidents(australiaTaxDetails.nonResidents, salaryDetails);
        const annualTaxResults = this._convertMontlyToAnnualTax(monthlyTaxResults, salaryDetails.includesThirteen);

        return new TaxResults(monthlyTaxResults, annualTaxResults);
    }

    /**
     * @param {AustraliaTaxDetails} australiaTaxDetails
     * @param {AustraliaOptions} australiaTaxOptions
     * @param {SalaryDetails} salaryDetails
     */
    static _calculateTaxFromAnnualIncome(australiaTaxDetails, australiaTaxOptions, salaryDetails) {
        if (australiaTaxOptions.isResident) {
            const annualTaxResults = this._calculateTaxForResidents(australiaTaxDetails.residents, salaryDetails);
            const monthlyTaxResults = this._convertAnnualToMonthlyTax(annualTaxResults, salaryDetails.includesThirteen);

            return new TaxResults(monthlyTaxResults, annualTaxResults);
        }

        const annualTaxResults = this._calculateTaxForNonResidents(australiaTaxDetails.nonResidents, salaryDetails);
        const monthlyTaxResults = this._convertAnnualToMonthlyTax(annualTaxResults, salaryDetails.includesThirteen);

        return new TaxResults(monthlyTaxResults, annualTaxResults);
    }

    /**
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
