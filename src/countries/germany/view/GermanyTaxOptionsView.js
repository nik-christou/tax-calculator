import { LitElement } from 'lit';
import { BaseElementMixin } from '../../../base/BaseElementMixin.js';
import { GermanTaxOptionsViewTemplate } from './GermanyTaxOptionsViewTemplate.js';
import { ToggleCss } from '../../../base/ToggleCss.js';
import { ListGroupCss } from '../../../base/ListGroupCss.js';
import { BlueprintCss } from '../../../base/BlueprintCss.js';
import { GermanTaxOptions } from '../model/GermanTaxOptions.js';
import { UserSelectionStore } from '../../../datastore/UserSelectionStore.js';
import CountryIDsEnum from '../../CountryIDsEnum.js';
import { CommonTaxOptionsViewCss } from '../../CommonTaxOptionViewCss.js';
import { GermanyTaxOptionsViewCss } from './GermanyTaxOptionsViewCss.js';

const MaritalTypes = {
    SINGLE: 1,
    MARRIED: 2
};

const ParentalTypes = {
    CHILDREN: 1,
    NO_CHILDREN: 2
};

export class GermanTaxOptionsView extends BaseElementMixin(LitElement) {

    static get properties() {
        return {
            germanTaxOptions: GermanTaxOptions
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
        return GermanTaxOptionsViewTemplate(this.germanTaxOptions);
    }

    constructor() {
        super();
        this.germanTaxOptions = new GermanTaxOptions();
    }

    firstUpdated() {
        this._loadUserSelectionFromDatastore();
        this._addMaritalStatusListeners();
        this._addParentalStatusListeners();

        // update active links using either default country options
        // or the country options from the store
        this._updateSelectedMaritalTypeLinks();
        this._updateSelectedParentalTypeLinks();
    }

    async _loadUserSelectionFromDatastore() {

        const countryOptions = await UserSelectionStore.retrieveCountryOptionByCountryId(CountryIDsEnum.GERMANY_ID);

        if (!countryOptions || countryOptions.countryId !== CountryIDsEnum.GERMANY_ID) return;
        this.germanTaxOptions = GermanTaxOptions.createFromObject(countryOptions);

        // update active links right after the country options is retrieved from store
        this._updateSelectedMaritalTypeLinks();
        this._updateSelectedParentalTypeLinks();
    }

    _addMaritalStatusListeners() {
        
        const singleStatusElement = this.shadowRoot.querySelector('a#single-status');
        const marriedStatusElement = this.shadowRoot.querySelector('a#married-status');

        singleStatusElement.addEventListener('click', (event) => {
            this._handleSelectedMaritalStatus(event, MaritalTypes.SINGLE);
        });

        marriedStatusElement.addEventListener('click', (event) => {
            this._handleSelectedMaritalStatus(event, MaritalTypes.MARRIED);
        });
    }

    _addParentalStatusListeners() {
        
        const childrenStatusElement = this.shadowRoot.querySelector('a#children');
        const noChildrenStatusElement = this.shadowRoot.querySelector('a#no-children');

        childrenStatusElement.addEventListener('click', (event) => {
            this._handleSelectedParentalStatus(event, ParentalTypes.CHILDREN);
        });

        noChildrenStatusElement.addEventListener('click', (event) => {
            this._handleSelectedParentalStatus(event, ParentalTypes.NO_CHILDREN);
        });
    }

    /**
     * @param {Event} event
     * @param {HTMLInputElement} withChildElement
     */
    _handleWithChildChange(event, withChildElement) {

        this.germanTaxOptions.withChild = withChildElement.checked;
        UserSelectionStore.updateCountryOptions(this.germanTaxOptions);
    }

    /**
     * @param {Event} event
     * @param {Number} parentalType
     */
    _handleSelectedParentalStatus(event, parentalType) {

        event.preventDefault();

        if (parentalType === ParentalTypes.CHILDREN) {
            this.germanTaxOptions.withChild = true;
        } else {
            this.germanTaxOptions.withChild = false;
        }

        UserSelectionStore.updateCountryOptions(this.germanTaxOptions);

        this._updateSelectedParentalTypeLinks();
    }

    /**
     * @param {Event} event
     * @param {Number} maritalType
     */
    _handleSelectedMaritalStatus(event, maritalType) {
        
        event.preventDefault();

        if (maritalType === MaritalTypes.SINGLE) {
            this.germanTaxOptions.single = true;
        } else {
            this.germanTaxOptions.single = false;
        }

        UserSelectionStore.updateCountryOptions(this.germanTaxOptions);

        this._updateSelectedMaritalTypeLinks();
    }

    _updateSelectedParentalTypeLinks() {

        const childrenStatusElement = this.shadowRoot.querySelector('a#children');
        const noChildrenStatusElement = this.shadowRoot.querySelector('a#no-children');

        if (this.germanTaxOptions.withChild) {
            this._removeActiveClass(noChildrenStatusElement);
            this._addActiveClass(childrenStatusElement);
        } else {
            this._removeActiveClass(childrenStatusElement);
            this._addActiveClass(noChildrenStatusElement);
        }
    }

    _updateSelectedMaritalTypeLinks() {

        const singleStatusElement = this.shadowRoot.querySelector('a#single-status');
        const marriedStatusElement = this.shadowRoot.querySelector('a#married-status');

        if (this.germanTaxOptions.single) {
            this._removeActiveClass(marriedStatusElement);
            this._addActiveClass(singleStatusElement);
        } else {
            this._removeActiveClass(singleStatusElement);
            this._addActiveClass(marriedStatusElement);
        }
    }

    /**
     * @param {Element} element
     */
    _removeActiveClass(element) {
        element.classList.remove('active');
    }

    /**
     * @param {Element} element
     */
    _addActiveClass(element) {
        element.classList.add('active');
    }
}

// @ts-ignore
window.customElements.define('german-tax-options-view', GermanTaxOptionsView);
