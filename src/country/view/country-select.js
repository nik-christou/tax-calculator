import { LitElement, html } from "lit-element";
import { BaseElementMixin } from "../../base/base-element-mixin.js";
import { Country } from "../model/country.js";
import { CountryLoader } from "../control/country-loader.js";

export class CountrySelect extends BaseElementMixin(LitElement) {
    static get properties() {
        return {
            country: Country
        };
    }

    render() {
        return html`
            <select></select>
        `;
    }

    firstUpdated() {
        const selectElement = this.shadowRoot.querySelector("select");
        selectElement.addEventListener("input", event => this._handleChangeEvent(event));

        this._addCaptionOption(selectElement);
        this._populateCountries(selectElement);
    }

    /**
     * @param {HTMLSelectElement} selectElement
     */
    _populateCountries(selectElement) {
        CountryLoader.loadCountryFromJson("../../../web_assets/data/cyprus.json")
            .then(country => (this.country = country))
            .then(country => this._createOptionItem(country))
            .then(optionItem => selectElement.add(optionItem))
            .catch(reason => console.log(reason.message));
    }

    /**
     * @param {HTMLSelectElement} selectElement
     */
    _addCaptionOption(selectElement) {
        const optionItem = new Option("Select a country:", "", true, true);
        selectElement.add(optionItem);
    }

    /**
     * @param {Country} country
     * @returns {HTMLOptionElement}
     */
    _createOptionItem(country) {
        return new Option(country.name, country.id.toString(), false, false);
    }

    /**
     * @param {InputEvent} event
     */
    _handleChangeEvent(event) {
        const countrySelectChangeEvent = new CustomEvent("country-select-change", {
            bubbles: true,
            composed: true,
            detail: this.country
        });

        this.dispatchEvent(countrySelectChangeEvent);
    }
}

window.customElements.define("country-select", CountrySelect);
