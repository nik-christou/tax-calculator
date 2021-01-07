import { LitElement } from 'lit-element';
import { BaseElementMixin } from '../../base/BaseElementMixin.js';
import { ResultsViewTemplate } from './ResultsViewTemplate.js';
import { BlueprintCss } from '../../base/BlueprintCss.js';
import { ResultsViewCss } from './ResultsViewCss.js';
import { TableCss } from '../../base/TableCss.js';
import { ListGroupCss } from '../../base/ListGroupCss.js';
import { TaxResults } from '../../model/TaxResults.js';
import { TaxResult } from '../../model/TaxResult.js';
import { SalaryDetails } from '../../model/SalaryDetails.js';
import { TaxProcessorDispatcher } from './TaxProcessorDispatcher.js';
import { UserSelectionStore } from '../../datastore/UserSelectionStore.js';
import { SalaryTypes } from '../../model/SalaryTypes.js';

export class ResultsView extends BaseElementMixin(LitElement) {
    static get properties() {
        return {
            taxResults: TaxResults,
            formatter: Intl.NumberFormat
        };
    }

    static get styles() {
        return [...super.styles, TableCss, ListGroupCss, BlueprintCss, ResultsViewCss];
    }

    render() {
        return ResultsViewTemplate(this.taxResults, this.formatter);
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

        if (!selectedCountry || !selectedPeriodType) return;

        this._updateCurrencyFormatter(selectedCountry);

        const selectedPeriod = selectedPeriodType.id === SalaryTypes.ANNUAL.id ? SalaryTypes.ANNUAL : SalaryTypes.MONTHLY;

        const salaryDetails = new SalaryDetails(grossAmount, selectedPeriod, includesThirteenOption);
        const taxResults = await TaxProcessorDispatcher.dispatch(selectedCountry.id, salaryDetails);

        this.taxResults = taxResults;
    }

    _addNavBackListener() {
        const navBackLink = this.shadowRoot.querySelector('a.nav-back');
        navBackLink.addEventListener('click', (event) => this._handleNavBackEvent(event));
    }

    /**
     * @param {import('../../model/Country.js').Country} selectedCountry
     */
    _updateCurrencyFormatter(selectedCountry) {
        const formatter = new Intl.NumberFormat(selectedCountry.locale, {
            style: 'currency',
            currency: selectedCountry.currency,
            minimumFractionDigits: 2,
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

        if (window.history.state) {
            window.history.back();
        } else {
            window.history.replaceState(null, 'Home', '/');
            window.history.go(1);
            window.dispatchEvent(new window.PopStateEvent('popstate'));
        }
    }
}

// @ts-ignore
window.customElements.define('results-view', ResultsView);
