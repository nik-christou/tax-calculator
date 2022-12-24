import {html} from 'lit';
import {CyprusTaxDetailsViewTemplate} from '../../countries/cyprus/view/CyprusTaxDetailsViewTemplate.js';
import {AustraliaTaxDetailsViewTemplate} from '../../countries/australia/view/AustraliaTaxDetailsViewTemplate.js';
import {GermanTaxDetailsViewTemplate} from '../../countries/germany/view/GermanyTaxDetailsViewTemplate.js';
import {GreeceTaxDetailsViewTemplate} from '../../countries/greece/view/GreeceTaxDetailsViewTemplate.js';

class TaxDetailsViewTemplateLoader {

    /**
     * @param {Country} country
     * @param {Object} taxDetails each country has its own implementation
     * @param {NumberFormat} formatter
     */
    retrieveCountryTaxDetailsViewTemplate(country, taxDetails, formatter) {

        if (!country || !taxDetails || !formatter) {
            return html`Not valid country selection found`;
        }

        switch (country.id) {
            case 1:
                return CyprusTaxDetailsViewTemplate(taxDetails, formatter);
            case 2:
                return AustraliaTaxDetailsViewTemplate(taxDetails, formatter);
            case 3:
                return GermanTaxDetailsViewTemplate(taxDetails, formatter);
            case 4:
                return GreeceTaxDetailsViewTemplate(taxDetails, formatter);
        }
    }
}

export const taxDetailsViewTemplateLoader = Object.freeze(new TaxDetailsViewTemplateLoader());
