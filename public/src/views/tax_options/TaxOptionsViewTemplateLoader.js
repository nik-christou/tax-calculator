import { html } from 'lit-element';

import '../../countries/cyprus/view/CyprusTaxOptionsView.js';
import '../../countries/australia/view/AustraliaTaxOptionsView.js';

export class TaxOptionsViewTemplateLoader {
    /**
     * @param {import('../../model/Country.js').Country} country
     */
    static getTaxOptionsViewTemplateTag(country) {
        if (!country) return;

        switch (country.id) {
            case 1:
                return html`<cyprus-tax-options-view></cyprus-tax-options-view>`;
            case 2:
                return html`<australia-tax-options-view></australia-tax-options-view>`;
        }
    }
}
