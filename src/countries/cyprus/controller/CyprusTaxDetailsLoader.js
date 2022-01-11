import { CyprusTaxDetails } from '../model/CyprusTaxDetails.js';
import { CyprusTaxBracket } from '../model/CyprusTaxBracket.js';
import { CyprusContributions } from '../model/CyprusContributions.js';

export class CyprusTaxDetailsLoader {

    /**
     * @static
     * @param {import('../../data/CyprusTaxData.js').CyprusTaxData} countryData
     * 
     * @returns {Promise<CyprusTaxDetails>}
     */
    static async loadTaxDetailsFromCountryData(countryData) {
        const taxBrackets = [];

        countryData.taxBrackets.forEach((taxBracketData) => {
            
            const end = taxBracketData.end === -1 ? Number.POSITIVE_INFINITY : taxBracketData.end;
            const taxBracket = new CyprusTaxBracket(taxBracketData.start, end, taxBracketData.ratePercent);

            taxBrackets.push(taxBracket);
        });

        const employedContributions = this._loadEmployedContributionData(countryData);
        const selfEmployedContributions = this._loadSelfEmployedContributionData(countryData);

        return new CyprusTaxDetails(
            taxBrackets, 
            employedContributions, 
            selfEmployedContributions, 
            countryData.maximumAnnualHealthContributionCap,
            countryData.maximumAnnualSocialContributionCap);
    }

    /**
     * @param {{ employed: any; }} countryData
     * 
     * @returns {CyprusContributions} for employed
     */
    static _loadEmployedContributionData(countryData) {
        const employedContributions = countryData.employed;
        return new CyprusContributions(
            employedContributions.socialInsurancePercent, 
            employedContributions.healthContributionPercent);
    }

    /**
     * @param {{ selfEmployed: any; }} countryData
     * 
     * @returns {CyprusContributions} for self-employed
     */
    static _loadSelfEmployedContributionData(countryData) {
        const selfEmployedContributions = countryData.selfEmployed;
        return new CyprusContributions(
            selfEmployedContributions.socialInsurancePercent, 
            selfEmployedContributions.healthContributionPercent);
    }
}
