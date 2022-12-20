import { html } from 'lit';

/**
 * @param {Number} amount
 * @param {NumberFormat} formatter
 */
 function formatAmount(formatter, amount) {
    return formatter.format(amount);
}

/**
 * @param {CyprusTaxBreakdownBracket} taxBreakdownBracket
 * @param {NumberFormat} formatter
 */
 const taxBreakdownBracketItemTemplate = (taxBreakdownBracket, formatter) => html`
 <div class="list-group-item tax-bracket-item">
     ${taxBreakdownBracket.taxBracket.end === null
     ? html`${formatAmount(formatter, taxBreakdownBracket.taxBracket.start)} and above`
     : html`<span>${formatAmount(formatter, taxBreakdownBracket.taxBracket.start)} - ${formatAmount(formatter, taxBreakdownBracket.taxBracket.end)}</span>`}
     <span>${taxBreakdownBracket.taxBracket.ratePercent}%</span>
     <span>${formatAmount(formatter, taxBreakdownBracket.taxAmount)}</span>
 </div>
`;

/**
 * @param {CyprusTaxBreakdownBracket[]} taxBreakdownBrackets
 * @param {NumberFormat} formatter
 */
 const CyprusTaxBreakdownViewTemplate = (taxBreakdownBrackets, formatter) => html`
 <h3>Tax breakdown</h3>
 <div class="list-group">
     ${taxBreakdownBrackets.map((taxBreakdownBracket) => taxBreakdownBracketItemTemplate(taxBreakdownBracket, formatter))}
 </div>
`;

export { CyprusTaxBreakdownViewTemplate };
