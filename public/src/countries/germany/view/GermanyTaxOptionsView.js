import { LitElement } from 'lit-element';
import { BaseElementMixin } from '../../../base/BaseElementMixin.js';
import { GermanTaxOptionsViewCss } from './GermanyTaxOptionsViewCss.js';
import { GermanTaxOptionsViewTemplate } from './GermanyTaxOptionsViewTemplate.js';
import { ToggleCss } from '../../../base/ToggleCss.js';
import { ListGroupCss } from '../../../base/ListGroupCss.js';
import { BlueprintCss } from '../../../base/BlueprintCss.js';
import { GermanTaxOptions } from '../model/GermanTaxOptions.js';
import { UserSelectionStore } from '../../../datastore/UserSelectionStore.js';
import CountryIDsEnum from '../../CountryIDsEnum.js';

export class GermanTaxOptionsView extends BaseElementMixin(LitElement) {

    static get properties() {
        return {
            germanTaxOptions: GermanTaxOptions
        };
    }

    static get styles() {
        return [...super.styles, BlueprintCss, ListGroupCss, ToggleCss, GermanTaxOptionsViewCss];
    }

    render() {
        return GermanTaxOptionsViewTemplate(this.germanTaxOptions);
    }

    constructor() {
        super();
        this.germanTaxOptions = new GermanTaxOptions();
    }

    firstUpdated() {
        this._loadUserSelectionFromDatastore();
        this._addIsSingleListener();
    }

    _loadUserSelectionFromDatastore() {

        UserSelectionStore.retrieveCountryOptionByCountryId(CountryIDsEnum.GERMANY_ID).then((countryOptions) => {
            if (!countryOptions || countryOptions.countryId !== CountryIDsEnum.GERMANY_ID) return;
            this.germanTaxOptions = GermanTaxOptions.createFromObject(countryOptions);
        });
    }

    _addIsSingleListener() {
        const isSingleElement = this.shadowRoot.querySelector('input#single');
        isSingleElement.addEventListener('input', (event) => {
            this._handleIsSingleChange(event, isSingleElement);
        });
    }

    addWithChildListener() {
        const withChildElement = this.shadowRoot.querySelector('input#withChild');
        withChildElement.addEventListener('input', (event) => {
            this._handleWithChildChange(event, withChildElement);
        });
    }

    /**
     * @param {Event} event
     * @param {HTMLInputElement} isSingleElement
     */
    _handleIsSingleChange(event, isSingleElement) {

        this.germanTaxOptions.single = isSingleElement.checked;
        UserSelectionStore.updateCountryOptions(this.germanTaxOptions);
    }

    /**
     * @param {Event} event
     * @param {HTMLInputElement} withChildElement
     */
    _handleWithChildChange(event, withChildElement) {

        this.germanTaxOptions.withChild = withChildElement.checked;
        UserSelectionStore.updateCountryOptions(this.germanTaxOptions);
    }
}

// @ts-ignore
window.customElements.define('german-tax-options-view', GermanTaxOptionsView);
