
/**
 * @returns {Array<String>} the list of available country json files
 */
const countriesJson = [
    "web_assets/data/cyprus.json"
];

/**
 * Given a country id it will return the path to the
 * specific country json file
 *
 * @param {Number} countryId
 */
function getCountryJsonFilePath(countryId) {

    switch(countryId) {
        case 1: return "web_assets/data/cyprus.json";
        default: return null;
    }
}

/**
 * @param {Number} countryId
 */
function getTaxLoaderFilePath(countryId) {

    switch(countryId) {
        case 1: return "./taxation/cyprus/control/CyprusTaxLoader.js";
        default: return null;
    }
}

/**
 * @param {Number} countryId
 */
function getTaxCalculatorFilePath(countryId) {

    switch(countryId) {
        case 1: return "./taxation/cyprus/control/CyprusTaxCalculator.js";
        default: return null;
    }
}

export { countriesJson, getCountryJsonFilePath, getTaxLoaderFilePath, getTaxCalculatorFilePath };
