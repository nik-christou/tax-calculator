export class TaxDetails {
    
    /**
     * @param {Number} countryId
     * @param {Object} details
     */
    constructor(countryId, details) {
        this.countryId = countryId;
        this.details = details;

        Object.freeze(this.countryId);
        Object.freeze(this.details);
        Object.freeze(this);
    }
}
