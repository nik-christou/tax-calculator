export class Country {
    /**
     * @param {Number} id
     * @param {String} name
     * @param {String} locale
     * @param {String} currency
     * @param {String} flag
     */
    constructor(id, name, locale, currency, flag) {
        this.id = id;
        this.name = name;
        this.locale = locale;
        this.currency = currency;
        this.flag = flag;

        Object.freeze(this.id);
        Object.freeze(this.name);
        Object.freeze(this.locale);
        Object.freeze(this.currency);
        Object.freeze(this.flag);
        Object.freeze(this);
    }
}
