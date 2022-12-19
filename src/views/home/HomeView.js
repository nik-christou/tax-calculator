import { LitElement } from 'lit';
import { BaseElementMixin } from '../../base/BaseElementMixin.js';
import { HomeViewTemplate } from './HomeViewTemplate.js';
import { userSelectionsStore } from "../../datastore/UserSelectionsStore.js";
import { HomeViewCss } from './HomeViewCss.js';
import { Country } from '../../model/Country.js';
import { SalaryType } from '../../model/SalaryType.js';
import { SalaryTypes } from '../../model/SalaryTypes.js';
import { ListGroupCss } from '../../base/ListGroupCss.js';
import { InputGroupCss } from '../../base/InputGroupCss.js';
import { ToggleCss } from '../../base/ToggleCss.js';
import { BlueprintCss } from '../../base/BlueprintCss.js';
import { ButtonCss } from '../../base/ButtonCss.js';
import {ResultsUrlSearchParametersFactory} from "./ResultsUrlSearchParametersFactory";

export class HomeView extends BaseElementMixin(LitElement) {

    static get properties() {
        return {
            selectedCountry: Country,
            selectedPeriod: SalaryType,
            grossAmount: String,
            includesThirteen: Boolean,
            formatter: Intl.NumberFormat
        };
    }

    static get styles() {
        return [...super.styles,
            BlueprintCss,
            ListGroupCss,
            InputGroupCss,
            ToggleCss,
            ButtonCss,
            HomeViewCss];
    }

    render() {
        return HomeViewTemplate(this.selectedCountry, this.includesThirteen, this.grossAmount);
    }

    constructor() {
        super();
        this.grossAmount = '';
        this.selectedCountry = null;
        this.selectedPeriod = null;
        this.includesThirteen = false;
        this.formatter = null;
        this.#loadUserSelectionFromDatastore();
        this.resultsUrlSearchParametersFactory = new ResultsUrlSearchParametersFactory();
    }

    firstUpdated() {
        this.#addSalaryTypeClickListeners();
        this.#addGrossAmountInputListener();
        this.#addIncludesThirteenInputListener();
        this.#addCalculateButtonListener();
        this.#addCountrySelectionListener();
        this.#addTaxDetailsListener();
        this.#addTaxOptionsListener();
        this.#updateSelectedSalaryTypeLinks();
    }

