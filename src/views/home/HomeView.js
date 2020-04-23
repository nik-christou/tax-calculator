import { LitElement, html } from "lit-element";
import { BaseElementMixin } from "../../base/BaseElementMixin.js";
import { Country } from "../../model/Country.js";
import { SalaryType } from "../../model/SalaryType.js";
import { SalaryTypes } from "../../model/SalaryTypes.js";
import { ListGroupCss } from "../../base/ListGroupCss.js";
import { HomeViewCss } from "./HomeViewCss.js";
import { InputGroupCss } from "../../base/InputGroupCss.js";
import { SwitchCss } from "../../base/SwitchCss.js";
import { BlueprintCss } from "../../base/BlueprintCss.js";
import { ButtonCss } from "../../base/ButtonCss.js";
import UserSelectionStore from "../../datastore/UserSelectionStore.js";

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
        return html`
            <div bp="grid">
                <main bp="12">
                    <nav-bar bp="12">
                        <div slot="center" class="title">
                            <img src="/web_assets/img/logo.svg" alt="" class="logo" />
                            Salary Tax Calculator
                        </div>
                    </nav-bar>
                    <div class="main-container">
                        <div class="list-group">
                            <a href="/countries" class="list-group-item list-group-item-action">
                                <div class="country-container">
                                    <h5>Country:</h5>
                                    <div class="selected-country-container">
                                        ${this._getSelectedCountryInfoTemplate()}
                                        <img class="right-chevron" src="/web_assets/img/right-chevron.png" alt="" />
                                    </div>
                                </div>
                            </a>
                        </div>
                        <br />
                        <div class="list-group">
                            <div class="list-group-item">
                                <div class="salary-input-container">
                                    <h5>Amount:</h5>
                                    <div class="salary-input-group">
                                        <input type="number" id="grossAmountInput" .value=${this.grossAmount} min="0" class="form-control salary-input" placeholder="gross amount" />
                                        <div class="thirteen-input-group">
                                            <input type="checkbox" ?checked="${this.includesThirteen}" id="includesThirteen" class="switch" name="includesThirteen" />
                                            <label for="includesThirteen">Includes 13th salary</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="list-group-item">
                                <div class="salary-type-container">
                                    <h5>Period:</h5>
                                    <ul class="list-group list-group-horizontal salary-type-values">
                                        <a id="annual-salary-type" class="list-group-item list-group-item-action">Annual</a>
                                        <a id="monthly-salary-type" class="list-group-item list-group-item-action">Monthly</a>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <br />
                        <button class="btn btn-primary btn-lg btn-block calculate-btn">Calculate</button>
                    </div>
                </main>
            </div>
        `;
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

    _loadUserSelectionFromDatastore() {

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

    // _getCountryOptionsTemplate() {

    //     // if selected country has options
    //     if(this.selectedCountry && this.selectedCountry.options) {

    //         const templateToLoad = CountryOptionsViewLoader
    //             .getCountryViewTagToLoad(this.selectedCountry.id);

    //         return templateToLoad;
    //     }

    //     return html``;
    // }

    // _getIsResidentTemplate() {

    //     // selected country does not have
    //     // additional options
    //     if(!this.selectedCountry.options) {
    //         return html``;
    //     }

    //     let isResident = undefined;

    //     // if user has fired an event about resident selection at least once
    //     // then use the selection value from that.
    //     if(this.selectedCountryOptions && (this.selectedCountryOptions.resident != undefined)) {
    //         isResident = this.selectedCountryOptions.resident;
    //     } else {
    //         // if the resident option was not selected before
    //         // we failback to pre-selected option from the country
    //         isResident = this.selectedCountry.options.resident;
    //     }

    //     return html`
    //         <div class="list-group-item">
    //             <div class="options-container">
    //                 <div class="options-item">
    //                     <span class="option-description">Resident</span>
    //                     <div class="resident-input-group">
    //                         <input type="checkbox" ?checked="${this.selectedCountry.options.resident}" id="resident" class="switch" name="resident" />
    //                         <label for="resident">Resident</label>
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //     `;
    // }

    _getSelectedCountryInfoTemplate() {

        if(this.selectedCountry) {
            return html`
                <div class="country-info">
                    <img src="/web_assets/data/${this.selectedCountry.flag}" alt="" />
                    <div class="item-info">
                        <h5>${this.selectedCountry.name}</h5>
                        <small class="text-muted">${this.selectedCountry.currency} / ${this.selectedCountry.locale}</small>
                    </div>
                </div>
            `;
        }

        return html`
            <h5>None</h5>
        `;
    }

    _addSalaryTypeClickListeners() {
        const annualSalaryTypeLink = this.shadowRoot.querySelector("a#annual-salary-type");
        const monthlySalaryTypeLink = this.shadowRoot.querySelector("a#monthly-salary-type");

        annualSalaryTypeLink.addEventListener("click", event => this._handleSelectedSalaryType(event, SalaryTypes.ANNUAL));
        monthlySalaryTypeLink.addEventListener("click", event => this._handleSelectedSalaryType(event, SalaryTypes.MONTHLY));
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
