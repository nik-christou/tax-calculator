import { TemplateResult, html } from "lit-element";

import "./countries/australia/boundary/AustraliaOptionsView.js";

export class CountryOptionsViewLoader {

    /**
     * @static
     * @param {Number} countryId
     * @return {TemplateResult}
     */
    static getCountryViewTagToLoad(countryId) {

        switch(countryId) {
            case 2: return this._loadAustraliaOptionsView();
        }
    }

    static _loadAustraliaOptionsView() {
        return html`<australia-options-view>`;
    }
}
