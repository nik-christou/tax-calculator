import { SalaryDetails } from "../../../model/SalaryDetails.js";
import { TaxResults } from "../../../model/TaxResults.js";
import { AustraliaTaxCalculator } from "./AustraliaTaxCalculator.js";
import { TaxDetailsStore } from "../../../datastore/TaxDetailsStore.js";
import { UserSelectionStore } from "../../../datastore/UserSelectionStore.js";
import { AustraliaOptions } from "../model/AustraliaTaxOptions.js";

export class AustraliaProcessor {

    /**
     * @param {Number} countryId
     * @param {SalaryDetails} salaryDetails
     *
     * @returns {Promise<TaxResults>}
     */
    static async processAustraliaTax(countryId, salaryDetails) {

        const taxDetails = await TaxDetailsStore.getTaxDetailsByCountryById(countryId);
        const taxOptions = await UserSelectionStore.retrieveCountryOptionByCountryId(countryId);
        const australiaTaxOptions = AustraliaOptions.createFromObject(taxOptions);

        return AustraliaTaxCalculator.calculateTax(taxDetails, australiaTaxOptions, salaryDetails);
    }
}
