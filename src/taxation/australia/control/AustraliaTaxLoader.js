import { AustraliaTaxDetails } from "../entity/AustraliaTaxDetails.js";
import { AustraliaTaxBracket } from "../entity/AustraliaTaxBracket.js";
import { AustraliaResidents } from "../entity/AustraliaResidents.js";
import { AustraliaNonResidents } from "../entity/AustraliaNonResidents.js";

export class AustraliaTaxLoader {

    /**
     * Load a data from a json file
     *
     * @param {String} jsonPath
     *
     * @returns {Promise<AustraliaTaxDetails>} the tax details
     */
    static async loadTaxDetailsFromJson(jsonPath) {
        const response = await fetch(jsonPath);
        const data = await response.json();

        const residents = this._loadResidentsData(data);
        const nonResidents = this._loadNonResidentsData(data);

        return new AustraliaTaxDetails(residents, nonResidents);
    }

    /**
     * @param {{ residents: any; }} data
     */
    static _loadResidentsData(data) {

        const residents = data.residents;
        const taxBrackets = this._loadTaxBrackets(residents.taxBrackets);
        return new AustraliaResidents(taxBrackets, residents["medicarePercent"]);
    }

    /**
     * @param {{ nonResidents: any; }} data
     */
    static _loadNonResidentsData(data) {

        const nonResidents = data.nonResidents;
        const taxBrackets = this._loadTaxBrackets(nonResidents.taxBrackets);

        return new AustraliaNonResidents(taxBrackets);
    }

    /**
     * @param {any} taxBracketsJson
     */
    static _loadTaxBrackets(taxBracketsJson) {

        const taxBrackets = [];

        taxBrackets.forEach(taxBracketJson => {
            const end = taxBracketJson["end"] === -1 ? Number.POSITIVE_INFINITY : taxBracketJson["end"];
            const taxBracket = new AustraliaTaxBracket(
                taxBracketJson["start"],
                end,
                taxBracketJson["fixedCharge"],
                taxBracketJson["ratePercent"]);

            taxBrackets.push(taxBracket);
        });

        return taxBrackets;
    }
}
