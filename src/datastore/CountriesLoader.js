import { Country } from "../model/Country.js";
import { CountryData } from "../model/CountryData.js";
import { CountryOptions } from "../model/CountryOptions.js";
import { CyprusTaxLoader } from "../countries/cyprus/control/CyprusTaxLoader.js";
import { AustraliaTaxLoader } from "../countries/australia/control/AustraliaTaxLoader.js";

const countriesJsonFilePaths = [
    "web_assets/data/australia.json",
    "web_assets/data/cyprus.json"
];

export class CountriesDataLoader {
    /**
     * @returns {Promise<Array<CountryData>>} the promise of an array of CountryData
     */
    static async loadCountryDataFromJson() {

        const countriesData = new Array();

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
     * @param {String} jsonPath
     * @returns Object
     */
    static async _fetchJsonData(jsonPath) {
        const response = await fetch(jsonPath);
        return await response.json();
    }

    /**
     * @param {Object} jsonData
     */
    static async _retrieveCountryFromJsonData(jsonData) {

        let countryOptions;

        if(jsonData.options) {
            const options = jsonData.options;
            countryOptions = new CountryOptions(options.resident);
        }

        return new Country(
            jsonData.id,
            jsonData.name,
            jsonData.locale,
            jsonData.currency,
            jsonData.flag,
            countryOptions);
    }

    /**
     * @param {Number} countryId
     * @param {Object} jsonData
     */
    static async _retrieveTaxDetailsFromJsonData(countryId, jsonData) {
        switch (countryId) {
            case 1:
                return CyprusTaxLoader.loadTaxDetailsFromJsonData(jsonData);
            case 2:
                return AustraliaTaxLoader.loadTaxDetailsFromJsonData(jsonData);
            default:
                return Promise.resolve(null);
        }
    }
}
