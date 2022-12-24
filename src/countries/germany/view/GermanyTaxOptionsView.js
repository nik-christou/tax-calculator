import {BaseElement} from '../../../base/BaseElement.js';
import {GermanTaxOptionsViewTemplate} from './GermanyTaxOptionsViewTemplate.js';
import {TaxOptions} from "../../../model/TaxOptions.js";
import {GermanTaxOptions} from '../model/GermanTaxOptions.js';
import CountryIDsEnum from '../../../datastore/CountryIDsEnum.js';
import {userSelectionsStore} from "../../../datastore/UserSelectionsStore.js";
import {MaritalStatuses} from "../../../model/MaritalStatuses.js";
import {ParentalStatuses} from "../../../model/ParentalStatuses.js";
import {BlueprintCss} from '../../../base/BlueprintCss.js';
import {ListGroupCssTaggedTemplate} from '@twbs-css/template-literals';
import {FormsCssTaggedTemplate} from '@twbs-css/template-literals';
import {ButtonsCssTaggedTemplate} from '@twbs-css/template-literals';
import {ButtonGroupCssTaggedTemplate} from '@twbs-css/template-literals';
import {CommonTaxOptionsViewCss} from '../../CommonTaxOptionViewCss.js';
import {GermanyTaxOptionsViewCss} from './GermanyTaxOptionsViewCss.js';

export class GermanTaxOptionsView extends BaseElement {

    static properties = {
        married: Boolean,
        withChildren: Boolean
    };

    static styles = [
        BaseElement.styles,
        BlueprintCss,
        ListGroupCssTaggedTemplate,
        FormsCssTaggedTemplate,
        ButtonsCssTaggedTemplate,
        ButtonGroupCssTaggedTemplate,
        CommonTaxOptionsViewCss,
        GermanyTaxOptionsViewCss
    ];

    render() {
        return GermanTaxOptionsViewTemplate(this.married, this.withChildren);
    }

    constructor() {
        super();
        this.#loadUserSelectionFromDatastore();
    }

    firstUpdated(_changedProperties) {
        this.#addMaritalStatusEventListeners();
        this.#addParentalStatusEventListeners();
    }

    #loadUserSelectionFromDatastore() {

        const selectedTaxOptions = userSelectionsStore.retrieveSelectedTaxOptions();
        if (!selectedTaxOptions || selectedTaxOptions.countryId !== CountryIDsEnum.GERMANY_ID) {
            return;
        }

        const {maritalStatus, parentalStatus} = selectedTaxOptions.options;

        this.married = maritalStatus.type === MaritalStatuses.MARRIED.type;
        this.withChildren = parentalStatus.type === ParentalStatuses.WITH_CHILDREN.type;
    }

    #addMaritalStatusEventListeners() {

        const singleStatusInputElement = this.shadowRoot.querySelector('input#single-status');
        const marriedStatusInputElement = this.shadowRoot.querySelector('input#married-status');

        singleStatusInputElement.addEventListener('input', event => this.#handleSingleMaritalStatusEvent(event));
        marriedStatusInputElement.addEventListener('input', event => this.#handleMarriedMaritalStatusEvent(event));
    }

    #addParentalStatusEventListeners() {

        const noChildrenStatusInputElement = this.shadowRoot.querySelector('input#no-children');
        const withChildrenStatusInputElement = this.shadowRoot.querySelector('input#with-children');

        noChildrenStatusInputElement.addEventListener('input', event => this.#handleNoChildrenParentalStatusEvent(event));
        withChildrenStatusInputElement.addEventListener('input', event => this.#handleWithChildrenParentalStatusEvent(event));
    }

    /**
     * @param {Event} event
     */
    #handleSingleMaritalStatusEvent(event) {
        event.preventDefault();
        this.married = false;
        this.#saveTaxOptionsToDatastore();
    }

    /**
     * @param {Event} event
     */
    #handleMarriedMaritalStatusEvent(event) {
        event.preventDefault();
        this.married = true;
        this.#saveTaxOptionsToDatastore();
    }

    /**
     * @param {Event} event
     */
    #handleNoChildrenParentalStatusEvent(event) {
        event.preventDefault();
        this.withChildren = false;
        this.#saveTaxOptionsToDatastore();
    }

    /**
     * @param {Event} event
     */
    #handleWithChildrenParentalStatusEvent(event) {
        event.preventDefault();
        this.withChildren = true;
        this.#saveTaxOptionsToDatastore();
    }

    #saveTaxOptionsToDatastore() {

        let maritalStatus;
        let parentalStatus;

        if (this.married) {
            maritalStatus = MaritalStatuses.MARRIED
        } else {
            maritalStatus = MaritalStatuses.SINGLE;
        }

        if (this.withChildren) {
            parentalStatus = ParentalStatuses.WITH_CHILDREN;
        } else {
            parentalStatus = ParentalStatuses.NO_CHILDREN;
        }

        const germanTaxOptions = new GermanTaxOptions(maritalStatus, parentalStatus);
        const taxOptions = new TaxOptions(CountryIDsEnum.GERMANY_ID, germanTaxOptions);

        userSelectionsStore.updateTaxOptions(taxOptions);
    }
}

window.customElements.define('german-tax-options-view', GermanTaxOptionsView);
