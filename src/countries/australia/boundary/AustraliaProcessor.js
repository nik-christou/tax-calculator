import { SalaryDetails } from "../../../model/SalaryDetails.js";
import { TaxResults } from "../../../model/TaxResults.js";
import { AustraliaTaxLoader } from "../control/AustraliaTaxLoader.js";
import { AustraliaTaxCalculator } from "../control/AustraliaTaxCalculator.js";

export class AustraliaProcessor {

    /**
     * @param {SalaryDetails} salaryDetails
     * @param {Boolean} resident
     *
     * @returns {Promise<TaxResults>}
     */
    static async processAustraliaTax(salaryDetails, resident) {

        const taxDetails = await AustraliaTaxLoader.loadTaxDetailsFromJson("web_assets/data/australia.json");
        const taxResults = AustraliaTaxCalculator.calculateTax(taxDetails, salaryDetails, resident);

        return taxResults;
    }
}
