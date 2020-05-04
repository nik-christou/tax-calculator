import { html } from "lit-element";
import { Country } from "../../model/Country.js";

import "../../countries/australia/view/AustraliaTaxOptionsView.js";

export class TaxOptionsViewTemplateLoader {

    /**
     * @param {Country} country
     */
    static getTaxOptionsViewTemplateTag(country) {

        if(!country) return;

        switch(country.id) {
            case 2:
                return html`<australia-tax-options-view></australia-tax-options-view>`;
        }
    }
}
