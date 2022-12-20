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
        const {residenceType} = australiaTaxOptionsObj;
        const residenceTypeObj = this.#retrieveResidenceType(residenceType);

        return new AustraliaTaxOptions(residenceTypeObj);
    }

    /**
     * @param {ResidenceType} residenceTypeObj
     * @returns {ResidenceType}
     */
    #retrieveResidenceType(residenceTypeObj) {
        if(residenceTypeObj.type === ResidenceTypes.RESIDENT.type) {
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