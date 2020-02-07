import { LitElement, html } from "lit-element";

import { BaseElementMixin } from "./base/base-element-mixin.js";
import { TaxCalculatorCss } from "./tax-calculator.css.js";
import { SWRegistration } from "./sw-registration.js";

export class TaxCalculator extends BaseElementMixin(LitElement) {
    static get styles() {
        return [...super.styles, TaxCalculatorCss];
    }

    render() {
        return html`
            <div class="container">
                <h2>Tax calculator</h2>
            </div>
        `;
    }

    constructor() {
        super();

        // const swRegistration = new SWRegistration();
        // swRegistration.register();
    }
}

window.customElements.define("tax-calculator", TaxCalculator);
