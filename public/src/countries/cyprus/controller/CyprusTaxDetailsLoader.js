import { CyprusTaxDetails } from '../model/CyprusTaxDetails.js';
import { CyprusTaxBracket } from '../model/CyprusTaxBracket.js';

export class CyprusTaxDetailsLoader {
    /**
     * @param {Object} jsonData
     * @returns {Promise<CyprusTaxDetails>}
     */
    static async loadTaxDetailsFromJsonData(jsonData) {
        const taxBrackets = [];

        jsonData.taxBrackets.forEach((taxBracketJson) => {
            
            const end = taxBracketJson.end === -1 ? Number.POSITIVE_INFINITY : taxBracketJson.end;
            const taxBracket = new CyprusTaxBracket(taxBracketJson.start, end, taxBracketJson.ratePercent);

            taxBrackets.push(taxBracket);
        });

        return new CyprusTaxDetails(taxBrackets, jsonData.socialInsurancePercent, jsonData.healthContributionPercent);
    }
}
