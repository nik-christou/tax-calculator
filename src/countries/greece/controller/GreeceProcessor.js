import {greeceTaxCalculator} from './GreeceTaxCalculator.js';
import {taxDetailsStore} from '../../../datastore/TaxDetailsStore.js';
import {greeceTaxDetailsConverter} from "./converter/GreeceTaxDetailsConverter.js";

class GreeceProcessor {
    /**
     * @param {Number} countryId
     * @param {SalaryDetails} salaryDetails
     * @returns {TaxResults}
     */
    processGreeceTax(countryId, salaryDetails) {

        const taxDetails = taxDetailsStore.retrieveTaxDetailsByCountryById(countryId);
        const greeceTaxDetails = greeceTaxDetailsConverter.convertIntoGreeceTaxDetails(taxDetails);
        const taxResults = greeceTaxCalculator.calculateTax(greeceTaxDetails, salaryDetails);

        return taxResults;
    }
}

export const greeceProcessor = Object.freeze(new GreeceProcessor());
