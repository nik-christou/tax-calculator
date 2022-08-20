import {datastoreUpdater} from "./DatastoreUpdater.js";
import {countriesDataUrls} from "./CountryDataUrls";

class CountriesCacheHandler {

    #TAX_CALCULATOR_CACHE_STORE_NAME = "tax_calculator_cache";

    async updateCountriesJsonDataCache() {

        const cache = await window.caches.open(this.#TAX_CALCULATOR_CACHE_STORE_NAME);
        const newOrUpdatedUrls = await this.#processJsonURLs(cache);

        await this.#handleAddedCacheEntries(cache, newOrUpdatedUrls);
        await this.#handleOutdatedCacheEntries(cache);
    }

    /**
     * @param {Cache} cache
     * @returns {Promise<URL[]>}
     */
    async #processJsonURLs(cache) {

        const newOrUpdatedUrls = [];

        for(let index = 0; index < countriesDataUrls.length; index++) {
            const countryJsonUrl = countriesDataUrls[index];
            const countryWasAddedOrUpdated = await this.#retrieveOrAddCountryTaxData(countryJsonUrl, cache);
            if(countryWasAddedOrUpdated) {
                newOrUpdatedUrls.push(countryJsonUrl);
            }
        }

        return newOrUpdatedUrls;
    }

    /**
     * @param {Cache} cache
     * @param {URL[]} newOrUpdatedUrls
     * @returns {Promise<void>}
     */
    async #handleAddedCacheEntries(cache, newOrUpdatedUrls) {

        for(let index = 0; index < newOrUpdatedUrls.length; index++) {
            const countryJsonUrl = newOrUpdatedUrls[index];
            const countryTaxDataJson = await cache.match(countryJsonUrl);
            const countryJson = await countryTaxDataJson.json();
            datastoreUpdater.handleNewOrUpdateCountryJson(countryJson);
        }
    }

    /**
     * @param {Cache} cache
     * @returns {Promise<void>}
     */
    async #handleOutdatedCacheEntries(cache) {

        const keys = await cache.keys();

        for(let index = 0; index < keys.length; index++) {
            const request = keys.at(index);
            const fileUrl = request.url;
            const matched = countriesDataUrls.find(url => url.href === fileUrl);
            if(!matched) {
                const cacheRecordDeleted = await cache.delete(request);
                if(cacheRecordDeleted) {
                    console.log("Cache record for outdated request ["+request.url+"] was deleted");
                }
            }
        }
    }

    /**
     * @param {URL} url
     * @param {Cache} cache
     * @returns {Promise<boolean>} true if this url is new in the cache
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