export class TaxOptions {

    /**
     * @param {Number} countryId
     * @param {Object} options
     */
    constructor(countryId, options) {

        this.countryId = countryId;
        this.options = options;

        Object.freeze(this.countryId);
        Object.freeze(this.options);
        Object.freeze(this);
    }
}
