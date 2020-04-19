import { AustraliaTaxBracket } from "./AustraliaTaxBracket.js";

export class AustraliaResidents {
    /**
     * @param {Array<AustraliaTaxBracket>} taxBrackets
     * @param {Number} medicarePercent
     */
    constructor(taxBrackets, medicarePercent) {
        this.taxBrackets = taxBrackets;
        this.medicarePercent = medicarePercent;

        Object.freeze(this.taxBrackets);
        Object.freeze(this.medicarePercent);
        Object.freeze(this);
    }
}
