import {ResidenceTypes} from "../../../../model/ResidenceTypes.js";
import {AustraliaTaxOptions} from "../../model/AustraliaTaxOptions.js";

class AustraliaTaxOptionsLoader {

    /**
     * @param {JSON} countryJsonObj
     * @returns {AustraliaTaxOptions}
     */
    loadAustraliaTaxOptionsFromCountryObject(countryJsonObj) {

        const {taxOptions} = countryJsonObj;
        const {residenceType} = taxOptions;
        const residence = this.#retrieveResidenceType(residenceType);

        return new AustraliaTaxOptions(residence);
    }

    #retrieveResidenceType(residenceType) {
        if(residenceType === ResidenceTypes.RESIDENT.type) {
            return ResidenceTypes.RESIDENT;
        }
        return ResidenceTypes.NON_RESIDENT;
    }
}

export const australiaTaxOptionsLoader = Object.freeze(new AustraliaTaxOptionsLoader());