// @ts-check

import { LitElement, html } from "lit-element";
import { BaseElementMixin } from "./base/base-element-mixin.js";
import { TaxCalculatorCss } from "./tax-calculator-app.css.js";
import { SWRegistration } from "./sw-registration.js";
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
        const selectedCountry = event.detail;
        console.log(selectedCountry);

        this._calculateResults();
    }

    /**
     * @param {CustomEvent} event
     */
    _handleSalaryDetailsChange(event) {
        const salaryDetails = event.detail;
        console.log(salaryDetails);

        this._calculateResults();
    }

    /**
     * TODO - Create calculator class
     * This method will call another class
     * to do the calculations. for now we just
     * hardcode stuff for display.
     */
    _calculateResults() {

        const monthlyResults = new TaxResults(1666.67, 0, 138.33, 28.33, 1500.00);
        const annualResults = new TaxResults(20000.00, 0, 1660.00, 340.00, 18000.00);

        const resultContainer = this.shadowRoot.querySelector("results-container");

        resultContainer.montlyResults = monthlyResults;
        resultContainer.annualResults = annualResults;
    }
}

window.customElements.define("tax-calculator-app", TaxCalculatorApp);
