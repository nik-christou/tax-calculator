import { CyprusTaxDetails } from '../model/CyprusTaxDetails.js';
import { CyprusTaxBracket } from '../model/CyprusTaxBracket.js';
import { CyprusContributions } from '../model/CyprusContributions.js';

export class CyprusTaxDetailsLoader {

    /**
     * @static
     * @param {Object} jsonData
     * 
     * @returns {Promise<CyprusTaxDetails>}
     */
    static async loadTaxDetailsFromJsonData(jsonData) {
        const taxBrackets = [];

        jsonData.taxBrackets.forEach((taxBracketJson) => {
            
            const end = taxBracketJson.end === -1 ? Number.POSITIVE_INFINITY : taxBracketJson.end;
            const taxBracket = new CyprusTaxBracket(taxBracketJson.start, end, taxBracketJson.ratePercent);

            taxBrackets.push(taxBracket);
        });

        const employedContributions = this._loadEmployedContributionData(jsonData);
        const selfEmployedContributions = this._loadSelfEmployedContributionData(jsonData);

        return new CyprusTaxDetails(taxBrackets, employedContributions, selfEmployedContributions);
    }

    /**
     * @param {{ employed: any; }} jsonData
     * 
     * @returns {CyprusContributions} for employed
     */
    static _loadEmployedContributionData(jsonData) {
        const employedContributions = jsonData.employed;
        return new CyprusContributions(
            employedContributions.socialInsurancePercent, 
            employedContributions.healthContributionPercent);
    }

    /**
     * @param {{ selfEmployed: any; }} jsonData
     * 
     * @returns {CyprusContributions} for employed
     */
    static _loadSelfEmployedContributionData(jsonData) {
        const selfEmployedContributions = jsonData.selfEmployed;
        return new CyprusContributions(
            selfEmployedContributions.socialInsurancePercent, 
            selfEmployedContributions.healthContributionPercent);
    }
}
