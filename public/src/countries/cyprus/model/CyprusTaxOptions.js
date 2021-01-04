import { TaxOptions } from '../../../model/TaxOptions.js';

const COUNTRY_ID = 1;

export class CyprusTaxOptions extends TaxOptions {
    /**
     * @param {Boolean} selfEmployed
     */
    constructor(selfEmployed = false) {
        super(COUNTRY_ID);
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
