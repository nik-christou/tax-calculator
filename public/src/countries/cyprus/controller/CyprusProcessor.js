import { CyprusTaxCalculator } from '../controller/CyprusTaxCalculator.js';
import { TaxDetailsStore } from '../../../datastore/TaxDetailsStore.js';

export class CyprusProcessor {
    /**
     * @param {Number} countryId
     * @param {import('../../../model/SalaryDetails.js').SalaryDetails} salaryDetails
     *
     * @returns {Promise<import('../../../model/TaxResults.js').TaxResults>}
     */
    static async processCyprusTax(countryId, salaryDetails) {
        const cyprusTaxDetails = await TaxDetailsStore.getTaxDetailsByCountryById(countryId);
        const taxResults = CyprusTaxCalculator.calculateTax(cyprusTaxDetails, salaryDetails);

        return taxResults;
    }
}
