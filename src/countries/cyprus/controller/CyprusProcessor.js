import { SalaryDetails } from "../../../model/SalaryDetails.js";
import { TaxResults } from "../../../model/TaxResults.js";
import { CyprusTaxCalculator } from "../controller/CyprusTaxCalculator.js";
import { TaxDetailsStore } from "../../../datastore/TaxDetailsStore.js";

export class CyprusProcessor {

    /**
     * @param {Number} countryId
     * @param {SalaryDetails} salaryDetails
     *
     * @returns {Promise<TaxResults>}
     */
    static async processCyprusTax(countryId, salaryDetails) {

        const cyprusTaxDetails = await TaxDetailsStore.getTaxDetailsByCountryById(countryId);
        const taxResults = CyprusTaxCalculator.calculateTax(cyprusTaxDetails, salaryDetails);

        return taxResults;
    }
}
