import {html} from 'lit';

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
 * @param {import('../../model/TaxBreakdownBracket.js').TaxBreakdownBracket} taxBreakdownBracket
 * @param {Intl.NumberFormat} formatter
 */
 const taxBreakdownBracketTemplate = (taxBreakdownBracket, formatter) => html`
 <div class="list-group-item">
     <div class="tax-breakdown-item-container">
        ${taxBreakdownBracket.end === null
        ? html`<div class="tax-breakdown-item"><span>${formatAmount(formatter, taxBreakdownBracket.start)} and above</span></div>`
        : html`<div><span>${formatAmount(formatter, taxBreakdownBracket.start)} - ${formatAmount(formatter, taxBreakdownBracket.end)}</span></div>`}
        <div class="tax-breakdown-rate"><span>${taxBreakdownBracket.ratePercent}%</span></div>
        <div class="tax-breakdown-amount"><span>${formatAmount(formatter, taxBreakdownBracket.taxAmount)}</span></div>
     </div>
 </div>
`;

/**
 * @param {import('../../model/TaxResults.js').TaxResults} taxResults
 * @param {Intl.NumberFormat} formatter
 */
const taxBreakdownTemplate = (taxResults, formatter) => {
    if(!taxResults.annualTaxResult.taxBreakdownBrackets) {
        return html``;
    }
    return html`
        <div class="main-container" bp="grid 6@md">
            <div>
                <h3>Annual tax breakdown</h3>
                <div class="list-group">
                    ${taxResults.annualTaxResult.taxBreakdownBrackets.map((taxBreakdownBracket) => taxBreakdownBracketTemplate(taxBreakdownBracket, formatter))}
                </div>
            </div>
            <div>
                <h3>Monthly tax breakdown</h3>
                <div class="list-group">
                    ${taxResults.monthlyTaxResult.taxBreakdownBrackets.map((taxBreakdownBracket) => taxBreakdownBracketTemplate(taxBreakdownBracket, formatter))}
                </div>
            </div>
        </div>
        <br>
    `
};

/**
 * @param {Country} country
 * @param {import('../../model/TaxResults.js').TaxResults} taxResults
 * @param {Intl.NumberFormat} formatter
 */
const ResultsViewTemplate = (country, taxResults, formatter) => html`
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
                <div class="share-container">
                    <a href="#" class="btn" id="shareBtn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-share-fill" viewBox="0 0 16 16">
                            <path d="M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5z"/>
                        </svg>
                    </a>
                </div>
            </div>
            <div class="main-container">
                <div class="list-group">
                    <div class="list-group-item">
                        <div class="result-item-container">
                            <h5>Country:</h5>
                            <span>${country?.name}</span>
                        </div>
                    </div>
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
            </div>
            ${taxBreakdownTemplate(taxResults, formatter)}
        </main>
    </div>
`;

export { ResultsViewTemplate };
