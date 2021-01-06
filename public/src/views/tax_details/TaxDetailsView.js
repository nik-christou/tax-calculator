import { LitElement, TemplateResult } from 'lit-element';
import { BaseElementMixin } from '../../base/BaseElementMixin.js';
import { UserSelectionStore } from '../../datastore/UserSelectionStore.js';
import { TaxDetailsStore } from '../../datastore/TaxDetailsStore.js';
import { TaxDetailsViewTemplate } from './TaxDetailsViewTemplate.js';
import { TaxDetailsViewTemplateLoader } from './TaxDetailsViewTemplateLoader.js';
import { ListGroupCss } from '../../base/ListGroupCss.js';
import { BlueprintCss } from '../../base/BlueprintCss.js';
import { TaxDetailsViewCss } from './TaxDetailsViewCss.js';
import { Country } from '../../model/Country.js';

export class TaxDetailsView extends BaseElementMixin(LitElement) {
    static get properties() {
        return {
            taxDetails: Object,
            selectedCountry: Country,
            formatter: Intl.NumberFormat,
            countryTaxDetailsView: TemplateResult
        };
    }

    static get styles() {
        return [...super.styles, BlueprintCss, ListGroupCss, TaxDetailsViewCss];
    }

    render() {
        return TaxDetailsViewTemplate(
            this.selectedCountry,
            this.taxDetails,
            this.formatter,
            this.countryTaxDetailsView);
    }

    constructor() {
        super();
        this.formatter = null;
        this.taxDetails = null;
        this.selectedCountry = null;
        this.countryTaxDetailsView = null;
    }

    async firstUpdated() {
        this._addNavBackListener();
        await this._loadUserSelectionFromDatastore();
        await this._loadCountrySpecificTemplate();
    }

    _addNavBackListener() {
        const navBackLink = this.shadowRoot.querySelector('a.nav-back');
        navBackLink.addEventListener('click', (event) => {
            this._handleNavBackEvent(event);
        });
    }

    async _loadUserSelectionFromDatastore() {
        const country = await UserSelectionStore.retrieveCountry();

        if (!country) return;

        const taxDetails = await TaxDetailsStore.getTaxDetailsByCountryById(country.id);

        if (!taxDetails) return;

        this.taxDetails = taxDetails;
        this.selectedCountry = country;
        this._updateCurrencyFormatter(this.selectedCountry);
    }

    async _loadCountrySpecificTemplate() {

        this.countryTaxDetailsView = TaxDetailsViewTemplateLoader
            ._getCountryTaxDetailsViewTemplate(this.selectedCountry,
                this.taxDetails,
                this.formatter);
    }

    /**
     * @param {Event} event
     */
    _handleNavBackEvent(event) {
        event.preventDefault();
        this._goToHome();
    }

    _goToHome() {
        if (window.history.length === 1 || window.history.length === 2) {
            window.history.pushState(null, 'Home', '/');
            window.history.go(1);
            window.dispatchEvent(new window.PopStateEvent('popstate'));
        } else {
            window.history.back();
        }
    }

    /**
     * @param {Country} selectedCountry
     */
    _updateCurrencyFormatter(selectedCountry) {
        const formatter = new Intl.NumberFormat(selectedCountry.locale, {
            style: 'currency',
            currency: selectedCountry.currency,
            minimumFractionDigits: 2
        });

        this.formatter = formatter;
    }
}

// @ts-ignore
window.customElements.define('tax-details-view', TaxDetailsView);
