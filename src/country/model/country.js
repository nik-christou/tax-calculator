import { TaxBracket } from "./tax-bracket.js";

export class Country {
    /**
     * @param {Number} id
     * @param {String} name
     * @param {Array<TaxBracket>} taxBrackets
     * @param {Number} socialInsuranceContributionPercent
     * @param {Number} healthContributionPercent
     * @param {String} locale
     * @param {String} currency
     */
    constructor(id, name, taxBrackets,
        socialInsuranceContributionPercent, healthContributionPercent, locale, currency) {
        this.id = id;
        this.name = name;
        this.taxBrackets = taxBrackets;
        this.socialInsuranceContributionPercent = socialInsuranceContributionPercent;
        this.healthContributionPercent = healthContributionPercent;
        this.locale = locale;
        this.currency = currency;

        Object.freeze(this.id);
        Object.freeze(this.name);
        Object.freeze(this.taxBrackets);
        Object.freeze(this.socialInsuranceContributionPercent);
        Object.freeze(this.healthContributionPercent);
        Object.freeze(this.locale);
        Object.freeze(this.currency);
        Object.freeze(this);
    }
}
