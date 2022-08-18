import {html} from "lit";

/**
 * @param {Number} amount
 * @param {NumberFormat} formatter
 */
function formatAmount(formatter, amount) {
    return formatter.format(amount);
}

/**
 * @param {GermanTaxBracket} taxBracket
 * @param {NumberFormat} formatter
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
 * @param {GermanTaxDetails} taxDetails
 * @param {NumberFormat} formatter
 */
const GermanTaxDetailsViewTemplate = (taxDetails, formatter) => html`
    <h3>Contributions</h3>
    <div class="list-group">
        <div class="list-group-item contribution-item">
            <div class="title-container">
                <span>Pension insurance:</span> <br />
                <small>
                    with maximum amount at ${formatAmount(formatter, taxDetails.pensionInsurance.maxAmount)}
                </small>
            </div>
            <span>
                <span>${taxDetails.pensionInsurance.percent}%</span>
            </span>
        </div>
        <div class="list-group-item contribution-item">
            <div class="title-container">
                <span>Unemployment insurance:</span> <br />
                <small>
                    with maximum amount at ${formatAmount(formatter, taxDetails.unemploymentInsurance.maxAmount)}
                </small>
            </div>
            <span>
                <span>${taxDetails.unemploymentInsurance.percent}%</span>
            </span>
        </div>
        <div class="list-group-item contribution-item">
            <div class="title-container">
                <span>Health insurance:</span> <br />
                <small>
                    with maximum amount at ${formatAmount(formatter, taxDetails.healthInsurance.maxAmount)}
                </small>
            </div>
            <span>
                <span>${taxDetails.healthInsurance.percent}%</span>
            </span>
        </div>
        <div class="list-group-item contribution-item">
            <div class="title-container">
                <span>Long Term Care Insurance:</span> <br />
                <small>
                    with maximum amount at ${formatAmount(formatter, taxDetails.longTermCareInsurance.maxAmount)}
                </small>
            </div>
        </div>
        <div class="list-group-item sub-contribution-item">
            <span>No children:</span>
            <span>
                <span>${taxDetails.longTermCareInsurance.childlessPercent}%</span>
            </span>
        </div>
        <div class="list-group-item sub-contribution-item">
            <span>With children:</span>
            <span>
                <span>${taxDetails.longTermCareInsurance.withChildPercent}%</span>
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