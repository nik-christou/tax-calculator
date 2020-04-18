import DatabaseStore from "./DatabaseStore.js";
import { Country } from "../model/Country.js";
import { SalaryType } from "../model/SalaryType.js";

const STORE_NAME = "user-selection-store";

class _UserSelectionStore {

    constructor() {
        this.dbConnection = DatabaseStore.db;
    }

    /**
     * Updates selected country to store.
     * Ovverides existing country.
     *
     * @param {Country} country
     *
     * @returns {Promise<IDBValidKey>}
     */
    async updateCountry(country) {
        return (await this.dbConnection).put(STORE_NAME, country, "selectedCountry");
    }

    /**
     * Returns the selected country
     *
     * @returns {Promise<Country>}
     */
    async retrieveCountry() {
        return (await this.dbConnection).get(STORE_NAME, "selectedCountry");
    }

    /**
     * Updates selected salary type to store.
     * Ovverides existing salary type.
     *
     * @param {SalaryType} salaryType
     */
    async updateSalaryType(salaryType) {
        return (await this.dbConnection).put(STORE_NAME, salaryType, "salaryType");
    }

    /**
     * Returns the selected salary type
     *
     * @returns {Promise<SalaryType>}
     */
    async retrieveSalaryType() {
        return (await this.dbConnection).get(STORE_NAME, "salaryType");
    }

    /**
     * Updates gross amount to store.
     * Ovverides existing gross amount.
     *
     * @param {Number} grossAmount
     */
    async updateGrossAmount(grossAmount) {
        return (await this.dbConnection).put(STORE_NAME, grossAmount, "grossAmount");
    }

    /**
     * Returns the selected gross amount
     *
     * @returns {Promise<Number>}
     */
    async retrieveGrossAmount() {
        return (await this.dbConnection).get(STORE_NAME, "grossAmount");
    }

    /**
     * Updates the thirteen salary option.
     * Ovverides existing thirteen salary option.
     *
     * @param {Boolean} includesThirteenOption
     */
    async updateIncludesThirteenOption(includesThirteenOption) {
        return (await this.dbConnection).put(STORE_NAME, includesThirteenOption, "includesThirteenOption");
    }

    /**
     * Returns the selected thirteen salary option
     *
     * @returns {Promise<Boolean>}
     */
    async retrieveIncludesThirteenOption() {
        return (await this.dbConnection).get(STORE_NAME, "includesThirteenOption");
    }
}

export default new _UserSelectionStore();
