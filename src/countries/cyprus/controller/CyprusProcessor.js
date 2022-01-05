import { CyprusTaxCalculator } from '../controller/CyprusTaxCalculator.js';
import { TaxDetailsStore } from '../../../datastore/TaxDetailsStore.js';
import { UserSelectionStore } from '../../../datastore/UserSelectionStore.js';
import { CyprusTaxOptions } from '../model/CyprusTaxOptions.js';

export class CyprusProcessor {
    /**
     * @param {Number} countryId
     * @param {import('../../../model/SalaryDetails.js').SalaryDetails} salaryDetails
     *
     * @returns {Promise<import('../../../model/TaxResults.js').TaxResults>}
     */
    static async processCyprusTax(countryId, salaryDetails) {
        
        const cyprusTaxDetails = await TaxDetailsStore.getTaxDetailsByCountryById(countryId);
        const taxOptions = await UserSelectionStore.retrieveCountryOptionByCountryId(countryId);
        const cyprusTaxOptions = CyprusTaxOptions.createFromObject(taxOptions);

        const taxResults = CyprusTaxCalculator.calculateTax(cyprusTaxDetails, cyprusTaxOptions, salaryDetails);

        return taxResults;
    }
}
