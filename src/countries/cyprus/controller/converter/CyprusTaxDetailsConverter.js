import {TaxDetails} from "../../../../model/TaxDetails.js";
import {CyprusTaxDetails} from "../../model/CyprusTaxDetails.js";
import {cyprusTaxDetailsLoader} from "../loader/CyprusTaxDetailsLoader.js";

class CyprusTaxDetailsConverter {

    /**
     * @param {TaxDetails} taxDetails
     * @returns {CyprusTaxDetails}
     */
    convertIntoCyprusTaxDetails(taxDetails) {
        const cyprusTaxDetailsObj = taxDetails.details;
        return new CyprusTaxDetails(
            cyprusTaxDetailsObj.taxBrackets,
            cyprusTaxDetailsObj.employedContributions,
            cyprusTaxDetailsObj.selfEmployedContributions,
            cyprusTaxDetailsObj.maximumAnnualHealthContributionCap,
            cyprusTaxDetailsObj.maximumAnnualSocialContributionCap
        );
    }

    /**
     * @param {JSON} countryJson
     * @returns {CyprusTaxDetails}
     */
    convertIntoCyprusTaxDetailsFromJson(countryJson) {
        return cyprusTaxDetailsLoader.loadTaxDetailsFromCountryObject(countryJson);
    }

    /**
     * @param {Number} countryId
     * @param {CyprusTaxDetails} cyprusTaxDetails
     * @returns {TaxDetails}
     */
    convertIntoTaxDetails(countryId, cyprusTaxDetails) {
        return new TaxDetails(countryId, cyprusTaxDetails);
    }
}

export const cyprusTaxDetailsConverter = Object.freeze(new CyprusTaxDetailsConverter());