import { LitElement, html } from "lit-element";
import { BaseElementMixin } from "../../base/BaseElementMixin.js";
import { BlueprintCss } from "../../base/BlueprintCss.js";
import { ResultsViewCss } from "./ResultsViewCss.js";
import { TableCss } from "../../base/TableCss.js";
import { TaxResults } from "../../model/TaxResults.js";
import { TaxResult } from "../../model/TaxResult.js";
import { SalaryDetails } from "../../model/SalaryDetails.js";
import { TaxProcessorDispatcher } from "./TaxProcessorDispatcher.js";
import UserSelectionStore from "../../datastore/UserSelectionStore.js";
import { Country } from "../../model/Country.js";
import { SalaryTypes } from "../../model/SalaryTypes.js";

export class ResultsView extends BaseElementMixin(LitElement) {

    static get properties() {
        return {
            taxResults: TaxResults,
            formatter: Intl.NumberFormat
        };
    }

    static get styles() {
        return [
            ...super.styles,
            TableCss,
            BlueprintCss,
            ResultsViewCss
        ];
    }

    render() {
        return html`
            <div bp="grid">
                <main bp="12">
                    <nav-bar bp="12">
                        <a href="#" slot="left" class="nav-back">
                            <svg viewBox="0 0 32 32" class="icon icon-chevron-left" viewBox="0 0 32 32" aria-hidden="true">
                                <path d="M14.19 16.005l7.869 7.868-2.129 2.129-9.996-9.997L19.937 6.002l2.127 2.129z"/>
                            </svg>
                            Home
                        </a>
                    </nav-bar>
                    <div class="main-container" bp="grid 6@md">
                        <div>
                            <h2>Annual</h2>
                            <table class="table">
                                <tr>
                                    <td>Gross</td>
                                    <td>${this._formatAmount(this.taxResults.annualTaxResult.grossAmount)}</td>
                                </tr>
                                <tr>
                                    <td>Tax</td>
                                    <td>${this._formatAmount(this.taxResults.annualTaxResult.taxAmount)}</td>
                                </tr>
                                <tr>
                                    <td>Social</td>
                                    <td>${this._formatAmount(this.taxResults.annualTaxResult.socialAmount)}</td>
                                </tr>
                                <tr>
                                    <td>NHS (GESY)</td>
                                    <td>${this._formatAmount(this.taxResults.annualTaxResult.healthContributionAmount)}</td>
                                </tr>
                                <tr>
                                    <td>Net</td>
                                    <td>${this._formatAmount(this.taxResults.annualTaxResult.netAmount)}</td>
                                </tr>
                            </table>
                        </div>
                        <div>
                            <h2>Monthly</h2>
                            <table class="table">
                                <tr>
                                    <td>Gross</td>
                                    <td>${this._formatAmount(this.taxResults.monthlyTaxResult.grossAmount)}</td>
                                </tr>
                                <tr>
                                    <td>Tax</td>
                                    <td>${this._formatAmount(this.taxResults.monthlyTaxResult.taxAmount)}</td>
                                </tr>
                                <tr>
                                    <td>Social</td>
                                    <td>${this._formatAmount(this.taxResults.monthlyTaxResult.socialAmount)}</td>
                                </tr>
                                <tr>
                                    <td>NHS (GESY)</td>
                                    <td>${this._formatAmount(this.taxResults.monthlyTaxResult.healthContributionAmount)}</td>
                                </tr>
                                <tr>
                                    <td>Net</td>
                                    <td>${this._formatAmount(this.taxResults.monthlyTaxResult.netAmount)}</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </main>
            </div>
        `;
    }

    constructor() {
        super();

        const monthlyTaxResults = new TaxResult(0, 0, 0, 0, 0);
        const annualTaxResults = new TaxResult(0, 0, 0, 0, 0);

        this.taxResults = new TaxResults(monthlyTaxResults, annualTaxResults);
        this.formatter = new Intl.NumberFormat();
    }

    firstUpdated() {
        this._addNavBackListener();
        this._loadUserSelectionFromDatastore();
    }

    async _loadUserSelectionFromDatastore() {

        const selectedCountry = await UserSelectionStore.retrieveCountry();
        const selectedPeriodType = await UserSelectionStore.retrieveSalaryType();
        const grossAmount = await UserSelectionStore.retrieveGrossAmount();
        const includesThirteenOption = await UserSelectionStore.retrieveIncludesThirteenOption();

        if (!selectedCountry || !selectedPeriodType || !grossAmount) {
            return;
        }

        this._updateCurrencyFormatter(selectedCountry);

        const selectedPeriod = selectedPeriodType.id === SalaryTypes.ANNUAL.id ?
            SalaryTypes.ANNUAL : SalaryTypes.MONTHLY;

        const salaryDetails = new SalaryDetails(grossAmount, selectedPeriod, includesThirteenOption);
        const taxResults = await TaxProcessorDispatcher.dispatch(selectedCountry.id, salaryDetails);

        this.taxResults = taxResults;
    }

    _addNavBackListener() {
        const navBackLink = this.shadowRoot.querySelector("a.nav-back");
        navBackLink.addEventListener("click", event => this._handleNavBackEvent(event));
    }

    /**
     * @param {Number} amount
     */
    _formatAmount(amount) {
        return this.formatter.format(amount);
    }

    /**
     * @param {Country} selectedCountry
     */
    _updateCurrencyFormatter(selectedCountry) {
        const formatter = new Intl.NumberFormat(selectedCountry.locale, {
            style: "currency",
            currency: selectedCountry.currency,
            minimumFractionDigits: 2
        });

        this.formatter = formatter;
    }

    /**
     * @param {Event} event
     */
    _handleNavBackEvent(event) {

        event.preventDefault();
        this._goToHome();
    }

    _goToHome() {

        // user navigated directly to Countries view
        if(window.history.length === 1 || window.history.length === 2) {
            history.pushState(null, "Home", "/");
            history.go(1);
            dispatchEvent(new PopStateEvent('popstate'));
        } else {
            history.back();
        }
    }
}

window.customElements.define("results-view", ResultsView);
