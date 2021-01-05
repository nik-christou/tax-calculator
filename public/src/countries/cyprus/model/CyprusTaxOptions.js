import { TaxOptions } from '../../../model/TaxOptions.js';
import CountryIDsEnum from '../../CountryIDsEnum.js';

export class CyprusTaxOptions extends TaxOptions {
    /**
     * @param {Boolean} selfEmployed
     */
    constructor(selfEmployed = false) {
        super(CountryIDsEnum.CYPRUS_ID);
        this.selfEmployed = selfEmployed;
    }

    /**
     * @param {Object} obj
     * @returns {CyprusTaxOptions}
     */
    static createFromObject(obj) {
        const cyprusTaxOptions = new CyprusTaxOptions();
        return Object.assign(cyprusTaxOptions, obj);
    }
}
