import { TaxOptions } from '../../../model/TaxOptions.js';
import CountryIDsEnum from '../../CountryIDsEnum.js';

export class GermanTaxOptions extends TaxOptions {
    
    /**
     * @param {Boolean} single
     * @param {Boolean} withChild
     */
    constructor(single = true, withChild = false) {
        super(CountryIDsEnum.GERMANY_ID);
        this.single = single;
        this.withChild = withChild;
    }

    /**
     * @param {Object} obj
     * @returns {GermanTaxOptions}
     */
    static createFromObject(obj) {
        const germanTaxOptions = new GermanTaxOptions();
        return Object.assign(germanTaxOptions, obj);
    }
}