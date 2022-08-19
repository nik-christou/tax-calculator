import {datastoreUpdater} from "./DatastoreUpdater.js";

const TAX_CALCULATOR_CACHE_STORE_NAME = "tax_calculator_cache";
const CYPRUS_TAX_DATA_URL = new URL('/data/cyprus_data_v1.json', import.meta.url);
const AUSTRALIA_TAX_DATA_URL = new URL('/data/australia_data_v1.json', import.meta.url);
const GREECE_TAX_DATA_URL = new URL('/data/greece_data_v1.json', import.meta.url);
const GERMANY_TAX_DATA_URL = new URL('/data/germany_data_v1.json', import.meta.url);

class CountriesCacheHandler {

    #countriesDataUrls;

    constructor() {
        this.#countriesDataUrls = [
            CYPRUS_TAX_DATA_URL,
            AUSTRALIA_TAX_DATA_URL,
            GERMANY_TAX_DATA_URL,
            GREECE_TAX_DATA_URL
        ];
    }

    async updateCountriesJsonDataCache() {

        const cache = await window.caches.open(TAX_CALCULATOR_CACHE_STORE_NAME);

        const newOrUpdatedUrls = [];

        // process all the hardcoded country json files and update cache with
        // any new or updated urls - updating means a new version url file name
        for(let index = 0; index < this.#countriesDataUrls.length; index++) {
            const countryJsonUrl = this.#countriesDataUrls[index];
            const countryWasAddedOrUpdated = await this.#retrieveOrAddCountryTaxData(countryJsonUrl, cache);
            if(countryWasAddedOrUpdated) {
                newOrUpdatedUrls.push(countryJsonUrl);
            }
        }

        for(let index = 0; index < newOrUpdatedUrls.length; index++) {
            const countryJsonUrl = newOrUpdatedUrls[index];
            const countryTaxDataJson = await cache.match(countryJsonUrl);
            const countryJson = await countryTaxDataJson.json();
            datastoreUpdater.handleNewOrUpdateCountryJson(countryJson);
        }

        // TODO: handle removals in cache by looping all the keys in cache
        // and comparing it to the Urls we have hardcoded
        // any diff it needs to be removed
    }

    /**
     * @param {URL} url
     * @param {Cache} cache
     * @returns {Promise<boolean>} true if this url is updated or new in the cache
     */
    async #retrieveOrAddCountryTaxData(url, cache) {

        const countryTaxData = await cache.match(url);

        if(countryTaxData) {
            return false;
        }

        const response = await this.#retrieveLocalJsonFile(url);

        if(!response.ok) {
            throw new Error(`Error ${response.status} while trying to retrieve json file ${url}`);
        }

        console.log(`Loading json data for [${url}]`);

        await cache.put(url, response);

        return true;
    }

    /**
     * @param {URL} url
     * @returns {Promise<Response>}
     */
    #retrieveLocalJsonFile(url) {
        const options = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        return fetch(url, options);
    }
}

export const countriesCacheHandler = Object.freeze(new CountriesCacheHandler());