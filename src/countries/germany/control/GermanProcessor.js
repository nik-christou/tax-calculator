import { GermanTaxCalculator } from './GermanTaxCalculator.js';
import { TaxDetailsStore } from '../../../datastore/TaxDetailsStore.js';
import { UserSelectionStore } from '../../../datastore/UserSelectionStore.js';
import { GermanTaxOptions } from '../model/GermanTaxOptions.js';

export class GermanProcessor {
    /**
     * @param {Number} countryId
     * @param {import('../../../model/SalaryDetails.js').SalaryDetails} salaryDetails
     *
     * @returns {Promise<import('../../../model/TaxResults.js').TaxResults>}
     */
    static async processGermanTax(countryId, salaryDetails) {
        
        const germanTaxDetails = await TaxDetailsStore.getTaxDetailsByCountryById(countryId);
        const taxOptions = await UserSelectionStore.retrieveCountryOptionByCountryId(countryId);
        const germanTaxOptions = GermanTaxOptions.createFromObject(taxOptions);

        const taxResults = GermanTaxCalculator.calculateTax(germanTaxDetails, germanTaxOptions, salaryDetails);

        return taxResults;
    }
}