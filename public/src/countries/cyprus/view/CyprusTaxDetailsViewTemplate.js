import { html } from 'lit-element';

/**
 * @param {Number} amount
 * @param {Intl.NumberFormat} formatter
 */
function formatAmount(formatter, amount) {
    return formatter.format(amount);
}

/**
 * @param {import('../model/CyprusTaxBracket.js').CyprusTaxBracket} taxBracket
 * @param {Intl.NumberFormat} formatter
 */
const taxBracketItemTemplate = (taxBracket, formatter) => html`
    <div class="list-group-item tax-bracket-item">
        ${taxBracket.end === Number.POSITIVE_INFINITY
        ? html`${formatAmount(formatter, taxBracket.start)} and over`
        : html`<span>${formatAmount(formatter, taxBracket.start)} - ${formatAmount(formatter, taxBracket.end)}</span>`}
        <span>${taxBracket.ratePercent}%</span>
    </div>
`;

/**
 * @param {import('../model/CyprusTaxDetails.js').CyprusTaxDetails} taxDetails
 * @param {Intl.NumberFormat} formatter
 */
const CyprusTaxDetailsViewTemplate = (taxDetails, formatter) => html`
    <h3>Contributions</h3>
    <div class="list-group">
        <div class="list-group-item contribution-item">
            <span>National Health Service:</span>
            <span>${taxDetails.healthContributionPercent}%</span>
        </div>
        <div class="list-group-item contribution-item">
            <span>Social insurance contribution:</span>
            <span>${taxDetails.socialInsuranceContributionPercent}%</span>
        </div>
    </div>
    <h3>Tax brackets</h3>
    <div class="list-group">
        ${taxDetails.taxBrackets.map((taxBracket) => taxBracketItemTemplate(taxBracket, formatter))}
    </div>
`;

export { CyprusTaxDetailsViewTemplate };
