// @ts-check

import { LitElement, html } from "lit-element";
import { BaseElementMixin } from "./base/base-element-mixin.js";
import { TaxCalculatorCss } from "./tax-calculator-app.css.js";
import { SWRegistration } from "./sw-registration.js";
import { TaxCalculator } from "./tax-calculator.js";
import { SalaryTypes } from "./salary/control/salary-type-enum.js";
import { TaxResults } from "./results/model/tax-results.js";

import "./country/view/country-select.js";
import "./salary/view/salary-input.js";
import "./results/view/results-container.js";

export class TaxCalculatorApp extends BaseElementMixin(LitElement) {
    static get styles() {
        return [...super.styles, TaxCalculatorCss];
    }

    render() {
        return html`
            <div class="container">
                <h2>Tax calculator</h2>
                <country-select></country-select>
                <salary-input></salary-input>
                <results-container></results-container>
            </div>
        `;
    }

    firstUpdated() {
        SWRegistration.register();

        this.addEventListener("country-select-change", event => this._handleCountryChange(event));
        this.addEventListener("salary-details-change", event => this._handleSalaryDetailsChange(event));
    }

    /**
     * @param {CustomEvent} event
     */
    _handleCountryChange(event) {
        this.selectedCountry = event.detail;
        this._calculateResults();
    }

    /**
     * @param {CustomEvent} event
     */
    _handleSalaryDetailsChange(event) {
        this.salaryDetails = event.detail;
        this._calculateResults();
    }

    /**
     * @param {TaxResults} taxResults
     */
    _populateResults(taxResults) {

        const resultContainer = this.shadowRoot.querySelector("results-container");
        resultContainer.taxResults = taxResults;
    }

    _calculateResults() {

        if (this.selectedCountry && this.salaryDetails) {

            let taxTesults;

            if(this.salaryDetails.type === SalaryTypes.ANNUAL) {
                taxTesults = TaxCalculator.calculateTaxFromAnnualIncome(this.selectedCountry, this.salaryDetails);
            } else {
                taxTesults = TaxCalculator.calculateTaxFromMonthlyIncome(this.selectedCountry, this.salaryDetails);
            }

            this._populateResults(taxTesults);
        }
    }
}

window.customElements.define("tax-calculator-app", TaxCalculatorApp);
