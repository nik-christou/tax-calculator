import {GreeceTaxDetails} from '../../model/GreeceTaxDetails.js';
import {GreeceTaxBracket } from '../../model/GreeceTaxBracket.js';
import {GreeceSocialSecurity} from '../../model/GreeceSocialSecurity.js';

class GreeceTaxDetailsLoader {

    /**
     * @param {JSON} countryObj
     * @returns {GreeceTaxDetails}
     */
    loadTaxDetailsFromCountryObject(countryObj) {

        const {taxDetails} = countryObj;

        const taxBrackets = [];

        taxDetails.taxBrackets.forEach((taxBracketJson) => {
            
            const end = taxBracketJson.end === -1 ? Number.POSITIVE_INFINITY : taxBracketJson.end;
            const taxBracket = new GreeceTaxBracket(taxBracketJson.start, end, taxBracketJson.ratePercent);

            taxBrackets.push(taxBracket);
        });

        const socialSecurityContribution = this.#loadSocialSecurityContributionData(taxDetails);

        return new GreeceTaxDetails(taxBrackets, socialSecurityContribution);
    }

    /**
     * @param {Object} countryObject
     * @returns {GreeceSocialSecurity} social security
     */
    #loadSocialSecurityContributionData(taxDetails) {

        const socialSecurityObject = taxDetails.socialSecurity;

        return new GreeceSocialSecurity(
            socialSecurityObject.percent,
            socialSecurityObject.maxAmount);
    }
}

export const greeceTaxDetailsLoader = Object.freeze(new GreeceTaxDetailsLoader());
