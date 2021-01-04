import { LitElement } from 'lit-element';
import { BaseElementMixin } from '../../../base/BaseElementMixin.js';
import { CyprusTaxOptionsViewCss } from './CyprusTaxOptionsViewCss.js';
import { CyprusTaxOptionsViewTemplate } from './CyprusTaxOptionsViewTemplate.js';
import { ToggleCss } from '../../../base/ToggleCss.js';
import { ListGroupCss } from '../../../base/ListGroupCss.js';
import { BlueprintCss } from '../../../base/BlueprintCss.js';
import { CyprusTaxOptions } from '../model/CyprusTaxOptions.js';
import { UserSelectionStore } from '../../../datastore/UserSelectionStore.js';

const COUNTRY_ID = 1;

export class CyprusTaxOptionsView extends BaseElementMixin(LitElement) {

    static get properties() {
        return {
            cyprusTaxOptions: CyprusTaxOptions
        };
    }

    static get styles() {
        return [...super.styles, BlueprintCss, ListGroupCss, ToggleCss, CyprusTaxOptionsViewCss];
    }

    render() {
        return CyprusTaxOptionsViewTemplate(this.cyprusTaxOptions);
    }

    constructor() {
        super();
        this.cyprusTaxOptions = new CyprusTaxOptions();
    }

    firstUpdated() {
        this._loadUserSelectionFromDatastore();
        this._addIsSelfEmployedListener();
    }

    _loadUserSelectionFromDatastore() {

        UserSelectionStore.retrieveCountryOptionByCountryId(COUNTRY_ID).then((countryOptions) => {
            if (!countryOptions || countryOptions.countryId !== COUNTRY_ID) return;
            this.cyprusTaxOptions = CyprusTaxOptions.createFromObject(countryOptions);
        });
    }

    _addIsSelfEmployedListener() {
        const selfEmployedElement = this.shadowRoot.querySelector('input#selfEmployed');
        selfEmployedElement.addEventListener('input', (event) => {
            this._handleIsSelfEmployedChange(event, selfEmployedElement);
        });
    }

    /**
     * @param {Event} event
     * @param {HTMLInputElement} selfEmployedElement
     */
    _handleIsSelfEmployedChange(event, selfEmployedElement) {

        this.cyprusTaxOptions.selfEmployed = selfEmployedElement.checked;
        UserSelectionStore.updateCountryOptions(this.cyprusTaxOptions);
    }
}

// @ts-ignore
window.customElements.define('cyprus-tax-options-view', CyprusTaxOptionsView);
