import { TaxResult } from "../src/results/model/TaxResult.js";
import { SalaryDetails } from "../src/salary/model/SalaryDetails.js";
import { SalaryTypes } from "../src/salary/model/SalaryTypes.js";
import { CyprusTaxBracket } from "../src/taxation/cyprus/entity/CyprusTaxBracket.js";
import { CyprusTaxDetails } from "../src/taxation/cyprus/entity/CyprusTaxDetails.js";
import { CyprusTaxCalculator } from "../src/taxation/cyprus/control/CyprusTaxCalculator.js";

describe("CyprusTaxCalculator tests", () => {
    it("cyprusAnnualIncomeTax_thirteenIncluded_correctResultsCalculated", () => {
        // given
        const taxBrackets = [
            new CyprusTaxBracket(0, 19500, 0),
            new CyprusTaxBracket(19501, 28000, 20),
            new CyprusTaxBracket(28001, 36300, 25),
            new CyprusTaxBracket(36301, 60000, 30),
            new CyprusTaxBracket(60000, -1, 35)
        ];

        const cyprusTaxDetails = new CyprusTaxDetails(taxBrackets, 8.3, 1.7);
        const salaryDetails = new SalaryDetails(20000.0, SalaryTypes.ANNUAL, true);

        // when
        const taxResults = CyprusTaxCalculator.calculateTax(cyprusTaxDetails, salaryDetails);

        // then
        const expectedMonthlyTaxResult = new TaxResult(
            1538.4615384615386,
            7.676923076923076,
            127.6923076923077,
            26.153846153846153,
            1376.9384615384615
        );
        const expectedAnnualTaxResults = new TaxResult(20000.0, 99.8, 1660, 340, 17900.2);

        chai.assert.deepEqual(taxResults.monthlyTaxResult, expectedMonthlyTaxResult, "monthly tax results do not match");
        chai.assert.deepEqual(taxResults.annualTaxResult, expectedAnnualTaxResults, "annual tax results do not match");
    });

    it("cyprusMonthlyIncomeTax_thirteenIncluded_correctResultsCalculated", () => {
        // given
        const taxBrackets = [
            new CyprusTaxBracket(0, 19500, 0),
            new CyprusTaxBracket(19501, 28000, 20),
            new CyprusTaxBracket(28001, 36300, 25),
            new CyprusTaxBracket(36301, 60000, 30),
            new CyprusTaxBracket(60000, -1, 35)
        ];

        const cyprusTaxDetails = new CyprusTaxDetails(taxBrackets, 8.3, 1.7);
        const salaryDetails = new SalaryDetails(20000.0, SalaryTypes.MONTHLY, true);

        // when
        const taxResults = CyprusTaxCalculator.calculateTax(cyprusTaxDetails, salaryDetails);

        // then
        const expectedMonthlyTaxResult = new TaxResult(20000, 99.8, 1660, 340, 17900.2);
        const expectedAnnualTaxResults = new TaxResult(260000, 1297.3999999999999, 21580, 4420, 232702.6);

        chai.assert.deepEqual(taxResults.monthlyTaxResult, expectedMonthlyTaxResult, "monthly tax results do not match");
        chai.assert.deepEqual(taxResults.annualTaxResult, expectedAnnualTaxResults, "annual tax results do not match");
    });
});
