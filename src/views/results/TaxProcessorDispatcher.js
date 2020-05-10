import { TaxResults } from "../../model/TaxResults.js";
import { SalaryDetails } from "../../model/SalaryDetails.js";
import { CyprusProcessor } from "../../countries/cyprus/controller/CyprusProcessor.js";
import { AustraliaProcessor } from "../../countries/australia/controller/AustraliaProcessor.js";

export class TaxProcessorDispatcher {
    /**
     * @param {Number} countryId
     * @param {SalaryDetails} salaryDetails
     *
     * @returns {Promise<TaxResults>}
     */
    static dispatch(countryId, salaryDetails) {
        switch (countryId) {
            case 1:
                return CyprusProcessor.processCyprusTax(countryId, salaryDetails);
            case 2:
                return AustraliaProcessor.processAustraliaTax(countryId, salaryDetails);
            default:
                return Promise.resolve(null);
        }
    }
}
