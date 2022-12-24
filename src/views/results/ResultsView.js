import {BaseElement} from '../../base/BaseElement.js';
import {ResultsViewTemplate} from './ResultsViewTemplate.js';
import {TaxResults} from '../../model/TaxResults.js';
import {TaxResult} from '../../model/TaxResult.js';
import {SalaryDetails} from '../../model/SalaryDetails.js';
import {TaxProcessorDispatcher} from './TaxProcessorDispatcher.js';
import {userSelectionsStore} from "../../datastore/UserSelectionsStore.js";
import {SalaryTypes} from '../../model/SalaryTypes.js';
import {ResultsSearchParametersProcessor} from './ResultsSearchParametersProcessor.js';
import {Country} from "../../model/Country.js";
import {BlueprintCss} from '../../base/BlueprintCss.js';
import {ListGroupCssTaggedTemplate} from '@twbs-css/template-literals';
import {ResultsViewCss} from './ResultsViewCss.js';

export class ResultsView extends BaseElement {

    static properties = {
        country: Country,
        taxResults: TaxResults,
        formatter: Intl.NumberFormat
    };

    static styles = [
        BaseElement.styles,
        BlueprintCss,
        ListGroupCssTaggedTemplate,
        ResultsViewCss
    ];

    render() {
        return ResultsViewTemplate(this.country, this.taxResults, this.formatter);
    }

    constructor() {
        super();
        const monthlyTaxResults = new TaxResult(0, 0, 0, 0, 0, []);
        const annualTaxResults = new TaxResult(0, 0, 0, 0, 0, []);
        this.taxResults = new TaxResults(monthlyTaxResults, annualTaxResults);
        this.formatter = new Intl.NumberFormat();
        this.resultsSearchParametersProcessor = new ResultsSearchParametersProcessor();
    }

    firstUpdated(_changedProperties) {
        this._addNavBackListener();
    }

    /**
     * Router life cycle function
     *
     * @param {RouterLocation} location
     * @param {PreventAndRedirectCommands} commands
     * @param {Router} router
     */
    async onAfterEnter(location, commands, router) {

        const searchParams = new URLSearchParams(location.search);
        await this.resultsSearchParametersProcessor.processSearchParameters(searchParams);

        this._loadUserSelectionFromDatastore();

        this.requestUpdate();
    }

    _loadUserSelectionFromDatastore() {

        const selectedCountry = userSelectionsStore.retrieveSelectedCountry();
        const selectedSalaryType = userSelectionsStore.retrieveSalaryType();
        const grossAmount = userSelectionsStore.retrieveSelectedGrossAmount();
        const includesThirteenOption = userSelectionsStore.retrieveIncludesThirteenSalaryOption();

        if (!selectedCountry || !selectedSalaryType) return;

        this._updateCurrencyFormatter(selectedCountry);

        const selectedPeriod = selectedSalaryType.id === SalaryTypes.ANNUAL.id ? SalaryTypes.ANNUAL : SalaryTypes.MONTHLY;

        const salaryDetails = new SalaryDetails(grossAmount, selectedPeriod, includesThirteenOption);

        const taxResults = TaxProcessorDispatcher.dispatch(selectedCountry.id, salaryDetails);

        this.country = selectedCountry;
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
        this.formatter = new Intl.NumberFormat(selectedCountry.locale, {
            style: 'currency',
            currency: selectedCountry.currency,
            minimumFractionDigits: 2,
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

        if (window.history.state) {
            window.history.back();
        } else {
            window.history.replaceState(null, 'Home', '/');
            window.history.go(1);
            window.dispatchEvent(new window.PopStateEvent('popstate'));
        }
    }
}

window.customElements.define('results-view', ResultsView);
