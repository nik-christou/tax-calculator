import { GreeceTaxDetails } from '../model/GreeceTaxDetails.js';
import { GreeceTaxBracket } from '../model/GreeceTaxBracket.js';
import { GreeceSocialSecurity } from '../model/GreeceSocialSecurity.js';

export class GreeceTaxDetailsLoader {

    /**
     * @static
     * @param {Object} countryObject
     * 
     * @returns {Promise<GreeceTaxDetails>}
     */
    static async loadTaxDetailsFromCountryObject(countryObject) {

        const taxBrackets = [];

        countryObject.taxBrackets.forEach((taxBracketJson) => {
            
            const end = taxBracketJson.end === -1 ? Number.POSITIVE_INFINITY : taxBracketJson.end;
            const taxBracket = new GreeceTaxBracket(taxBracketJson.start, end, taxBracketJson.ratePercent);

            taxBrackets.push(taxBracket);
        });

        const socialSecurityContribution = this._loadSocialSecurityContributionData(countryObject);

        return new GreeceTaxDetails(taxBrackets, socialSecurityContribution);
    }

    /**
     * @param {{ socialSecurity: any; }} countryObject
     * 
     * @returns {GreeceSocialSecurity} social security
     */
    static _loadSocialSecurityContributionData(countryObject) {

        const socialSecurityObject = countryObject.socialSecurity;

        return new GreeceSocialSecurity(
            socialSecurityObject.percent,
            socialSecurityObject.maxAmount);
    }
}
