// @ts-check

import { Country } from "../model/country.js";
import { TaxBracket } from "../model/tax-bracket.js";

export class CountryLoader {

    /**
     * Load a data from a json file
     *
     * @param {String} jsonPath
     *
     * @returns {Promise<Country>} the country
     */
    static async loadCountryFromJson(jsonPath) {

        const response = await fetch(jsonPath);
        const data = await response.json();

        const taxBrackets = [];

        data.taxBrackets.forEach(taxBracketJson => {

            const taxBracket = new TaxBracket(
                taxBracketJson['start'],
                taxBracketJson['end'],
                taxBracketJson['ratePercent']);

            taxBrackets.push(taxBracket);
        });

        return new Country(data.id, data.name, taxBrackets, data.healthContributionPercent);;
    }
}
