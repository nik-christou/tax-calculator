import {CyprusTaxDetails} from '../../model/CyprusTaxDetails.js';
import {CyprusTaxBracket} from '../../model/CyprusTaxBracket.js';
import {CyprusContributions} from '../../model/CyprusContributions.js';

class CyprusTaxDetailsLoader {

    /**
     * @param {JSON} countryObj
     * @returns {CyprusTaxDetails}
     */
    loadTaxDetailsFromCountryObject(countryObj) {

        const {taxDetails} = countryObj;

        const taxBrackets = [];

        taxDetails.taxBrackets.forEach((taxBracketData) => {
            
            const end = taxBracketData.end === null ? null : taxBracketData.end;
            const taxBracket = new CyprusTaxBracket(taxBracketData.start, end, taxBracketData.ratePercent);

            taxBrackets.push(taxBracket);
        });

        const employedContributions = this.#loadEmployedContributionData(taxDetails);
        const selfEmployedContributions = this.#loadSelfEmployedContributionData(taxDetails);

        return new CyprusTaxDetails(
            taxBrackets, 
            employedContributions, 
            selfEmployedContributions,
            taxDetails.maximumAnnualHealthContributionCap,
            taxDetails.maximumAnnualSocialContributionCap);
    }

    /**
     * @param {Object} cyprusTaxDetails
     * @returns {CyprusContributions} for employed
     */
    #loadEmployedContributionData(cyprusTaxDetails) {
        const {employed} = cyprusTaxDetails;
        return new CyprusContributions(
            employed.socialInsurancePercent,
            employed.healthContributionPercent);
    }

    /**
     * @param {JSON} cyprusTaxDetails
     * @returns {CyprusContributions} for self-employed
     */
    #loadSelfEmployedContributionData(cyprusTaxDetails) {
        const {selfEmployed} = cyprusTaxDetails;
        return new CyprusContributions(
            selfEmployed.socialInsurancePercent,
            selfEmployed.healthContributionPercent);
    }
}

export const cyprusTaxDetailsLoader = Object.freeze(new CyprusTaxDetailsLoader());
