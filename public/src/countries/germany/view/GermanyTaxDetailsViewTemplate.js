import { html } from 'lit-element';

/**
 * @param {Number} amount
 * @param {Intl.NumberFormat} formatter
 */
function formatAmount(formatter, amount) {
    return formatter.format(amount);
}

/**
 * @param {import('../model/GermanTaxBracket.js').GermanTaxBracket} taxBracket
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
 * @param {import('../model/GermanTaxDetails.js').GermanTaxDetails} taxDetails
 * @param {Intl.NumberFormat} formatter
 */
const GermanTaxDetailsViewTemplate = (taxDetails, formatter) => html`
    <h3>Contributions</h3>
    <div class="list-group">
        <div class="list-group-item contribution-item">
            <span>Pension Insurance:</span>
            <span>
                <span>${taxDetails.pensionInsurance.percent}% <br /> (max: ${formatAmount(formatter, taxDetails.pensionInsurance.maxAmount)})</span>
            </span>
        </div>
        <div class="list-group-item contribution-item">
            <span>Unemployment Insurance:</span>
            <span>
                <span>${taxDetails.unemploymentInsurance.percent}% <br /> (max: ${formatAmount(formatter, taxDetails.unemploymentInsurance.maxAmount)})</span>
            </span>
        </div>
        <div class="list-group-item contribution-item">
            <span>Health Insurance:</span>
            <span>
                <span>${taxDetails.healthInsurance.percent}% <br /> (max: ${formatAmount(formatter, taxDetails.healthInsurance.maxAmount)})</span>
            </span>
        </div>
        <div class="list-group-item contribution-item">
            <span>Long Term Care Insurance:</span>
            <span>
                <span>${taxDetails.longTermCareInsurance.childlessPercent}% (no child)</span> <br />
                <span>${taxDetails.longTermCareInsurance.withChildPercent}% (with child)</span> <br />
                <span>(max: ${formatAmount(formatter, taxDetails.longTermCareInsurance.maxAmount)})</span>
            </span>
        </div>
    </div>
    <h3>Tax brackets (single individuals)</h3>
    <div class="list-group">
        ${taxDetails.singleTaxBrackets.map((taxBracket) => taxBracketItemTemplate(taxBracket, formatter))}
    </div>
    <h3>Tax brackets (married individuals)</h3>
    <div class="list-group">
        ${taxDetails.marriedTaxBrackets.map((taxBracket) => taxBracketItemTemplate(taxBracket, formatter))}
    </div>
`;

export { GermanTaxDetailsViewTemplate };