import { LitElement } from 'lit';
import { BaseElementMixin } from '../../base/BaseElementMixin.js';
import { userSelectionsStore } from "../../datastore/UserSelectionsStore.js";
import { taxDetailsStore } from '../../datastore/TaxDetailsStore.js';
import { TaxDetailsViewTemplate } from './TaxDetailsViewTemplate.js';
import { taxDetailsViewTemplateLoader } from './TaxDetailsViewTemplateLoader.js';
import { ListGroupCss } from '../../base/ListGroupCss.js';
import { BlueprintCss } from '../../base/BlueprintCss.js';
import { TaxDetailsViewCss } from './TaxDetailsViewCss.js';
import { Country } from '../../model/Country.js';

export class TaxDetailsView extends BaseElementMixin(LitElement) {
    
    static get properties() {
        return {
            taxDetails: Object,
            selectedCountry: Country,
            formatter: Intl.NumberFormat
        };
    }

    static get styles() {
        return [...super.styles, BlueprintCss, ListGroupCss, TaxDetailsViewCss];
    }

    render() {
        return TaxDetailsViewTemplate(() => this.#loadCountrySpecificTemplate());
    }

    constructor() {
        super();
        this.formatter = null;
        this.taxDetails = null;
        this.selectedCountry = null;
        this.countryTaxDetailsView = null;
        this.#loadUserSelectionFromDatastore();
    }

    firstUpdated() {
        this.#addNavBackListener();
    }

    #addNavBackListener() {
        const navBackLink = this.shadowRoot.querySelector('a.nav-back');
        navBackLink.addEventListener('click', (event) => {
            this.#handleNavBackEvent(event);
        });
    }

    #loadUserSelectionFromDatastore() {

        const country = userSelectionsStore.retrieveSelectedCountry();
        if (!country) return;

        const taxDetails = taxDetailsStore.retrieveTaxDetailsByCountryById(country.id);
        if (!taxDetails) return;

        this.taxDetails = taxDetails.details;
        this.selectedCountry = country;
        this.#updateCurrencyFormatter(this.selectedCountry);
    }

    #loadCountrySpecificTemplate() {
        return taxDetailsViewTemplateLoader.retrieveCountryTaxDetailsViewTemplate(
            this.selectedCountry,
            this.taxDetails,
            this.formatter);
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

    /**
     * @param {Country} selectedCountry
     */
    #updateCurrencyFormatter(selectedCountry) {
        const formatter = new Intl.NumberFormat(selectedCountry.locale, {
            style: 'currency',
            currency: selectedCountry.currency,
            minimumFractionDigits: 2
        });

        this.formatter = formatter;
    }
}

window.customElements.define('tax-details-view', TaxDetailsView);
