import {html} from 'lit';
import '../../countries/cyprus/view/CyprusTaxOptionsView.js';
import '../../countries/australia/view/AustraliaTaxOptionsView.js';
import '../../countries/germany/view/GermanyTaxOptionsView.js';

class TaxOptionsViewTemplateLoader {
    /**
     * @param {Country} country
     */
    retrieveTaxOptionsViewTemplateTag(country) {
        if (!country) return;
        switch (country.id) {
            case 1:
                return html`
                    <cyprus-tax-options-view></cyprus-tax-options-view>`;
            case 2:
                return html`
                    <australia-tax-options-view></australia-tax-options-view>`;
            case 3:
                return html`
                    <german-tax-options-view></german-tax-options-view>`;
        }
    }
}

export const taxOptionsViewTemplateLoader = Object.freeze(new TaxOptionsViewTemplateLoader());
