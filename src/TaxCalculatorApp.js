import { LitElement, html } from "lit-element";
import { BaseElementMixin } from "./base/BaseElementMixin.js";
import { TaxCalculatorAppCss } from "./TaxCalculatorAppCss.js";
import { BlueprintCss } from "./base/BlueprintCss.js";
import { SWRegister } from "./SWRegister.js";
import { TaxResults } from "./results/model/TaxResults.js";
import { TaxProcessorDispatcher } from "./TaxProcessorDispatcher.js";

import "./navbar/Navbar.js";

import "./country/view/CountrySelect.js";
import "./salary/view/SalaryInput.js";
import "./results/view/ResultsContainer.js";

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
                        <country-select></country-select>
                        <salary-input></salary-input>
                        <results-container></results-container>
                    </div>
                </main>
            </div>
        `;
    }

    firstUpdated() {
        SWRegister.register();
        this.addEventListener("country-select-change", event => this._handleCountryChange(event));
        this.addEventListener("salary-details-change", event => this._handleSalaryDetailsChange(event));
    }

    /**
     * @param {CustomEvent} event
     */
    _handleCountryChange(event) {
        this.selectedCountry = event.detail;
        this._updateCurrencyFormatter();
        this._calculateResults();
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

window.customElements.define("tax-calculator-app", TaxCalculatorApp);
