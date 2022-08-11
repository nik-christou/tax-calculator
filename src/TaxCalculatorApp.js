import { LitElement, html } from 'lit';
import { BaseElementMixin } from './base/BaseElementMixin.js';
import { TaxCalculatorAppCss } from './TaxCalculatorAppCss.js';
// import { ServiceWorkerHandler } from './service-worker/ServiceWorkerHandler.js';
import { Router } from '@vaadin/router';
import { routes } from './Routes.js';
import './component/snackbar/SnackbarNotification.js';
import './service-worker/ServiceWorkerUpdateNotification.js';
import { countriesCacheHandler } from './datastore/CountriesCacheHandler.js';

export class TaxCalculatorApp extends BaseElementMixin(LitElement) {

    static get styles() {
        return [
            ...super.styles, 
            TaxCalculatorAppCss
        ];
    }
    
    render() {
        return html`
            <div class="main">
                <div id="outlet"></div>
                <snackbar-notification>
                    <service-worker-update-notification></service-worker-update-notification>
                </snackbar-notification>
            </div>
        `;
    }

    async firstUpdated() {
        // this._prepareServiceWorker();
        await this.prepareCaching();
        this.#prepareRouter();
    }

    async prepareCaching() {
        await countriesCacheHandler.updateCountriesJsonDataCache();
    }

    getRouterOutlet() {
        return this.shadowRoot.querySelector('#outlet');
    }

    getSnackbarNotification() {
        return this.shadowRoot.querySelector('snackbar-notification');
    }

    #prepareRouter() {
        const outletElement = this.shadowRoot.querySelector('#outlet');
        const router = new Router(outletElement);
        void router.setRoutes(routes);
    }

    // _prepareServiceWorker() {
    //     const serviceWorkerNotification = this.shadowRoot.querySelector('snackbar-notification');
    //     void ServiceWorkerHandler.register(serviceWorkerNotification);
    // }
}

window.customElements.define('tax-calculator-app', TaxCalculatorApp);
