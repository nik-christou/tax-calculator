import {TaxDetails} from "../../../../model/TaxDetails";
import {AustraliaTaxDetails} from "../../model/AustraliaTaxDetails.js";
import {australiaTaxDetailsLoader} from "../../../australia/controller/loader/AustraliaTaxDetailsLoader.js";


class AustraliaTaxDetailsConverter {

    /**
     * @param {TaxDetails} taxDetails
     * @returns {AustraliaTaxDetails}
     */
    convertIntoAustraliaTaxDetails(taxDetails) {
        const australiaTaxDetailsObj = taxDetails.details;
        const {residents, nonResidents} = australiaTaxDetailsObj;
        return new AustraliaTaxDetails(residents, nonResidents);
    }

    /**
     * @param {JSON} countryJson
     * @returns {AustraliaTaxDetails}
     */
    convertIntoAustraliaTaxDetailsFromJson(countryJson) {
        return australiaTaxDetailsLoader.loadTaxDetailsFromCountryObject(countryJson);
    }

    /**
     * @param {Number} countryId
     * @param {AustraliaTaxDetails} australiaTaxDetails
     * @returns {TaxDetails}
     */
    convertIntoTaxDetails(countryId, australiaTaxDetails) {
        return new TaxDetails(countryId, australiaTaxDetails);
    }
}

export const australiaTaxDetailsConverter = Object.freeze(new AustraliaTaxDetailsConverter());