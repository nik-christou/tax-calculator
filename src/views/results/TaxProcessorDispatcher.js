import { cyprusProcessor } from '../../countries/cyprus/controller/CyprusProcessor.js';
import { AustraliaProcessor } from '../../countries/australia/controller/AustraliaProcessor.js';
import { GermanProcessor } from '../../countries/germany/control/GermanProcessor.js';
import { GreeceProcessor } from '../../countries/greece/control/GreeceProcessor.js';

export class TaxProcessorDispatcher {
    
    /**
     * @param {Number} countryId
     * @param {import('../../model/SalaryDetails.js').SalaryDetails} salaryDetails
     *
     * @returns {Promise<import('../../model/TaxResults.js').TaxResults>}
     */
    static dispatch(countryId, salaryDetails) {

        switch (countryId) {
            case 1:
                return cyprusProcessor.processCyprusTax(countryId, salaryDetails);
            case 2:
                return AustraliaProcessor.processAustraliaTax(countryId, salaryDetails);
            case 3:
                return GermanProcessor.processGermanTax(countryId, salaryDetails);
            case 4:
                return GreeceProcessor.processGreeceTax(countryId, salaryDetails);
            default:
                return null;
        }
    }
}
