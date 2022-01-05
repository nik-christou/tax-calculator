import { html } from 'lit-html';

/**
 * @param {Number} amount
 * @param {Intl.NumberFormat} formatter
 * 
 * @retuns the amount as a formatted string
 */
function formatAmount(formatter, amount) {
    return formatter.format(amount);
}

/**
 * @param {Number} amount
 */
function isDeductableAmount(formatter, amount) {

    if (amount === 0) {
        return html` <span>${formatAmount(formatter, amount)}</span> `;
    }

    return html` <span class="deduction">${formatAmount(formatter, amount)}</span> `;
}

/**
 * @param {import('../../model/TaxResults.js').TaxResults} taxResults
 * @param {Intl.NumberFormat} formatter
 */
const ResultsViewTemplate = (taxResults, formatter) => html`
    <div bp="grid" class="main-grid">
        <main bp="12">
            <div bp="grid 4" class="navbar">
                <a href="#" class="nav-back">
                    <svg class="icon-chevron-left">
                        <path d="M14.19 16.005l7.869 7.868-2.129 2.129-9.996-9.997L19.937 6.002l2.127 2.129z" />
                    </svg>
                    Home
                </a>
                <div class="title">
                    Tax Results
                </div>
            </div>
            <div class="main-container" bp="grid 6@md">
                <div>
                    <h3>Annual</h3>
                    <div class="list-group">
                        <div class="list-group-item">
                            <div class="result-item-container">
                                <h5>Gross:</h5>
                                <span>${formatAmount(formatter, taxResults.annualTaxResult.grossAmount)}</span>
                            </div>
                        </div>
                        <div class="list-group-item">
                            <div class="result-item-container">
                                <h5>Tax:</h5>
                                ${isDeductableAmount(formatter, taxResults.annualTaxResult.taxAmount)}
                            </div>
                        </div>
                        <div class="list-group-item">
                            <div class="result-item-container">
                                <h5>Social contributions:</h5>
                                ${isDeductableAmount(formatter, taxResults.annualTaxResult.socialAmount)}
                            </div>
                        </div>
                        <div class="list-group-item">
                            <div class="result-item-container">
                                <h5>Health contributions:</h5>
                                ${isDeductableAmount(formatter, taxResults.annualTaxResult.healthContributionAmount)}
                            </div>
                        </div>
                        <div class="list-group-item">
                            <div class="result-item-container">
                                <h5>Net:</h5>
                                <span class="netResult">${formatAmount(formatter, taxResults.annualTaxResult.netAmount)}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <h3>Monthly</h3>
                    <div class="list-group">
                        <div class="list-group-item">
                            <div class="result-item-container">
                                <h5>Gross:</h5>
                                <span>${formatAmount(formatter, taxResults.monthlyTaxResult.grossAmount)}</span>
                            </div>
                        </div>
                        <div class="list-group-item">
                            <div class="result-item-container">
                                <h5>Tax:</h5>
                                ${isDeductableAmount(formatter, taxResults.monthlyTaxResult.taxAmount)}
                            </div>
                        </div>
                        <div class="list-group-item">
                            <div class="result-item-container">
                                <h5>Social contributions:</h5>
                                ${isDeductableAmount(formatter, taxResults.monthlyTaxResult.socialAmount)}
                            </div>
                        </div>
                        <div class="list-group-item">
                            <div class="result-item-container">
                                <h5>Health contributions:</h5>
                                ${isDeductableAmount(formatter, taxResults.monthlyTaxResult.healthContributionAmount)}
                            </div>
                        </div>
                        <div class="list-group-item">
                            <div class="result-item-container">
                                <h5>Net:</h5>
                                <span class="netResult">${formatAmount(formatter, taxResults.monthlyTaxResult.netAmount)}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <br />
            </div>
        </main>
    </div>
`;

export { ResultsViewTemplate };
