import { GreeceTaxDetails } from '../model/GreeceTaxDetails.js';
import { GreeceTaxBracket } from '../model/GreeceTaxBracket.js';
import { GreeceSocialSecurity } from '../model/GreeceSocialSecurity.js';

export class GreeceTaxDetailsLoader {

    /**
     * @static
     * @param {Object} jsonData
     * 
     * @returns {Promise<GreeceTaxDetails>}
     */
    static async loadTaxDetailsFromJsonData(jsonData) {

        const taxBrackets = [];

        jsonData.taxBrackets.forEach((taxBracketJson) => {
            
            const end = taxBracketJson.end === -1 ? Number.POSITIVE_INFINITY : taxBracketJson.end;
            const taxBracket = new GreeceTaxBracket(taxBracketJson.start, end, taxBracketJson.ratePercent);

            taxBrackets.push(taxBracket);
        });

        const socialSecurityContribution = this._loadSocialSecurityContributionData(jsonData);

        return new GreeceTaxDetails(taxBrackets, socialSecurityContribution);
    }

    /**
     * @param {{ socialSecurity: any; }} jsonData
     * 
     * @returns {GreeceSocialSecurity} social security
     */
    static _loadSocialSecurityContributionData(jsonData) {

        const socialSecurityJsonData = jsonData.socialSecurity;

        return new GreeceSocialSecurity(
            socialSecurityJsonData.percent,
            socialSecurityJsonData.maxAmount);
    }
}
