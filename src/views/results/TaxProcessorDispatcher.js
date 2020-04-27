import { TaxResults } from "../../model/TaxResults.js";
import { SalaryDetails } from "../../model/SalaryDetails.js";

export class TaxProcessorDispatcher {
    /**
     * @static
     *
     * @param {Number} countryId
     * @param {SalaryDetails} salaryDetails
     *
     * @returns {Promise<TaxResults>}
     */
    static dispatch(countryId, salaryDetails) {
        switch (countryId) {
            case 1:
                return this._processCyprus(countryId, salaryDetails);
            case 2:
                return this._processAustraliaTax(countryId, salaryDetails);
            default:
                return Promise.resolve(null);
        }
    }

    /**
     * @param {Number} countryId
     * @param {SalaryDetails} salaryDetails
     */
    static async _processCyprus(countryId, salaryDetails) {

        const { CyprusProcessor } = await import("../../countries/cyprus/boundary/CyprusProcessor.js");
        return CyprusProcessor.processCyprusTax(countryId,salaryDetails);
    }

    /**
     * @param {Number} countryId
     * @param {SalaryDetails} salaryDetails
     */
    static async _processAustraliaTax(countryId, salaryDetails) {

        const { AustraliaProcessor } = await import("../../countries/australia/boundary/AustraliaProcessor.js");
        return AustraliaProcessor.processAustraliaTax(countryId, salaryDetails, true);
    }
}
