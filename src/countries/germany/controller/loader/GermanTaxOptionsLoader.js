import {GermanTaxOptions} from "../../model/GermanTaxOptions.js";
import {MaritalStatuses} from "../../../../model/MaritalStatuses.js";
import {ParentalStatuses} from "../../../../model/ParentalStatuses.js";

class GermanTaxOptionsLoader {

    /**
     * @param {JSON} countryJsonObj
     * @returns {GermanTaxOptions}
     */
    loadGermanTaxOptionsFromCountryObject(countryJsonObj) {

        const {taxOptions} = countryJsonObj;
        const {maritalStatus, parentalStatus} = taxOptions;

        const marital = this.#retrieveMaritalStatus(maritalStatus);
        const parental = this.#retrieveParentalStatus(parentalStatus);

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
}

export const germanTaxOptionsLoader = Object.freeze(new GermanTaxOptionsLoader());