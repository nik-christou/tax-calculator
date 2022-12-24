import {BaseElement} from '../../base/BaseElement.js';
import {TaxOptionsViewTemplate} from './TaxOptionsViewTemplate.js';
import {Country} from '../../model/Country.js';
import {userSelectionsStore} from "../../datastore/UserSelectionsStore.js";
import {taxOptionsViewTemplateLoader} from './TaxOptionsViewTemplateLoader.js';
import {BlueprintCss} from '../../base/BlueprintCss.js';
import {ListGroupCssTaggedTemplate} from '@twbs-css/template-literals';
import {TaxOptionsViewCss} from './TaxOptionsViewCss.js';

export class CountryTaxOptionsView extends BaseElement {

    static properties = {
        selectedCountry: Country
    };

    static styles = [
        BaseElement.styles,
        BlueprintCss,
        ListGroupCssTaggedTemplate,
        TaxOptionsViewCss
    ];

    render() {
        return TaxOptionsViewTemplate(() => this.#loadCountrySpecificTaxOptionsViewTemplate());
    }

    constructor() {
        super();
        this.selectedCountry = userSelectionsStore.retrieveSelectedCountry();
    }

    firstUpdated(_changedProperties) {
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
