import { LitElement, TemplateResult } from "lit-element";
import { BaseElementMixin } from "../../base/BaseElementMixin.js";
import { TaxOptionsViewTemplate } from "./TaxOptionsViewTemplate.js";
import { TaxOptionsViewCss } from "./TaxOptionsViewCss.js";
import { SwitchCss } from "../../base/SwitchCss.js";
import { ListGroupCss } from "../../base/ListGroupCss.js";
import { BlueprintCss } from "../../base/BlueprintCss.js";
import { UserSelectionStore } from "../../datastore/UserSelectionStore.js";
import { TaxOptionsViewTemplateLoader } from "./TaxOptionsViewTemplateLoader.js";

export class CountryTaxOptionsView extends BaseElementMixin(LitElement) {
    static get properties() {
        return {
            viewTemplate: TemplateResult,
        };
    }

    static get styles() {
        return [...super.styles, BlueprintCss, ListGroupCss, SwitchCss, TaxOptionsViewCss];
    }

    render() {
        return TaxOptionsViewTemplate(this.viewTemplate);
    }

    constructor() {
        super();
        this.viewTemplate = null;
    }

    firstUpdated() {
        this._addNavBackListener();
        this._loadUserSelectionFromDatastore();
    }

    _addNavBackListener() {
        const navBackLink = this.shadowRoot.querySelector("a.nav-back");
        navBackLink.addEventListener("click", (event) => this._handleNavBackEvent(event));
    }

    _loadUserSelectionFromDatastore() {
        UserSelectionStore.retrieveCountry().then((country) => {
            if (!country) return;
            this.selectedCountry = country;
            this.viewTemplate = TaxOptionsViewTemplateLoader.getTaxOptionsViewTemplateTag(this.selectedCountry);
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
        if (window.history.length === 1 || window.history.length === 2) {
            history.pushState(null, "Home", "/");
            history.go(1);
            dispatchEvent(new PopStateEvent("popstate"));
        } else {
            history.back();
        }
    }
}

// @ts-ignore
window.customElements.define("tax-options-view", CountryTaxOptionsView);
