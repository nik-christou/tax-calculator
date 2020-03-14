import { LitElement, html } from "lit-element";
import { BaseElementMixin } from "../../base/BaseElementMixin.js";
import { Country } from "../model/Country.js";
import { CountriesLoader } from "../control/CountriesLoader.js";

export class CountrySelect extends BaseElementMixin(LitElement) {
    static get properties() {
        return {
            countries: Array
        };
    }

    render() {
        return html`
            <label for="country-select">Choose a country:</label>
            <select name="countries" id="country-select"></select>
        `;
    }

    constructor() {
        super();
        this.countries = new Array();
    }

    firstUpdated() {
        const selectElement = this.shadowRoot.querySelector("select");
        selectElement.addEventListener("input", event => this._handleChangeEvent(event));
        this._addCaptionOption(selectElement);
        this._loadCountries(selectElement);
    }

    /**
     * @param {HTMLSelectElement} selectElement
     */
    _loadCountries(selectElement) {
        CountriesLoader.loadCountriesFromJson()
            .then(countries => (this.countries = countries))
            .then(_ => this._createItemsFromCountries(selectElement))
            .catch(reason => console.error(reason.message));
    }

    /**
     * @param {HTMLSelectElement} selectElement
     */
    _createItemsFromCountries(selectElement) {
        for (let country of this.countries) {
            const optionItem = this._createOptionItem(country);
            selectElement.add(optionItem);
        }
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
