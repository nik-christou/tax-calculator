import {Router} from "@vaadin/router";
import {routes} from "./src/Routes";
import {TaxCalculatorApp} from "./src/TaxCalculatorApp.js";
import {SnackbarNotification} from "./src/sw/SnackbarNotification.js";
import {ServiceWorkerNotification} from "./src/sw/ServiceWorkerNotification.js";
import {countriesCacheHandler} from "./src/datastore/CountriesCacheHandler.js";
import {ServiceWorkerRegistrationHandler} from "./src/sw/ServiceWorkerRegistrationHandler.js";

/**
 * This async self-invoking function is executed automatically after definition
 * This is because we cannot await/async on top level - so it must be wrapped
 */
(async () => {
    await countriesCacheHandler.updateCountriesJsonDataCache();
})();

const customElementsRegistry = window.customElements;

/**
 * Define which web components match the custom element name and load the components async
 */
customElementsRegistry.define('snackbar-notification', SnackbarNotification);
customElementsRegistry.define('sw-update-notification', ServiceWorkerNotification);
customElementsRegistry.define('tax-calculator-app', TaxCalculatorApp);

/**
 * After the snackbar notification element is loaded by browser we initialize the
 * service worker update functions.
 */
customElementsRegistry.whenDefined('snackbar-notification').then(async () => {
    const snackbarNotificationElement = document.querySelector("snackbar-notification");
    await new ServiceWorkerRegistrationHandler().register(snackbarNotificationElement);
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