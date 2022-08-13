import {TaxResult} from '../../../model/TaxResult.js';
import {TaxResults} from '../../../model/TaxResults.js';
import {TaxBreakdownBracket} from '../../../model/TaxBreakdownBracket.js';
import {TaxCalculatorUtil} from '../../TaxCalculatorUtil.js';
import {EmploymentTypes} from "../../../model/EmploymentTypes.js";

export class CyprusTaxCalculator {

    /**
     * @param {CyprusTaxDetails} cyprusTaxDetails
     * @param {CyprusTaxOptions} cyprusTaxOptions
     * @param {SalaryDetails} salaryDetails
     */
    calculateTax(cyprusTaxDetails, cyprusTaxOptions, salaryDetails) {
        const annualGrossAmount = TaxCalculatorUtil.calculateAnnualGrossAmount(salaryDetails);
        return this.#calculateTaxFromAnnualIncome(cyprusTaxDetails, cyprusTaxOptions, salaryDetails, annualGrossAmount);
    }

    /**
     * @param {CyprusTaxDetails} cyprusTaxDetails
     * @param {CyprusTaxOptions} cyprusTaxOptions
     * @param {SalaryDetails} salaryDetails
     * @param {Number} annualGrossAmount
     */
    #calculateTaxFromAnnualIncome(cyprusTaxDetails, cyprusTaxOptions, salaryDetails, annualGrossAmount) {
        
        const annualTaxResults = this.#calculateAnnualTaxResult(cyprusTaxDetails, cyprusTaxOptions, annualGrossAmount);
        const monthlyTaxResults = TaxCalculatorUtil.convertAnnualToMonthlyTax(annualTaxResults, salaryDetails.includesThirteen);

        return new TaxResults(monthlyTaxResults, annualTaxResults);
    }

    /**
     * @param {CyprusTaxDetails} cyprusTaxDetails
     * @param {CyprusTaxOptions} cyprusTaxOptions
     * @param {Number} annualGrossAmount
     * @returns {TaxResult} the tax result
     */
    #calculateAnnualTaxResult(cyprusTaxDetails, cyprusTaxOptions, annualGrossAmount) {

        const socialInsurancePercentage = this.#calculateSocialInsurancePercentage(cyprusTaxDetails, cyprusTaxOptions);
        const healthInsurancePercentage = this.#calculateHealthInsurancePercentage(cyprusTaxDetails, cyprusTaxOptions);

        const socialInsurance = this.#calculateAnnualSocialInsuranceAmount(
            annualGrossAmount,
            socialInsurancePercentage,
            cyprusTaxDetails.maximumAnnualSocialContributionCap);
         
        const nhs = this.#calculateAnnualHealthServiceAmount(
            annualGrossAmount, 
            healthInsurancePercentage, 
            cyprusTaxDetails.maximumAnnualHealthContributionCap);

        const annualGrossAfterDeductions = annualGrossAmount - socialInsurance - nhs;

        const lastTaxBracketIndex = cyprusTaxDetails.taxBrackets.length - 1;
        
        let totalTax = 0;
        let remainingAmount = annualGrossAfterDeductions;
        let taxBreakdownBrackets = [cyprusTaxDetails.taxBrackets.length];
        
        for (let index = lastTaxBracketIndex; index >= 0; index--) {

            const bracket = cyprusTaxDetails.taxBrackets[index];

            if (remainingAmount >= bracket.start && (remainingAmount <= bracket.end || index === lastTaxBracketIndex)) {
                
                const tax = (remainingAmount - bracket.start) * bracket.ratePercent * 0.01;
                totalTax += tax;
                
                remainingAmount = bracket.start - 1;
                taxBreakdownBrackets[index] = new TaxBreakdownBracket(bracket.start, bracket.end, bracket.ratePercent, tax);
            }
        }

        const netAmount = annualGrossAfterDeductions - totalTax;

        return new TaxResult(annualGrossAmount, totalTax, socialInsurance, nhs, netAmount, taxBreakdownBrackets);
    }

    /**
     * @param {CyprusTaxDetails} cyprusTaxDetails
     * @param {CyprusTaxOptions} cyprusTaxOptions
     * @returns {Number} the social insurance contribution
     */
    #calculateSocialInsurancePercentage(cyprusTaxDetails, cyprusTaxOptions) {

        if (cyprusTaxOptions.employmentType === EmploymentTypes.SELF_EMPLOYED) {
            return cyprusTaxDetails.selfEmployedContributions.socialInsurancePercent;
        }

        return cyprusTaxDetails.employedContributions.socialInsurancePercent;
    }

    /**
     * @param {CyprusTaxDetails} cyprusTaxDetails
     * @param {CyprusTaxOptions} cyprusTaxOptions
     * @returns {Number} the health care contribution
     */
    #calculateHealthInsurancePercentage(cyprusTaxDetails, cyprusTaxOptions) {

        if (cyprusTaxOptions.employmentType === EmploymentTypes.SELF_EMPLOYED) {
            return cyprusTaxDetails.selfEmployedContributions.healthContributionPercent;
        }

        return cyprusTaxDetails.employedContributions.healthContributionPercent;
    }

    /**
     * @param {Number} annualGrossAmount
     * @param {Number} healthInsurancePercentage
     * @param {Number} maximumAnnualHealthContributionCap
     * @returns {number}
     */
    #calculateAnnualHealthServiceAmount(
        annualGrossAmount, 
        healthInsurancePercentage, 
        maximumAnnualHealthContributionCap) {
        
        const annualGrossForHealthService = annualGrossAmount > maximumAnnualHealthContributionCap 
            ? maximumAnnualHealthContributionCap 
            : annualGrossAmount;

        return annualGrossForHealthService * healthInsurancePercentage * 0.01;
    }

    /**
     * @param {Number} annualGrossAmount
     * @param {Number} socialInsurancePercentage
     * @param {Number} maximumAnnualSocialContributionCap
     * @returns {number}
     */
    #calculateAnnualSocialInsuranceAmount(
        annualGrossAmount,
        socialInsurancePercentage,
        maximumAnnualSocialContributionCap) {
        
        const annualGrossForSocialInsurance = annualGrossAmount > maximumAnnualSocialContributionCap 
            ? maximumAnnualSocialContributionCap 
            : annualGrossAmount;

        return annualGrossForSocialInsurance * socialInsurancePercentage * 0.01
    }
}

export const cyprusTaxCalculator = Object.freeze(new CyprusTaxCalculator());
