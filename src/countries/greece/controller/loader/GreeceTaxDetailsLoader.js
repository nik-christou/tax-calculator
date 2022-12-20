import {GreeceTaxDetails} from '../../model/GreeceTaxDetails.js';
import {GreeceTaxBracket } from '../../model/GreeceTaxBracket.js';
import {GreeceSocialSecurity} from '../../model/GreeceSocialSecurity.js';

class GreeceTaxDetailsLoader {

    /**
     * @param {JSON} countryObj
            const end = taxBracketJson.end === null ? null : taxBracketJson.end;
     * @returns {GreeceTaxDetails}
     */
    loadTaxDetailsFromCountryObject(countryObj) {

        const {taxDetails} = countryObj;

        const taxBrackets = [];

        taxDetails.taxBrackets.forEach((taxBracketJson) => {

            const taxBracket = new GreeceTaxBracket(taxBracketJson.start, taxBracketJson.end, taxBracketJson.ratePercent);

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
