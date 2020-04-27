import { CyprusTaxDetails } from "../entity/CyprusTaxDetails.js";
import { CyprusTaxBracket } from "../entity/CyprusTaxBracket.js";

export class CyprusTaxLoader {

    /**
     * @param {Object} jsonData
     * @returns {Promise<CyprusTaxDetails>}
     */
    static async loadTaxDetailsFromJsonData(jsonData) {

        const taxBrackets = [];

        jsonData.taxBrackets.forEach(taxBracketJson => {
            const end = taxBracketJson["end"] === -1 ? Number.POSITIVE_INFINITY : taxBracketJson["end"];
            const taxBracket = new CyprusTaxBracket(taxBracketJson["start"], end, taxBracketJson["ratePercent"]);

            taxBrackets.push(taxBracket);
        });

        return new CyprusTaxDetails(
            taxBrackets,
            jsonData.socialInsurancePercent,
            jsonData.healthContributionPercent);
    }
}
