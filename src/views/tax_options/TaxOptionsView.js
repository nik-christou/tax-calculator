import { LitElement } from 'lit';
import { BaseElementMixin } from '../../base/BaseElementMixin.js';
import { TaxOptionsViewTemplate } from './TaxOptionsViewTemplate.js';
import { TaxOptionsViewCss } from './TaxOptionsViewCss.js';
import { SwitchCss } from '../../base/SwitchCss.js';
import { ListGroupCss } from '../../base/ListGroupCss.js';
import { BlueprintCss } from '../../base/BlueprintCss.js';
import { UserSelectionStore } from '../../datastore/UserSelectionStore.js';
import { TaxOptionsViewTemplateLoader } from './TaxOptionsViewTemplateLoader.js';
import { Country } from '../../model/Country.js';

export class CountryTaxOptionsView extends BaseElementMixin(LitElement) {

    static get properties() {
        return { selectedCountry: Country };
    }

    static get styles() {
        return [...super.styles, BlueprintCss, ListGroupCss, SwitchCss, TaxOptionsViewCss];
    }

    render() {
        return TaxOptionsViewTemplate(() => this._loadCountrySpecificTaxOptionsViewTemplate());
    }

    constructor() {
        super();
        this.selectedCountry = null;
    }

    async firstUpdated() {
        this._addNavBackListener();
        await this._loadUserSelectionFromDatastore();
    }

    _addNavBackListener() {
        const navBackLink = this.shadowRoot.querySelector('a.nav-back');
        navBackLink.addEventListener('click', (event) => this._handleNavBackEvent(event));
    }

    async _loadUserSelectionFromDatastore() {

        UserSelectionStore.retrieveCountry().then((country) => {
            if (!country) return;
            this.selectedCountry = country;
        });
    }

    _loadCountrySpecificTaxOptionsViewTemplate() {
        return TaxOptionsViewTemplateLoader.getTaxOptionsViewTemplateTag(this.selectedCountry);
    }

    /**
     * @param {Event} event
     */
    _handleNavBackEvent(event) {
        event.preventDefault();
        this._goToHome();
    }

    _goToHome() {

        if (window.history.state) {
            window.history.back();
        } else {
            window.history.replaceState(null, 'Home', '/');
            window.history.go(1);
            window.dispatchEvent(new window.PopStateEvent('popstate'));
        }
    }
}

// @ts-ignore
window.customElements.define('tax-options-view', CountryTaxOptionsView);
