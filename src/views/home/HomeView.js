import { LitElement, html } from "lit-element";
import { BaseElementMixin } from "../../base/BaseElementMixin.js";
import { HomeViewTemplate } from "./HomeViewTemplate.js";
import { UserSelectionStore } from "../../datastore/UserSelectionStore.js";
import { HomeViewCss } from "./HomeViewCss.js";
import { Country } from "../../model/Country.js";
import { SalaryType } from "../../model/SalaryType.js";
import { SalaryTypes } from "../../model/SalaryTypes.js";
import { ListGroupCss } from "../../base/ListGroupCss.js";
import { InputGroupCss } from "../../base/InputGroupCss.js";
import { SwitchCss } from "../../base/SwitchCss.js";
import { BlueprintCss } from "../../base/BlueprintCss.js";
import { ButtonCss } from "../../base/ButtonCss.js";

import "../../navbar/Navbar.js";

export class HomeView extends BaseElementMixin(LitElement) {

    static get properties() {
        return {
            selectedCountry: Country,
            selectedPeriod: SalaryType,
            grossAmount: Number,
            includesThirteen: Boolean
        };
    }

    static get styles() {
        return [
            ...super.styles,
            BlueprintCss,
            ListGroupCss,
            InputGroupCss,
            SwitchCss,
            ButtonCss,
            HomeViewCss
        ];
    }

    render() {
        return HomeViewTemplate(
            this.selectedCountry,
            this.includesThirteen,
            this.grossAmount);
    }

    constructor() {
        super();
        this.selectedCountry = null;
        this.selectedPeriod = SalaryTypes.ANNUAL;
        this.includesThirteen = true;
    }

    firstUpdated() {
        this._addSalaryTypeClickListeners();
        this._addGrossAmountInputListener();
        this._addIncludesThirteenInputListener();
        this._addIncludesThirteenInputListener();
        this._addCalculateButtonListener();
        this._updateSelectedSalaryTypeLinks();
        this._loadUserSelectionFromDatastore();
    }

    async _loadUserSelectionFromDatastore() {

        UserSelectionStore.retrieveCountry().then(selectedCountry => {
            if(selectedCountry) this.selectedCountry = selectedCountry;
        });

        UserSelectionStore.retrieveSalaryType().then(selectedPeriod => {
            if(!selectedPeriod) return;
            if(selectedPeriod.id === SalaryTypes.ANNUAL.id) {
                this._updateSelectedSalaryPeriod(SalaryTypes.ANNUAL);
            } else {
                this._updateSelectedSalaryPeriod(SalaryTypes.MONTHLY);
            }
        });

        UserSelectionStore.retrieveGrossAmount().then(grossAmount => {
            this.grossAmount = grossAmount;
        });

        UserSelectionStore.retrieveIncludesThirteenOption().then(includesThirteenOption => {
            this.includesThirteen = includesThirteenOption
        });
    }

    /**
     * @param {SalaryType} salaryPeriod
     */
    _updateSelectedSalaryPeriod(salaryPeriod) {
        if(!salaryPeriod) return;
        this.selectedPeriod = salaryPeriod;
        this._updateSelectedSalaryTypeLinks();
    }

    _addSalaryTypeClickListeners() {
        const annualSalaryTypeLink = this.shadowRoot.querySelector("a#annual-salary-type");
        const monthlySalaryTypeLink = this.shadowRoot.querySelector("a#monthly-salary-type");

        annualSalaryTypeLink.addEventListener("click", event => {
            this._handleSelectedSalaryType(event, SalaryTypes.ANNUAL);
        });

        monthlySalaryTypeLink.addEventListener("click", event => {
            this._handleSelectedSalaryType(event, SalaryTypes.MONTHLY);
        });
    }

    _addGrossAmountInputListener() {
        const grossAmountElement = this.shadowRoot.querySelector("input#grossAmountInput");
        grossAmountElement.addEventListener("input", event => {
            this._handleGrossAmountChange(event, grossAmountElement);
        });
    }

    _addIncludesThirteenInputListener() {
        const includesThirteenElement = this.shadowRoot.querySelector("input#includesThirteen");
        includesThirteenElement.addEventListener("input", event => {
            this._handleThirteenChange(event, includesThirteenElement);
        });
    }

    _addCalculateButtonListener() {
        const calculateButton = this.shadowRoot.querySelector("button.calculate-btn");
        calculateButton.addEventListener("click", event => {
            this._handleCalculateClickEvent(event);
        });
    }

    /**
     * @param {Event} event
     */
    _handleCalculateClickEvent(event) {

        event.preventDefault();

        if (this.selectedCountry && this.selectedPeriod && this.grossAmount) {
            history.pushState(null, "Results", "/results");
            history.go(1);
            dispatchEvent(new PopStateEvent('popstate'));
        }
    }

    /**
     * @param {Event} event
     * @param {HTMLInputElement} includesThirteenElement
     */
    _handleThirteenChange(event, includesThirteenElement) {
        this.includesThirteen = includesThirteenElement.checked;
        UserSelectionStore.updateIncludesThirteenOption(this.includesThirteen);
    }

    /**
     * @param {Event} event
     * @param {HTMLInputElement} grossAmountElement
     */
    _handleGrossAmountChange(event, grossAmountElement) {
        this.grossAmount = Number(grossAmountElement.value);
        UserSelectionStore.updateGrossAmount(this.grossAmount);
    }

    /**
     * @param {Event} event
     * @param {SalaryType} salaryType
     */
    _handleSelectedSalaryType(event, salaryType) {

        event.preventDefault();

        if(this.selectedPeriod === salaryType) return;

        this.selectedPeriod = salaryType;
        this._updateSelectedSalaryTypeLinks();
        UserSelectionStore.updateSalaryType(salaryType);
    }

    _updateSelectedSalaryTypeLinks() {

        const annualSalaryTypeLink = this.shadowRoot.querySelector("a#annual-salary-type");
        const monthlySalaryTypeLink = this.shadowRoot.querySelector("a#monthly-salary-type");

        if(this.selectedPeriod === SalaryTypes.ANNUAL) {
            this._removeActiveClass(monthlySalaryTypeLink);
            this._addActiveClass(annualSalaryTypeLink);
        }

        if(this.selectedPeriod === SalaryTypes.MONTHLY) {
            this._removeActiveClass(annualSalaryTypeLink);
            this._addActiveClass(monthlySalaryTypeLink);
        }
    }

    /**
     * @param {Element} element
     */
    _removeActiveClass(element) {
        element.classList.remove("active");
    }

    /**
     * @param {Element} element
     */
    _addActiveClass(element) {
        element.classList.add("active");
    }
}

window.customElements.define("home-view", HomeView);
