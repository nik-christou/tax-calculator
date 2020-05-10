import { LitElement } from "lit-element";
import { BaseElementMixin } from "../../base/BaseElementMixin.js";
import { CountrySelectionViewTemplate } from "./CountrySelectionViewTemplate.js";
import { CountryStore } from "../../datastore/CountryStore.js";
import { UserSelectionStore } from "../../datastore/UserSelectionStore.js";
import { Country } from "../../model/Country.js";
import { ListGroupCss } from "../../base/ListGroupCss.js";
import { CountrySelectionViewCss } from "./CountrySelectionViewCss.js";
import { BlueprintCss } from "../../base/BlueprintCss.js";

export class CountrySelectionView extends BaseElementMixin(LitElement) {
    static get properties() {
        return {
            countries: Array,
            selectedId: Number,
        };
    }

    static get styles() {
        return [...super.styles, BlueprintCss, ListGroupCss, CountrySelectionViewCss];
    }

    render() {
        return CountrySelectionViewTemplate(this.countries, this.selectedId, this._handleSelectedCountry.bind(this));
    }

    constructor() {
        super();
        this.selectedId = 0;
        this.countries = new Array();
    }

    firstUpdated() {
        this._addNavBackListener();

        CountryStore.retrieveCountries().then((countries) => {
            this.countries = countries;
        });

        UserSelectionStore.retrieveCountry().then((country) => {
            if (!country) return;
            this.selectedId = country.id;
        });
    }

    _addNavBackListener() {
        const navBackLink = this.shadowRoot.querySelector("a.nav-back");
        navBackLink.addEventListener("click", (event) => this._handleNavBackEvent(event));
    }

    /**
     * @param {Event} event
     */
    _handleNavBackEvent(event) {
        event.preventDefault();
        this._goToHome();
    }

    /**
     * @param {Event} event
     * @param {Country} country
     */
    _handleSelectedCountry(event, country) {
        event.preventDefault();

        UserSelectionStore.updateCountry(country).then((_) => this._goToHome());
    }

    _goToHome() {
        // user navigated directly to Countries view
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
window.customElements.define("country-selection-view", CountrySelectionView);
