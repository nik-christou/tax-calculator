import {LitElement, html} from 'lit';
import {routes} from './Routes.js';
import {Router} from '@vaadin/router';
import {BaseElementMixin} from './base/BaseElementMixin.js';
import {TaxCalculatorAppCss} from './TaxCalculatorAppCss.js';

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
            </div>
        `;
    }

    firstUpdated() {
        this.#prepareRouter();
    }

    // can Router be set from outside using the whenDefined ?
    // getRouterOutlet() {
    //     return this.shadowRoot.querySelector('#outlet');
    // }

    #prepareRouter() {
        const outletElement = this.shadowRoot.querySelector('#outlet');
        const router = new Router(outletElement);
        void router.setRoutes(routes);
    }
}
