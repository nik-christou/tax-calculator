import { LitElement } from "lit-element";
import { BaseElementMixin } from "../../../base/BaseElementMixin.js";
import { AustraliaOptionsViewCss } from "./AustraliaOptionsViewCss.js";
import { AustraliaOptionsViewTemplate } from "./AustraliaOptionsViewTemplate.js";
import { SwitchCss } from "../../../base/SwitchCss.js";
import { ListGroupCss } from "../../../base/ListGroupCss.js";
import { BlueprintCss } from "../../../base/BlueprintCss.js";
import { AustraliaOptions } from "../entity/AustraliaOptions.js";
import { UserSelectionStore } from "../../../datastore/UserSelectionStore.js";

const COUNTRY_ID = 2;

export class AustraliaOptionsView extends BaseElementMixin(LitElement) {

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
            AustraliaOptionsViewCss
        ];
    }

    render() {
        return AustraliaOptionsViewTemplate(this.australiaOptions);
    }

    constructor() {
        super();
        this.countryId = 2;
        this.australiaOptions = new AustraliaOptions();
    }

    firstUpdated() {
        this._loadUserSelectionFromDatastore();
        this._addIsResidentListener();
    }

    _loadUserSelectionFromDatastore() {

        UserSelectionStore.retrieveCountryOptions().then(countryOptions => {
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
        console.log(this.australiaOptions);
    }
}

window.customElements.define("australia-options-view", AustraliaOptionsView);
