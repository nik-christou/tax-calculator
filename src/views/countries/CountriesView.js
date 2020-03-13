import { LitElement, html, css } from "lit-element";
import { BaseElementMixin } from "../../base/BaseElementMixin.js";
import { Country } from "../../country/model/Country.js";
import { CountriesLoader } from "./CountriesLoader.js";
import { CountriesViewCss } from "./CountriesViewCss.js";

export class CountriesView extends BaseElementMixin(LitElement) {

    static get properties() {
        return {
            countries: Array,
            selectedId: Number
        };
    }

    static get styles() {
        return [...super.styles, CountriesViewCss];
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
        this.selectedId = 1;
        this.countries = new Array();
    }

    firstUpdated() {
        this._loadCountries();
    }

    _loadCountries() {
        CountriesLoader.loadCountriesFromJson()
            .then(countries => (this.countries = countries))
            .catch(reason => console.error(reason.message));
    }

    /**
     * @param {Country} country
     */
    _createListGroupItem(country) {
        return html`
            <a @click=${event => this._handleSelectedCountry(event, country.id)} class="list-group-item list-group-item-action country-item">
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
     * @param {Event} event
     * @param {Number} countryId
     */
    _handleSelectedCountry(event, countryId) {

        event.preventDefault();
        this.selectedId = countryId;

        // what do we do about the new selection ?
        // what do we include in the event ? just the country id ?
        // it will require the whole country object
        // send an event and then redirect ?
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
}

window.customElements.define("countries-view", CountriesView);
