import {TaxResult} from '../../../model/TaxResult.js';
import {TaxResults} from '../../../model/TaxResults.js';
import {TaxCalculatorUtil} from '../../TaxCalculatorUtil.js';
import {MaritalStatuses} from "../../../model/MaritalStatuses.js";
import {ParentalStatuses} from "../../../model/ParentalStatuses.js";

class GermanTaxCalculator {

    /**
     * @param {GermanTaxDetails} germanTaxDetails
     * @param {GermanTaxOptions} germanTaxOptions
     * @param {SalaryDetails} salaryDetails
     */
    calculateTax(germanTaxDetails, germanTaxOptions, salaryDetails) {

        const annualGrossAmount = TaxCalculatorUtil.calculateAnnualGrossAmount(salaryDetails);
        return this.#calculateTaxFromAnnualIncome(germanTaxDetails, germanTaxOptions, salaryDetails, annualGrossAmount);
    }

    /**
     * @param {GermanTaxDetails} germanTaxDetails
     * @param {GermanTaxOptions} germanTaxOptions
     * @param {SalaryDetails} salaryDetails
     * @param {Number} annualGrossAmount
     */
    #calculateTaxFromAnnualIncome(germanTaxDetails, germanTaxOptions, salaryDetails, annualGrossAmount) {
        
        const annualTaxResults = this.#calculateAnnualTaxResult(germanTaxDetails, germanTaxOptions, annualGrossAmount);
        const monthlyTaxResults = TaxCalculatorUtil.convertAnnualToMonthlyTax(annualTaxResults, salaryDetails.includesThirteen);

        return new TaxResults(monthlyTaxResults, annualTaxResults);
    }

    /**
     * @param {GermanTaxDetails} germanTaxDetails
     * @param {GermanTaxOptions} germanTaxOptions
     * @param {Number} annualGrossAmount
     * @returns {TaxResult}
     */
    #calculateAnnualTaxResult(germanTaxDetails, germanTaxOptions, annualGrossAmount) {

        const lastTaxBracketIndex = this.#getLastTaxBracketIndex(germanTaxDetails, germanTaxOptions);

        let remainingAmount = annualGrossAmount;
        let totalTax = 0;

        for (let index = lastTaxBracketIndex; index >= 0; index--) {

            const bracket = this.#getTaxBracket(germanTaxDetails, germanTaxOptions, index);

            if (remainingAmount >= bracket.start && remainingAmount <= bracket.end) {

                const tax = (remainingAmount - bracket.start) * bracket.ratePercent * 0.01;
                totalTax += tax;

                remainingAmount = bracket.start - 1;
            }
        }

        const pensionInsurance = this.#calculatePensionInsuranceAmount(annualGrossAmount, germanTaxDetails);
        const unemploymentInsurance = this.#calculateUnemploymentInsuranceAmount(annualGrossAmount, germanTaxDetails);
        const healthInsurance = this.#calculateHealthInsuranceAmount(annualGrossAmount, germanTaxDetails);
        const longTermInsurance = this.#calculateLongTermCareInsuranceAmount(annualGrossAmount, germanTaxDetails, germanTaxOptions);

        const socialContributionsTotal = pensionInsurance + unemploymentInsurance + longTermInsurance;
        const netAmount = annualGrossAmount - totalTax - healthInsurance - socialContributionsTotal;

        return new TaxResult(annualGrossAmount, totalTax, socialContributionsTotal, healthInsurance, netAmount);
    }

    /**
     * @param {GermanTaxDetails} germanTaxDetails
     * @param {GermanTaxOptions} germanTaxOptions
     * @param {Number} index the tax bracket index
     */
    #getTaxBracket(germanTaxDetails, germanTaxOptions, index) {

        if (germanTaxOptions.maritalStatus.type === MaritalStatuses.SINGLE.type) {
            return germanTaxDetails.singleTaxBrackets[index];
        }

        return germanTaxDetails.marriedTaxBrackets[index];
    }

    /**
     * @param {GermanTaxDetails} germanTaxDetails
     * @param {GermanTaxOptions} germanTaxOptions
     */
    #getLastTaxBracketIndex(germanTaxDetails, germanTaxOptions) {

        if (germanTaxOptions.maritalStatus.type === MaritalStatuses.SINGLE.type) {
            return germanTaxDetails.singleTaxBrackets.length - 1;
        } 

        return germanTaxDetails.marriedTaxBrackets.length - 1;
    }

    /**
     * @param {Number} annualGrossAmount the annual gross amount
     * @param {GermanTaxDetails} germanTaxDetails
     * @returns {Number} the social insurance contribution
     */
    #calculatePensionInsuranceAmount(annualGrossAmount, germanTaxDetails) {

        const pensionInsuranceAmount = annualGrossAmount * germanTaxDetails.pensionInsurance.percent * 0.01;

        if (pensionInsuranceAmount > germanTaxDetails.pensionInsurance.maxAmount) {
            return germanTaxDetails.pensionInsurance.maxAmount;
        }

        return pensionInsuranceAmount;
    }

    /**
     * @param {Number} annualGrossAmount the annual gross amount
     * @param {GermanTaxDetails} germanTaxDetails
     * @returns {Number} the unemployment insurance contribution
     */
    #calculateUnemploymentInsuranceAmount(annualGrossAmount, germanTaxDetails) {

        const unemploymentInsuranceAmount = annualGrossAmount * germanTaxDetails.unemploymentInsurance.percent * 0.01;

        if (unemploymentInsuranceAmount > germanTaxDetails.unemploymentInsurance.maxAmount) {
            return germanTaxDetails.unemploymentInsurance.maxAmount;
        }

        return unemploymentInsuranceAmount;
    }

    /**
     * @param {Number} annualGrossAmount the annual gross amount
     * @param {GermanTaxDetails} germanTaxDetails
     * @returns {Number} the health insurance contribution
     */
    #calculateHealthInsuranceAmount(annualGrossAmount, germanTaxDetails) {

        const healthInsuranceAmount = annualGrossAmount * germanTaxDetails.healthInsurance.percent * 0.01;

        if (healthInsuranceAmount > germanTaxDetails.healthInsurance.maxAmount) {
            return germanTaxDetails.healthInsurance.maxAmount;
        }

        return healthInsuranceAmount;
    }

    /**
     * @param {Number} annualGrossAmount the annual gross amount
     * @param {GermanTaxDetails} germanTaxDetails
     * @param {GermanTaxOptions} germanTaxOptions
     * @returns {Number} the long term care insurance contribution
     */
    #calculateLongTermCareInsuranceAmount(annualGrossAmount, germanTaxDetails, germanTaxOptions) {

        let longTermInsurancePercent;

        if (germanTaxOptions.parentalStatus.type === ParentalStatuses.WITH_CHILDREN.type) {
            longTermInsurancePercent = germanTaxDetails.longTermCareInsurance.withChildPercent;
        } else {
            longTermInsurancePercent = germanTaxDetails.longTermCareInsurance.childlessPercent;
        }

        const longTermCareInsuranceAmount = annualGrossAmount * longTermInsurancePercent * 0.01;

        if (longTermCareInsuranceAmount > germanTaxDetails.longTermCareInsurance.maxAmount) {
            return germanTaxDetails.longTermCareInsurance.maxAmount;
        }

        return longTermCareInsuranceAmount;
    }
}

export const germanTaxCalculator = Object.freeze(new GermanTaxCalculator());