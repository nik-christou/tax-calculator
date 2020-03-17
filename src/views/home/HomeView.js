import { LitElement, html } from "lit-element";
import { BaseElementMixin } from "../../base/BaseElementMixin.js";
import { TaxResults } from "../../results/model/TaxResults.js";
import { TaxProcessorDispatcher } from "./TaxProcessorDispatcher.js";
import { Country } from "../../country/model/Country.js";
import { SalaryType } from "../../salary/model/SalaryType.js";
import { SalaryTypes } from "../../salary/model/SalaryTypes.js";
import { ListGroupCss } from "../../base/ListGroupCss.js";
import { HomeViewCss } from "./HomeViewCss.js";
import { InputGroupCss } from "../../base/InputGroupCss.js";
import { SwitchCss } from "../../base/SwitchCss.js";

import "../../country/view/CountrySelect.js";
import "../../salary/view/SalaryInput.js";
import "../../results/view/ResultsContainer.js";

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
        return [...super.styles, ListGroupCss, InputGroupCss, SwitchCss, HomeViewCss];
    }

    render() {
        return html`

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
                                <input type="checkbox" checked  id="includesThirteen" class="switch" name="includesThirteen">
                                <label for="includesThirteen">Includes 13th salary</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <br />

            <salary-input></salary-input>
            <results-container></results-container>
        `;
    }

    constructor() {
        super();
        this.selectedCountry = null;
        this.selectedPeriod = SalaryTypes.ANNUAL;
        this.grossAmount = 0;
    }

    firstUpdated() {
        this._addSalaryTypeClickListeners();
        this._addGrossAmountInputListener();
        this._updateSelectedSalaryTypeLinks();
    }

    /**
     * @param {Map} changedProperties
     */
    updated(changedProperties) {

        if(changedProperties.has("selectedCountry")) {
            if(this.selectedCountry) {
                this._updateCurrencyFormatter();
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

    /**
     * @param {Event} event
     * @param {HTMLInputElement} grossAmountElement
     */
    _handleGrossAmountChange(event, grossAmountElement) {
        this._sendGrossAmountChangeEvent(Number(grossAmountElement.value));
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

    // /**
    //  * @param {CustomEvent} event
    //  */
    // _handleSalaryDetailsChange(event) {
    //     this.salaryDetails = event.detail;
    //     this._calculateResults();
    // }

    _updateCurrencyFormatter() {
        const formatter = new Intl.NumberFormat(this.selectedCountry.locale, {
            style: "currency",
            currency: this.selectedCountry.currency,
            minimumFractionDigits: 2
        });

        const resultContainer = this.shadowRoot.querySelector("results-container");
        resultContainer.formatter = formatter;
    }

    /**
     * Call the dispatcher to use the correct json loader
     * and tax calculator that matches the country to produce
     * tax results
     */
    _calculateResults() {

        if (this.selectedCountry && this.salaryDetails) {

            TaxProcessorDispatcher.dispatch(this.selectedCountry.id, this.salaryDetails)
                .then(taxResults => this._populateResults(taxResults));
        }
    }

    /**
     * @param {TaxResults} taxResults
     */
    _populateResults(taxResults) {

        const resultContainer = this.shadowRoot.querySelector("results-container");
        resultContainer.taxResults = taxResults;
    }
}

window.customElements.define("home-view", HomeView);
