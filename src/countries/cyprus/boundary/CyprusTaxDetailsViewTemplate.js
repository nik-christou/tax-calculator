import { html } from "lit-element";
import { CyprusTaxDetails } from "../entity/CyprusTaxDetails.js";
import { CyprusTaxBracket } from "../entity/CyprusTaxBracket.js";

/**
 * @param {Number} amount
 * @param {Intl.NumberFormat} formatter
 */
function formatAmount(formatter, amount) {
    return formatter.format(amount);
}

/**
 * @param {CyprusTaxBracket} taxBracket
 * @param {Intl.NumberFormat} formatter
 */
const taxBracketItemTemplate = (taxBracket, formatter) => html`
<tr>
    ${taxBracket.end === Number.POSITIVE_INFINITY
        ? html`<td>${formatAmount(formatter, taxBracket.start)} and over</td>`
        : html`<td>${formatAmount(formatter, taxBracket.start)} - ${formatAmount(formatter, taxBracket.end)}</td>`
    }
    <td>${taxBracket.ratePercent}%</td>
</tr>
`;

/**
 * @param {CyprusTaxDetails} taxDetails
 * @param {Intl.NumberFormat} formatter
 */
const CyprusTaxDetailsViewTemplate = (taxDetails, formatter) => html`
<table class="table table-bordered">
<thead>
        <tr>
            <th scope="col">Contributions</th>
            <th scope="col">Rate</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>National health service</td>
            <td>${taxDetails.healthContributionPercent}%</td>
        </tr>
        <tr>
            <td>Social insurance contribution</td>
            <td>${taxDetails.socialInsuranceContributionPercent}%</td>
        </tr>
    </tbody>
</table>
<br />
<table class="table table-bordered">
    <thead>
        <tr>
            <th scope="col">Tax Brackets</th>
            <th scope="col">Rate</th>
        </tr>
    </thead>
    <tbody>
        ${taxDetails.taxBrackets.map((taxBracket) => taxBracketItemTemplate(taxBracket, formatter))}
    </tbody>
</table>
`;

export { CyprusTaxDetailsViewTemplate };
