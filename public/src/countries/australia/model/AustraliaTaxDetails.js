
export class AustraliaTaxDetails {
    /**
     * @param {import('./AustraliaResidents.js').AustraliaResidents} residents
     * @param {import('./AustraliaNonResidents.js').AustraliaNonResidents} nonResidents
     */
    constructor(residents, nonResidents) {
        this.residents = residents;
        this.nonResidents = nonResidents;

        Object.freeze(this.residents);
        Object.freeze(this.nonResidents);
        Object.freeze(this);
    }
}
