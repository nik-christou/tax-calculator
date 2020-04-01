import { LitElement, html } from "lit-element";
import { BaseElementMixin } from "../../base/BaseElementMixin.js";
import { TaxResults } from "../../model/TaxResults.js";
import { TaxProcessorDispatcher } from "./TaxProcessorDispatcher.js";
import { Country } from "../../model/Country.js";
import { SalaryType } from "../../model/SalaryType.js";
import { SalaryTypes } from "../../model/SalaryTypes.js";
import { SalaryDetails } from "../../model/SalaryDetails.js";
import { ListGroupCss } from "../../base/ListGroupCss.js";
import { HomeViewCss } from "./HomeViewCss.js";
import { InputGroupCss } from "../../base/InputGroupCss.js";
import { SwitchCss } from "../../base/SwitchCss.js";
import { BlueprintCss } from "../../base/BlueprintCss.js";

import "./ResultsContainer.js";
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
                                        ${this._getSelectedCountryInfo()}
                                        <img class="right-chevron" src="/web_assets/img/right-chevron.png" alt="" />
                                    </div>
                                </div>
                            </a>
                            <div class="list-group-item">
                                <div class="salary-type-container">
                                    <h5>Period:</h5>
                                    <ul class="list-group list-group-horizontal salary-type-values">
                                        <a id="annual-salary-type" class="list-group-item list-group-item-action">Annual</a>
                                        <a id="monthly-salary-type" class="list-group-item list-group-item-action">Monthly</a>
                                    </ul>
                                </div>
                            </div>
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
                        </div>
                        <br />
                        <results-container></results-container>
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
        this._updateSelectedSalaryTypeLinks();
    }

    /**
     * @param {Map} changedProperties
     */
    updated(changedProperties) {

        if(changedProperties.has("selectedCountry")) {
            if(this.selectedCountry) {
                this._updateCurrencyFormatter();
                this._calculateResults();
            }
        }

        if(changedProperties.has("selectedPeriod")) {
            this._updateSelectedSalaryTypeLinks();
        }
    }

    _getSelectedCountryInfo() {

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
        grossAmountElement.addEventListener("input", event => this._handleGrossAmountChange(event, grossAmountElement));
    }

    _addIncludesThirteenInputListener() {
        const includesThirteenElement = this.shadowRoot.querySelector("input#includesThirteen");
        includesThirteenElement.addEventListener("input", event => this._handleThirteenChange(event, includesThirteenElement));
    }

    /**
     * @param {Event} event
     * @param {HTMLInputElement} includesThirteenElement
     */
    _handleThirteenChange(event, includesThirteenElement) {
        this.includesThirteen = includesThirteenElement.checked
        this._sendIncludesThirteenChangeEvent(this.includesThirteen);
        this._calculateResults();
    }

    /**
     * @param {Event} event
     * @param {HTMLInputElement} grossAmountElement
     */
    _handleGrossAmountChange(event, grossAmountElement) {
        this.grossAmount = Number(grossAmountElement.value);
        this._sendGrossAmountChangeEvent(this.grossAmount);
        this._calculateResults();
    }

    /**
     * @param {Event} event
     * @param {SalaryType} salaryType
     */
    _handleSelectedSalaryType(event, salaryType) {

        event.preventDefault();

        if(this.selectedPeriod === salaryType) {
            return;
        }

        this.selectedPeriod = salaryType;
        this._updateSelectedSalaryTypeLinks();
        this._sendSalaryTypeChangeEvent(salaryType);
        this._calculateResults();
    }

    /**
     * @param {Boolean} includesThirteen
     */
    _sendIncludesThirteenChangeEvent(includesThirteen) {

        const includesThirteenChangeEvent = new CustomEvent("includes-thirteen-change", {
            bubbles: true,
            composed: true,
            detail: {
                includesThirteen: includesThirteen
            }
        });

        this.dispatchEvent(includesThirteenChangeEvent);
    }

    /**
     * @param {Number} grossAmount
     */
    _sendGrossAmountChangeEvent(grossAmount) {

        const grossAmountChangeEvent = new CustomEvent("gross-amount-change", {
            bubbles: true,
            composed: true,
            detail: {
                grossAmount: grossAmount
            }
        });

        this.dispatchEvent(grossAmountChangeEvent);
    }

    /**
     * @param {SalaryType} salaryType
     */
    _sendSalaryTypeChangeEvent(salaryType) {

        const salaryTypeChangeEvent = new CustomEvent("salary-type-change", {
            bubbles: true,
            composed: true,
            detail: {
                selectedPeriod: salaryType
            }
        });

        this.dispatchEvent(salaryTypeChangeEvent);
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

    _updateCurrencyFormatter() {
        const formatter = new Intl.NumberFormat(this.selectedCountry.locale, {
            style: "currency",
            currency: this.selectedCountry.currency,
            minimumFractionDigits: 2
        });

        const resultContainer = this.shadowRoot.querySelector("results-container");
        resultContainer.formatter = formatter;
    }

    _calculateResults() {

        if (this.selectedCountry && this.selectedPeriod && this.grossAmount) {

            const salaryDetails = new SalaryDetails(this.grossAmount, this.selectedPeriod, this.includesThirteen);

            TaxProcessorDispatcher.dispatch(this.selectedCountry.id, salaryDetails)
                .then(taxResults => this._populateResults(taxResults));
        }
    }

    /**
     * @param {TaxResults} taxResults
     */
    _populateResults(taxResults) {

        if(taxResults) {
            const resultContainer = this.shadowRoot.querySelector("results-container");
            resultContainer.taxResults = taxResults;
        }
    }
}

window.customElements.define("home-view", HomeView);
