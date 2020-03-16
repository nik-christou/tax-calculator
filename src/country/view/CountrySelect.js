import { LitElement, html } from "lit-element";
import { BaseElementMixin } from "../../base/BaseElementMixin.js";
import { Country } from "../model/Country.js";
import { CountriesLoader } from "../control/CountriesLoader.js";
import { ListGroupCss } from "../../base/ListGroupCss.js";

export class CountrySelect extends BaseElementMixin(LitElement) {

    static get properties() {
        return {
            countries: Array
        };
    }

    static get styles() {
        return [...super.styles, ListGroupCss];
    }

    render() {
        return html`
            <div class="list-group">
                <a class="list-group-item list-group-item-action country-item">

                </a>
            </div>
        `;
    }

    constructor() {
        super();
        this.countries = new Array();
    }

    firstUpdated() {
    }

    /**
     * @param {InputEvent} event
     */
    _handleChangeEvent(event) {
        const selectElement = this.shadowRoot.querySelector("select");
        const selectedOptions = selectElement.selectedOptions;

        if (selectedOptions.length <= 0) {
            console.error("selected countries option is empty");
            return;
        }

        // only interested in first selection
        const selectedOption = selectedOptions[0];
        const countryId = Number(selectedOption.value);
        const matchedCountry = this._findCountryById(countryId);

        if (!matchedCountry) {
            console.error("selected country not found");
            return;
        }

        this._sendCountryChangeEvent(matchedCountry);
    }

    /**
     * @param {Number} countryId
     */
    _findCountryById(countryId) {
        for (let country of this.countries) {
            if (country.id === countryId) {
                return country;
            }
        }
    }

    /**
     * @param {Country} country
     */
    _sendCountryChangeEvent(country) {
        const countrySelectChangeEvent = new CustomEvent("country-select-change", {
            bubbles: true,
            composed: true,
            detail: country
        });

        this.dispatchEvent(countrySelectChangeEvent);
    }
}

window.customElements.define("country-select", CountrySelect);