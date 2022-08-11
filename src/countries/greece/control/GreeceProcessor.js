import { taxDetailsStore } from '../../../datastore/TaxDetailsStore.js';
import { GreeceTaxCalculator } from './GreeceTaxCalculator.js';

export class GreeceProcessor {
    /**
     * @param {Number} countryId
     * @param {import('../../../model/SalaryDetails.js').SalaryDetails} salaryDetails
     *
     * @returns {Promise<import('../../../model/TaxResults.js').TaxResults>}
     */
    static async processGreeceTax(countryId, salaryDetails) {
        
        const taxDetails = await taxDetailsStore.getTaxDetailsByCountryById(countryId);

        const taxResults = GreeceTaxCalculator.calculateTax(taxDetails, salaryDetails);

        return taxResults;
    }
}
