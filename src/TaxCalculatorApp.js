import { LitElement, html } from "lit-element";
import { BaseElementMixin } from "./base/BaseElementMixin.js";
import { SWRegister } from "./SWRegister.js";
import { Router } from '@vaadin/router';
import { routes } from "./Routes.js";
import { DataStore } from "./datastore/DataStore.js";
import { CountriesLoader } from "./views/countries/CountriesLoader.js";
import { BlueprintCss } from "./base/BlueprintCss.js";
import { TaxCalculatorAppCss } from "./TaxCalculatorAppCss.js";

import "./navbar/Navbar.js";

export class TaxCalculatorApp extends BaseElementMixin(LitElement) {

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
        this.datastore = new DataStore();
    }

    /**
     * @param {Map} changedProperties
     */
    firstUpdated(changedProperties) {

        SWRegister.register();
        this._loadCountries();
        this._prepareRouter();

        this.addEventListener("country-select-change", event => this._handleCountryChange(event));
        this.addEventListener("salary-type-change", event => this._handleSalaryTypeChange(event));
        this.addEventListener("gross-amount-change", event => this._handleGrossAmountChange(event));
    }

    _loadCountries() {
        CountriesLoader.loadCountriesFromJson()
            .then(countries => this.datastore.countries = countries)
            .catch(reason => console.error(reason.message));
    }

    _prepareRouter() {
        const outletElement = this.shadowRoot.getElementById("outlet");
        const router = new Router(outletElement);
        router.setRoutes(routes);
        this._watchForRouterComponentChanges(outletElement);
    }

    /**
     * @param {HTMLElement} outletElement
     */
    _watchForRouterComponentChanges(outletElement) {

        const mutationObserver = new MutationObserver(mutations => {
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

        if(this.datastore) {

            if(this.datastore.selectedCountry) {
                homeView.selectedCountry = this.datastore.selectedCountry;
            }

            if(this.datastore.selectedPeriod) {
                homeView.selectedPeriod = this.datastore.selectedPeriod;
            }

            if(this.datastore.grossAmount) {
                console.log(homeView.grossAmount);
                homeView.grossAmount = this.datastore.grossAmount;
            }
        }
    }

    _updateCountriesView() {
        const countriesView = this.shadowRoot.querySelector("countries-view");

        if(this.datastore) {

            if(this.datastore.countries) {
                countriesView.countries = this.datastore.countries;
            }

            if(this.datastore.selectedCountry) {
                countriesView.selectedId = this.datastore.selectedCountry.id;
            }
        }
    }

    /**
     * @param {CustomEvent} event
     */
    _handleCountryChange(event) {

        if(event.detail.selectedCountry) {
            this.datastore.selectedCountry = event.detail.selectedCountry;
        }
    }

    /**
     * @param {CustomEvent} event
     */
    _handleSalaryTypeChange(event) {

        if(event.detail.selectedPeriod) {
            this.datastore.selectedPeriod = event.detail.selectedPeriod;
        }
    }

    /**
     * @param {CustomEvent} event
     */
    _handleGrossAmountChange(event) {

        if(event.detail.grossAmount) {
            this.datastore.grossAmount = event.detail.grossAmount;
            console.log(this.datastore.grossAmount);
        }
    }
}

window.customElements.define("tax-calculator-app", TaxCalculatorApp);
