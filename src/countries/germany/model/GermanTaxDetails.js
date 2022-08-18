
export class GermanTaxDetails {

    /**
     * @param {GermanTaxBracket[]} singleTaxBrackets
     * @param {GermanTaxBracket[]} marriedTaxBrackets
     * @param {GermanPensionInsurance} pensionInsurance
     * @param {GermanUnemploymentInsurance} unemploymentInsurance
     * @param {GermanHealthInsurance} healthInsurance
     * @param {GermanLongTermCareInsurance} longTermCareInsurance
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
