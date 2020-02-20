import { TaxCalculator } from '../src/tax-calculator.js';
import { Country } from '../src/country/model/country.js';
import { TaxBracket } from '../src/country/model/tax-bracket.js';
import { SalaryDetails } from '../src/salary/model/salary-details.js';
import { SalaryTypes } from '../src/salary/control/salary-type-enum.js';
import { TaxResults } from '../src/results/model/tax-results.js';
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
        const expectedMonthlyTaxResult = new TaxResult(1538.46, 0, 127.69, 127.69, 127.69);
        const expectedAnnualTaxResults = new TaxResults(20000.00, 0, 1660, 340, 18000);
        const expectedTaxResults = new TaxResults(expectedMonthlyTaxResult, expectedAnnualTaxResults);

        chai.assert.equal(taxResults, expectedTaxResults, 'tax results do not match');
    });
});
