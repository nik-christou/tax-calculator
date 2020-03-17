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

import "../../country/view/CountrySelect.js";
import "../../salary/view/SalaryInput.js";
import "../../results/view/ResultsContainer.js";

export class HomeView extends BaseElementMixin(LitElement) {

    static get properties() {
        return {
            selectedCountry: Country,
            selectedPeriod: SalaryType
        };
    }

    static get styles() {
        return [...super.styles, ListGroupCss, InputGroupCss, HomeViewCss];
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
                        <div class="input-group salary-input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="basic-addon1">@</span>
                            </div>
                            <input type="number" class="form-control" placeholder="" />
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
        this.salaryType = SalaryTypes.ANNUAL;
    }

    firstUpdated() {
        this.addEventListener("salary-details-change", event => this._handleSalaryDetailsChange(event));

        this._addSalaryTypeClickListeners();
        this._updateSelectedSalaryTypeLinks(this.salaryType);
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

    /**
     * @param {Event} event
     * @param {SalaryType} salaryType
     */
    _handleSelectedSalaryType(event, salaryType) {

        event.preventDefault();

        if(this.selectedPeriod === salaryType) {
            return;
        }

        this._updateSelectedSalaryTypeLinks(salaryType);

        this.selectedPeriod = salaryType;
    }

    /**
     * @param {SalaryType} salaryType
     */
    _updateSelectedSalaryTypeLinks(salaryType) {

        const annualSalaryTypeLink = this.shadowRoot.querySelector("a#annual-salary-type");
        const monthlySalaryTypeLink = this.shadowRoot.querySelector("a#monthly-salary-type");

        if(salaryType === SalaryTypes.ANNUAL) {
            this._removeActiveClass(monthlySalaryTypeLink);
            this._addActiveClass(annualSalaryTypeLink);
        }

        if(salaryType === SalaryTypes.MONTHLY) {
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

    /**
     * @param {CustomEvent} event
     */
    _handleSalaryDetailsChange(event) {
        this.salaryDetails = event.detail;
        this._calculateResults();
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
