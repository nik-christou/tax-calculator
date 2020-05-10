import { AustraliaResidents } from "./AustraliaResidents.js";
import { AustraliaNonResidents } from "./AustraliaNonResidents.js";

export class AustraliaTaxDetails {
    /**
     * @param {AustraliaResidents} residents
     * @param {AustraliaNonResidents} nonResidents
     */
    constructor(residents, nonResidents) {
        this.residents = residents;
        this.nonResidents = nonResidents;

        Object.freeze(this.residents);
        Object.freeze(this.nonResidents);
        Object.freeze(this);
    }
}
