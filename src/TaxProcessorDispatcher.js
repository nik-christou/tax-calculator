import { SalaryDetails } from "./salary/model/SalaryDetails.js";
import { TaxResults } from "./results/model/TaxResults.js";

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
            default:
                return Promise.resolve(null);
        }
    }

    /**
     * @static
     * @param {SalaryDetails} salaryDetails
     */
    static async _processCyprus(salaryDetails) {

        const { CyprusProcessor } = await import("./taxation/cyprus/boundary/CyprusProcessor");
        return CyprusProcessor.processCyprusTax(salaryDetails);
    }
}
