// @ts-check

import { LitElement, html } from "lit-element";
import { BaseElementMixin } from "./base/base-element-mixin.js";
import { TaxCalculatorCss } from "./tax-calculator.css.js";
import { SWRegistration } from "./sw-registration.js";

import "./country-select.js";
import "./results-container.js";

export class TaxCalculator extends BaseElementMixin(LitElement) {
    static get styles() {
        return [...super.styles, TaxCalculatorCss];
    }

    render() {
        return html`
            <div class="container">
                <h2>Tax calculator</h2>
                <country-select></country-select>
                <results-container
                    gross="10"
                    tax="5"
                    social="1"
                    nhs="1"
                    net="3">
                </results-container>
            </div>
        `;
    }

    firstUpdated() {

        new SWRegistration().register();
        this._loadCyprusJson();
    }

    _loadCyprusJson() {

        const countrySelect = this.shadowRoot.querySelector('country-select');

        this._loadJson('../data/cyprus.json')
            .then(data => countrySelect.data = data)
            .catch(reason => console.log(reason.message))
    }

    /**
     * Load a data from a json file
     *
     * @param {String} jsonPath
     */
    async _loadJson(jsonPath) {

        const response = await fetch(jsonPath);
        const data = await response.json();

        return data;
    }
}

window.customElements.define("tax-calculator", TaxCalculator);
