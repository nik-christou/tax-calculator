import { html } from 'lit-html';

/**
 * @param {Number} amount
 * @param {Intl.NumberFormat} formatter
 */
 function formatAmount(formatter, amount) {
    return formatter.format(amount);
}

/**
 * @param {import('../model/CyprusTaxBreakdownBracket.js').CyprusTaxBreakdownBracket} taxBreakdownBracket
 * @param {Intl.NumberFormat} formatter
 */
 const taxBreakdownBracketItemTemplate = (taxBreakdownBracket, formatter) => html`
 <div class="list-group-item tax-bracket-item">
     ${taxBreakdownBracket.taxBracket.end === Number.POSITIVE_INFINITY
     ? html`${formatAmount(formatter, taxBreakdownBracket.taxBracket.start)} and over`
     : html`<span>${formatAmount(formatter, taxBreakdownBracket.taxBracket.start)} - ${formatAmount(formatter, taxBreakdownBracket.taxBracket.end)}</span>`}
     <span>${taxBreakdownBracket.taxBracket.ratePercent}%</span>
     <span>${formatAmount(formatter, taxBreakdownBracket.taxAmount)}</span>
 </div>
`;

/**
 * @param {Array<import('../model/CyprusTaxBreakdownBracket.js'>).CyprusTaxBreakdownBracket} taxBreakdownBrackets
 * @param {Intl.NumberFormat} formatter
 */
 const CyprusTaxBreakdownViewTemplate = (taxBreakdownBrackets, formatter) => html`
 <h3>Tax breakdown</h3>
 <div class="list-group">
     ${taxBreakdownBrackets.map((taxBreakdownBracket) => taxBreakdownBracketItemTemplate(taxBreakdownBracket, formatter))}
 </div>
`;

export { CyprusTaxBreakdownViewTemplate };
