import {BaseElement} from '../../../base/BaseElement.js';
import {TaxOptions} from "../../../model/TaxOptions.js";
import {AustraliaTaxOptions} from '../model/AustraliaTaxOptions.js';
import {AustraliaTaxOptionsViewTemplate} from './AustraliaTaxOptionsViewTemplate.js';
import {userSelectionsStore} from '../../../datastore/UserSelectionsStore.js';
import CountryIDsEnum from '../../../datastore/CountryIDsEnum.js';
import {ResidenceTypes} from "../../../model/ResidenceTypes.js";
import {BlueprintCss} from '../../../base/BlueprintCss.js';
import {ListGroupCssTaggedTemplate} from '@twbs-css/template-literals';
import {FormsCssTaggedTemplate} from '@twbs-css/template-literals';
import {CommonTaxOptionsViewCss} from '../../CommonTaxOptionViewCss.js';

export class AustraliaTaxOptionsView extends BaseElement {

    static properties = {
        residentStatus: Boolean
    };

    static styles = [
        BaseElement.styles,
        BlueprintCss,
        ListGroupCssTaggedTemplate,
        FormsCssTaggedTemplate,
        CommonTaxOptionsViewCss
    ];

    render() {
        return AustraliaTaxOptionsViewTemplate(this.residentStatus);
    }

    constructor() {
        super();
        this.#loadUserSelectionFromDatastore();
    }

    firstUpdated(_changedProperties) {
        this.#addIsResidentListener();
    }

    #loadUserSelectionFromDatastore() {

        const selectedTaxOptions = userSelectionsStore.retrieveSelectedTaxOptions();

        if(!selectedTaxOptions || selectedTaxOptions.countryId !== CountryIDsEnum.AUSTRALIA_ID) {
            return;
        }

        const {type} = selectedTaxOptions?.options?.residenceType;

        this.residentStatus = type === ResidenceTypes.RESIDENT.type;
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
