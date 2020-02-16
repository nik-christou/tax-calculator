// @ts-check

import { LitElement, html } from "lit-element";
import { BaseElementMixin } from "../../base/base-element-mixin.js";
import { TaxResult } from "../model/tax-result.js";
import { TaxResults } from "../model/tax-results.js";

export class ResultsContainer extends BaseElementMixin(LitElement) {

    static get properties() {
        return {
            taxResults: TaxResults
        };
    }

    render() {
        return html`
            <div>
                <h4>Annual</h4>
                <table>
                    <tr>
                        <td>Gross</td><td>€${this.taxResults.annualTaxResult.grossAmount}</td>
                    </tr>
                    <tr>
                        <td>Tax</td><td>€${this.taxResults.annualTaxResult.taxAmount}</td>
                    </tr>
                    <tr>
                        <td>Social</td><td>€${this.taxResults.annualTaxResult.socialAmount}</td>
                    </tr>
                    <tr>
                        <td>NHS (GESY)</td><td>€${this.taxResults.annualTaxResult.healthContributionAmount}</td>
                    </tr>
                    <tr>
                        <td>Net</td><td>€${this.taxResults.annualTaxResult.netAmount}</td>
                    </tr>
                </table>
            </div>
            <div>
                <h4>Monthly</h4>
                <table>
                    <tr>
                        <td>Gross</td><td>€${this.taxResults.monthlyTaxResult.grossAmount}</td>
                    </tr>
                    <tr>
                        <td>Tax</td><td>€${this.taxResults.monthlyTaxResult.taxAmount}</td>
                    </tr>
                    <tr>
                        <td>Social</td><td>€${this.taxResults.monthlyTaxResult.socialAmount}</td>
                    </tr>
                    <tr>
                        <td>NHS (GESY)</td><td>€${this.taxResults.monthlyTaxResult.healthContributionAmount}</td>
                    </tr>
                    <tr>
                        <td>Net</td><td>€${this.taxResults.monthlyTaxResult.netAmount}</td>
                    </tr>
                </table>
            </div>
        `;
    }

    constructor() {
        super();

        const monthlyTaxResults = new TaxResult(0,0,0,0,0);
        const annualTaxResults = new TaxResult(0,0,0,0,0);

        this.taxResults = new TaxResults(monthlyTaxResults, annualTaxResults);
    }
}

window.customElements.define("results-container", ResultsContainer);
