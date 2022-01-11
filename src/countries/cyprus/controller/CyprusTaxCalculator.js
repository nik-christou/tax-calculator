import { TaxResult } from '../../../model/TaxResult.js';
import { TaxResults } from '../../../model/TaxResults.js';
import { TaxCalculatorUtil } from '../../TaxCalculatorUtil.js';

export class CyprusTaxCalculator {

    /**
     * @static
     * @param {import('../model/CyprusTaxDetails.js').CyprusTaxDetails} cyprusTaxDetails
     * @param {import('../model/CyprusTaxOptions.js').CyprusTaxOptions} cyprusTaxOptions
     * @param {import('../../../model/SalaryDetails.js').SalaryDetails} salaryDetails
     */
    static calculateTax(cyprusTaxDetails, cyprusTaxOptions, salaryDetails) {
        
        const annualGrossAmount = TaxCalculatorUtil.calculateAnnualGrossAmount(salaryDetails);

        return this._calculateTaxFromAnnualIncome(cyprusTaxDetails, cyprusTaxOptions, salaryDetails, annualGrossAmount);
    }

    /**
     * @static
     * @param {import('../model/CyprusTaxDetails.js').CyprusTaxDetails} cyprusTaxDetails
     * @param {import('../model/CyprusTaxOptions.js').CyprusTaxOptions} cyprusTaxOptions
     * @param {import('../../../model/SalaryDetails.js').SalaryDetails} salaryDetails
     * @param {Number} annualGrossAmount
     */
    static _calculateTaxFromAnnualIncome(cyprusTaxDetails, cyprusTaxOptions, salaryDetails, annualGrossAmount) {
        
        const annualTaxResults = this._calculateAnnualTaxResult(cyprusTaxDetails, cyprusTaxOptions, annualGrossAmount);
        const monthlyTaxResults = TaxCalculatorUtil.convertAnnualToMonthlyTax(annualTaxResults, salaryDetails.includesThirteen);

        return new TaxResults(monthlyTaxResults, annualTaxResults);
    }

    /**
     * @static
     * @param {import('../model/CyprusTaxDetails.js').CyprusTaxDetails} cyprusTaxDetails
     * @param {import('../model/CyprusTaxOptions.js').CyprusTaxOptions} cyprusTaxOptions
     * @param {Number} annualGrossAmount
     *
     * @returns {TaxResult} the tax result
     */
    static _calculateAnnualTaxResult(cyprusTaxDetails, cyprusTaxOptions, annualGrossAmount) {

        const lastTaxBracketIndex = cyprusTaxDetails.taxBrackets.length - 1;

        const socialInsurancePercentage = this._calculateSocialInsurancePercentage(cyprusTaxDetails, cyprusTaxOptions);
        const healthInsurancePercentage = this._calculateHealthInsurancePercentage(cyprusTaxDetails, cyprusTaxOptions);

        const socialInsurance = this._calculateAnnualSocialInsuranceAmount(
            annualGrossAmount,
            socialInsurancePercentage,
            cyprusTaxDetails.maximumAnnualSocialContributionCap);
         
        const nhs = this._calculateAnnualHealthServiceAmount(
            annualGrossAmount, 
            healthInsurancePercentage, 
            cyprusTaxDetails.maximumAnnualHealthContributionCap);

        const annualGrossAfterDeductions = annualGrossAmount - socialInsurance - nhs;

        let remainingAmount = annualGrossAfterDeductions;
        let totalTax = 0;
        
        for (let index = lastTaxBracketIndex; index >= 0; index--) {

            const bracket = cyprusTaxDetails.taxBrackets[index];

            if (remainingAmount >= bracket.start && (remainingAmount <= bracket.end || index === lastTaxBracketIndex)) {
                
                const tax = (remainingAmount - bracket.start) * bracket.ratePercent * 0.01;
                totalTax += tax;
                
                remainingAmount = bracket.start - 1;
            }
        }

        const netAmount = annualGrossAfterDeductions - totalTax;

        return new TaxResult(annualGrossAmount, totalTax, socialInsurance, nhs, netAmount);
    }

    /**
     * @static
     * @param {import('../model/CyprusTaxDetails.js').CyprusTaxDetails} cyprusTaxDetails
     * @param {import('../model/CyprusTaxOptions.js').CyprusTaxOptions} cyprusTaxOptions
     * 
     * @returns the social insurance contribution
     */
    static _calculateSocialInsurancePercentage(cyprusTaxDetails, cyprusTaxOptions) {

        if (cyprusTaxOptions.selfEmployed) {
            return cyprusTaxDetails.selfEmployedContributions.socialInsurancePercent;
        }

        return cyprusTaxDetails.employedContributions.socialInsurancePercent;
    }

    /**
     * @static
     * @param {import('../model/CyprusTaxDetails.js').CyprusTaxDetails} cyprusTaxDetails
     * @param {import('../model/CyprusTaxOptions.js').CyprusTaxOptions} cyprusTaxOptions
     * 
     * @returns the social insurance contribution
     */
    static _calculateHealthInsurancePercentage(cyprusTaxDetails, cyprusTaxOptions) {

        if (cyprusTaxOptions.selfEmployed) {
            return cyprusTaxDetails.selfEmployedContributions.healthContributionPercent;
        }

        return cyprusTaxDetails.employedContributions.healthContributionPercent;
    }

    static _calculateAnnualHealthServiceAmount(
        annualGrossAmount, 
        healthInsurancePercentage, 
        maximumAnnualHealthContributionCap) {
        
        const annualGrossForHealthService = annualGrossAmount > maximumAnnualHealthContributionCap 
            ? maximumAnnualHealthContributionCap 
            : annualGrossAmount;

        return annualGrossForHealthService * healthInsurancePercentage * 0.01;
    }

    static _calculateAnnualSocialInsuranceAmount(
        annualGrossAmount,
        socialInsurancePercentage,
        maximumAnnualSocialContributionCap) {
        
        const annualGrossForSocialInsurance = annualGrossAmount > maximumAnnualSocialContributionCap 
            ? maximumAnnualSocialContributionCap 
            : annualGrossAmount;

        return annualGrossForSocialInsurance * socialInsurancePercentage * 0.01
    }
}
