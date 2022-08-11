import { Router } from '@vaadin/router';
import { routes } from './src/Routes.js';
// import { TaxCalculatorApp } from './src/TaxCalculatorApp.js';

const taxAppElementName = 'tax-calculator-app';
const customElementsRegistry = window.customElements;

customElementsRegistry.whenDefined(taxAppElementName).then(() => {

    const router = new Router(outletElement);
    router.setRoutes(routes);

});


// /** */
// function _prepareRouter(element) {
//     const outletElement = 
//     const router = new Router(outletElement);
//     router.setRoutes(routes);
// }

// window.customElements.define(taxAppElementName, TaxCalculatorApp);
