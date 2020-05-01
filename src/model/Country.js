
export class Country {
    /**
     * @param {Number} id
     * @param {String} name
     * @param {String} locale
     * @param {String} currency
     * @param {String} flag
     * @param {Boolean} additionalOptions
     */
    constructor(id, name, locale, currency, flag, additionalOptions) {
        this.id = id;
        this.name = name;
        this.locale = locale;
        this.currency = currency;
        this.flag = flag;
        this.additionalOptions = additionalOptions;

        Object.freeze(this.id);
        Object.freeze(this.name);
        Object.freeze(this.locale);
        Object.freeze(this.currency);
        Object.freeze(this.flag);
        Object.freeze(this.additionalOptions);
        Object.freeze(this);
    }
}
