
export class GermanTaxDetails {
    /**
     * @param {Array<import('./GermanTaxBracket.js').GermanTaxBracket>} singleTaxBrackets
     * @param {Array<import('./GermanTaxBracket.js').GermanTaxBracket>} marriedTaxBrackets
     * @param {import('./GermanPensionInsurance.js').GermanPensionInsurance} pensionInsurance
     * @param {import('./GermanUnemploymentInsurance.js').GermanUnemploymentInsurance} unemploymentInsurance
     * @param {import('./GermanHealthInsurance.js').GermanHealthInsurance} healthInsurance
     * @param {import('./GermanLongTermCareInsurance.js').GermanLongTermCareInsurance} longTermCareInsurance
     */
    constructor(singleTaxBrackets, 
        marriedTaxBrackets, 
        pensionInsurance, 
        unemploymentInsurance, 
        healthInsurance, 
        longTermCareInsurance) {

        this.singleTaxBrackets = singleTaxBrackets;
        this.marriedTaxBrackets = marriedTaxBrackets;
        this.pensionInsurance = pensionInsurance;
        this.unemploymentInsurance = unemploymentInsurance;
        this.healthInsurance = healthInsurance;
        this.longTermCareInsurance = longTermCareInsurance;

        Object.freeze(this.singleTaxBrackets);
        Object.freeze(this.marriedTaxBrackets);
        Object.freeze(this.pensionInsurance);
        Object.freeze(this.unemploymentInsurance);
        Object.freeze(this.healthInsurance);
        Object.freeze(this.longTermCareInsurance);
        Object.freeze(this);
    }
}
