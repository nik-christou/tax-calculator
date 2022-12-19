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
        const {maritalStatus, parentalStatus} = germanTaxOptionsObj;
        const maritalStatusObj = this.#retrieveMaritalStatus(maritalStatus);
        const parentalStatusObj = this.#retrieveParentalStatus(parentalStatus);
        return new GermanTaxOptions(maritalStatusObj, parentalStatusObj);
    }

    #retrieveMaritalStatus(maritalStatus) {
        if(maritalStatus.type === MaritalStatuses.SINGLE.type) {
            return MaritalStatuses.SINGLE;
        }
        return MaritalStatuses.MARRIED;
    }

    #retrieveParentalStatus(parentalStatus) {
        if(parentalStatus.type === ParentalStatuses.NO_CHILDREN.type) {
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