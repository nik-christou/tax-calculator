import { TemplateResult, html } from "lit-element";
import { Country } from "../../../model/Country.js";
import { AustraliaOptionsViewTemplate } from "../../../countries/australia/boundary/AustraliaOptionsViewTemplate.js";

export class CountryOptionsViewTemplateLoader {

    /**
     * @param {Country} country
     * @returns {TemplateResult} the template for the tax details
     */
    static getCountryOptionsViewTemplate(country) {

        if(!country) {
            return html`Not valid country selection found`;
        }

        switch(country.id) {
            case 2: return AustraliaOptionsViewTemplate(country.options);
        }
    }
}
