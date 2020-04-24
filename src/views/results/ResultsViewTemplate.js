import { html } from "lit-element";
import { TaxResults } from "../../model/TaxResults.js";

/**
 * @param {Number} amount
 * @param {Intl.NumberFormat} formatter
 */
function formatAmount(formatter, amount) {
    return formatter.format(amount);
}

/**
 * @param {TaxResults} taxResults
 * @param {Intl.NumberFormat} formatter
 */
const ResultsViewTemplate = (taxResults, formatter) => html`
<div bp="grid">
    <main bp="12">
        <nav-bar bp="12">
            <a href="#" slot="left" class="nav-back">
                <svg viewBox="0 0 32 32" class="icon icon-chevron-left" viewBox="0 0 32 32" aria-hidden="true">
                    <path d="M14.19 16.005l7.869 7.868-2.129 2.129-9.996-9.997L19.937 6.002l2.127 2.129z"/>
                </svg>
                Home
            </a>
        </nav-bar>
        <div class="main-container" bp="grid 6@md">
            <div>
                <h2>Annual</h2>
                <table class="table">
                    <tr>
                        <td>Gross</td>
                        <td>${formatAmount(formatter, taxResults.annualTaxResult.grossAmount)}</td>
                    </tr>
                    <tr>
                        <td>Tax</td>
                        <td>${formatAmount(formatter, taxResults.annualTaxResult.taxAmount)}</td>
                    </tr>
                    <tr>
                        <td>Social</td>
                        <td>${formatAmount(formatter, taxResults.annualTaxResult.socialAmount)}</td>
                    </tr>
                    <tr>
                        <td>NHS (GESY)</td>
                        <td>${formatAmount(formatter, taxResults.annualTaxResult.healthContributionAmount)}</td>
                    </tr>
                    <tr>
                        <td>Net</td>
                        <td>${formatAmount(formatter, taxResults.annualTaxResult.netAmount)}</td>
                    </tr>
                </table>
            </div>
            <div>
                <h2>Monthly</h2>
                <table class="table">
                    <tr>
                        <td>Gross</td>
                        <td>${formatAmount(formatter, taxResults.monthlyTaxResult.grossAmount)}</td>
                    </tr>
                    <tr>
                        <td>Tax</td>
                        <td>${formatAmount(formatter, taxResults.monthlyTaxResult.taxAmount)}</td>
                    </tr>
                    <tr>
                        <td>Social</td>
                        <td>${formatAmount(formatter, taxResults.monthlyTaxResult.socialAmount)}</td>
                    </tr>
                    <tr>
                        <td>NHS (GESY)</td>
                        <td>${formatAmount(formatter, taxResults.monthlyTaxResult.healthContributionAmount)}</td>
                    </tr>
                    <tr>
                        <td>Net</td>
                        <td>${formatAmount(formatter, taxResults.monthlyTaxResult.netAmount)}</td>
                    </tr>
                </table>
            </div>
        </div>
    </main>
</div>
`;

export { ResultsViewTemplate };
