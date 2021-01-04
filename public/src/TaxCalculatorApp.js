import { LitElement, html } from 'lit-element';
import { BaseElementMixin } from './base/BaseElementMixin.js';
import { DatabaseManager } from './datastore/DatabaseManager.js';
import { TaxCalculatorAppCss } from './TaxCalculatorAppCss.js';
import { ServiceWorkerHandler } from './service-worker/ServiceWorkerHandler.js';
import { Router } from '@vaadin/router';
import { routes } from './Routes.js';

import './component/snackbar/SnackbarNotification.js';
import './service-worker/ServiceWorkerUpdateNotification.js';

export class TaxCalculatorApp extends BaseElementMixin(LitElement) {
    static get styles() {
        return [...super.styles, TaxCalculatorAppCss];
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

    firstUpdated() {
        this._prepareServiceWorker();
        this._prepareDatabase();
        this._prepareRouter();
    }

    _prepareDatabase() {
        // DatabaseManager.resetDatabase();
        DatabaseManager.openConnection();
    }

    _prepareRouter() {
        const outletElement = this.shadowRoot.querySelector('#outlet');
        const router = new Router(outletElement);
        router.setRoutes(routes);
    }

    _prepareServiceWorker() {
        const serviceWorkerNotification = this.shadowRoot.querySelector('snackbar-notification');
        ServiceWorkerHandler.register(serviceWorkerNotification);
    }
}

// @ts-ignore
window.customElements.define('tax-calculator-app', TaxCalculatorApp);
