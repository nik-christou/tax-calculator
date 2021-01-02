
export class CountryData {
    /**
     * @param {import('../model/Country.js').Country} country
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
