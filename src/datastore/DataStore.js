import { Country } from "../model/Country.js";
import { SalaryType } from "../model/SalaryType.js";

export class DataStore {

    /**
     * @param {Array<Country>} countries
     * @param {Country} selectedCountry
     * @param {SalaryType} selectedPeriod
     * @param {Number} grossAmount
     * @param {Boolean} includesThirteen
     */
    constructor(countries = undefined,
        selectedCountry = undefined,
        selectedPeriod = undefined,
        grossAmount = undefined,
        includesThirteen = undefined) {

        this.countries = countries;
        this.selectedCountry = selectedCountry;
        this.selectedPeriod = selectedPeriod;
        this.grossAmount = grossAmount;
        this.includesThirteen = includesThirteen;
    }
}

