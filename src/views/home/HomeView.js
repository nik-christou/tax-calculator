import { LitElement } from "lit-element";
import { BaseElementMixin } from "../../base/BaseElementMixin.js";
import { HomeViewTemplate } from "./HomeViewTemplate.js";
import { UserSelectionStore } from "../../datastore/UserSelectionStore.js";
import { HomeViewCss } from "./HomeViewCss.js";
import { Country } from "../../model/Country.js";
import { SalaryType } from "../../model/SalaryType.js";
import { SalaryTypes } from "../../model/SalaryTypes.js";
import { ListGroupCss } from "../../base/ListGroupCss.js";
import { InputGroupCss } from "../../base/InputGroupCss.js";
import { ToggleCss } from "../../base/ToggleCss.js";
import { BlueprintCss } from "../../base/BlueprintCss.js";
import { ButtonCss } from "../../base/ButtonCss.js";

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
        return [
            ...super.styles,
            BlueprintCss,
            ListGroupCss,
            InputGroupCss,
            ToggleCss,
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
        this.grossAmount = "";
        this.selectedCountry = null;
        this.selectedPeriod = SalaryTypes.ANNUAL;
        this.includesThirteen = true;
        this.formatter = null;
    }

    firstUpdated() {
        this._addSalaryTypeClickListeners();
        this._addGrossAmountInputListener();
        this._addIncludesThirteenInputListener();
        this._addCalculateButtonListener();
        this._updateSelectedSalaryTypeLinks();
        this._loadUserSelectionFromDatastore();
    }

    async _loadUserSelectionFromDatastore() {

        await this._loadCountryFromStore();
        await this._loadSelectedPeriodFromStore();
        await this._loadGrossAmountFromStore();
        await this._loadThirteenSalaryFromStore();
    }

    async _loadCountryFromStore() {

        const selectedCountry = await UserSelectionStore.retrieveCountry();
        if(!selectedCountry) return;
        this.selectedCountry = selectedCountry;
        this._updateCurrencyFormatter(selectedCountry);
    }

    async _loadSelectedPeriodFromStore() {

        const selectedPeriod = await UserSelectionStore.retrieveSalaryType();
        if(!selectedPeriod) return;
        if(selectedPeriod.id === SalaryTypes.ANNUAL.id) {
            this._updateSelectedSalaryPeriod(SalaryTypes.ANNUAL);
        } else {
            this._updateSelectedSalaryPeriod(SalaryTypes.MONTHLY);
        }
    }

    async _loadGrossAmountFromStore() {

        const grossAmount = await UserSelectionStore.retrieveGrossAmount();
        if(!grossAmount) {
            this.grossAmount = "";
            return;
        };

        if(!this.formatter) {
            this.grossAmount = `grossAmount`;
        } else {
            this.grossAmount = this.formatter.format(grossAmount);
        }
    }

    async _loadThirteenSalaryFromStore() {
        const includesThirteenOption = await UserSelectionStore.retrieveIncludesThirteenOption();
        this.includesThirteen = includesThirteenOption;
    }

    /**
     * @param {Object} salaryPeriod
     */
    _updateSelectedSalaryPeriod(salaryPeriod) {
        if(!salaryPeriod) return;

        let salaryType = SalaryTypes.ANNUAL;

        if(salaryPeriod.id === SalaryTypes.ANNUAL.id) {
            salaryType = SalaryTypes.ANNUAL;
        } else {
            salaryType = SalaryTypes.MONTHLY;
        }

        this.selectedPeriod = salaryType;
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

        // close numpad/keyboard on mobile browsers
        grossAmountElement.addEventListener("keyup", event => {
            this._handleGrossAmountEnterKey(event, grossAmountElement);
        });

        grossAmountElement.addEventListener("focus", event => {
            this._handleGrossAmountFocus(event, grossAmountElement);
        });

        grossAmountElement.addEventListener("blur", event => {
            this._handleGrossAmountBlur(event, grossAmountElement);
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
     * @param {FocusEvent} event
     * @param {HTMLInputElement} grossAmountElement
     */
    async _handleGrossAmountFocus(event, grossAmountElement) {

        if(grossAmountElement.value === "") {
            return;
        }

        const sanitizedAmount = this._sanitizeSalaryAmount(grossAmountElement.value);
        const unformattedAmount = Number(sanitizedAmount);

        if(!unformattedAmount) {

            const grossAmountFromStore = await UserSelectionStore.retrieveGrossAmount();

            if(!grossAmountFromStore) {
                grossAmountElement.value = "";
            }

            grossAmountElement.value = `${grossAmountFromStore}`;

            return;
        }

        grossAmountElement.value = `${unformattedAmount}`;
    }

    /**
     * @param {FocusEvent} event
     * @param {HTMLInputElement} grossAmountElement
     */
    async _handleGrossAmountBlur(event, grossAmountElement) {

        const sanitizedAmount = this._sanitizeSalaryAmount(grossAmountElement.value);
        const unformattedAmount = Number(sanitizedAmount);

        if(!unformattedAmount) {

            const grossAmountFromStore = await UserSelectionStore.retrieveGrossAmount();

            if(!grossAmountFromStore) {
                this.grossAmount = this.formatter.format(0);
                grossAmountElement.value = this.grossAmount;
                return;
            };

            this.grossAmount = this.formatter.format(grossAmountFromStore);
            grossAmountElement.value = this.grossAmount;

            return;
        }

        UserSelectionStore.updateGrossAmount(unformattedAmount);

        if(!this.formatter) {
            this.grossAmount = `${unformattedAmount}`;
        } else {
            this.grossAmount = this.formatter.format(unformattedAmount);
        }

        grossAmountElement.value = this.grossAmount;
    }

    /**
     * @param {String} formattedSalaryAmount
     */
    _sanitizeSalaryAmount(formattedSalaryAmount) {

        if(!this.formatter) {
            return formattedSalaryAmount;
        }

        const {currencySymbol, decimalSymbol} = this._extractCurrencyAndDecimalSymbolFromLocale();

        // match anything that does not match either number or the decimal character
        const regularExpression = RegExp(`[^0-9${decimalSymbol}]+\g`);

        return formattedSalaryAmount
            .replace(currencySymbol, "")
            .replace(regularExpression, "");
    }

    _extractCurrencyAndDecimalSymbolFromLocale() {

        const dotDecimalSymbol = ".";
        const commaDesimalSymbol = ",";

        // workaround to get the currency symbol for the country locale
        const parts = this.formatter.formatToParts(3.50);
        const currencySymbol = parts[0].value;

        // return the decimal symbol that we need to remove
        // if country locale currency is using "." as decimal
        // then return "," and vice versa
        let decimalSymbol;
        if(parts[2].value === commaDesimalSymbol) {
            decimalSymbol = dotDecimalSymbol;
        } else if(parts[2].value === dotDecimalSymbol) {
            decimalSymbol = commaDesimalSymbol;
        }

        return { currencySymbol, decimalSymbol};
    }

    /**
     * @param {KeyboardEvent} event
     * @param {HTMLInputElement} grossAmountElement
     */
    _handleGrossAmountEnterKey(event, grossAmountElement) {
        if(event.keyCode !== 13) return;
        event.preventDefault();
        grossAmountElement.blur();
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

// @ts-ignore
window.customElements.define("home-view", HomeView);
