import {TaxCalculatorApp} from "./src/TaxCalculatorApp.js";
import {countriesCacheHandler} from "./src/datastore/CountriesCacheHandler.js";
import {SnackbarNotification} from "./src/sw/SnackbarNotification.js";
import {serviceWorkerHandler} from "./src/sw/SWHandler.js";
import {SWUpdateNotification} from "./src/sw/SWUpdateNotification.js";

(async () => {
    await countriesCacheHandler.updateCountriesJsonDataCache();
})();

/**
 * @type {CustomElementRegistry}
 */
const customElementsRegistry = window.customElements;

customElementsRegistry.define('snackbar-notification', SnackbarNotification);
customElementsRegistry.define('sw-update-notification', SWUpdateNotification);
customElementsRegistry.define('tax-calculator-app', TaxCalculatorApp);

customElementsRegistry.whenDefined('snackbar-notification').then(() => {
    const snackbarNotificationElement = document.querySelector("snackbar-notification");
    serviceWorkerHandler.register(snackbarNotificationElement);
});