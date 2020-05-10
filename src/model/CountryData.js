import { Country } from "../model/Country.js";

export class CountryData {
    /**
     * @param {Country} country
     * @param {Object} taxDetails
     */
    constructor(country, taxDetails) {
        this.country = country;
        this.taxDetails = taxDetails;

        Object.freeze(this.country);
        Object.freeze(this.taxDetails);
        Object.freeze(this);
    }
}
