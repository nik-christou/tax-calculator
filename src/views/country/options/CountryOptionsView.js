import { LitElement } from "lit-element";
import { BaseElementMixin } from "../../../base/BaseElementMixin.js";
import { CountryOptionsViewTemplate } from "./CountryOptionsViewTemplate.js";
import { CountryOptionsViewCss } from "./CountryOptionsViewCss.js";
import { Country } from "../../../model/Country.js";
import { SwitchCss } from "../../../base/SwitchCss.js";
import { ListGroupCss } from "../../../base/ListGroupCss.js";
import { BlueprintCss } from "../../../base/BlueprintCss.js";
import { UserSelectionStore } from "../../../datastore/UserSelectionStore.js";

export class CountryOptionsView extends BaseElementMixin(LitElement) {

    static get properties() {
        return {
            selectedCountry: Country
        };
    }

    static get styles() {
        return [
            ...super.styles,
            BlueprintCss,
            ListGroupCss,
            SwitchCss,
            CountryOptionsViewCss
        ];
    }

    render() {
        return CountryOptionsViewTemplate(this.selectedCountry);
    }

    constructor() {
        super();
        this.selectedCountry = null;
    }

    firstUpdated() {
        this._addNavBackListener();
        this._loadUserSelectionFromDatastore();
    }

    _addNavBackListener() {
        const navBackLink = this.shadowRoot.querySelector("a.nav-back");
        navBackLink.addEventListener("click", event => this._handleNavBackEvent(event));
    }

    _loadUserSelectionFromDatastore() {

        UserSelectionStore.retrieveCountry().then(country => {
            if(!country) return;
            this.selectedCountry = country;
        });
    }

    /**
     * @param {Event} event
     */
    _handleNavBackEvent(event) {

        event.preventDefault();
        this._goToHome();
    }

    _goToHome() {

        if(window.history.length === 1 || window.history.length === 2) {
            history.pushState(null, "Home", "/");
            history.go(1);
            dispatchEvent(new PopStateEvent('popstate'));
        } else {
            history.back();
        }
    }
}

window.customElements.define("country-options-view", CountryOptionsView);
