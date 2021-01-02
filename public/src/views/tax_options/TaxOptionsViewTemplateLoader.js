import { html } from 'lit-element';

import '../../countries/australia/view/AustraliaTaxOptionsView.js';

export class TaxOptionsViewTemplateLoader {
    /**
     * @param {import('../../model/Country.js').Country} country
     */
    static getTaxOptionsViewTemplateTag(country) {
        if (!country) return;

        switch (country.id) {
        case 2:
            return html`<australia-tax-options-view></australia-tax-options-view>`;
        }
    }
}
