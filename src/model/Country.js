import { CountryOptions } from "./CountryOptions";

export class Country {
    /**
     * @param {Number} id
     * @param {String} name
     * @param {String} locale
     * @param {String} currency
     * @param {String} flag
     * @param {CountryOptions} options
     */
    constructor(id, name, locale, currency, flag, options) {
        this.id = id;
        this.name = name;
        this.locale = locale;
        this.currency = currency;
        this.flag = flag;
        this.options = options;

        Object.freeze(this.id);
        Object.freeze(this.name);
        Object.freeze(this.locale);
        Object.freeze(this.currency);
        Object.freeze(this.flag);
        Object.freeze(this.options);
        Object.freeze(this);
    }
}
