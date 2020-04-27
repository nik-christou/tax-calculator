import { Country } from "../model/Country.js";
import { SalaryType } from "../model/SalaryType.js";
import { DatabaseManager } from "./DatabaseManager.js";

const STORE_NAME = "user-selection-store";

export class UserSelectionStore {

    /**
     * Updates selected country to store.
     * Ovverides existing country.
     *
     * @param {Country} country
     *
     * @returns {Promise<IDBValidKey>}
     */
    static async updateCountry(country) {
        if(DatabaseManager.dbConnection) {
            const dbConnection = await DatabaseManager.dbConnection;
            return dbConnection.put(STORE_NAME, country, "selectedCountry");
        }
    }

    /**
     * Returns the selected country
     *
     * @returns {Promise<Country>}
     */
    static async retrieveCountry() {
        if(DatabaseManager.dbConnection) {
            const dbConnection = await DatabaseManager.dbConnection;
            return dbConnection.get(STORE_NAME, "selectedCountry");
        }
    }

    /**
     * Updates selected salary type to store.
     * Ovverides existing salary type.
     *
     * @param {SalaryType} salaryType
     */
    static async updateSalaryType(salaryType) {
        if(DatabaseManager.dbConnection) {
            const dbConnection = await DatabaseManager.dbConnection;
            return dbConnection.put(STORE_NAME, salaryType, "salaryType");
        }
    }

    /**
     * Returns the selected salary type
     *
     * @returns {Promise<SalaryType>}
     */
    static async retrieveSalaryType() {
        if(DatabaseManager.dbConnection) {
            const dbConnection = await DatabaseManager.dbConnection;
            return dbConnection.get(STORE_NAME, "salaryType");
        }
    }

    /**
     * Updates gross amount to store.
     * Ovverides existing gross amount.
     *
     * @param {Number} grossAmount
     */
    static async updateGrossAmount(grossAmount) {
        if(DatabaseManager.dbConnection) {
            const dbConnection = await DatabaseManager.dbConnection;
            return dbConnection.put(STORE_NAME, grossAmount, "grossAmount");
        }
    }

    /**
     * Returns the selected gross amount
     *
     * @returns {Promise<Number>}
     */
    static async retrieveGrossAmount() {
        if(DatabaseManager.dbConnection) {
            const dbConnection = await DatabaseManager.dbConnection;
            return dbConnection.get(STORE_NAME, "grossAmount");
        }
    }

    /**
     * Updates the thirteen salary option.
     * Ovverides existing thirteen salary option.
     *
     * @param {Boolean} includesThirteenOption
     */
    static async updateIncludesThirteenOption(includesThirteenOption) {
        if(DatabaseManager.dbConnection) {
            const dbConnection = await DatabaseManager.dbConnection;
            return dbConnection.put(STORE_NAME, includesThirteenOption, "includesThirteenOption");
        }
    }

    /**
     * Returns the selected thirteen salary option
     *
     * @returns {Promise<Boolean>}
     */
    static async retrieveIncludesThirteenOption() {
        if(DatabaseManager.dbConnection) {
            const dbConnection = await DatabaseManager.dbConnection;
            return dbConnection.get(STORE_NAME, "includesThirteenOption");
        }
    }
}
