import { html } from 'lit-html';

/**
 * @param {Number} amount
 * @param {Intl.NumberFormat} formatter
 */
function formatAmount(formatter, amount) {
    return formatter.format(amount);
}

/**
 * @param {import('../model/GreeceTaxBracket.js').GreeceTaxBracket} taxBracket
 * @param {Intl.NumberFormat} formatter
 */
const taxBracketItemTemplate = (taxBracket, formatter) => html`
    <div class="list-group-item tax-bracket-item">
        ${taxBracket.end === null
        ? html`${formatAmount(formatter, taxBracket.start)} and above`
        : html`<span>${formatAmount(formatter, taxBracket.start)} - ${formatAmount(formatter, taxBracket.end)}</span>`}
        <span>${taxBracket.ratePercent}%</span>
    </div>
`;

/**
 * @param {import('../model/GreeceTaxDetails.js').GreeceTaxDetails} taxDetails
 * @param {Intl.NumberFormat} formatter
 */
const GreeceTaxDetailsViewTemplate = (taxDetails, formatter) => html`
    <h3>Contributions</h3>
    <div class="list-group">
        <div class="list-group-item contribution-item">
            <div class="title-container">
                <span>Social security:</span> <br />
                <small>
                    with maximum amount at ${formatAmount(formatter, taxDetails.socialSecurity.maxAmount)}
                </small>
            </div>
            <span>
                <span>${taxDetails.socialSecurity.percent}%</span>
            </span>
        </div>
    </div>
    <h3>Tax brackets</h3>
    <div class="list-group">
        ${taxDetails.taxBrackets.map((taxBracket) => taxBracketItemTemplate(taxBracket, formatter))}
    </div>
`;

export { GreeceTaxDetailsViewTemplate };