import { LitElement } from "lit-element";
import { BaseElementMixin } from "../../../base/BaseElementMixin.js";
import { AustraliaTaxOptionsViewCss } from "./AustraliaTaxOptionsViewCss.js";
import { AustraliaTaxOptionsViewTemplate } from "./AustraliaTaxOptionsViewTemplate.js";
import { SwitchCss } from "../../../base/SwitchCss.js";
import { ListGroupCss } from "../../../base/ListGroupCss.js";
import { BlueprintCss } from "../../../base/BlueprintCss.js";
import { AustraliaOptions } from "../model/AustraliaTaxOptions.js";
import { UserSelectionStore } from "../../../datastore/UserSelectionStore.js";

const COUNTRY_ID = 2;

export class AustraliaTaxOptionsView extends BaseElementMixin(LitElement) {

    static get properties() {
        return {
            australiaOptions: AustraliaOptions
        };
    }

    static get styles() {
        return [
            ...super.styles,
            BlueprintCss,
            ListGroupCss,
            SwitchCss,
            AustraliaTaxOptionsViewCss
        ];
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

        UserSelectionStore.retrieveCountryOptionByCountryId(COUNTRY_ID).then(countryOptions => {
            
            if(!countryOptions || countryOptions.countryId !== COUNTRY_ID) return;
            this.australiaOptions = AustraliaOptions.createFromObject(countryOptions);
        });
    }

    _addIsResidentListener() {
        const residentElement = this.shadowRoot.querySelector("input#resident");
        residentElement.addEventListener("input", event => {
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
window.customElements.define("australia-tax-options-view", AustraliaTaxOptionsView);
