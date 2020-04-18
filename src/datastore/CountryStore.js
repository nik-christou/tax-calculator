import DatabaseStore from "./DatabaseStore.js";
import { Country } from "../model/Country.js";

const COUNTRIES_STORE_NAME = "country-store";

class _CountryStore {

    constructor() {
        this.dbConnection = DatabaseStore.db;
    }

    /**
     * Get a country with a matching id
     *
     * @param {IDBValidKey} id the country id
     * @returns {Promise<Country>}
     */
    async getCountryById(id) {
        return (await this.dbConnection).get(COUNTRIES_STORE_NAME, id);
    }

    /**
     * Retrieve all stored countries
     *
     * @returns {Promise<Country[]>} array of stored countries
     */
    async retrieveCountries() {
        return (await this.dbConnection).getAll(COUNTRIES_STORE_NAME);
    }
}

export default new _CountryStore();
