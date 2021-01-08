import { Country } from '../model/Country.js';
import { CountryData } from '../model/CountryData.js';
import { CyprusTaxDetailsLoader } from './cyprus/controller/CyprusTaxDetailsLoader.js';
import { AustraliaTaxDetailsLoader } from './australia/controller/AustraliaTaxDetailsLoader.js';
import { GermanyTaxDetailsLoader } from './germany/control/GermanTaxDetailsLoader.js';
import { GreeceTaxDetailsLoader } from './greece/control/GreeceTaxDetailsLoader.js';

const countriesJsonFilePaths = [
    'web_assets/data/australia.json', 
    'web_assets/data/cyprus.json',
    'web_assets/data/germany.json',
    'web_assets/data/greece.json'
];

export class CountriesDataLoader {

    /**
     * @static
     * 
     * @returns {Promise<Array<CountryData>>} the promise of an array of CountryData
     */
    static async loadCountryDataFromJson() {

        const countriesData = [];

        for (const countriesJsonFilePath of countriesJsonFilePaths) {

            const jsonData = await this._fetchJsonData(countriesJsonFilePath);
            const country = await this._retrieveCountryFromJsonData(jsonData);
            const taxDetails = await this._retrieveTaxDetailsFromJsonData(country.id, jsonData);
            const countryData = new CountryData(country, taxDetails);

            countriesData.push(countryData);
        }

        return countriesData;
    }

    /**
     * @static
     * 
     * @param {String} jsonPath
     * 
     * @returns Object
     */
    static async _fetchJsonData(jsonPath) {
        const response = await window.fetch(jsonPath);
        return await response.json();
    }

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
