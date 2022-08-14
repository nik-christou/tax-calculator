import {taxDetailsStore} from '../../../datastore/TaxDetailsStore.js';
import {userSelectionsStore} from "../../../datastore/UserSelectionsStore";
import {australiaTaxDetailsConverter} from "../../australia/controller/converter/AustraliaTaxDetailsConverter.js";
import {australiaTaxOptionsConverter} from "../../australia/controller/converter/AustraliaTaxOptionsConverter.js";
import {australiaTaxCalculator} from './AustraliaTaxCalculator.js';

class AustraliaProcessor {
    /**
     * @param {Number} countryId
     * @param {SalaryDetails} salaryDetails
     * @returns {TaxResults}
     */
    processAustraliaTax(countryId, salaryDetails) {

        const taxDetails = taxDetailsStore.retrieveTaxDetailsByCountryById(countryId);
        const taxOptions = userSelectionsStore.retrieveSelectedTaxOptions();

        const australiaTaxDetails = australiaTaxDetailsConverter.convertIntoAustraliaTaxDetails(taxDetails);
        const australiaTaxOptions = australiaTaxOptionsConverter.convertIntoAustraliaTaxOptions(taxOptions);

        return australiaTaxCalculator.calculateTax(australiaTaxDetails, australiaTaxOptions, salaryDetails);
    }
}

export const australiaProcessor = Object.freeze(new AustraliaProcessor());
