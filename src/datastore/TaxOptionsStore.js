import {TaxOptions} from "../model/TaxOptions";

const TAX_OPTIONS_KEY_PREFIX = "tax_options_id_";

class TaxOptionsStore {

    /**
     * @param {Number} id
     * @returns {TaxOptions}
     */
    retrieveTaxOptionsByCountryById(id) {
        const taxOptionsKey = this.#calculateTaxOptionsKey(id);
        const taxOptionsItem = window.localStorage.getItem(taxOptionsKey);
        const taxOptionsObj = JSON.parse(taxOptionsItem);
        const {countryId, options} = taxOptionsObj;
        return new TaxOptions(countryId, options);
    }

    /**
     * @param {TaxOptions} taxOptions
     */
    addOrReplaceTaxOptions(taxOptions) {
        const taxDetailsKey = this.#calculateTaxOptionsKey(taxOptions.countryId);
        window.localStorage.setItem(taxDetailsKey, JSON.stringify(taxOptions));
    }

    /**
     * @param {Number} id
     * @returns {string}
     */
    #calculateTaxOptionsKey(id) {
        return `${TAX_OPTIONS_KEY_PREFIX}${id}`;
    }
}

export const taxOptionsStore = Object.freeze(new TaxOptionsStore());