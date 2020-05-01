import { html } from "lit-element";
import { Country } from "../../../model/Country.js";

import "../../../countries/australia/boundary/AustraliaOptionsView.js";

export class CountryOptionsViewTemplateLoader {

    /**
     * @param {Country} country
     */
    static getCountryOptionsViewTemplateTag(country) {

        if(!country) return;

        switch(country.id) {
            case 2:
                return html`<australia-options-view></australia-options-view>`;
        }
    }
}
