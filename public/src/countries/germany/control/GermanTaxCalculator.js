import { TaxResult } from '../../../model/TaxResult.js';
import { TaxResults } from '../../../model/TaxResults.js';
import { TaxCalculatorUtil } from '../../TaxCalculatorUtil.js';

export class GermanTaxCalculator {

    /**
     * @static
     * 
     * @param {import('../model/GermanTaxDetails.js').GermanTaxDetails} germanTaxDetails
     * @param {import('../model/GermanTaxOptions.js').GermanTaxOptions} germanTaxOptions
     * @param {import('../../../model/SalaryDetails.js').SalaryDetails} salaryDetails
     */
    static calculateTax(germanTaxDetails, germanTaxOptions, salaryDetails) {
        
        const annualGrossAmount = TaxCalculatorUtil.calculateAnnualGrossAmount(salaryDetails);

        return this._calculateTaxFromAnnualIncome(germanTaxDetails, germanTaxOptions, salaryDetails, annualGrossAmount);
    }

    /**
     * @static
     * @param {import('../model/GermanTaxDetails.js').GermanTaxDetails} germanTaxDetails
     * @param {import('../model/GermanTaxOptions.js').GermanTaxOptions} germanTaxOptions
     * @param {import('../../../model/SalaryDetails.js').SalaryDetails} salaryDetails
     * @param {Number} annualGrossAmount
     */
    static _calculateTaxFromAnnualIncome(germanTaxDetails, germanTaxOptions, salaryDetails, annualGrossAmount) {
        
        const annualTaxResults = this._calculateAnnualTaxResult(germanTaxDetails, germanTaxOptions, annualGrossAmount);
        const monthlyTaxResults = TaxCalculatorUtil.convertAnnualToMonthlyTax(annualTaxResults, salaryDetails.includesThirteen);

        return new TaxResults(monthlyTaxResults, annualTaxResults);
    }

    /**
     * @static
     * @param {import('../model/GermanTaxDetails.js').GermanTaxDetails} germanTaxDetails
     * @param {import('../model/GermanTaxOptions.js').GermanTaxOptions} germanTaxOptions
     * @param {Number} annualGrossAmount
     *
     * @returns {TaxResult} the tax result
     */
    static _calculateAnnualTaxResult(germanTaxDetails, germanTaxOptions, annualGrossAmount) {

        const lastTaxBracketIndex = this._getLastTaxBracketIndex(germanTaxDetails, germanTaxOptions);

        let remainingAmount = annualGrossAmount;
        let totalTax = 0;

        for (let index = lastTaxBracketIndex; index >= 0; index--) {

            const bracket = this._getTaxBracket(germanTaxDetails, germanTaxOptions, index);

            if (remainingAmount >= bracket.start && remainingAmount <= bracket.end) {

                const tax = (remainingAmount - bracket.start) * bracket.ratePercent * 0.01;
                totalTax += tax;

                remainingAmount = bracket.start - 1;
            }
        }

        const pensionInsurance = this._calculatePensionInsuranceAmount(annualGrossAmount, germanTaxDetails);
        const unemploymentInsurance = this._calculateUnemploymentInsuranceAmount(annualGrossAmount, germanTaxDetails);
        const healthInsurance = this._calculateHealthInsuranceAmount(annualGrossAmount, germanTaxDetails);
        const longTermInsurance = this._calculateLongTermCareInsuranceAmount(annualGrossAmount, germanTaxDetails, germanTaxOptions);

        const socialContributionsTotal = pensionInsurance + unemploymentInsurance + longTermInsurance;
        const netAmount = annualGrossAmount - totalTax - healthInsurance - socialContributionsTotal;

        return new TaxResult(annualGrossAmount, totalTax, socialContributionsTotal, healthInsurance, netAmount);
    }

    /**
     * @static
     * @param {import('../model/GermanTaxDetails.js').GermanTaxDetails} germanTaxDetails
     * @param {import('../model/GermanTaxOptions.js').GermanTaxOptions} germanTaxOptions
     * @param {Number} index the tax bracket index
     */
    static _getTaxBracket(germanTaxDetails, germanTaxOptions, index) {

        if (germanTaxOptions.single) {
            return germanTaxDetails.singleTaxBrackets[index];
        }

        return germanTaxDetails.marriedTaxBrackets[index];
    }

    /**
     * @static
     * @param {import('../model/GermanTaxDetails.js').GermanTaxDetails} germanTaxDetails
     * @param {import('../model/GermanTaxOptions.js').GermanTaxOptions} germanTaxOptions
     */
    static _getLastTaxBracketIndex(germanTaxDetails, germanTaxOptions) {

        if (germanTaxOptions.single) {
            return germanTaxDetails.singleTaxBrackets.length - 1;
        } 

        return germanTaxDetails.marriedTaxBrackets.length - 1;
    }

    /**
     * @static
     * @param {Number} annualGrossAmount the annual gross amount
     * @param {import('../model/GermanTaxDetails.js').GermanTaxDetails} germanTaxDetails
     * 
     * @returns the social insurance contribution
     */
    static _calculatePensionInsuranceAmount(annualGrossAmount, germanTaxDetails) {

        const pensionInsuranceAmount = annualGrossAmount * germanTaxDetails.pensionInsurance.percent * 0.01;

        if (pensionInsuranceAmount > germanTaxDetails.pensionInsurance.maxAmount) {
            return germanTaxDetails.pensionInsurance.maxAmount;
        }

        return pensionInsuranceAmount;
    }

    /**
     * @static
     * @param {Number} annualGrossAmount the annual gross amount
     * @param {import('../model/GermanTaxDetails.js').GermanTaxDetails} germanTaxDetails
     * 
     * @returns the unemployment insurance contribution
     */
    static _calculateUnemploymentInsuranceAmount(annualGrossAmount, germanTaxDetails) {

        const unemploymentInsuranceAmount = annualGrossAmount * germanTaxDetails.unemploymentInsurance.percent * 0.01;

        if (unemploymentInsuranceAmount > germanTaxDetails.unemploymentInsurance.maxAmount) {
            return germanTaxDetails.unemploymentInsurance.maxAmount;
        }

        return unemploymentInsuranceAmount;
    }

    /**
     * @static
     * @param {Number} annualGrossAmount the annual gross amount
     * @param {import('../model/GermanTaxDetails.js').GermanTaxDetails} germanTaxDetails
     * 
     * @returns the health insurance contribution
     */
    static _calculateHealthInsuranceAmount(annualGrossAmount, germanTaxDetails) {

        const healthInsuranceAmount = annualGrossAmount * germanTaxDetails.healthInsurance.percent * 0.01;

        if (healthInsuranceAmount > germanTaxDetails.healthInsurance.maxAmount) {
            return germanTaxDetails.healthInsurance.maxAmount;
        }

        return healthInsuranceAmount;
    }

    /**
     * @static
     * @param {Number} annualGrossAmount the annual gross amount
     * @param {import('../model/GermanTaxDetails.js').GermanTaxDetails} germanTaxDetails
     * @param {import('../model/GermanTaxOptions.js').GermanTaxOptions} germanTaxOptions
     * 
     * @returns the long term care insurance contribution
     */
    static _calculateLongTermCareInsuranceAmount(annualGrossAmount, germanTaxDetails, germanTaxOptions) {

        let longTermInsurancePercent;

        if (germanTaxOptions.withChild) {
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