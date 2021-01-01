import { AustraliaTaxBracket } from "./AustraliaTaxBracket.js";

export class AustraliaNonResidents {
    /**
     * @param {Array<AustraliaTaxBracket>} taxBrackets
     */
    constructor(taxBrackets) {
        this.taxBrackets = taxBrackets;

        Object.freeze(this.taxBrackets);
        Object.freeze(this);
    }
}
