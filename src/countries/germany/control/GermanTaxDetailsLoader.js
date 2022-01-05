import { GermanHealthInsurance } from '../model/GermanHealthInsurance.js';
import { GermanLongTermCareInsurance } from '../model/GermanLongTermCareInsurance.js';
import { GermanPensionInsurance } from '../model/GermanPensionInsurance.js';
import { GermanTaxBracket } from '../model/GermanTaxBracket.js';
import { GermanTaxDetails } from '../model/GermanTaxDetails.js';
import { GermanUnemploymentInsurance } from '../model/GermanUnemploymentInsurance.js';

export class GermanyTaxDetailsLoader {

    /**
     * @static
     * 
     * @param {Object} jsonData
     * 
     * @returns {Promise<GermanTaxDetails>}
     */
    static async loadTaxDetailsFromJsonData(jsonData) {

        const singleTaxBrackets = this._loadSingleTaxBrackets(jsonData);
        const marriedTaxBrackets = this._loadMarriedTaxBrackets(jsonData);
        const pensionInsurance = this._loadPensionInsurance(jsonData);
        const unemploymentInsurance = this._loadUnemploymentInsurance(jsonData);
        const healthInsurance = this._loadHealthInsurance(jsonData);
        const longTermCareInsurance = this._loadLongTermCareInsurance(jsonData);

        return new GermanTaxDetails(singleTaxBrackets, 
            marriedTaxBrackets,
            pensionInsurance,
            unemploymentInsurance,
            healthInsurance,
            longTermCareInsurance);
    }

    /**
     * @static
     * 
     * @param {{ taxBrackets: any; }} jsonData
     * 
     * @returns {Array<GermanTaxBracket>} for single
     */
    static _loadSingleTaxBrackets(jsonData) {

        const taxBrackets = jsonData.taxBrackets.single;

        const singleTaxBrackets = [];

        taxBrackets.forEach((taxBracketJson) => {
            
            const end = taxBracketJson.end === -1 ? Number.POSITIVE_INFINITY : taxBracketJson.end;
            const taxBracket = new GermanTaxBracket(taxBracketJson.start, end, taxBracketJson.ratePercent);

            singleTaxBrackets.push(taxBracket);
        });

        return singleTaxBrackets;
    }

    /**
     * @static
     * 
     * @param {{ taxBrackets: any; }} jsonData
     * 
     * @returns {Array<GermanTaxBracket>} for married
     */
    static _loadMarriedTaxBrackets(jsonData) {

        const taxBrackets = jsonData.taxBrackets.married;

        const marriedTaxBrackets = [];

        taxBrackets.forEach((taxBracketJson) => {
            
            const end = taxBracketJson.end === -1 ? Number.POSITIVE_INFINITY : taxBracketJson.end;
            const taxBracket = new GermanTaxBracket(taxBracketJson.start, end, taxBracketJson.ratePercent);

            marriedTaxBrackets.push(taxBracket);
        });

        return marriedTaxBrackets;
    }

    /**
     * @static
     * 
     * @param {{ pensionInsurance: any; }} jsonData 
     * 
     * @returns {GermanPensionInsurance}
     */
    static _loadPensionInsurance(jsonData) {

        const pensionsInsuranceJsonData = jsonData.pensionInsurance;

        return new GermanPensionInsurance(
            pensionsInsuranceJsonData.percent, 
            pensionsInsuranceJsonData.maxAmount);
    }

    /**
     * @static
     * 
     * @param {{ unemploymentInsurance: any; }} jsonData 
     * 
     * @returns {GermanUnemploymentInsurance}
     */
    static _loadUnemploymentInsurance(jsonData) {

        const unemploymentInsuranceJsonData = jsonData.unemploymentInsurance;
        
        return new GermanUnemploymentInsurance(
            unemploymentInsuranceJsonData.percent, 
            unemploymentInsuranceJsonData.maxAmount);
    }

    /**
     * @static
     * 
     * @param {{ healthInsurance: any; }} jsonData 
     * 
     * @returns {GermanHealthInsurance}
     */
    static _loadHealthInsurance(jsonData) {

        const healthInsuranceJsonData = jsonData.healthInsurance;
        
        return new GermanHealthInsurance(
            healthInsuranceJsonData.percent, 
            healthInsuranceJsonData.maxAmount);
    }

    /**
     * @static
     * 
     * @param {{ longTermCareInsurance: any; }} jsonData 
     * 
     * @returns {GermanLongTermCareInsurance}
     */
    static _loadLongTermCareInsurance(jsonData) {

        const longTermCareInsuranceJsonData = jsonData.longTermCareInsurance;
        
        return new GermanLongTermCareInsurance(
            longTermCareInsuranceJsonData.childlessPercent,
            longTermCareInsuranceJsonData.withChildPercent,
            longTermCareInsuranceJsonData.maxAmount);
    }
}