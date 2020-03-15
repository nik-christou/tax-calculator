import { LitElement, html } from "lit-element";
import { BaseElementMixin } from "../../base/BaseElementMixin.js";
import { TaxResults } from "../../results/model/TaxResults.js";
import { TaxProcessorDispatcher } from "./TaxProcessorDispatcher.js";
import { ListGroupCss } from "../../base/ListGroupCss.js";
import { HomeViewCss } from "./HomeViewCss.js";
import { Country } from "../../country/model/Country.js";

import "../../country/view/CountrySelect.js";
import "../../salary/view/SalaryInput.js";
import "../../results/view/ResultsContainer.js";

export class HomeView extends BaseElementMixin(LitElement) {

    static get properties() {
        return {
            selectedCountry: Country
        };
    }

    static get styles() {
        return [...super.styles, ListGroupCss, HomeViewCss];
    }

    render() {
        return html`

            <div class="list-group">
                <a id="countryLink" href="/countries" class="list-group-item list-group-item-action">
                    <div class="country-container">
                        <h5>Country:</h5>
                        <div class="selected-country-container">
                            ${this._getSelectedCountryInfo()}
                            <img class="right-chevron" src="/web_assets/img/right-chevron.png" alt="" />
                        </div>
                    </div>
                </a>
            </div>

            <br />

            <salary-input></salary-input>
            <results-container></results-container>
        `;
    }

    constructor() {
        super();
        this.selectedCountry = null;
    }

    firstUpdated() {
        this.addEventListener("salary-details-change", event => this._handleSalaryDetailsChange(event));
    }

    _getSelectedCountryInfo() {

        if(this.selectedCountry) {
            return html`
                <div class="country-info">
                    <img src="/web_assets/data/${this.selectedCountry.flag}" alt="" />
                    <div class="item-info">
                        <h5>${this.selectedCountry.name}</h5>
                        <small class="text-muted">${this.selectedCountry.currency} / ${this.selectedCountry.locale}</small>
                    </div>
                </div>
            `;
        }

        return html`
            <h5>None</h5>
        `;
    }

    /**
     * @param {CustomEvent} event
     */
    _handleSalaryDetailsChange(event) {
        this.salaryDetails = event.detail;
        this._calculateResults();
    }

    _updateCurrencyFormatter() {
        const formatter = new Intl.NumberFormat(this.selectedCountry.locale, {
            style: "currency",
            currency: this.selectedCountry.currency,
            minimumFractionDigits: 2
        });

        const resultContainer = this.shadowRoot.querySelector("results-container");
        resultContainer.formatter = formatter;
    }

    /**
     * Call the dispatcher to use the correct json loader
     * and tax calculator that matches the country to produce
     * tax results
     */
    _calculateResults() {

        if (this.selectedCountry && this.salaryDetails) {

            TaxProcessorDispatcher.dispatch(this.selectedCountry.id, this.salaryDetails)
                .then(taxResults => this._populateResults(taxResults));
        }
    }

    /**
     * @param {TaxResults} taxResults
     */
    _populateResults(taxResults) {

        const resultContainer = this.shadowRoot.querySelector("results-container");
        resultContainer.taxResults = taxResults;
    }
}

window.customElements.define("home-view", HomeView);
