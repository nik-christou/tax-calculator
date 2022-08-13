import {TaxDetails} from "../model/TaxDetails";

const TAX_DETAILS_KEY_PREFIX = "tax_details_id_";

class TaxDetailsStore {

    /**
     * @param {Number} id the country id
     */
    retrieveTaxDetailsByCountryById(id) {
        const taxDetailsKey = this.#calculateTaxDetailsKey(id);
        const taxDetailsItem = window.localStorage.getItem(taxDetailsKey);
        const taxDetailsObj = JSON.parse(taxDetailsItem);
        const {countryId, details} = taxDetailsObj;
        return new TaxDetails(countryId, details);
    }

    /**
     * @param {TaxDetails} taxDetails
     */
    addOrReplaceTaxDetails(taxDetails) {
        const taxDetailsKey = this.#calculateTaxDetailsKey(taxDetails.countryId);
        window.localStorage.setItem(taxDetailsKey, JSON.stringify(taxDetails));
    }

    /**
     * @param {Number} id
     * @returns {string}
     */
    #calculateTaxDetailsKey(id) {
        return `${TAX_DETAILS_KEY_PREFIX}${id}`;
    }
}

export const taxDetailsStore = Object.freeze(new TaxDetailsStore());