    #loadUserSelectionFromDatastore() {
        this.#loadCountryFromStore();
        this.#loadSelectedPeriodFromStore();
        this.#loadGrossAmountFromStore();
        this.#loadThirteenSalaryFromStore();
    }

    #loadCountryFromStore() {
        const selectedCountry = userSelectionsStore.retrieveSelectedCountry();
        if (!selectedCountry) return;
        this.selectedCountry = selectedCountry;
        this.#updateCurrencyFormatter(selectedCountry);
    }

    #loadSelectedPeriodFromStore() {

        const selectedSalaryTypeId = userSelectionsStore.retrieveSalaryType();
        if(!selectedSalaryTypeId) return;

        const selectedSalaryType = userSelectionsStore.retrieveSalaryType();
        if (!selectedSalaryType) return;

        if (selectedSalaryType.id === SalaryTypes.ANNUAL.id) {
            this.selectedPeriod = SalaryTypes.ANNUAL;
        } else {
            this.selectedPeriod = SalaryTypes.MONTHLY;
        }
    }

    #loadGrossAmountFromStore() {

        const grossAmount = userSelectionsStore.retrieveSelectedGrossAmount();

        if (!grossAmount) {
            this.grossAmount = '';
            return;
        }

        if (this.formatter) {
            this.grossAmount = this.formatter.format(grossAmount);
        } else {
            this.grossAmount = `${grossAmount}`;
        }
    }

    #loadThirteenSalaryFromStore() {
        const includesThirteenOption = userSelectionsStore.retrieveIncludesThirteenSalaryOption();
        this.includesThirteen = includesThirteenOption;
    }

    #addSalaryTypeClickListeners() {
        const annualSalaryTypeLink = this.shadowRoot.querySelector('a#annual-salary-type');
        const monthlySalaryTypeLink = this.shadowRoot.querySelector('a#monthly-salary-type');

        annualSalaryTypeLink.addEventListener('click', (event) => {
            this.#handleSelectedSalaryType(event, SalaryTypes.ANNUAL);
        });

        monthlySalaryTypeLink.addEventListener('click', (event) => {
            this.#handleSelectedSalaryType(event, SalaryTypes.MONTHLY);
        });
    }

    #addGrossAmountInputListener() {
        const grossAmountElement = this.shadowRoot.querySelector('input#grossAmountInput');

        // close numpad/keyboard on mobile browsers
        grossAmountElement.addEventListener('keyup', (event) => {
            this.#handleGrossAmountEnterKey(event, grossAmountElement);
        });

        grossAmountElement.addEventListener('focus', async (event) => {
            await this.#handleGrossAmountFocus(event, grossAmountElement);
        });

        grossAmountElement.addEventListener('change', async (event) => {
            await this.#handleGrossAmountBlur(event, grossAmountElement);
        });
    }

    #addIncludesThirteenInputListener() {
        const includesThirteenElement = this.shadowRoot.querySelector('input#includesThirteen');
        includesThirteenElement.addEventListener('change', (event) => {
            this.#handleThirteenChange(event, includesThirteenElement);
        });
    }

    #addCalculateButtonListener() {
        const calculateButton = this.shadowRoot.querySelector('button.calculate-btn');
        calculateButton.addEventListener('click', (event) => {
            this.#handleCalculateClickEvent(event);
        });
    }
    
    #addCountrySelectionListener() {

        const countrySelectionLink = this.shadowRoot.querySelector('a#countrySelectionLink');
        countrySelectionLink.addEventListener('click', event => this.#handleCountrySelectionClickEvent(event));
    }

    #addTaxDetailsListener() {
        const taxDetailsLink = this.shadowRoot.querySelector('a#taxDetailsLink');
        taxDetailsLink?.addEventListener('click', event => this.#handleTaxDetailsClickEvent(event));
    }

    #addTaxOptionsListener() {

        const taxOptionsLink = this.shadowRoot.querySelector('a#taxOptionsLink');
        
        // some countries do not have additional options
        if (taxOptionsLink) {
            taxOptionsLink.addEventListener('click', event => this.#handleTaxOptionsClickEvent(event));
        }
    }

    /**
     * @param {MouseEvent} event 
     */
    #handleTaxOptionsClickEvent(event) {

        event.preventDefault();

        window.history.pushState(this.location.pathname, 'Tax Options', '/tax-options');
        window.history.go(1);
        window.dispatchEvent(new window.PopStateEvent('popstate'));
    }

    /**
     * @param {MouseEvent} event 
     */
    #handleTaxDetailsClickEvent(event) {

        event.preventDefault();

        window.history.pushState(location.pathname, 'Tax Details', '/tax-details');
        window.history.go(1);
        window.dispatchEvent(new window.PopStateEvent('popstate'));
    }

    /**
     * @param {MouseEvent} event 
     */
    #handleCountrySelectionClickEvent(event) {
        
        event.preventDefault();

        window.history.pushState(location.pathname, 'Country Selection', '/country-selection');
        window.history.go(1);
        window.dispatchEvent(new window.PopStateEvent('popstate'));
    }

    /**
     * @param {Event} event
     */
    #handleCalculateClickEvent(event) {
        
        event.preventDefault();

        if (this.selectedCountry && this.selectedPeriod && this.grossAmount) {

            const resultsUrl = this.resultsUrlSearchParametersFactory.generateResultsUrlWithSearchParams();

            window.history.pushState(location.pathname, 'Tax Results', resultsUrl);
            window.history.go(1);
            window.dispatchEvent(new window.PopStateEvent('popstate'));
        }
    }

    /**
     * @param {Event} event
     * @param {HTMLInputElement} includesThirteenElement
     */
    #handleThirteenChange(event, includesThirteenElement) {
        this.includesThirteen = includesThirteenElement.checked;
        userSelectionsStore.updateIncludesThirteenSalaryOption(this.includesThirteen);
    }

    /**
     * @param {FocusEvent} event
     * @param {HTMLInputElement} grossAmountElement
     */
    #handleGrossAmountFocus(event, grossAmountElement) {
        if (grossAmountElement.value === '') {
            return;
        }

        const sanitizedAmount = this.#sanitizeSalaryAmount(grossAmountElement.value);
        const unformattedAmount = Number(sanitizedAmount);

        if (!unformattedAmount) {
            const grossAmountFromStore = userSelectionsStore.retrieveSelectedGrossAmount();

            if (!grossAmountFromStore) {
                grossAmountElement.value = '';
            }

            grossAmountElement.value = `${grossAmountFromStore}`;

            return;
        }

        grossAmountElement.value = `${unformattedAmount}`;
    }

    /**
     * @param {Event} event
     * @param {HTMLInputElement} grossAmountElement
     */
    #handleGrossAmountBlur(event, grossAmountElement) {
        const sanitizedAmount = this.#sanitizeSalaryAmount(grossAmountElement.value);

        const unformattedAmount = Number(sanitizedAmount);

        if (!unformattedAmount) {

            // inputted amount could not be used
            // reverting back to stored amount if present
            const grossAmountFromStore = userSelectionsStore.retrieveSelectedGrossAmount();

            // no stored amount was found
            if (!grossAmountFromStore) {
                grossAmountElement.value = '';
                return;
            }

            if (!this.formatter) {
                this.grossAmount = `${unformattedAmount}`;
            } else {
                this.grossAmount = this.formatter.format(grossAmountFromStore);
            }

            grossAmountElement.value = this.grossAmount;

            return;
        }

        userSelectionsStore.updateSelectedGrossAmount(unformattedAmount);

        if (this.formatter) {
            this.grossAmount = this.formatter.format(unformattedAmount);
        } else {
            this.grossAmount = `${unformattedAmount}`;
        }

        grossAmountElement.value = this.grossAmount;
    }

    /**
     * @param {String} formattedSalaryAmount
     */
    #sanitizeSalaryAmount(formattedSalaryAmount) {

        if (!this.formatter) {
            return formattedSalaryAmount;
        }

        const { currencySymbol, decimalSymbol } = this.#extractCurrencyAndDecimalSymbolFromLocale();

        // match anything that does not match either number or the decimal character
        const regularExpression = RegExp(`[^0-9${decimalSymbol}]+\\g`);

        return formattedSalaryAmount.replace(currencySymbol, '').replace(regularExpression, '');
    }

    #extractCurrencyAndDecimalSymbolFromLocale() {

        // workaround for iOS Safari 12 and below since
        // formatToParts was not available until iOS Safari 13
        if (!Intl.NumberFormat.prototype.formatToParts) {
            return this.#calculateCurrencyAndDecimalSymbolsForOlderBrowsers();
        }

        // Get the currency symbol for the country locale
        // so we call the function with a random number
        // in order to get the decimal and currency symbol
        // for selected country locale
        const parts = this.formatter.formatToParts(3.5);
        
        const currencyPart = this.#findCurrencyPart(parts);
        const currencySymbol = currencyPart.value;

        const decimalPart = this.#findDecimalPart(parts);
        const decimalSymbol = decimalPart.value;

        return { currencySymbol, decimalSymbol };
    }

    /**
     * @param {Array<NumberFormatPart>} parts
     */
    #findCurrencyPart(parts) {
        
        const currencyIndex = parts.findIndex(part => part.type === 'currency');

        return parts[currencyIndex];
    }

    /**
     * @param {Array<NumberFormatPart>} parts
     */
    #findDecimalPart(parts) {

        const decimalIndex = parts.findIndex(part => part.type === 'decimal');

        return parts[decimalIndex];
    }

    #calculateCurrencyAndDecimalSymbolsForOlderBrowsers() {

        const currencySymbol = this.selectedCountry.currency;
        const decimalSymbol = this.#getDecimalSeparator(this.selectedCountry.locale);

        // return the currency & decimal symbols from json file
        return { currencySymbol, decimalSymbol };
    }

    /**
     * @param {String} locale
     */
    #getDecimalSeparator(locale) {

        const numberWithDecimalSeparator = 1.1;
        return numberWithDecimalSeparator.toLocaleString(locale).substring(1, 2);
    }

    /**
     * @param {KeyboardEvent} event
     * @param {HTMLInputElement} grossAmountElement
     */
    #handleGrossAmountEnterKey(event, grossAmountElement) {
        if (event.keyCode !== 13) return;
        event.preventDefault();
        grossAmountElement.blur();
    }

    /**
     * @param {Event} event
     * @param {SalaryType} salaryType
     */
    #handleSelectedSalaryType(event, salaryType) {
        event.preventDefault();

        this.selectedPeriod = salaryType;
        this.#updateSelectedSalaryTypeLinks();

        userSelectionsStore.updateSelectedSalaryType(salaryType);
    }

    /**
     * @param {Country} selectedCountry
     */
    #updateCurrencyFormatter(selectedCountry) {
        const formatter = new Intl.NumberFormat(selectedCountry.locale, {
            style: 'currency',
            currency: selectedCountry.currency,
            minimumFractionDigits: 2
        });

        this.formatter = formatter;
    }

    #updateSelectedSalaryTypeLinks() {

        const annualSalaryTypeLink = this.shadowRoot.querySelector('a#annual-salary-type');
        const monthlySalaryTypeLink = this.shadowRoot.querySelector('a#monthly-salary-type');

        if (this.selectedPeriod === SalaryTypes.ANNUAL) {
            this.#removeActiveClass(monthlySalaryTypeLink);
            this.#addActiveClass(annualSalaryTypeLink);
        }

        if (this.selectedPeriod === SalaryTypes.MONTHLY) {
            this.#removeActiveClass(annualSalaryTypeLink);
            this.#addActiveClass(monthlySalaryTypeLink);
        }
    }

    /**
     * @param {Element} element
     */
    #removeActiveClass(element) {
        element.classList.remove('active');
    }

    /**
     * @param {Element} element
     */
    #addActiveClass(element) {
        element.classList.add('active');
    }
}

window.customElements.define('home-view', HomeView);
