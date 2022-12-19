
export class CyprusTaxOptions {

    /**
     * @param {EmploymentType} employmentType
     */
    constructor(employmentType) {
        this.employmentType = employmentType;
        Object.freeze(this.employmentType);
        Object.freeze(this);
    }
}
