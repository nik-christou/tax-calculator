import { LitElement, html, css } from "lit-element";
import { BaseElementMixin } from "../../base/BaseElementMixin.js";
import { TaxResult } from "../model/TaxResult.js";
import { TaxResults } from "../model/TaxResults.js";

export class ResultsContainer extends BaseElementMixin(LitElement) {
    static get properties() {
        return {
            taxResults: TaxResults,
            formatter: Intl.NumberFormat
        };
    }

    static get styles() {
        return [
            ...super.styles,
            css`
                .container {
                    display: flex;
                    flex-direction: row;
                    justify-content: flex-start;
                    margin-top: 30px;
                }

                .monthlyContainer {
                    margin-left: 50px;
                }
            `
        ];
    }

    render() {
        return html`
            <div class="container">
                <div class="annualContainer">
                    <h4>Annual</h4>
                    <table>
                        <tr>
                            <td>Gross</td>
                            <td>${this._getAnnualGrossAmount()}</td>
                        </tr>
                        <tr>
                            <td>Tax</td>
                            <td>${this._getAnnualTaxAmount()}</td>
                        </tr>
                        <tr>
                            <td>Social</td>
                            <td>${this._getAnnualSocialAmount()}</td>
                        </tr>
                        <tr>
                            <td>NHS (GESY)</td>
                            <td>${this._getAnnualHealthContribution()}</td>
                        </tr>
                        <tr>
                            <td>Net</td>
                            <td>${this._getAnnualNetAmount()}</td>
                        </tr>
                    </table>
                </div>

                <div class="monthlyContainer">
                    <h4>Monthly</h4>
                    <table>
                        <tr>
                            <td>Gross</td>
                            <td>${this._getMonthlyGrossAmount()}</td>
                        </tr>
                        <tr>
                            <td>Tax</td>
                            <td>${this._getMonthlyTaxAmount()}</td>
                        </tr>
                        <tr>
                            <td>Social</td>
                            <td>${this._getMonthlySocialAmount()}</td>
                        </tr>
                        <tr>
                            <td>NHS (GESY)</td>
                            <td>${this._getMonthlyHealthContribution()}</td>
                        </tr>
                        <tr>
                            <td>Net</td>
                            <td>${this._getMonthlyNetAmount()}</td>
                        </tr>
                    </table>
                </div>
            </div>
        `;
    }

    constructor() {
        super();

        const monthlyTaxResults = new TaxResult(0, 0, 0, 0, 0);
        const annualTaxResults = new TaxResult(0, 0, 0, 0, 0);

        this.taxResults = new TaxResults(monthlyTaxResults, annualTaxResults);
        this.formatter = new Intl.NumberFormat();
    }

    _getAnnualGrossAmount() {
        return this.formatter.format(this.taxResults.annualTaxResult.grossAmount);
    }

    _getAnnualTaxAmount() {
        return this.formatter.format(this.taxResults.annualTaxResult.taxAmount);
    }

    _getAnnualSocialAmount() {
        return this.formatter.format(this.taxResults.annualTaxResult.socialAmount);
    }

    _getAnnualHealthContribution() {
        return this.formatter.format(this.taxResults.annualTaxResult.healthContributionAmount);
    }

    _getAnnualNetAmount() {
        return this.formatter.format(this.taxResults.annualTaxResult.netAmount);
    }

    _getMonthlyGrossAmount() {
        return this.formatter.format(this.taxResults.monthlyTaxResult.grossAmount);
    }

    _getMonthlyTaxAmount() {
        return this.formatter.format(this.taxResults.monthlyTaxResult.taxAmount);
    }

    _getMonthlySocialAmount() {
        return this.formatter.format(this.taxResults.monthlyTaxResult.socialAmount);
    }

    _getMonthlyHealthContribution() {
        return this.formatter.format(this.taxResults.monthlyTaxResult.healthContributionAmount);
    }

    _getMonthlyNetAmount() {
        return this.formatter.format(this.taxResults.monthlyTaxResult.netAmount);
    }
}

window.customElements.define("results-container", ResultsContainer);
