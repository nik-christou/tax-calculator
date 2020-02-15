// @ts-check

import { LitElement, html } from "lit-element";
import { BaseElementMixin } from "../../base/base-element-mixin.js";
import { TaxResults } from "../model/tax-results.js";

export class ResultsContainer extends BaseElementMixin(LitElement) {

    static get properties() {
        return {
            monthlyResults: TaxResults,
            annualResults: TaxResults
        };
    }

    render() {
        return html`
            <div>
                <h4>Annual</h4>
                <table>
                    <tr>
                        <td>Gross</td><td>€${this.annualResults.grossAmount}</td>
                    </tr>
                    <tr>
                        <td>Tax</td><td>€${this.annualResults.taxAmount}</td>
                    </tr>
                    <tr>
                        <td>Social</td><td>€${this.annualResults.socialAmount}</td>
                    </tr>
                    <tr>
                        <td>NHS (GESY)</td><td>€${this.annualResults.healthContributionAmount}</td>
                    </tr>
                    <tr>
                        <td>Net</td><td>€${this.annualResults.netAmount}</td>
                    </tr>
                </table>
            </div>
            <div>
                <h4>Monthly</h4>
                <table>
                    <tr>
                        <td>Gross</td><td>€${this.monthlyResults.grossAmount}</td>
                    </tr>
                    <tr>
                        <td>Tax</td><td>€${this.monthlyResults.taxAmount}</td>
                    </tr>
                    <tr>
                        <td>Social</td><td>€${this.monthlyResults.socialAmount}</td>
                    </tr>
                    <tr>
                        <td>NHS (GESY)</td><td>€${this.monthlyResults.healthContributionAmount}</td>
                    </tr>
                    <tr>
                        <td>Net</td><td>€${this.monthlyResults.netAmount}</td>
                    </tr>
                </table>
            </div>
        `;
    }

    constructor() {
        super();
        this.monthlyResults = new TaxResults(0,0,0,0,0);
        this.annualResults = new TaxResults(0,0,0,0,0);
    }
}

window.customElements.define("results-container", ResultsContainer);
