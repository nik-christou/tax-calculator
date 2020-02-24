export class Country {
    /**
     * @param {Number} id
     * @param {String} name
     * @param {String} locale
     * @param {String} currency
     */
    constructor(id, name, locale, currency) {
        this.id = id;
        this.name = name;
        this.locale = locale;
        this.currency = currency;

        Object.freeze(this.id);
        Object.freeze(this.name);
        Object.freeze(this.locale);
        Object.freeze(this.currency);
        Object.freeze(this);
    }
}
