// @ts-check

import { LitElement, html } from "lit-element";
import { BaseElementMixin } from "./base/base-element-mixin.js";
import { TaxCalculatorCss } from "./tax-calculator-app.css.js";
import { SWRegistration } from "./sw-registration.js";

import "./country/view/country-select.js";
import "./salary/view/salary-input.js";

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
    }

    /**
     * @param {CustomEvent} event
     */
    _handleSalaryDetailsChange(event) {
        const salaryDetails = event.detail;
        console.log(salaryDetails);
    }
}

window.customElements.define("tax-calculator-app", TaxCalculatorApp);
