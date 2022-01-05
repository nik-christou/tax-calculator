import { Country } from '../model/Country.js';
import { CountryData } from '../model/CountryData.js';
import { CyprusTaxDetailsLoader } from './cyprus/controller/CyprusTaxDetailsLoader.js';
import { AustraliaTaxDetailsLoader } from './australia/controller/AustraliaTaxDetailsLoader.js';
import { GermanyTaxDetailsLoader } from './germany/control/GermanTaxDetailsLoader.js';
import { GreeceTaxDetailsLoader } from './greece/control/GreeceTaxDetailsLoader.js';

// This type of imports are not supported natively by browsers
// ViteJS needs this imports so it can include the json files
// in the final dist build
import CyprusJson from  './data/cyprus.json';
import AustraliaJson from  './data/australia.json';
import GermanyJson from  './data/germany.json';
import GreeceJson from  './data/greece.json';

const countriesJsons = [
    AustraliaJson, 
    CyprusJson,
    GermanyJson,
    GreeceJson
];

export class CountriesDataLoader {

    /**
     * @static
     * 
     * @returns {Promise<Array<CountryData>>} the promise of an array of CountryData
     */
    static async loadCountryDataFromJson() {

        const countriesData = [];

        for (const countryJson of countriesJsons) {

            const country = await this._retrieveCountryFromJsonData(countryJson);
            const taxDetails = await this._retrieveTaxDetailsFromJsonData(country.id, countryJson);
            const countryData = new CountryData(country, taxDetails);

            countriesData.push(countryData);
        }

        return countriesData;
    }

    // static async _fetchJsonData(jsonPath) {
    //     const response = await window.fetch(jsonPath);
    //     return await response.json();
    // }

    // static _retrieveJsonUrl(jsonPath) {
    //     return new URL(jsonPath, import.meta.url).href;
    // }

    /**
     * @static
     * 
     * @param {Object} jsonData
     */
    static async _retrieveCountryFromJsonData(jsonData) {
        return new Country(jsonData.id, jsonData.name, jsonData.locale, jsonData.currency, jsonData.flag, jsonData.additionalOptions);
    }

    /**
     * @param {Number} countryId
     * @param {Object} jsonData
     */
    static async _retrieveTaxDetailsFromJsonData(countryId, jsonData) {
        switch (countryId) {
            case 1:
                return CyprusTaxDetailsLoader.loadTaxDetailsFromJsonData(jsonData);
            case 2:
                return AustraliaTaxDetailsLoader.loadTaxDetailsFromJsonData(jsonData);
            case 3:
                return GermanyTaxDetailsLoader.loadTaxDetailsFromJsonData(jsonData);
            case 4:
                return GreeceTaxDetailsLoader.loadTaxDetailsFromJsonData(jsonData);
            default:
                return Promise.resolve(null);
        }
    }
}
