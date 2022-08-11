import { LitElement } from 'lit';
import { BaseElementMixin } from '../../../base/BaseElementMixin.js';
import { CyprusTaxOptionsViewTemplate } from './CyprusTaxOptionsViewTemplate.js';
import { ToggleCss } from '../../../base/ToggleCss.js';
import { ListGroupCss } from '../../../base/ListGroupCss.js';
import { BlueprintCss } from '../../../base/BlueprintCss.js';
import { CyprusTaxOptions } from '../model/CyprusTaxOptions.js';
import { userSelectionsStore } from '../../../datastore/UserSelectionsStore.js';
import CountryIDsEnum from '../../../datastore/CountryIDsEnum.js';
import { CommonTaxOptionsViewCss } from '../../CommonTaxOptionViewCss.js';
import { EmploymentTypes } from "../../../model/EmploymentTypes";
import {TaxOptions} from "../../../model/TaxOptions";

export class CyprusTaxOptionsView extends BaseElementMixin(LitElement) {

    static get properties() {
        return {
            employmentStatus: {type: Boolean, reflect: true},
            cyprusTaxOptions: CyprusTaxOptions
        };
    }

    static get styles() {
        return [...super.styles, BlueprintCss, ListGroupCss, ToggleCss, CommonTaxOptionsViewCss];
    }

    render() {
        return CyprusTaxOptionsViewTemplate(this.employmentStatus);
    }

    constructor() {
        super();
        this._loadUserSelectionFromDatastore();
    }

    firstUpdated() {
        this.#addEmploymentStatusListener();
    }

    _loadUserSelectionFromDatastore() {

        const selectedTaxOptions = userSelectionsStore.retrieveSelectedTaxOptions();

        if (!selectedTaxOptions || selectedTaxOptions.countryId !== CountryIDsEnum.CYPRUS_ID) {
            return;
        }

        const {type} = selectedTaxOptions?.options?.employmentType;

        if(EmploymentTypes.SELF_EMPLOYED.type === type) {
            this.employmentStatus = true;
        } else {
            this.employmentStatus = false;
        }
    }

    #addEmploymentStatusListener() {
        const employmentStatusElement = this.shadowRoot.querySelector('input#employmentTypeStatus');
        employmentStatusElement.addEventListener('input', (event) => {
            this.#handleEmploymentStatusChange(event, employmentStatusElement);
        });
    }

    /**
     * @param {Event} event
     * @param {HTMLInputElement} employmentStatusElement
     */
    #handleEmploymentStatusChange(event, employmentStatusElement) {

        const employmentType = this.#retrieveEmploymentType(employmentStatusElement.checked);
        const cyprusTaxOptions = new CyprusTaxOptions(employmentType);
        const taxOptions = new TaxOptions(CountryIDsEnum.CYPRUS_ID, cyprusTaxOptions);

        userSelectionsStore.updateTaxOptions(taxOptions);
    }

    #retrieveEmploymentType(checkedStatus) {
        if(checkedStatus) {
            return EmploymentTypes.SELF_EMPLOYED;
        }
        return EmploymentTypes.EMPLOYED;
    }
}

window.customElements.define('cyprus-tax-options-view', CyprusTaxOptionsView);
