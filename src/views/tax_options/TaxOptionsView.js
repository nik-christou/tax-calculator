import { LitElement } from 'lit';
import { BaseElementMixin } from '../../base/BaseElementMixin.js';
import { TaxOptionsViewTemplate } from './TaxOptionsViewTemplate.js';
import { TaxOptionsViewCss } from './TaxOptionsViewCss.js';
import { SwitchCss } from '../../base/SwitchCss.js';
import { ListGroupCss } from '../../base/ListGroupCss.js';
import { BlueprintCss } from '../../base/BlueprintCss.js';
import { userSelectionsStore } from "../../datastore/UserSelectionsStore.js";
import { taxOptionsViewTemplateLoader } from './TaxOptionsViewTemplateLoader.js';
import { Country } from '../../model/Country.js';

export class CountryTaxOptionsView extends BaseElementMixin(LitElement) {

    static get properties() {
        return { selectedCountry: Country };
    }

    static get styles() {
        return [...super.styles, BlueprintCss, ListGroupCss, SwitchCss, TaxOptionsViewCss];
    }

    render() {
        return TaxOptionsViewTemplate(() => this.#loadCountrySpecificTaxOptionsViewTemplate());
    }

    constructor() {
        super();
        this.selectedCountry = userSelectionsStore.retrieveSelectedCountry();
    }

    async firstUpdated() {
        this.#addNavBackListener();
    }

    #addNavBackListener() {
        const navBackLink = this.shadowRoot.querySelector('a.nav-back');
        navBackLink.addEventListener('click', (event) => this.#handleNavBackEvent(event));
    }

    #loadCountrySpecificTaxOptionsViewTemplate() {
        return taxOptionsViewTemplateLoader.retrieveTaxOptionsViewTemplateTag(this.selectedCountry);
    }

    /**
     * @param {Event} event
     */
    #handleNavBackEvent(event) {
        event.preventDefault();
        this.#goToHome();
    }

    #goToHome() {
        if (window.history.state) {
            window.history.back();
        } else {
            window.history.replaceState(null, 'Home', '/');
            window.history.go(1);
            window.dispatchEvent(new window.PopStateEvent('popstate'));
        }
    }
}

window.customElements.define('tax-options-view', CountryTaxOptionsView);
