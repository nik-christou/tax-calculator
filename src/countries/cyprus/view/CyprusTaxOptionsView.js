import {BaseElement} from '../../../base/BaseElement.js';
import {TaxOptions} from "../../../model/TaxOptions.js";
import {CyprusTaxOptions} from '../model/CyprusTaxOptions.js';
import {CyprusTaxOptionsViewTemplate} from './CyprusTaxOptionsViewTemplate.js';
import {userSelectionsStore} from '../../../datastore/UserSelectionsStore.js';
import CountryIDsEnum from '../../../datastore/CountryIDsEnum.js';
import {EmploymentTypes} from "../../../model/EmploymentTypes.js";
import {BlueprintCss} from '../../../base/BlueprintCss.js';
import {ListGroupCssTaggedTemplate} from '@twbs-css/template-literals';
import {FormsCssTaggedTemplate} from '@twbs-css/template-literals';
import {CommonTaxOptionsViewCss} from '../../CommonTaxOptionViewCss.js';

export class CyprusTaxOptionsView extends BaseElement {

    static properties = {
        employmentStatus: Boolean
    };

    static styles = [
        BaseElement.styles,
        BlueprintCss,
        ListGroupCssTaggedTemplate,
        FormsCssTaggedTemplate,
        CommonTaxOptionsViewCss
    ];

    render() {
        return CyprusTaxOptionsViewTemplate(this.employmentStatus);
    }

    constructor() {
        super();
        this._loadUserSelectionFromDatastore();
    }

    firstUpdated(_changedProperties) {
        this.#addEmploymentStatusListener();
    }

    _loadUserSelectionFromDatastore() {

        const selectedTaxOptions = userSelectionsStore.retrieveSelectedTaxOptions();

        if (!selectedTaxOptions || selectedTaxOptions.countryId !== CountryIDsEnum.CYPRUS_ID) {
            return;
        }

        const {type} = selectedTaxOptions?.options?.employmentType;

        this.employmentStatus = type === EmploymentTypes.SELF_EMPLOYED.type;
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
