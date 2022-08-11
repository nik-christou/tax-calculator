import { LitElement } from 'lit';
import { BaseElementMixin } from '../../../base/BaseElementMixin.js';
import { AustraliaTaxOptionsViewTemplate } from './AustraliaTaxOptionsViewTemplate.js';
import { ToggleCss } from '../../../base/ToggleCss.js';
import { ListGroupCss } from '../../../base/ListGroupCss.js';
import { BlueprintCss } from '../../../base/BlueprintCss.js';
import { AustraliaOptions } from '../model/AustraliaTaxOptions.js';
// import { UserSelectionStore } from '../../../datastore/UserSelectionStore.js';
import CountryIDsEnum from '../../../datastore/CountryIDsEnum.js';
import { CommonTaxOptionsViewCss } from '../../CommonTaxOptionViewCss.js';

export class AustraliaTaxOptionsView extends BaseElementMixin(LitElement) {

    static get properties() {
        return {
            australiaOptions: AustraliaOptions
        };
    }

    static get styles() {
        return [...super.styles, BlueprintCss, ListGroupCss, ToggleCss, CommonTaxOptionsViewCss];
    }

    render() {
        return AustraliaTaxOptionsViewTemplate(this.australiaOptions);
    }

    constructor() {
        super();
        this.australiaOptions = new AustraliaOptions();
    }

    firstUpdated() {
        this._loadUserSelectionFromDatastore();
        this._addIsResidentListener();
    }

    _loadUserSelectionFromDatastore() {
        UserSelectionStore.retrieveCountryOptions().then((countryOptions) => {
            if (!countryOptions || countryOptions.countryId !== CountryIDsEnum.AUSTRALIA_ID) return;
            this.australiaOptions = AustraliaOptions.createFromObject(countryOptions);
        });
    }

    _addIsResidentListener() {
        const residentElement = this.shadowRoot.querySelector('input#resident');
        residentElement.addEventListener('input', (event) => {
            this._handleIsResidentChange(event, residentElement);
        });
    }

    /**
     * @param {Event} event
     * @param {HTMLInputElement} isResidentElement
     */
    _handleIsResidentChange(event, isResidentElement) {
        this.australiaOptions.isResident = isResidentElement.checked;
        UserSelectionStore.updateCountryOptions(this.australiaOptions);
    }
}

// @ts-ignore
window.customElements.define('australia-tax-options-view', AustraliaTaxOptionsView);
