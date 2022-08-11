import { LitElement } from 'lit';
import { BaseElementMixin } from '../../base/BaseElementMixin.js';
import { CountrySelectionViewTemplate } from './CountrySelectionViewTemplate.js';
import { countryStore } from "../../datastore/CountryStore.js";
import { userSelectionsStore } from "../../datastore/UserSelectionsStore.js";
import { ListGroupCss } from '../../base/ListGroupCss.js';
import { CountrySelectionViewCss } from './CountrySelectionViewCss.js';
import { BlueprintCss } from '../../base/BlueprintCss.js';

export class CountrySelectionView extends BaseElementMixin(LitElement) {
    static get properties() {
        return {
            countries: Array,
            selectedId: Number
        };
    }

    static get styles() {
        return [...super.styles,
            BlueprintCss,
            ListGroupCss,
            CountrySelectionViewCss];
    }

    render() {
        return CountrySelectionViewTemplate(
            this.countries, 
            this.selectedId, 
            this.#handleSelectedCountry.bind(this));
    }
    
    constructor() {
        super();
        this.#loadCountries();
        this.#loadSelectedCountry();
    }

    firstUpdated() {
        this.#addNavBackListener();

    }

    #loadSelectedCountry() {
        this.selectedId = userSelectionsStore.retrieveSelectedCountry()?.id;
    }

    #loadCountries() {
        this.countries = countryStore.retrieveCountries().sort((a, b) => {
            return a.name.localeCompare(b.name);
        });
    }

    #addNavBackListener() {
        const navBackLink = this.shadowRoot.querySelector('a.nav-back');
        navBackLink.addEventListener('click', (event) => this.#handleNavBackEvent(event));
    }

    /**
     * @param {Event} event
     */
    #handleNavBackEvent(event) {
        event.preventDefault();
        this.#goToHome();
    }

    /**
     * @param {Event} event
     * @param {Country} country
     */
    #handleSelectedCountry(event, country) {
        event.preventDefault();
        userSelectionsStore.updateSelectedCountry(country);
        this.#goToHome();
    }

    #goToHome() {
        if (window.history.state) {
            window.history.back();
        } else {
            window.history.replaceState(null, 'Home', '/');
            window.history.go(1);
            window.dispatchEvent(new window.PopStateEvent('popstate'));
        }
    }
}

window.customElements.define('country-selection-view', CountrySelectionView);
