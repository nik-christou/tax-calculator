import { html } from 'lit-element';
import { CyprusTaxDetailsViewTemplate } from '../../countries/cyprus/view/CyprusTaxDetailsViewTemplate.js';
import { AustraliaTaxDetailsViewTemplate } from '../../countries/australia/view/AustraliaTaxDetailsViewTemplate.js';

export class TaxDetailsViewTemplateLoader {
    /**
     * @param {import('../../model/Country.js').Country} country
     * @param {Object} taxDetails each country has its own implementation
     * @param {Intl.NumberFormat} formatter
     * @returns {import('lit-element').TemplateResult} the template for the tax details
     */
    static _getCountryTaxDetailsViewTemplate(country, taxDetails, formatter) {
        if (!country || !taxDetails || !formatter) {
            return html`Not valid country selection found`;
        }

        switch (country.id) {
            case 1:
                return CyprusTaxDetailsViewTemplate(taxDetails, formatter);
            case 2:
                return AustraliaTaxDetailsViewTemplate(taxDetails, formatter);
        }
    }
}
