import {TaxOptions} from "../../../../model/TaxOptions.js";
import {MaritalStatuses} from "../../../../model/MaritalStatuses.js";
import {ParentalStatuses} from "../../../../model/ParentalStatuses.js";
import {germanTaxOptionsLoader} from "../loader/GermanTaxOptionsLoader.js";
import {GermanTaxOptions} from "../../model/GermanTaxOptions.js";

class GermanTaxOptionsConverter {

    /**
     * @param {TaxOptions} taxOptions
     * @returns {GermanTaxOptions}
     */
    convertIntoGermanTaxOptions(taxOptions) {
        const germanTaxOptionsObj = taxOptions.options;
        const {maritalStatusFromObj, parentalStatusFromObj} = germanTaxOptionsObj;
        const marital = this.#retrieveMaritalStatus(maritalStatusFromObj);
        const parental = this.#retrieveParentalStatus(parentalStatusFromObj);
        return new GermanTaxOptions(marital, parental);
    }

    #retrieveMaritalStatus(maritalStatus) {
        if(maritalStatus === MaritalStatuses.SINGLE.type) {
            return MaritalStatuses.SINGLE;
        }
        return MaritalStatuses.MARRIED;
    }

    #retrieveParentalStatus(parentalStatus) {
        if(parentalStatus === ParentalStatuses.NO_CHILDREN.type) {
            return ParentalStatuses.NO_CHILDREN;
        }
        return ParentalStatuses.WITH_CHILDREN;
    }

    /**
     * @param {JSON} countryJson
     * @returns {GermanTaxOptions}
     */
    convertIntoGermanTaxOptionsFromJson(countryJson) {
        return germanTaxOptionsLoader.loadGermanTaxOptionsFromCountryObject(countryJson);
    }

    /**
     * @param {Number} countryId
     * @param {GermanTaxOptions} cyprusTaxOptions
     * @returns {TaxOptions}
     */
    convertIntoTaxOptions(countryId, germanTaxOptions) {
        return new TaxOptions(countryId, germanTaxOptions);
    }
}

export const germanTaxOptionsConverter = Object.freeze(new GermanTaxOptionsConverter());