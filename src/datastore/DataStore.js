import { Country } from "../country/model/Country.js";
import { SalaryType } from "../salary/model/SalaryType.js";

export class DataStore {

    /** @type {Array<Country>} */
    #countries;

    /** @type {Country} */
    #selectedCountry;

    /** @type {SalaryType} */
    #selectedPeriod;

    /** @type {Number} */
    #grossAmount;

    /** @type {Boolean} */
    #includesThirteen

    get countries() {
        return this.#countries;
    }

    set countries(countries) {
        this.#countries = countries;
    }

    get selectedCountry() {
        return Object.freeze(this.#selectedCountry);
    }

    set selectedCountry(selectedCountry) {
        this.#selectedCountry = selectedCountry;
    }

    get selectedPeriod() {
        return this.#selectedPeriod;
    }

    set selectedPeriod(selectedPeriod) {
        this.#selectedPeriod = selectedPeriod;
    }

    get grossAmount() {
        return this.#grossAmount;
    }

    set grossAmount(grossAmount) {
        this.#grossAmount = grossAmount;
    }

    get includesThirteen() {
        return this.#includesThirteen;
    }

    set includesThirteen(includesThirteen) {
        this.#includesThirteen = includesThirteen;
    }
}

