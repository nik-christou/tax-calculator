import { openDB, deleteDB } from "idb";
import { CountriesDataLoader } from "./CountriesLoader.js";

const DB_VERSION = 1;
const DB_NAME = "tax-calculator-db";
const COUNTRIES_STORE_NAME = "country-store";
const TAX_DETAILS_STORE_NAME = "tax-details-store";
const USER_SELECTION_STORE_NAME = "user-selection-store";

export class DatabaseManager {

    /**
     * @returns {Promise<import("idb").IDBPDatabase<unknown>>}
     */
    static async openConnection() {

        const countriesData = await CountriesDataLoader.loadCountryDataFromJson();

        const upgrade = (db, oldVersion, newVersion, transaction) => {
            this._upgrade(db, oldVersion, newVersion, transaction, countriesData);
            this._addInitialData(transaction, countriesData);
        }

        this.dbConnection = openDB(DB_NAME, DB_VERSION, {upgrade});

        return this.dbConnection;
    }

    static async resetDatabase() {

        // close connection if present
        // if(this.dbConnection) {
        //     (await this.dbConnection).close();
        // }

        await deleteDB(DB_NAME);
        await this.openConnection();
    }

    static _upgrade(db, oldVersion, newVersion, transaction, countriesData) {

        switch (oldVersion) {
            case 0: this._createSchemaForV1(db);
            break;
        }
    }

    static async _createSchemaForV1(dbConnection) {

        dbConnection.createObjectStore(COUNTRIES_STORE_NAME);
        dbConnection.createObjectStore(USER_SELECTION_STORE_NAME);
        dbConnection.createObjectStore(TAX_DETAILS_STORE_NAME);
    }

    static _addInitialData(transaction, countriesData) {

        this._populateCountriesObjectStore(transaction, countriesData);
        this._populateTaxDetailsObjectStore(transaction, countriesData);
    }

    static _populateCountriesObjectStore(transaction, countriesData) {

        const countriesObjectStore = transaction.objectStore(COUNTRIES_STORE_NAME);

        for(const countryData of countriesData) {
            countriesObjectStore.add(countryData.country, countryData.country.id);
        }
    }

    static _populateTaxDetailsObjectStore(transaction, countriesData) {

        const taxDetailsObjectStore = transaction.objectStore(TAX_DETAILS_STORE_NAME);

        for(const countryData of countriesData) {
            taxDetailsObjectStore.add(countryData.taxDetails, countryData.country.id);
        }
    }
}

DatabaseManager.dbConnection = DatabaseManager.openConnection();

