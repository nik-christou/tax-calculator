import {GermanHealthInsurance} from '../../model/GermanHealthInsurance.js';
import {GermanLongTermCareInsurance} from '../../model/GermanLongTermCareInsurance.js';
import {GermanPensionInsurance} from '../../model/GermanPensionInsurance.js';
import {GermanTaxBracket} from '../../model/GermanTaxBracket.js';
import {GermanTaxDetails} from '../../model/GermanTaxDetails.js';
import {GermanUnemploymentInsurance} from '../../model/GermanUnemploymentInsurance.js';

class GermanyTaxDetailsLoader {

    /**
     * @param {JSON} countryObj
     * @returns {GermanTaxDetails}
     */
    loadTaxDetailsFromCountryObject(countryObj) {

        const {taxDetails} = countryObj;

        const singleTaxBrackets = this.#loadSingleTaxBrackets(taxDetails);
        const marriedTaxBrackets = this.#loadMarriedTaxBrackets(taxDetails);
        const pensionInsurance = this.#loadPensionInsurance(taxDetails);
        const unemploymentInsurance = this.#loadUnemploymentInsurance(taxDetails);
        const healthInsurance = this.#loadHealthInsurance(taxDetails);
        const longTermCareInsurance = this.#loadLongTermCareInsurance(taxDetails);

        return new GermanTaxDetails(singleTaxBrackets, 
            marriedTaxBrackets,
            pensionInsurance,
            unemploymentInsurance,
            healthInsurance,
            longTermCareInsurance);
    }

    /**
     * @param {Object} taxDetails
     * @returns {GermanTaxBracket[]}
     */
    #loadSingleTaxBrackets(taxDetails) {

        const {taxBrackets} = taxDetails;
        const {single} = taxBrackets;

        const singleTaxBrackets = [];

        single.forEach((taxBracketJson) => {
            
            const end = taxBracketJson.end === -1 ? Number.POSITIVE_INFINITY : taxBracketJson.end;
            const taxBracket = new GermanTaxBracket(taxBracketJson.start, end, taxBracketJson.ratePercent);

            singleTaxBrackets.push(taxBracket);
        });

        return singleTaxBrackets;
    }

    /**
     * @param {Object} taxDetails
     * @returns {GermanTaxBracket[]} for married
     */
    #loadMarriedTaxBrackets(taxDetails) {

        const {taxBrackets} = taxDetails;
        const {married} = taxBrackets;

        const marriedTaxBrackets = [];

        married.forEach((taxBracketJson) => {
            
            const end = taxBracketJson.end === -1 ? Number.POSITIVE_INFINITY : taxBracketJson.end;
            const taxBracket = new GermanTaxBracket(taxBracketJson.start, end, taxBracketJson.ratePercent);

            marriedTaxBrackets.push(taxBracket);
        });

        return marriedTaxBrackets;
    }

    /**
     * @param {Object} taxDetails
     * @returns {GermanPensionInsurance}
     */
    #loadPensionInsurance(taxDetails) {
        const {pensionInsurance} = taxDetails;
        return new GermanPensionInsurance(
            pensionInsurance.percent,
            pensionInsurance.maxAmount);
    }

    /**
     * @param {Object} taxDetails
     * @returns {GermanUnemploymentInsurance}
     */
    #loadUnemploymentInsurance(taxDetails) {
        const {unemploymentInsurance} = taxDetails;
        return new GermanUnemploymentInsurance(
            unemploymentInsurance.percent,
            unemploymentInsurance.maxAmount);
    }

    /**
     * @param {Object} taxDetails
     * @returns {GermanHealthInsurance}
     */
    #loadHealthInsurance(taxDetails) {
        const {healthInsurance} = taxDetails;
        return new GermanHealthInsurance(
            healthInsurance.percent,
            healthInsurance.maxAmount);
    }

    /**
     * @param {Object} taxDetails
     * @returns {GermanLongTermCareInsurance}
     */
    #loadLongTermCareInsurance(taxDetails) {
        const {longTermCareInsurance} = taxDetails;
        return new GermanLongTermCareInsurance(
            longTermCareInsurance.childlessPercent,
            longTermCareInsurance.withChildPercent,
            longTermCareInsurance.maxAmount);
    }
}

export const germanyTaxDetailsLoader = Object.freeze(new GermanyTaxDetailsLoader());