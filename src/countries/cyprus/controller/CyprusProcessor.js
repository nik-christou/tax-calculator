import {CyprusTaxDetails} from "../model/CyprusTaxDetails";
import {CyprusTaxOptions} from '../model/CyprusTaxOptions.js';
import {cyprusTaxCalculator} from './CyprusTaxCalculator.js';
import {taxDetailsStore} from '../../../datastore/TaxDetailsStore.js';
import {userSelectionsStore} from '../../../datastore/UserSelectionsStore.js';
import {EmploymentTypes} from "../../../model/EmploymentTypes";

class CyprusProcessor {

    /**
     * @param {Number} countryId
     * @param {SalaryDetails} salaryDetails
     * @returns {TaxResults}
     */
    processCyprusTax(countryId, salaryDetails) {
        const taxDetails = taxDetailsStore.retrieveTaxDetailsByCountryById(countryId);
        const cyprusTaxDetails = this.#createCyprusTaxDetails(taxDetails);
        const taxOptions = userSelectionsStore.retrieveSelectedTaxOptions();
        const cyprusTaxOptions = this.#createCyprusTaxOptions(taxOptions);
        return cyprusTaxCalculator.calculateTax(cyprusTaxDetails, cyprusTaxOptions, salaryDetails);
    }

    /**
     * @param {TaxDetails} taxDetails
     * @returns {CyprusTaxDetails}
     */
    #createCyprusTaxDetails(taxDetails) {
        const {
            taxBrackets,
            employedContributions,
            selfEmployedContributions,
            maximumAnnualHealthContributionCap,
            maximumAnnualSocialContributionCap } = taxDetails.details;

        return new CyprusTaxDetails(
            taxBrackets,
            employedContributions,
            selfEmployedContributions,
            maximumAnnualHealthContributionCap,
            maximumAnnualSocialContributionCap);
    }

    /**
     * @param {TaxOptions} taxOptions
     * @returns {CyprusTaxOptions}
     */
     #createCyprusTaxOptions(taxOptions) {
        const options = taxOptions.options;
        const {type} = options.employmentType;
        return new CyprusTaxOptions(EmploymentTypes.EMPLOYED === type
            ? EmploymentTypes.EMPLOYED
            : EmploymentTypes.SELF_EMPLOYED);
    }
}

export const cyprusProcessor = Object.freeze(new CyprusProcessor());
