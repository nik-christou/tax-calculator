import {TaxCalculatorApp} from "./src/TaxCalculatorApp.js";
import {countriesCacheHandler} from "./src/datastore/CountriesCacheHandler.js";
import {SnackbarNotification} from "./src/sw/SnackbarNotification.js";
import {serviceWorkerHandler} from "./src/sw/SWHandler.js";
import {SWUpdateNotification} from "./src/sw/SWUpdateNotification.js";
import {Router} from "@vaadin/router";
import {routes} from "./src/Routes";

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

/**
 * After the snackbar notification element is loaded by browser we initialize the
 * service worker update functions.
 */
customElementsRegistry.whenDefined('snackbar-notification').then(() => {
    const snackbarNotificationElement = document.querySelector("snackbar-notification");
    serviceWorkerHandler.register(snackbarNotificationElement);
});

/**
 * After app root element is loaded by browser we initialize the router
 */
customElementsRegistry.whenDefined('tax-calculator-app').then(() => {
    const taxCalculatorAppElement = document.querySelector("tax-calculator-app");
    const rootElementShadowRoot = taxCalculatorAppElement.shadowRoot;
    const outletElement = rootElementShadowRoot.querySelector('#outlet');
    const router = new Router(outletElement);
    void router.setRoutes(routes);
});