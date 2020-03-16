
import { Country } from "../country/model/Country.js";

export class DataStore {

    /**
     * @private
     * @property {Country} selectedCountry
    */
    #selectedCountry;

    /**
     * @private
     * @property {Array<Country>} countries
    */
    #countries;

    /**
     * @readonly
     * @returns {Array<Country>} countries
     */
    get countries() {
        return Object.freeze(this.#countries);
    }

    /**
     * @param {Array<Country>} countries to set
     */
    set countries(countries) {
        this.#countries = Object.freeze(countries);
    }

    /**
     * @readonly
     * @returns {Country} selected country
     */
    get selectedCountry() {
        return Object.freeze(this.#selectedCountry);
    }

    /**
     * @param {Country} selectedCountry
     */
    set selectedCountry(selectedCountry) {
        this.#selectedCountry = selectedCountry;
    }
}

