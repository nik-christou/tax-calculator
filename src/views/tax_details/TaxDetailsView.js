import { LitElement } from "lit-element";
import { BaseElementMixin } from "../../base/BaseElementMixin.js";
import { UserSelectionStore } from "../../datastore/UserSelectionStore.js";
import { TaxDetailsStore } from "../../datastore/TaxDetailsStore.js";
import { TaxDetailsViewTemplate } from "./TaxDetailsViewTemplate.js";
import { ListGroupCss } from "../../base/ListGroupCss.js";
import { BlueprintCss } from "../../base/BlueprintCss.js";
import { TaxDetailsViewCss } from "./TaxDetailsViewCss.js";
import { Country } from "../../model/Country.js";

export class TaxDetailsView extends BaseElementMixin(LitElement) {

    static get properties() {
        return {
            taxDetails: Object,
            selectedCountry: Country,
            formatter: Intl.NumberFormat
        };
    }

    static get styles() {
        return [
            ...super.styles,
            BlueprintCss,
            ListGroupCss,
            TaxDetailsViewCss
        ];
    }

    render() {
        return TaxDetailsViewTemplate(
            this.selectedCountry,
            this.taxDetails,
            this.formatter);
    }

    constructor() {
        super();
        this.selectedCountry = null;
        this.taxDetails = null;
        this.formatter = null;
    }

    firstUpdated() {
        this._addNavBackListener();
        this._loadUserSelectionFromDatastore();
    }

    _addNavBackListener() {
        const navBackLink = this.shadowRoot.querySelector("a.nav-back");
        navBackLink.addEventListener("click", event => this._handleNavBackEvent(event));
    }

    async _loadUserSelectionFromDatastore() {

        const country = await UserSelectionStore.retrieveCountry();

        if(!country) return;

        const taxDetails = await TaxDetailsStore.getTaxDetailsByCountryById(country.id);

        if(!taxDetails) return;

        this.taxDetails = taxDetails;
        this.selectedCountry = country;
        this._updateCurrencyFormatter(this.selectedCountry);
    }

    /**
     * @param {Event} event
     */
    _handleNavBackEvent(event) {

        event.preventDefault();
        this._goToHome();
    }

    _goToHome() {

        if(window.history.length === 1 || window.history.length === 2) {
            history.pushState(null, "Home", "/");
            history.go(1);
            dispatchEvent(new PopStateEvent('popstate'));
        } else {
            history.back();
        }
    }

    /**
     * @param {Country} selectedCountry
     */
    _updateCurrencyFormatter(selectedCountry) {
        const formatter = new Intl.NumberFormat(selectedCountry.locale, {
            style: "currency",
            currency: selectedCountry.currency,
            minimumFractionDigits: 2
        });

        this.formatter = formatter;
    }
}

window.customElements.define("tax-details-view", TaxDetailsView);
