// @ts-check

import { LitElement, html } from "lit-element";
import { BaseElementMixin } from "./base/base-element-mixin.js";
import { TaxCalculatorCss } from "./tax-calculator-app.css.js";
import { SWRegistration } from "./sw-registration.js";
import { TaxCalculator } from "./tax-calculator.js";

import "./country/view/country-select.js";
import "./salary/view/salary-input.js";
import "./results/view/results-container.js";

export class TaxCalculatorApp extends BaseElementMixin(LitElement) {
    static get styles() {
        return [...super.styles, TaxCalculatorCss];
    }

    constructor() {
        super();
        this.taxCalculator = new TaxCalculator();
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
        console.log(this.selectedCountry);

        this._calculateResults();
    }

    /**
     * @param {CustomEvent} event
     */
    _handleSalaryDetailsChange(event) {
        this.salaryDetails = event.detail;
        console.log(this.salaryDetails);

        this._calculateResults();
    }

    _calculateResults() {

        if (this.selectedCountry !== undefined && this.salaryDetails !== undefined) {

            const taxResults = this.taxCalculator.calculateTaxFromAnnualIncome(this.selectedCountry, this.salaryDetails);

            const resultContainer = this.shadowRoot.querySelector("results-container");

            resultContainer.monthlyResults = taxResults.monthly;
            resultContainer.annualResults = taxResults.annual;
        }
    }
}

window.customElements.define("tax-calculator-app", TaxCalculatorApp);
