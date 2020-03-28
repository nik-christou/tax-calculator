import { LitElement, html } from "lit-element";
import { BaseElementMixin } from "../../base/BaseElementMixin.js";
import { Country } from "../../model/Country.js";
import { ListGroupCss } from "../../base/ListGroupCss.js";
import { CountriesViewCss } from "./CountriesViewCss.js";
import { Router } from '@vaadin/router';

export class CountriesView extends BaseElementMixin(LitElement) {

    static get properties() {
        return {
            countries: Array,
            selectedId: Number
        };
    }

    static get styles() {
        return [...super.styles, ListGroupCss, CountriesViewCss];
    }

    render() {
        return html`
            <div class="list-group">
                ${this.countries.map((country) => this._createListGroupItem(country))}
            </div>
        `;
    }

    constructor() {
        super();
        this.selectedId = 0;
        this.countries = new Array();
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

    /**
     * @param {Event} event
     * @param {Country} country
     */
    _handleSelectedCountry(event, country) {

        event.preventDefault();

        this.selectedId = country.id;

        // send selected country event
        // the TaxCalculatorApp captures and stores it
        this._sendCountryChangeEvent(country);

        // go to home view
        Router.go("/home");
    }

    /**
     * @param {Country} country
     */
    _sendCountryChangeEvent(country) {

        const countrySelectChangeEvent = new CustomEvent("country-select-change", {
            bubbles: true,
            composed: true,
            detail: {
                selectedCountry: country
            }
        });

        this.dispatchEvent(countrySelectChangeEvent);
    }
}

window.customElements.define("countries-view", CountriesView);
