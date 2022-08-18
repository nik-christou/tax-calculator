import {germanTaxCalculator} from './GermanTaxCalculator.js';
import {taxDetailsStore} from '../../../datastore/TaxDetailsStore.js';
import {userSelectionsStore} from "../../../datastore/UserSelectionsStore.js";
import {germanTaxOptionsConverter} from "../../germany/controller/converter/GermanTaxOptionsConverter.js";
import {germanTaxDetailsConverter} from "../../germany/controller/converter/GermanTaxDetailsConverter.js";

export class GermanProcessor {

    /**
     * @param {Number} countryId
     * @param {SalaryDetails} salaryDetails
     * @returns {TaxResults}
     */
    processGermanTax(countryId, salaryDetails) {
        
        const taxDetails = taxDetailsStore.retrieveTaxDetailsByCountryById(countryId);
        const taxOptions = userSelectionsStore.retrieveSelectedTaxOptions();

        const germanTaxDetails = germanTaxDetailsConverter.convertIntoGermanTaxDetails(taxDetails);
        const germanTaxOptions = germanTaxOptionsConverter.convertIntoGermanTaxOptions(taxOptions);

        return germanTaxCalculator.calculateTax(germanTaxDetails, germanTaxOptions, salaryDetails);
    }
}

export const germanProcessor = Object.freeze(new GermanProcessor());