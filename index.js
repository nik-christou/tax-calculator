import {TaxCalculatorApp} from "./src/TaxCalculatorApp.js";
import {countriesCacheHandler} from "./src/datastore/CountriesCacheHandler.js";
import {SnackbarNotification} from "./src/sw/SnackbarNotification.js";
import {serviceWorkerHandler} from "./src/sw/SWHandler.js";
import {SWUpdateNotification} from "./src/sw/SWUpdateNotification.js";

// import countries json files under public/data are updated
// wrapped in async cause top-leve await is not yet supported
(async () => {
    await countriesCacheHandler.updateCountriesJsonDataCache();
})();
// countriesCacheHandler.updateCountriesJsonDataCache().then(() => {
//
// });

// register notification component for service worker notification
serviceWorkerHandler.register(SnackbarNotification);

// register service worker notification
window.customElements.define('sw-update-notification', SWUpdateNotification);

// register the root app element
window.customElements.define('tax-calculator-app', TaxCalculatorApp);