import { TaxCalculator } from '../src/tax-calculator.js';
import { Country } from '../src/country/model/country.js';
import { TaxBracket } from '../src/country/model/tax-bracket.js';
import { SalaryDetails } from '../src/salary/model/salary-details.js';
import { SalaryTypes } from '../src/salary/control/salary-type-enum.js';
import { TaxResult } from '../src/results/model/tax-result.js';

describe('TaxCalculator tests', () => {

    it('annualIncomeTax_thirteenIncluded_correctResultsCalculated', () => {

        // given
        const taxBrackets = [
            new TaxBracket(0, 19500, 0),
            new TaxBracket(19501, 28000, 20),
            new TaxBracket(28001, 36300, 25),
            new TaxBracket(36301, 60000, 30),
            new TaxBracket(60000, -1, 35)
        ];

        const selectedCountry = new Country(0, "cyprus", taxBrackets, 8.3, 1.70);
        const salaryDetails = new SalaryDetails(20000.00, SalaryTypes.ANNUAL, true);

        // when
        const taxResults = TaxCalculator.calculateTaxFromAnnualIncome(selectedCountry, salaryDetails);

        // then
        const expectedMonthlyTaxResult = new TaxResult(1538.46, 7.68, 127.69, 26.15, 1376.94);
        const expectedAnnualTaxResults = new TaxResult(20000.00, 99.80, 1660, 340, 17900.20);

        chai.assert.deepEqual(taxResults.monthlyTaxResult, expectedMonthlyTaxResult, 'monthly tax results do not match');
        chai.assert.deepEqual(taxResults.annualTaxResult, expectedAnnualTaxResults, 'annual tax results do not match');
    });
});
