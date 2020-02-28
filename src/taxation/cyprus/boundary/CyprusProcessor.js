import { SalaryDetails } from "../../../salary/model/SalaryDetails.js";
import { TaxResults } from "../../../results/model/TaxResults.js";
import { CyprusTaxLoader } from "../control/CyprusTaxLoader.js";
import { CyprusTaxCalculator } from "../control/CyprusTaxCalculator.js";

export class CyprusProcessor {

    /**
     * @param {SalaryDetails} salaryDetails
     *
     * @returns {Promise<TaxResults>}
     */
    static async processCyprusTax(salaryDetails) {

        const cyprusTaxDetails = await CyprusTaxLoader.loadTaxDetailsFromJson("web_assets/data/cyprus.json");
        const taxResults = CyprusTaxCalculator.calculateTax(cyprusTaxDetails, salaryDetails);

        return taxResults;
    }
}
