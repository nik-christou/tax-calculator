import { LitElement, html } from "lit-element";
import { BaseElementMixin } from "./base/BaseElementMixin.js";
import { SWRegister } from "./SWRegister.js";
import { Router } from '@vaadin/router';
import { routes } from "./Routes.js";
import { Country } from "./country/model/Country.js";
import { BlueprintCss } from "./base/BlueprintCss.js";
import { TaxCalculatorAppCss } from "./TaxCalculatorAppCss.js";

import "./navbar/Navbar.js";

export class TaxCalculatorApp extends BaseElementMixin(LitElement) {

    static get properties() {
        return {
            selectedCountry: Country
        };
    }

    static get styles() {
        return [...super.styles, TaxCalculatorAppCss, BlueprintCss];
    }

    render() {
        return html`
            <div bp="grid">
                <nav-bar bp="12"></nav-bar>
                <main bp="12">
                    <div class="app-container">
                        <div id="outlet"></div>
                    </div>
                </main>
            </div>
        `;
    }

    constructor() {
        super();
        this.selectedCountry = null;
    }

    /**
     * @param {Map} changedProperties
     */
    firstUpdated(changedProperties) {
        SWRegister.register();
        this._prepareRouter();

        this.addEventListener("country-select-change", event => this._handleCountryChange(event));
    }

    _prepareRouter() {
        const outletElement = this.shadowRoot.getElementById("outlet");
        const router = new Router(outletElement);
        router.setRoutes(routes);

        this._watchForRouterComponentChanges(outletElement);
    }

    /**
     * Watches for the addition of new nodes under
     * the router outlet element. When a matching
     * element is loaded and added into DOM then
     * we can update its properties using properties
     * stored in this class. This is not ideal but
     * using this way we avoid having to use a more
     * complicated solution for storing state
     *
     * @param {HTMLElement} outletElement
     */
    _watchForRouterComponentChanges(outletElement) {

        const mutationObserver = new MutationObserver( mutations => {
            mutations.forEach(mutation => {
                this._handleRouterMutation(mutation);
            })
        });

        mutationObserver.observe(outletElement, {
            childList: true
        });
    }

    /**
     * @param {MutationRecord} mutation
     */
    _handleRouterMutation(mutation) {

        mutation.addedNodes.forEach(node => {
            if(node.nodeName === "HOME-VIEW") {
                this._updateHomeView();
            }

            if(node.nodeName === "COUNTRIES-VIEW") {
                this._updateCountriesView();
            }
        });
    }

    _updateHomeView() {
        const homeView = this.shadowRoot.querySelector("home-view");
        homeView.selectedCountry = this.selectedCountry;
    }

    _updateCountriesView() {
        const countriesView = this.shadowRoot.querySelector("countries-view");

        if(this.selectedCountry) {
            countriesView.selectedId = this.selectedCountry.id;
        }
    }

    /**
     * @param {CustomEvent} event
     */
    _handleCountryChange(event) {
        if(event.detail) {
            this.selectedCountry = event.detail;
        }
    }
}

window.customElements.define("tax-calculator-app", TaxCalculatorApp);
