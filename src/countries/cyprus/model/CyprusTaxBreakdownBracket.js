export class CyprusTaxBreakdownBracket {

    /**
     * @param {import('./CyprusTaxBracket.js'} taxBracket 
     * @param {Number} taxAmount 
     */
    constructor(taxBracket, taxAmount) {
        this.taxBracket = taxBracket;
        this.taxAmount = taxAmount;

        Object.freeze(this.taxBracket);
        Object.freeze(this.taxAmount);
        Object.freeze(this);
    }
}