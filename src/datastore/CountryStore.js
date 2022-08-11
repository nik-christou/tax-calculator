import { dataLoaderUtil } from "./DataLoaderUtil.js";

const COUNTRY_KEY_PREFIX = "country_id_";

class CountryStore {

    /**
     * @param {Number} id
     * @returns {Country}
     */
    retrieveCountryById(id) {
        const countryKey = this.#calculateCountryKey(id);
        const countryItem = window.localStorage.getItem(countryKey);
        const countryObj = JSON.parse(countryItem);
        return dataLoaderUtil.convertCountryFromJson(countryObj);
    }

    /**
     * @param {Country} country
     */
    addOrReplaceCountry(country) {
        const countryKey = this.#calculateCountryKey(country.id);
        window.localStorage.setItem(countryKey, JSON.stringify(country));
    }

    /**
     * @param {Number} id
     */
    deleteCountryById(id) {
        const countryKey = this.#calculateCountryKey(id);
        window.localStorage.removeItem(countryKey);
    }

    /**
     * @returns {Country[]}
     */
    retrieveCountries() {

        const countries = [];

        for(let index = 0; index < window.localStorage.length; index++) {
            const countryKey = this.#calculateCountryKey(index);
            const countryItem = window.localStorage.getItem(countryKey);
            if(countryItem === null) {
                continue;
            }
            const countryObj = JSON.parse(countryItem);
            const country = dataLoaderUtil.convertCountryFromJson(countryObj);
            countries.push(country);
        }

        return countries;
    }

    /**
     * @param {Number} id
     * @returns {string}
     */
    #calculateCountryKey(id) {
        return `${COUNTRY_KEY_PREFIX}${id}`;
    }
}

export const countryStore = Object.freeze(new CountryStore());


