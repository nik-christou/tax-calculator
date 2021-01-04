import { openDB, deleteDB } from 'idb/build/esm/index.js';
import { CountriesDataLoader } from '../countries/CountriesDataLoader.js';

const DB_VERSION = 2;
const DB_NAME = 'tax-calculator-db';
const COUNTRIES_STORE_NAME = 'country-store';
const TAX_DETAILS_STORE_NAME = 'tax-details-store';
const USER_SELECTION_STORE_NAME = 'user-selection-store';

export class DatabaseManager {
    /**
     * @returns {Promise<import("idb").IDBPDatabase<unknown>>}
     */
    static async openConnection() {
        const countriesData = await CountriesDataLoader.loadCountryDataFromJson();

        /**
         * @param {import("idb").IDBPDatabase<unknown>} db
         * @param {Number} oldVersion
         * @param {Number} newVersion
         * @param {import("idb").IDBPTransaction<unknown, string[]>} transaction
         */
        const upgrade = (db, oldVersion, newVersion, transaction) => {
            this._upgrade(db, oldVersion, newVersion, transaction, countriesData);
            this._addInitialData(transaction, countriesData);
        };

        this.dbConnection = openDB(DB_NAME, DB_VERSION, { upgrade });

        return this.dbConnection;
    }

    /**
     * Attempts to close current connection
     * then proceeds to delete the database
     * in order to re-open the connection
     * which will re-create the database
     */
    static async resetDatabase() {
        if (this.dbConnection) {
            (await this.dbConnection).close();
        }

        await deleteDB(DB_NAME);
        await this.openConnection();
    }

    /**
     * @param {import("idb").IDBPDatabase<unknown>} db
     * @param {Number} oldVersion
     * @param {Number} newVersion
     * @param {import("idb").IDBPTransaction<unknown, string[]>} transaction
     * @param {import('../model/CountryData.js').CountryData[]} countriesData
     */
    static _upgrade(db, oldVersion, newVersion, transaction, countriesData) {
        switch (oldVersion) {
        case 0:
            this._createSchemaForV1(db);
            break;
        case 1:
            this._createSchemaForV2(db);
            break;
        }
    }

    /**
     * @param {import("idb").IDBPDatabase<unknown>} dbConnection
     */
    static async _createSchemaForV1(dbConnection) {
        dbConnection.createObjectStore(COUNTRIES_STORE_NAME);
        dbConnection.createObjectStore(USER_SELECTION_STORE_NAME);
        dbConnection.createObjectStore(TAX_DETAILS_STORE_NAME);
    }

    /**
     * @param {import("idb").IDBPDatabase<unknown>} dbConnection
     */
    static async _createSchemaForV2(dbConnection) {

        dbConnection.deleteObjectStore(COUNTRIES_STORE_NAME);
        dbConnection.deleteObjectStore(USER_SELECTION_STORE_NAME);
        dbConnection.deleteObjectStore(TAX_DETAILS_STORE_NAME);

        dbConnection.createObjectStore(COUNTRIES_STORE_NAME);
        dbConnection.createObjectStore(USER_SELECTION_STORE_NAME);
        dbConnection.createObjectStore(TAX_DETAILS_STORE_NAME);
    }

    /**
     * @param {import("idb").IDBPTransaction<unknown, string[]>} transaction
     * @param {import('../model/CountryData.js').CountryData[]} countriesData
     */
    static _addInitialData(transaction, countriesData) {
        this._populateCountriesObjectStore(transaction, countriesData);
        this._populateTaxDetailsObjectStore(transaction, countriesData);
    }

    /**
     * @param {import("idb").IDBPTransaction<unknown, string[]>} transaction
     * @param {import('../model/CountryData.js').CountryData[]} countriesData
     */
    static _populateCountriesObjectStore(transaction, countriesData) {
        const countriesObjectStore = transaction.objectStore(COUNTRIES_STORE_NAME);

        for (const countryData of countriesData) {
            countriesObjectStore.add(countryData.country, countryData.country.id);
        }
    }

    /**
     * @param {import("idb").IDBPTransaction<unknown, string[]>} transaction
     * @param {import('../model/CountryData.js').CountryData[]} countriesData
     */
    static _populateTaxDetailsObjectStore(transaction, countriesData) {
        const taxDetailsObjectStore = transaction.objectStore(TAX_DETAILS_STORE_NAME);

        for (const countryData of countriesData) {
            taxDetailsObjectStore.add(countryData.taxDetails, countryData.country.id);
        }
    }
}

DatabaseManager.dbConnection = DatabaseManager.openConnection();
