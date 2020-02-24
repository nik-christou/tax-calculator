import { CyprusTaxDetails } from "../entity/CyprusTaxDetails.js";
import { CyprusTaxBracket } from "../entity/CyprusTaxBracket.js";

export class CyprusTaxLoader {

    /**
     * Load a data from a json file
     *
     * @param {String} jsonPath
     *
     * @returns {Promise<CyprusTaxDetails>} the tax details
     */
    static async loadTaxDetailsFromJson(jsonPath) {

        const response = await fetch(jsonPath);
        const data = await response.json();

        const taxBrackets = [];

        data.taxBrackets.forEach(taxBracketJson => {

            const end = taxBracketJson["end"] === -1 ? Number.POSITIVE_INFINITY : taxBracketJson["end"];
            const taxBracket = new CyprusTaxBracket(taxBracketJson["start"], end, taxBracketJson["ratePercent"]);

            taxBrackets.push(taxBracket);
        });

        return new CyprusTaxDetails(
            taxBrackets,
            data.socialInsurancePercent,
            data.healthContributionPercent);
    }
}
