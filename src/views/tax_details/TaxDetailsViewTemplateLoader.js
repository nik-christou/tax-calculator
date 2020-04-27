import { TemplateResult, html } from "lit-element";
import { Country } from "../../model/Country.js";
import { CyprusTaxDetailsViewTemplate } from "../../countries/cyprus/boundary/CyprusTaxDetailsViewTemplate.js";
import { AustraliaTaxDetailsViewTemplate } from "../../countries/australia/boundary/AustraliaTaxDetailsViewTemplate.js";

export class TaxDetailsViewTemplateLoader {

    /**
     * @param {Country} country
     * @param {Object} taxDetails each country has its own implementation
     * @param {Intl.NumberFormat} formatter
     * @returns {TemplateResult} the template for the tax details
     */
    static _getCountryTaxDetailsViewTemplate(country, taxDetails, formatter) {

        if(!country || !taxDetails || !formatter) {
            return html`Not valid country selection found`;
        }

        switch(country.id) {
            case 1: return CyprusTaxDetailsViewTemplate(taxDetails, formatter);
            case 2: return AustraliaTaxDetailsViewTemplate(taxDetails, formatter);
        }
    }
}
