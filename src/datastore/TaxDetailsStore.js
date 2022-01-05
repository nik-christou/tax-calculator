import { DatabaseManager } from './DatabaseManager.js';

const STORE_NAME = 'tax-details-store';

export class TaxDetailsStore {
    /**
     * @param {Number} countryId
     * @returns {Promise<Object>}
     */
    static async getTaxDetailsByCountryById(countryId) {
        if (DatabaseManager.dbConnection) {
            const dbConnection = await DatabaseManager.dbConnection;
            return dbConnection.get(STORE_NAME, countryId);
        }
    }
}
