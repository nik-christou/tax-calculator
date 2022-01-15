import { assert } from "@esm-bundle/chai";
import { TaxResult } from "../src/model/TaxResult.js";
import { SalaryDetails } from "../src/model/SalaryDetails.js";
import { SalaryTypes } from "../src/model/SalaryTypes.js";
import { TaxBreakdownBracket } from '../src/model/TaxBreakdownBracket.js';
import { CyprusTaxBracket } from "../src/countries/cyprus/model/CyprusTaxBracket.js";
import { CyprusTaxDetails } from "../src/countries/cyprus/model/CyprusTaxDetails.js";
import { CyprusTaxOptions } from "../src/countries/cyprus/model/CyprusTaxOptions.js";
import { CyprusContributions} from "../src/countries/cyprus/model/CyprusContributions.js";
import { CyprusTaxCalculator } from "../src/countries/cyprus/controller/CyprusTaxCalculator.js";

describe("CyprusTaxCalculator tests", () => {
    
    it("Calculate annual salary tax for Cyprus", () => {

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

        const expectedAnnualTaxBreakdownBrackets = new Array();
        expectedAnnualTaxBreakdownBrackets.push(new TaxBreakdownBracket(0, 19500, 0, 0));

        const expectedMonthlyTaxBreakdownBrackets = new Array();
        expectedMonthlyTaxBreakdownBrackets.push(new TaxBreakdownBracket(0, 19500, 0, 0));

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
            expectedMonthlyNetAmount,
            expectedMonthlyTaxBreakdownBrackets
        );

        const expectedAnnualTaxResults = new TaxResult(
            expectedAnnuallyGrossAmount,
            expectedAnnuallyTaxAmount,
            expectedAnnuallySocialAmount,
            expectedAnnuallyHealthContributionAmount,
            expectedAnnuallyNetAmount,
            expectedAnnualTaxBreakdownBrackets
        );
        
        // when
        const taxResults = CyprusTaxCalculator.calculateTax(cyprusTaxDetails, cyprusTaxOptions, salaryDetails);

        // then
        assert.deepEqual(taxResults.monthlyTaxResult, expectedMonthlyTaxResult, "monthly tax results do not match");
        assert.deepEqual(taxResults.annualTaxResult, expectedAnnualTaxResults, "annual tax results do not match");
    });

    it("Calculate monthly salary tax for Cyprus", () => {

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

        const expectedAnnualTaxBreakdownBrackets = new Array();
        expectedAnnualTaxBreakdownBrackets.push(new TaxBreakdownBracket(0, 19500, 0, 0));
        expectedAnnualTaxBreakdownBrackets.push(new TaxBreakdownBracket(19501, 28000, 20, 1699.8));
        expectedAnnualTaxBreakdownBrackets.push(new TaxBreakdownBracket(28001, 36300, 25, 2074.75));
        expectedAnnualTaxBreakdownBrackets.push(new TaxBreakdownBracket(36301, 60000, 30, 7109.400000000001));
        expectedAnnualTaxBreakdownBrackets.push(new TaxBreakdownBracket(60000, -1, 35, 66643.276));

        const expectedMonthlyTaxBreakdownBrackets = new Array();
        expectedMonthlyTaxBreakdownBrackets.push(new TaxBreakdownBracket(0, 19500, 0, 0));
        expectedMonthlyTaxBreakdownBrackets.push(new TaxBreakdownBracket(19501, 28000, 20, 130.75384615384615));
        expectedMonthlyTaxBreakdownBrackets.push(new TaxBreakdownBracket(28001, 36300, 25, 159.59615384615384));
        expectedMonthlyTaxBreakdownBrackets.push(new TaxBreakdownBracket(36301, 60000, 30, 546.8769230769232));
        expectedMonthlyTaxBreakdownBrackets.push(new TaxBreakdownBracket(60000, -1, 35, 5126.405846153846));

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
            expectedMonthlyNetAmount,
            expectedMonthlyTaxBreakdownBrackets
        );

        const expectedAnnualTaxResults = new TaxResult(
            expectedAnnuallyGrossAmount, 
            expectedAnnuallyTaxAmount, 
            expectedAnnuallySocialAmount, 
            expectedAnnuallyHealthContributionAmount, 
            expectedAnnuallyNetAmount,
            expectedAnnualTaxBreakdownBrackets
        );

        // when
        const taxResults = CyprusTaxCalculator.calculateTax(cyprusTaxDetails, cyprusTaxOptions, salaryDetails);

        // then
        assert.deepEqual(taxResults.monthlyTaxResult, expectedMonthlyTaxResult, "monthly tax results do not match");
        assert.deepEqual(taxResults.annualTaxResult, expectedAnnualTaxResults, "annual tax results do not match");
    });
});
