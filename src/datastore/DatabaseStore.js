import { openDB } from "idb";
import { CountriesLoader } from "../CountriesLoader.js";

const DB_VERSION = 1;
const DB_NAME = "tax-calculator-db";
const COUNTRIES_STORE_NAME = "country-store";
const USER_SELECTION_STORE_NAME = "user-selection-store";

class _DatabaseStore {

    constructor() {
        this.db = _DatabaseStore._openConnection();
    }

    static _openConnection() {

        /**
         * @param {import("idb").IDBPDatabase<unknown>} db
         * @param {number} oldVersion
         * @param {number} newVersion
         * @param {import("idb").IDBPTransaction<unknown, string[]>} transaction
         */
        const upgrade = (db, oldVersion, newVersion, transaction) => {
            this._upgrade(db, oldVersion, newVersion, transaction);
        }

        return openDB(DB_NAME, DB_VERSION, {upgrade});
    }

    /**
     * @param {import("idb").IDBPDatabase<unknown>} db
     * @param {number} oldVersion
     * @param {number} newVersion
     * @param {import("idb").IDBPTransaction<unknown, string[]>} transaction
     */
    static async _upgrade(db, oldVersion, newVersion, transaction) {
        switch (oldVersion) {
            case 0: await this._createDatabase(db);
            break;
        }
    }

    /**
     * Sets up the database stores and loads the countries from JSON
     * files. This should happen only once when creating the database.
     *
     * @param {import("idb").IDBPDatabase<unknown>} dbConnection
     */
    static async _createDatabase(dbConnection) {
        this._createObjectStores(dbConnection);
        this._loadCountries(dbConnection);
    }

    /**
     * @param {import("idb").IDBPDatabase<unknown>} dbConnection
     */
    static _createObjectStores(dbConnection) {
        dbConnection.createObjectStore(COUNTRIES_STORE_NAME);
        dbConnection.createObjectStore(USER_SELECTION_STORE_NAME);
    }

    /**
     * @param {import("idb").IDBPDatabase<unknown>} dbConnection
     */
    static async _loadCountries(dbConnection) {

        const countriesJson = await CountriesLoader.loadCountriesFromJson();
        const transaction = dbConnection.transaction(COUNTRIES_STORE_NAME, "readwrite");
        const countriesStore = transaction.objectStore(COUNTRIES_STORE_NAME);

        for(const country of countriesJson) {
            countriesStore.add(country, country.id);
        }

        await transaction.done;
    }
}

export default new _DatabaseStore();
