import { DatabaseManager } from './DatabaseManager.js';

const COUNTRIES_STORE_NAME = 'country-store';

export class CountryStore {
    /**
     * Get a country with a matching id
     *
     * @param {IDBValidKey} id the country id
     * @returns {Promise<import('../model/Country.js').Country>}
     */
    static async getCountryById(id) {
        if (DatabaseManager.dbConnection) {
            const dbConnection = await DatabaseManager.dbConnection;
            return dbConnection.get(COUNTRIES_STORE_NAME, id);
        }
    }

    /**
     * Retrieve all stored countries
     *
     * @returns {Promise<Country[]>} array of stored countries
     */
    static async retrieveCountries() {
        if (DatabaseManager.dbConnection) {
            const dbConnection = await DatabaseManager.dbConnection;
            return dbConnection.getAll(COUNTRIES_STORE_NAME);
        }
    }
}
