// @ts-check

import { LitElement, html } from "lit-element";
import { BaseElementMixin } from "./base/base-element-mixin.js";

export class ResultsContainer extends BaseElementMixin(LitElement) {

    static get properties() {
        return {
            gross: Number,
            tax: Number,
            social: Number,
            nhs: Number,
            net: Number
        };
    }

    render() {
        return html`
            <table>
                <tr>
                    <td>Gross</td><td>€${this.gross}</td>
                </tr>
                <tr>
                    <td>Tax</td><td>€${this.tax}</td>
                </tr>
                <tr>
                    <td>Social</td><td>€${this.social}</td>
                </tr>
                <tr>
                    <td>NHS (GESY)</td><td>€${this.nhs}</td>
                </tr>
                <tr>
                    <td>Net</td><td>€${this.net}</td>
                </tr>
            </table>
        `;
    }
}

window.customElements.define("results-container", ResultsContainer);