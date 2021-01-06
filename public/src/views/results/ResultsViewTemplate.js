import { html } from 'lit-element';

/**
 * @param {Number} amount
 * @param {Intl.NumberFormat} formatter
 */
function formatAmount(formatter, amount) {
    return formatter.format(amount);
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
                                <span class="deduction">${formatAmount(formatter, taxResults.annualTaxResult.taxAmount)}</span>
                            </div>
                        </div>
                        <div class="list-group-item">
                            <div class="result-item-container">
                                <h5>Social contributions:</h5>
                                <span class="deduction">${formatAmount(formatter, taxResults.annualTaxResult.socialAmount)}</span>
                            </div>
                        </div>
                        <div class="list-group-item">
                            <div class="result-item-container">
                                <h5>Health contributions:</h5>
                                <span class="deduction">${formatAmount(formatter, taxResults.annualTaxResult.healthContributionAmount)}</span>
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
                                <span class="deduction">${formatAmount(formatter, taxResults.monthlyTaxResult.taxAmount)}</span>
                            </div>
                        </div>
                        <div class="list-group-item">
                            <div class="result-item-container">
                                <h5>Social contributions:</h5>
                                <span class="deduction">${formatAmount(formatter, taxResults.monthlyTaxResult.socialAmount)}</span>
                            </div>
                        </div>
                        <div class="list-group-item">
                            <div class="result-item-container">
                                <h5>Health contributions:</h5>
                                <span class="deduction">${formatAmount(formatter, taxResults.monthlyTaxResult.healthContributionAmount)}</span>
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
