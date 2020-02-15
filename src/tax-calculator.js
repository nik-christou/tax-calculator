import { TaxResults } from "./results/model/tax-results.js";
import { SalaryDetails } from "./salary/model/salary-details.js";

export class TaxCalculator {

    calculateTaxFromAnnualIncome(selectedCountry, salaryDetails) {

        const annualTax = this._calculateTax(selectedCountry, salaryDetails);
        const monthlyTax = this._convertAnnualToMonthlyTax(annualTax, salaryDetails.includesThirteen);

        return {
            annual: annualTax,
            monthly: monthlyTax
        };
    }

    _convertAnnualToMonthlyTax(annualTax, includes13thSalary) {

        var numMonths;
        if (includes13thSalary) {
            numMonths = 13;
        } else {
            numMonths = 12;
        }

        return new TaxResults(
            annualTax.grossAmount / numMonths,
            annualTax.taxAmount / numMonths,
            annualTax.socialAmount / numMonths,
            annualTax.healthContributionAmount / numMonths,
            annualTax.netAmount / numMonths);
    }

    _calculateTax(selectedCountry, salaryDetails) {

        const gross = salaryDetails.amount;

        var remainingAmount = gross;
        var totalTax = 0;

        for (var i = selectedCountry.taxBrackets.length - 1; i >= 0; i--) {

            const bracket = selectedCountry.taxBrackets[i];
            
            if (remainingAmount >= bracket.start && remainingAmount <= bracket.end) {

                const tax = (remainingAmount - bracket.start) * bracket.ratePercent * 0.01;
                totalTax += tax;

                remainingAmount = bracket.start - 1;
            }
        }

        const socialInsurance = gross * selectedCountry.socialInsuranceContributionPercent * 0.01;
        const nhs = gross * selectedCountry.healthContributionPercent * 0.01;

        return new TaxResults(
            gross,
            totalTax,
            socialInsurance,
            nhs,
            gross - totalTax - socialInsurance - nhs);
    }
}