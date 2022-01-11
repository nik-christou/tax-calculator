import { assert } from "@esm-bundle/chai";
import { TaxResult } from "../src/model/TaxResult.js";
import { SalaryDetails } from "../src/model/SalaryDetails.js";
import { SalaryTypes } from "../src/model/SalaryTypes.js";
import { CyprusTaxBracket } from "../src/countries/cyprus/model/CyprusTaxBracket.js";
import { CyprusTaxDetails } from "../src/countries/cyprus/model/CyprusTaxDetails.js";
import { CyprusTaxOptions } from "../src/countries/cyprus/model/CyprusTaxOptions.js";
import { CyprusContributions} from "../src/countries/cyprus/model/CyprusContributions.js";
import { CyprusTaxCalculator } from "../src/countries/cyprus/controller/CyprusTaxCalculator.js";

describe("CyprusTaxCalculator tests", () => {
    
    it("cyprusAnnualIncomeTax_correctResultsCalculated", () => {

        // given
        const annualSalaryAmount = 20000;
        const includesThirteen = true;
        const employerSocialInsurance = 8.3;
        const employerHealthContribution = 2.65;
        const selfEmployedSocialInsurance = 15.6;
        const selfEmployedHealthContribution = 4.00;
        const maximumAnnualHealthInsuranceCap = 180_000;
        const maximumAnnutalSocialInsuranceCap = 58_080;

        const taxBrackets = [
            new CyprusTaxBracket(0, 19500, 0),
            new CyprusTaxBracket(19501, 28000, 20),
            new CyprusTaxBracket(28001, 36300, 25),
            new CyprusTaxBracket(36301, 60000, 30),
            new CyprusTaxBracket(60000, -1, 35)
        ];

        const employerContributions = new CyprusContributions(employerSocialInsurance, employerHealthContribution);
        const selftEmployedContributions = new CyprusContributions(selfEmployedSocialInsurance, selfEmployedHealthContribution);
        const cyprusTaxDetails = new CyprusTaxDetails(taxBrackets, 
            employerContributions, selftEmployedContributions, maximumAnnualHealthInsuranceCap, maximumAnnutalSocialInsuranceCap);
        const cyprusTaxOptions = new CyprusTaxOptions(false);
        const salaryDetails = new SalaryDetails(annualSalaryAmount, SalaryTypes.ANNUAL, includesThirteen);

        const expectedMonthlyGrossAmount = 1538.4615384615386;
        const expectedMonthlyTaxAmount = 0;
        const expectedMonthlySocialAmount = 127.6923076923077;
        const expectedMonthlyHealthContributionAmount = 40.76923076923077;
        const expectedMonthlyNetAmount = 1370;
        
        const expectedAnnuallyGrossAmount = expectedMonthlyGrossAmount * 13;
        const expectedAnnuallyTaxAmount = expectedMonthlyTaxAmount * 13;
        const expectedAnnuallySocialAmount = expectedMonthlySocialAmount * 13;
        const expectedAnnuallyHealthContributionAmount = expectedMonthlyHealthContributionAmount * 13;
        const expectedAnnuallyNetAmount = expectedMonthlyNetAmount * 13;

        const expectedMonthlyTaxResult = new TaxResult(
            expectedMonthlyGrossAmount,
            expectedMonthlyTaxAmount,
            expectedMonthlySocialAmount,
            expectedMonthlyHealthContributionAmount,
            expectedMonthlyNetAmount
        );

        const expectedAnnualTaxResults = new TaxResult(
            expectedAnnuallyGrossAmount,
            expectedAnnuallyTaxAmount,
            expectedAnnuallySocialAmount,
            expectedAnnuallyHealthContributionAmount,
            expectedAnnuallyNetAmount
        );
        
        // when
        const taxResults = CyprusTaxCalculator.calculateTax(cyprusTaxDetails, cyprusTaxOptions, salaryDetails);

        // then
        assert.deepEqual(taxResults.monthlyTaxResult, expectedMonthlyTaxResult, "monthly tax results do not match");
        assert.deepEqual(taxResults.annualTaxResult, expectedAnnualTaxResults, "annual tax results do not match");
    });

    it("cyprusMonthlyIncomeTax_correctResultsCalculated", () => {

        // given
        const monthlySalaryAmount = 20000;
        const includesThirteen = true;
        const employerSocialInsurance = 8.3;
        const employerHealthContribution = 2.65;
        const selfEmployedSocialInsurance = 15.6;
        const selfEmployedHealthContribution = 4.00;
        const maximumAnnualHealthInsuranceCap = 180_000;
        const maximumAnnutalSocialInsuranceCap = 58_080;

        const taxBrackets = [
            new CyprusTaxBracket(0, 19500, 0),
            new CyprusTaxBracket(19501, 28000, 20),
            new CyprusTaxBracket(28001, 36300, 25),
            new CyprusTaxBracket(36301, 60000, 30),
            new CyprusTaxBracket(60000, -1, 35)
        ];

        const employerContributions = new CyprusContributions(employerSocialInsurance, employerHealthContribution);
        const selftEmployedContributions = new CyprusContributions(selfEmployedSocialInsurance, selfEmployedHealthContribution);
        const cyprusTaxDetails = new CyprusTaxDetails(taxBrackets, employerContributions, selftEmployedContributions, 
            maximumAnnualHealthInsuranceCap, maximumAnnutalSocialInsuranceCap);
        const cyprusTaxOptions = new CyprusTaxOptions(false);
        const salaryDetails = new SalaryDetails(monthlySalaryAmount, SalaryTypes.MONTHLY, includesThirteen);

        const expectedMonthlyGrossAmount = monthlySalaryAmount;
        const expectedMonthlyTaxAmount = 5963.632769230769;
        const expectedMonthlySocialAmount = 370.8184615384616;
        const expectedMonthlyHealthContributionAmount = 366.9230769230769;
        const expectedMonthlyNetAmount = 13298.62569230769;
        
        const expectedAnnuallyGrossAmount = monthlySalaryAmount * 13;
        const expectedAnnuallyTaxAmount = expectedMonthlyTaxAmount * 13;
        const expectedAnnuallySocialAmount = expectedMonthlySocialAmount * 13;
        const expectedAnnuallyHealthContributionAmount = expectedMonthlyHealthContributionAmount * 13;
        const expectedAnnuallyNetAmount = expectedMonthlyNetAmount * 13;

        const expectedMonthlyTaxResult = new TaxResult(
            expectedMonthlyGrossAmount, 
            expectedMonthlyTaxAmount, 
            expectedMonthlySocialAmount,
            expectedMonthlyHealthContributionAmount,
            expectedMonthlyNetAmount
        );

        const expectedAnnualTaxResults = new TaxResult(
            expectedAnnuallyGrossAmount, 
            expectedAnnuallyTaxAmount, 
            expectedAnnuallySocialAmount, 
            expectedAnnuallyHealthContributionAmount, 
            expectedAnnuallyNetAmount
        );

        // when
        const taxResults = CyprusTaxCalculator.calculateTax(cyprusTaxDetails, cyprusTaxOptions, salaryDetails);

        // then
        assert.deepEqual(taxResults.monthlyTaxResult, expectedMonthlyTaxResult, "monthly tax results do not match");
        assert.deepEqual(taxResults.annualTaxResult, expectedAnnualTaxResults, "annual tax results do not match");
    });
});
