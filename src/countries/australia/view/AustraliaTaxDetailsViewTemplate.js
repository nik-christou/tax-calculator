import { html } from "lit-element";
import { AustraliaTaxDetails } from "../model/AustraliaTaxDetails.js";
import { AustraliaTaxBracket } from "../model/AustraliaTaxBracket.js";

/**
 * @param {Number} amount
 * @param {Intl.NumberFormat} formatter
 */
function formatAmount(formatter, amount) {
    return formatter.format(amount);
}

/**
 * @param {AustraliaTaxBracket} taxBracket
 * @param {Intl.NumberFormat} formatter
 */
const taxBracketItemTemplate = (taxBracket, formatter) => html`
<div class="list-group-item tax-bracket-item">
    ${taxBracket.end === Number.POSITIVE_INFINITY
        ? html`${formatAmount(formatter, taxBracket.start)} and over`
        : html`<span>${formatAmount(formatter, taxBracket.start)} - ${formatAmount(formatter, taxBracket.end)}</span>`
    }
    <span>${taxBracket.ratePercent}%</span>
</div>
`;

/**
 * @param {AustraliaTaxDetails} taxDetails
 * @param {Intl.NumberFormat} formatter
 */
const AustraliaTaxDetailsViewTemplate = (taxDetails, formatter) => html`

<h3>Contributions - Residents</h3>
<div class="list-group">
    <div class="list-group-item contribution-item">
        <span>Medicare:</span>
        <span>${taxDetails.residents.medicarePercent}%</span>
    </div>
</div>
<h3>Tax brackets - Residents</h3>
<div class="list-group">
    ${taxDetails.residents.taxBrackets.map((taxBracket) => taxBracketItemTemplate(taxBracket, formatter))}
</div>
<h3>Tax brackets - Non-Residents</h3>
<div class="list-group">
    ${taxDetails.nonResidents.taxBrackets.map((taxBracket) => taxBracketItemTemplate(taxBracket, formatter))}
</div>
`;

export { AustraliaTaxDetailsViewTemplate };
