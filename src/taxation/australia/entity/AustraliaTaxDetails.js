import { AustraliaResidents } from "./AustraliaResidents";
import { AustraliaNonResidents } from "./AustraliaNonResidents";

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
