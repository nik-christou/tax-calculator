import { Country } from "./model/Country.js";

const countriesJson = [
    "web_assets/data/australia.json",
    "web_assets/data/cyprus.json"
];

export class CountriesLoader {
    /**
     * @returns {Promise<Array<Country>>} the promise of an array of countries
     */
    static async loadCountriesFromJson() {

        const countries = new Array();

        for (let jsonPath of countriesJson) {
            const country = await this._loadCountryFromJson(jsonPath);
            countries.push(country);
        }

        return countries;
    }

    /**
     * Load a data from a json file
     *
     * @param {String} jsonPath
     *
     * @returns {Promise<Country>} the country
     */
    static async _loadCountryFromJson(jsonPath) {
        const response = await fetch(jsonPath);
        const data = await response.json();

        return new Country(data.id, data.name, data.locale, data.currency, data.flag);
    }
}
