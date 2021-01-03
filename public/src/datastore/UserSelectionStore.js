import { DatabaseManager } from './DatabaseManager.js';

const STORE_NAME = 'user-selection-store';

export class UserSelectionStore {
    /**
     * Updates selected country to store.
     * Ovverides existing country.
     *
     * @param {import('../model/Country.js').Country} country
     *
     * @returns {Promise<IDBValidKey>}
     */
    static async updateCountry(country) {
        if (DatabaseManager.dbConnection) {
            const dbConnection = await DatabaseManager.dbConnection;
            return dbConnection.put(STORE_NAME, country, 'selectedCountry');
        }
    }

    /**
     * Returns the selected country
     *
     * @returns {Promise<import('../model/Country.js').Country>}
     */
    static async retrieveCountry() {
        if (DatabaseManager.dbConnection) {
            const dbConnection = await DatabaseManager.dbConnection;
            return dbConnection.get(STORE_NAME, 'selectedCountry');
        }
    }

    /**
     * Updates selected salary type to store.
     * Ovverides existing salary type.
     *
     * @param {import('../model/SalaryType.js').SalaryType} salaryType
     */
    static async updateSalaryType(salaryType) {
        if (DatabaseManager.dbConnection) {
            const dbConnection = await DatabaseManager.dbConnection;
            return dbConnection.put(STORE_NAME, salaryType, 'salaryType');
        }
    }

    /**
     * Returns the selected salary type
     *
     * @returns {Promise<import('../model/SalaryType.js').SalaryType>}
     */
    static async retrieveSalaryType() {
        if (DatabaseManager.dbConnection) {
            const dbConnection = await DatabaseManager.dbConnection;
            return dbConnection.get(STORE_NAME, 'salaryType');
        }
    }

    /**
     * Updates gross amount to store.
     * Ovverides existing gross amount.
     *
     * @param {Number} grossAmount
     */
    static async updateGrossAmount(grossAmount) {
        if (DatabaseManager.dbConnection) {
            const dbConnection = await DatabaseManager.dbConnection;
            return dbConnection.put(STORE_NAME, grossAmount, 'grossAmount');
        }
    }

    /**
     * Returns the selected gross amount
     *
     * @returns {Promise<Number>}
     */
    static async retrieveGrossAmount() {
        if (DatabaseManager.dbConnection) {
            const dbConnection = await DatabaseManager.dbConnection;
            return dbConnection.get(STORE_NAME, 'grossAmount');
        }
    }

    /**
     * Updates the thirteen salary option.
     * Ovverides existing thirteen salary option.
     *
     * @param {Boolean} includesThirteenOption
     */
    static async updateIncludesThirteenOption(includesThirteenOption) {
        if (DatabaseManager.dbConnection) {
            const dbConnection = await DatabaseManager.dbConnection;
            return dbConnection.put(STORE_NAME, includesThirteenOption, 'includesThirteenOption');
        }
    }

    /**
     * Returns the selected thirteen salary option
     *
     * @returns {Promise<Boolean>}
     */
    static async retrieveIncludesThirteenOption() {
        if (DatabaseManager.dbConnection) {
            const dbConnection = await DatabaseManager.dbConnection;
            return dbConnection.get(STORE_NAME, 'includesThirteenOption');
        }
    }

    /**
     * Updates the Map of country options by adding
     * the given country options object.
     * Ovverides existing country options object.
     *
     * @param {import('../model/TaxOptions.js')TaxOptions} countryOptions
     */
    static async updateCountryOptions(countryOptions) {
        if (DatabaseManager.dbConnection) {
            const dbConnection = await DatabaseManager.dbConnection;
            let countryOptionsMap = await dbConnection.get(STORE_NAME, 'countryOptions');

            if (!countryOptionsMap) countryOptionsMap = new Map();

            countryOptionsMap.set(countryOptions.countryId, countryOptions);
            return dbConnection.put(STORE_NAME, countryOptionsMap, 'countryOptions');
        }
    }

    /**
     * @returns {Promise<Map<import('../model/TaxOptions.js')TaxOptions>>}
     */
    static async retrieveAllCountryOptions() {
        if (DatabaseManager.dbConnection) {
            const dbConnection = await DatabaseManager.dbConnection;
            return dbConnection.get(STORE_NAME, 'countryOptions');
        }
    }

    /**
     * @param {Number} countryId
     * @returns {Promise<TaxOptions>}
     */
    static async retrieveCountryOptionByCountryId(countryId) {
        if (DatabaseManager.dbConnection) {
            const dbConnection = await DatabaseManager.dbConnection;
            const countryOptionsMap = await dbConnection.get(STORE_NAME, 'countryOptions');
            if (countryOptionsMap) return countryOptionsMap.get(countryId);
            return Promise.resolve(null);
        }
    }
}
