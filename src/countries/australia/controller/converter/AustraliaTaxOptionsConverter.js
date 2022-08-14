import {ResidenceTypes} from "../../../../model/ResidenceTypes";
import {AustraliaTaxOptions} from "../../model/AustraliaTaxOptions";
import {australiaTaxOptionsLoader} from "../../../australia/controller/loader/AustraliaTaxOptionsLoader.js";
import {TaxOptions} from "../../../../model/TaxOptions";

class AustraliaTaxOptionsConverter {

    /**
     * @param {TaxOptions} taxOptions
     * @returns {AustraliaTaxOptions}
     */
    convertIntoAustraliaTaxOptions(taxOptions) {
        const australiaTaxOptionsObj = taxOptions.options;
        const {residenceTypeFromObj} = australiaTaxOptionsObj;
        const residenceType = this.#retrieveResidenceType(residenceTypeFromObj);
        return new AustraliaTaxOptions(residenceType);
    }

    /**
     * @param {JSON} residenceTypeFromObj
     * @returns {ResidenceType}
     */
    #retrieveResidenceType(residenceTypeFromObj) {
        if(residenceTypeFromObj === ResidenceTypes.RESIDENT.type) {
            return ResidenceTypes.RESIDENT;
        }
        return ResidenceTypes.NON_RESIDENT;
    }

    /**
     * @param {JSON} countryJson
     * @returns {AustraliaTaxOptions}
     */
    convertIntoAustraliaTaxOptionsFromJson(countryJson) {
        return australiaTaxOptionsLoader.loadAustraliaTaxOptionsFromCountryObject(countryJson);
    }

    /**
     * @param {Number} countryId
     * @param {AustraliaTaxOptions} australiaTaxOptions
     * @returns {TaxOptions}
     */
    convertIntoTaxOptions(countryId, australiaTaxOptions) {
        return new TaxOptions(countryId, australiaTaxOptions);
    }
}

export const australiaTaxOptionsConverter = Object.freeze(new AustraliaTaxOptionsConverter());