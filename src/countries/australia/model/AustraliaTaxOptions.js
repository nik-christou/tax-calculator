
export class AustraliaTaxOptions {
    /**
     * @param {ResidenceType} residentType
     */
    constructor(residenceType) {
        this.residenceType = residenceType;
        Object.freeze(this.residenceType);
        Object.freeze(this);
    }
}
