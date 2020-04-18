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
                return this._processCyprus(salaryDetails);
            case 2:
                return this._processAustraliaTax(salaryDetails);
            default:
                return Promise.resolve(null);
        }
    }

    /**
     * @static
     * @param {SalaryDetails} salaryDetails
     */
    static async _processCyprus(salaryDetails) {

        const { CyprusProcessor } = await import("../../taxation/cyprus/boundary/CyprusProcessor");
        return CyprusProcessor.processCyprusTax(salaryDetails);
    }

    /**
     * @static
     * @param {SalaryDetails} salaryDetails
     */
    static async _processAustraliaTax(salaryDetails) {

        const { AustraliaProcessor } = await import("../../taxation/australia/boundary/AustraliaProcessor");
        return AustraliaProcessor.processAustraliaTax(salaryDetails, true);
    }
}
