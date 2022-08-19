import {TaxDetails} from "../../../../model/TaxDetails.js";
import {GreeceTaxDetails} from "../../model/GreeceTaxDetails.js";
import {greeceTaxDetailsLoader} from "../loader/GreeceTaxDetailsLoader.js";

class GreeceTaxDetailsConverter {

    /**
     * @param {TaxDetails} taxDetails
     * @returns {GreeceTaxDetails}
     */
    convertIntoGreeceTaxDetails(taxDetails) {
        const greeceTaxDetailsObj = taxDetails.details;
        return new GreeceTaxDetails(
            greeceTaxDetailsObj.taxBrackets,
            greeceTaxDetailsObj.socialSecurity
        );
    }

    /**
     * @param {JSON} countryJson
     * @returns {GreeceTaxDetails}
     */
    convertIntoGreeceTaxDetailsFromJson(countryJson) {
        return greeceTaxDetailsLoader.loadTaxDetailsFromCountryObject(countryJson);
    }

    /**
     * @param {Number} countryId
     * @param {GreeceTaxDetails} cyprusTaxDetails
     * @returns {TaxDetails}
     */
    convertIntoTaxDetails(countryId, greeceTaxDetails) {
        return new TaxDetails(countryId, greeceTaxDetails);
    }
}

export const greeceTaxDetailsConverter = Object.freeze(new GreeceTaxDetailsConverter());