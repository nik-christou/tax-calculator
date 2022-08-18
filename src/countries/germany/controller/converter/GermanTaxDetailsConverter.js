import {TaxDetails} from "../../../../model/TaxDetails.js";
import {GermanTaxDetails} from "../../../germany/model/GermanTaxDetails.js";
import {germanyTaxDetailsLoader} from "../../../germany/controller/loader/GermanTaxDetailsLoader.js";

class GermanTaxDetailsConverter {

    /**
     * @param {TaxDetails} taxDetails
     * @returns {GermanTaxDetails}
     */
    convertIntoGermanTaxDetails(taxDetails) {
        const germanTaxDetailsObj = taxDetails.details;
        return new GermanTaxDetails(
            germanTaxDetailsObj.singleTaxBrackets,
            germanTaxDetailsObj.marriedTaxBrackets,
            germanTaxDetailsObj.pensionInsurance,
            germanTaxDetailsObj.unemploymentInsurance,
            germanTaxDetailsObj.healthInsurance,
            germanTaxDetailsObj.longTermCareInsurance
        );
    }

    /**
     * @param {JSON} countryJson
     * @returns {GermanTaxDetails}
     */
    convertIntoGermanTaxDetailsFromJson(countryJson) {
        return germanyTaxDetailsLoader.loadTaxDetailsFromCountryObject(countryJson);
    }

    /**
     * @param {Number} countryId
     * @param {GermanTaxDetails} germanTaxDetails
     * @returns {TaxDetails}
     */
    convertIntoTaxDetails(countryId, germanTaxDetails) {
        return new TaxDetails(countryId, germanTaxDetails);
    }
}

export const germanTaxDetailsConverter = Object.freeze(new GermanTaxDetailsConverter());