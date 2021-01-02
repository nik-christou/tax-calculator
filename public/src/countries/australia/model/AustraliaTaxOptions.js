import { TaxOptions } from '../../../model/TaxOptions.js';

const COUNTRY_ID = 2;

export class AustraliaOptions extends TaxOptions {
    /**
     * @param {Boolean} isResident
     */
    constructor(isResident = true) {
        super(COUNTRY_ID);
        this.isResident = isResident;
    }

    /**
     * @param {Object} obj
     * @returns {AustraliaOptions}
     */
    static createFromObject(obj) {
        const australianOptions = new AustraliaOptions();
        return Object.assign(australianOptions, obj);
    }
}
