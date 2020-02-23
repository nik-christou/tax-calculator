import { Country } from "./country/model/country.js";
import { TaxBracket } from "./country/model/tax-bracket.js";

export class CountriesLoader {

    /**
     * @param {Array<String>} countriesJson JSON file paths
     * @returns {Promise<Array<Country>>} the promise of an array of countries
     */
    static async loadCountriesFromJson(countriesJson) {

        const countries = new Array();

        for(let jsonPath of countriesJson) {

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

        const taxBrackets = [];

        data.taxBrackets.forEach(taxBracketJson => {

            const end = taxBracketJson["end"] === -1 ? Number.POSITIVE_INFINITY : taxBracketJson["end"];
            const taxBracket = new TaxBracket(taxBracketJson["start"], end, taxBracketJson["ratePercent"]);

            taxBrackets.push(taxBracket);
        });

        return new Country(
            data.id,
            data.name,
            taxBrackets,
            data.socialInsurancePercent,
            data.healthContributionPercent,
            data.locale,
            data.currency);
    }
}
