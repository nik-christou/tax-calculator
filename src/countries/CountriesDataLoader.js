import { Country } from '../model/Country.js';
import { CountryData } from '../model/CountryData.js';
import { CyprusTaxDetailsLoader } from './cyprus/controller/CyprusTaxDetailsLoader.js';
import { AustraliaTaxDetailsLoader } from './australia/controller/AustraliaTaxDetailsLoader.js';
import { GermanyTaxDetailsLoader } from './germany/control/GermanTaxDetailsLoader.js';
import { GreeceTaxDetailsLoader } from './greece/control/GreeceTaxDetailsLoader.js';
import { CyprusTaxData } from './data/CyprusTaxData.js';
import { AustraliaTaxData } from './data/AustraliaTaxData.js';
import { GermanyTaxData } from './data/GermanyTaxData.js';
import { GreeceTaxData } from './data/GreeceTaxData.js';

export class CountriesDataLoader {

    /**
     * @static
     * 
     * @returns {Promise<Array<CountryData>>} the promise of an array of CountryData
     */
    static async loadCountryDataFromJson() {

        const countryObjects = [
            CyprusTaxData,
            AustraliaTaxData,
            GermanyTaxData,
            GreeceTaxData
        ];

        const countriesData = [];

        for (const countryObj of countryObjects) {

            const country = await this._convertIntoCountry(countryObj);
            const taxDetails = await this._retrieveTaxDetailsFromCountryData(country.id, countryObj);
            const countryData = new CountryData(country, taxDetails);

            countriesData.push(countryData);
        }

        return countriesData;
    }

    static async _convertIntoCountry(countryObj) {
        return new Country(countryObj.id, 
            countryObj.name, 
            countryObj.locale, 
            countryObj.currency, 
            countryObj.flag, 
            countryObj.additionalOptions
        );
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
    static async _retrieveTaxDetailsFromCountryData(countryId, countryData) {
        switch (countryId) {
            case 1:
                return CyprusTaxDetailsLoader.loadTaxDetailsFromJsonData(countryData);
            case 2:
                return AustraliaTaxDetailsLoader.loadTaxDetailsFromJsonData(countryData);
            case 3:
                return GermanyTaxDetailsLoader.loadTaxDetailsFromJsonData(countryData);
            case 4:
                return GreeceTaxDetailsLoader.loadTaxDetailsFromJsonData(countryData);
            default:
                return Promise.resolve(null);
        }
    }
}
