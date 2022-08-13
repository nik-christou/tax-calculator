import {cyprusTaxCalculator} from './CyprusTaxCalculator.js';
import {taxDetailsStore} from '../../../datastore/TaxDetailsStore.js';
import {userSelectionsStore} from '../../../datastore/UserSelectionsStore.js';
import {cyprusTaxDetailsConverter} from "./converter/CyprusTaxDetailsConverter.js";
import {cyprusTaxOptionsConverter} from "./converter/CyprusTaxOptionsConverter.js";

class CyprusProcessor {

    /**
     * @param {Number} countryId
     * @param {SalaryDetails} salaryDetails
     * @returns {TaxResults}
     */
    processCyprusTax(countryId, salaryDetails) {

        const taxDetails = taxDetailsStore.retrieveTaxDetailsByCountryById(countryId);
        const taxOptions = userSelectionsStore.retrieveSelectedTaxOptions();

        const cyprusTaxDetails = cyprusTaxDetailsConverter.convertIntoCyprusTaxDetails(taxDetails);
        const cyprusTaxOptions = cyprusTaxOptionsConverter.convertIntoCyprusTaxOptions(taxOptions);

        return cyprusTaxCalculator.calculateTax(cyprusTaxDetails, cyprusTaxOptions, salaryDetails);
    }
}

export const cyprusProcessor = Object.freeze(new CyprusProcessor());
