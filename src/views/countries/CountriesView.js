import { LitElement, html } from "lit-element";
import { BaseElementMixin } from "../../base/BaseElementMixin.js";
import { Country } from "../../model/Country.js";
import { ListGroupCss } from "../../base/ListGroupCss.js";
import { CountriesViewCss } from "./CountriesViewCss.js";
import { BlueprintCss } from "../../base/BlueprintCss.js";
import CountryStore from "../../datastore/CountryStore.js";
import UserSelectionStore from "../../datastore/UserSelectionStore.js";
import { Router } from "@vaadin/router";

import "../../navbar/Navbar.js";

export class CountriesView extends BaseElementMixin(LitElement) {

    static get properties() {
        return {
            countries: Array,
            selectedId: Number
        };
    }

    static get styles() {
        return [
            ...super.styles,
            BlueprintCss,
            ListGroupCss,
            CountriesViewCss
        ];
    }

    render() {
        return html`
            <div bp="grid">
                <main bp="12">
                    <nav-bar bp="12">
                        <a href="#" slot="left" class="nav-back">
                            <svg viewBox="0 0 32 32" class="icon icon-chevron-left" viewBox="0 0 32 32" aria-hidden="true">
                                <path d="M14.19 16.005l7.869 7.868-2.129 2.129-9.996-9.997L19.937 6.002l2.127 2.129z"/>
                            </svg>
                            Home
                        </a>
                    </nav-bar>
                    <div class="main-container">
                        <div class="list-group">
                            ${this.countries.map((country) => this._createListGroupItem(country))}
                        </div>
                    </div>
                </main>
            </div>
        `;
    }

    constructor() {
        super();
        this.selectedId = 0;
        this.countries = new Array();
    }

    firstUpdated() {
        this._addNavBackListener();

        CountryStore.retrieveCountries().then(countries => {
            this._updateCountries(countries);
        });

        UserSelectionStore.retrieveCountry().then(country => {
            this._updateSelectedCountry(country);
        });
    }

    /**
     * @param {Array<Country>} countries
     */
    _updateCountries(countries) {
        this.countries = countries;
    }

    /**
     * @param {Country} country
     */
    _updateSelectedCountry(country) {
        if(!country) return;
        this.selectedId = country.id;
    }

    /**
     * @param {Country} country
     */
    _createListGroupItem(country) {
        return html`
            <a @click=${event => this._handleSelectedCountry(event, country)} class="list-group-item list-group-item-action country-item">
                <div class="item-container">
                    <div class="country-info">
                        <img src="/web_assets/data/${country.flag}" alt="" />
                        <div class="item-info">
                            <h5>${country.name}</h5>
                            <small class="text-muted">${country.currency} / ${country.locale}</small>
                        </div>
                    </div>
                    ${this._isSelectedCountry(country.id)}
                </div>
            </a>
        `;
    }

    /**
     * @param {Number} countryId
     */
    _isSelectedCountry(countryId) {

        if(this.selectedId === countryId) {
            return html`
                <img class="check" src="/web_assets/img/check.png" alt="" />
            `;
        }
    }

    _addNavBackListener() {
        const navBackLink = this.shadowRoot.querySelector("a.nav-back");
        navBackLink.addEventListener("click", event => this._handleNavBackEvent(event));
    }

    /**
     * @param {Event} event
     */
    _handleNavBackEvent(event) {

        event.preventDefault();
        this._goToHome();
    }

    _goToHome() {

        // user navigated directly to Countries view
        if(window.history.length === 1 || window.history.length === 2) {
            history.pushState(null, "Home", "/");
            history.go(1);
            dispatchEvent(new PopStateEvent('popstate'));
        } else {
            history.back();
        }
    }

    /**
     * @param {Event} event
     * @param {Country} country
     */
    _handleSelectedCountry(event, country) {

        event.preventDefault();

        UserSelectionStore.updateCountry(country)
        .then(_ => this._goToHome());
    }
}

window.customElements.define("countries-view", CountriesView);
