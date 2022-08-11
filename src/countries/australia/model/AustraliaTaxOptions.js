import { TaxOptions } from '../../../model/TaxOptions.js';
import CountryIDsEnum from '../../../datastore/CountryIDsEnum.js';

export class AustraliaOptions extends TaxOptions {
    /**
     * @param {Boolean} isResident
     */
    constructor(isResident = true) {
        super(CountryIDsEnum.AUSTRALIA_ID);
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
