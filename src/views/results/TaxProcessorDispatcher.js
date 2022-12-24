import {cyprusProcessor} from '../../countries/cyprus/controller/CyprusProcessor.js';
import {australiaProcessor} from '../../countries/australia/controller/AustraliaProcessor.js';
import {germanProcessor} from '../../countries/germany/controller/GermanProcessor.js';
import {greeceProcessor} from '../../countries/greece/controller/GreeceProcessor.js';

export class TaxProcessorDispatcher {
    
    /**
     * @param {Number} countryId
     * @param {SalaryDetails} salaryDetails
     *
     * @returns {TaxResults}
     */
    static dispatch(countryId, salaryDetails) {

        switch (countryId) {
            case 1:
                return cyprusProcessor.processCyprusTax(countryId, salaryDetails);
            case 2:
                return australiaProcessor.processAustraliaTax(countryId, salaryDetails);
            case 3:
                return germanProcessor.processGermanTax(countryId, salaryDetails);
            case 4:
                return greeceProcessor.processGreeceTax(countryId, salaryDetails);
            default:
                return null;
        }
    }
}
