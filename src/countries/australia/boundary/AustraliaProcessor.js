import { SalaryDetails } from "../../../model/SalaryDetails.js";
import { TaxResults } from "../../../model/TaxResults.js";
import { AustraliaTaxCalculator } from "../control/AustraliaTaxCalculator.js";
import { TaxDetailsStore } from "../../../datastore/TaxDetailsStore.js";

export class AustraliaProcessor {

    /**
     * @param {Number} countryId
     * @param {SalaryDetails} salaryDetails
     * @param {Boolean} resident
     *
     * @returns {Promise<TaxResults>}
     */
    static async processAustraliaTax(countryId, salaryDetails, resident) {

        const taxDetails = await TaxDetailsStore.getTaxDetailsByCountryById(countryId);
        const taxResults = AustraliaTaxCalculator.calculateTax(taxDetails, salaryDetails, resident);

        return taxResults;
    }
}
