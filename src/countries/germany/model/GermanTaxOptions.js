
export class GermanTaxOptions {
    
    /**
     * @param {MaritalStatus} maritalStatus
     * @param {ParentalStatus} parentalStatus
     */
    constructor(maritalStatus, parentalStatus) {
        this.maritalStatus = maritalStatus;
        this.parentalStatus = parentalStatus;
        Object.freeze(this.maritalStatus);
        Object.freeze(this.parentalStatus);
        Object.freeze(this);
    }
}