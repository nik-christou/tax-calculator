import {LitElement} from 'lit';
import {BaseElementMixin} from '../../../base/BaseElementMixin.js';
import {TaxOptions} from "../../../model/TaxOptions.js";
import {AustraliaTaxOptions} from '../model/AustraliaTaxOptions.js';
import {AustraliaTaxOptionsViewTemplate} from './AustraliaTaxOptionsViewTemplate.js';
import {ToggleCss} from '../../../base/ToggleCss.js';
import {ListGroupCss} from '../../../base/ListGroupCss.js';
import {BlueprintCss} from '../../../base/BlueprintCss.js';
import {userSelectionsStore} from '../../../datastore/UserSelectionsStore.js';
import CountryIDsEnum from '../../../datastore/CountryIDsEnum.js';
import {CommonTaxOptionsViewCss} from '../../CommonTaxOptionViewCss.js';
import {ResidenceTypes} from "../../../model/ResidenceTypes.js";

export class AustraliaTaxOptionsView extends BaseElementMixin(LitElement) {

    static get properties() {
        return {
            residentStatus: Boolean
        };
    }

    static get styles() {
        return [...super.styles, BlueprintCss, ListGroupCss, ToggleCss, CommonTaxOptionsViewCss];
    }

    render() {
        return AustraliaTaxOptionsViewTemplate(this.residentStatus);
    }

    constructor() {
        super();
        this.#loadUserSelectionFromDatastore();
    }

    firstUpdated() {
        this.#addIsResidentListener();
    }

    #loadUserSelectionFromDatastore() {

        const selectedTaxOptions = userSelectionsStore.retrieveSelectedTaxOptions();

        if(!selectedTaxOptions || selectedTaxOptions.countryId !== CountryIDsEnum.AUSTRALIA_ID) {
            return;
        }

        const {type} = selectedTaxOptions?.options?.residenceType;

        if(type === ResidenceTypes.RESIDENT.type) {
            this.residentStatus = true;
        } else {
            this.residentStatus = false;
        }
    }

    #addIsResidentListener() {
        const residentTypeElement = this.shadowRoot.querySelector('input#resident');
        residentTypeElement.addEventListener('input', (event) => {
            this.#handleIsResidentChange(event, residentTypeElement);
        });
    }

    /**
     * @param {Event} event
     * @param {HTMLInputElement} residentTypeElement
     */
    #handleIsResidentChange(event, residentTypeElement) {

        const residentType = this.#retrieveResidentType(residentTypeElement.checked);
        const australiaTaxOptions = new AustraliaTaxOptions(residentType);
        const taxOptions = new TaxOptions(CountryIDsEnum.AUSTRALIA_ID, australiaTaxOptions);

        userSelectionsStore.updateTaxOptions(taxOptions);
    }

    #retrieveResidentType(checkedStatus) {
        if(checkedStatus) {
            return ResidenceTypes.RESIDENT;
        }
        return ResidenceTypes.NON_RESIDENT;
    }
}

window.customElements.define('australia-tax-options-view', AustraliaTaxOptionsView);
