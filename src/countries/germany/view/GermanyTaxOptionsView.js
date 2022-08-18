import {LitElement} from 'lit';
import {BaseElementMixin} from '../../../base/BaseElementMixin.js';
import {GermanTaxOptionsViewTemplate} from './GermanyTaxOptionsViewTemplate.js';
import {ToggleCss} from '../../../base/ToggleCss.js';
import {ListGroupCss} from '../../../base/ListGroupCss.js';
import {BlueprintCss} from '../../../base/BlueprintCss.js';
import {GermanTaxOptions} from '../model/GermanTaxOptions.js';
import CountryIDsEnum from '../../../datastore/CountryIDsEnum.js';
import {CommonTaxOptionsViewCss} from '../../CommonTaxOptionViewCss.js';
import {GermanyTaxOptionsViewCss} from './GermanyTaxOptionsViewCss.js';
import {userSelectionsStore} from "../../../datastore/UserSelectionsStore.js";
import {MaritalStatuses} from "../../../model/MaritalStatuses.js";
import {ParentalStatuses} from "../../../model/ParentalStatuses.js";
import {TaxOptions} from "../../../model/TaxOptions.js";

export class GermanTaxOptionsView extends BaseElementMixin(LitElement) {

    static get properties() {
        return {
            married: Boolean,
            withChildren: Boolean
        };
    }

    static get styles() {
        return [
            ...super.styles, 
            BlueprintCss, 
            ListGroupCss, 
            ToggleCss, 
            CommonTaxOptionsViewCss,
            GermanyTaxOptionsViewCss
        ];
    }

    render() {
        return GermanTaxOptionsViewTemplate;
    }

    constructor() {
        super();
        this.#loadUserSelectionFromDatastore();
    }

    firstUpdated() {
        this.#addMaritalStatusListeners();
        this.#addParentalStatusListeners();
        this.#updateSelectedMaritalTypeLinks();
        this.#updateSelectedParentalTypeLinks();
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

    #addMaritalStatusListeners() {
        
        const singleStatusElement = this.shadowRoot.querySelector('a#single-status');
        const marriedStatusElement = this.shadowRoot.querySelector('a#married-status');

        singleStatusElement.addEventListener('click', (event) => {
            this.#handleSelectedMaritalStatus(event, MaritalStatuses.SINGLE);
        });

        marriedStatusElement.addEventListener('click', (event) => {
            this.#handleSelectedMaritalStatus(event, MaritalStatuses.MARRIED);
        });
    }

    #addParentalStatusListeners() {
        
        const childrenStatusElement = this.shadowRoot.querySelector('a#children');
        const noChildrenStatusElement = this.shadowRoot.querySelector('a#no-children');

        childrenStatusElement.addEventListener('click', (event) => {
            this.#handleSelectedParentalStatus(event, ParentalStatuses.WITH_CHILDREN);
        });

        noChildrenStatusElement.addEventListener('click', (event) => {
            this.#handleSelectedParentalStatus(event, ParentalStatuses.NO_CHILDREN);
        });
    }

    /**
     * @param {Event} event
     * @param {ParentalStatus} parentalStatus
     */
    #handleSelectedParentalStatus(event, parentalStatus) {
        event.preventDefault();
        this.withChildren = parentalStatus.type === ParentalStatuses.WITH_CHILDREN.type;
        this.#saveTaxOptionsToDatastore();
        this.#updateSelectedParentalTypeLinks();
    }

    /**
     * @param {Event} event
     * @param {MaritalStatus} maritalStatus
     */
    #handleSelectedMaritalStatus(event, maritalStatus) {
        event.preventDefault();
        this.married = maritalStatus.type !== MaritalStatuses.SINGLE.type;
        this.#saveTaxOptionsToDatastore();
        this.#updateSelectedMaritalTypeLinks();
    }

    #saveTaxOptionsToDatastore() {

        let maritalStatus;
        let parentalStatus;

        if(this.married) {
            maritalStatus = MaritalStatuses.MARRIED
        } else {
            maritalStatus = MaritalStatuses.SINGLE;
        }

        if(this.withChildren) {
            parentalStatus = ParentalStatuses.WITH_CHILDREN;
        } else {
            parentalStatus = ParentalStatuses.NO_CHILDREN;
        }

        const germanTaxOptions = new GermanTaxOptions(maritalStatus, parentalStatus);
        const taxOptions = new TaxOptions(CountryIDsEnum.GERMANY_ID, germanTaxOptions);

        userSelectionsStore.updateTaxOptions(taxOptions);
    }

    #updateSelectedParentalTypeLinks() {

        const childrenStatusElement = this.shadowRoot.querySelector('a#children');
        const noChildrenStatusElement = this.shadowRoot.querySelector('a#no-children');

        if (this.withChildren) {
            this.#removeActiveClass(noChildrenStatusElement);
            this.#addActiveClass(childrenStatusElement);
        } else {
            this.#removeActiveClass(childrenStatusElement);
            this.#addActiveClass(noChildrenStatusElement);
        }
    }

    #updateSelectedMaritalTypeLinks() {

        const singleStatusElement = this.shadowRoot.querySelector('a#single-status');
        const marriedStatusElement = this.shadowRoot.querySelector('a#married-status');

        if (this.married) {
            this.#removeActiveClass(singleStatusElement);
            this.#addActiveClass(marriedStatusElement);
        } else {
            this.#removeActiveClass(marriedStatusElement);
            this.#addActiveClass(singleStatusElement);
        }
    }

    /**
     * @param {Element} element
     */
    #removeActiveClass(element) {
        element.classList.remove('active');
    }

    /**
     * @param {Element} element
     */
    #addActiveClass(element) {
        element.classList.add('active');
    }
}

window.customElements.define('german-tax-options-view', GermanTaxOptionsView);
