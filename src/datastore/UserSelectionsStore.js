import { taxDetailsStore } from "./TaxDetailsStore.js";
import { taxOptionsStore } from "./TaxOptionsStore.js";
import { UserSelection } from "../model/UserSelection";

const USER_SELECTIONS_KEY = "user_selections";

class UserSelectionsStore {

    /**
     * @param {Country} country
     * @returns {UserSelection} the updated user selections
     */
    updateSelectedCountry(country) {
        const userSelections = this.retrieveUserSelections();
        const taxDetailsForNewCountry = taxDetailsStore.retrieveTaxDetailsByCountryById(country.id);
        const taxOptionsForNewCountry = taxOptionsStore.retrieveTaxOptionsByCountryById(country.id);
        userSelections.selectedCountry = country;
        userSelections.selectedTaxDetails = taxDetailsForNewCountry;
        userSelections.selectedTaxOptions = this.#cloneTaxOptions(taxOptionsForNewCountry);
        this.addOrReplaceUserSelections(userSelections);
        return this.retrieveUserSelections();
    }

    /**
     * We have to clone TaxOptions object because this
     * object in user selections has to be mutable, and
     * we cannot change the original object from json
     *
     * @param {TaxOptions} taxOptions
     * @returns {TaxOptions}
     */
    #cloneTaxOptions(taxOptions) {
        return Object.create(
            Object.getPrototypeOf(taxOptions),
            Object.getOwnPropertyDescriptors(taxOptions)
        );
    }

    /**
     * @returns {Country} selected country
     */
    retrieveSelectedCountry() {
        return this.retrieveUserSelections()?.selectedCountry;
    }

    /**
     * @param {SalaryType} salaryType
     * @returns {UserSelection} the updated user selections
     */
    updateSelectedSalaryType(salaryType) {
        const userSelections = this.retrieveUserSelections();
        userSelections.selectedSalaryType = salaryType;
        this.addOrReplaceUserSelections(userSelections);
        return this.retrieveUserSelections();
    }

    /**
     * @returns {SalaryType} selected salary type
     */
    retrieveSalaryType() {
        return this.retrieveUserSelections()?.selectedSalaryType;
    }

    /**
     * @param {Number} grossAmount
     * @returns {UserSelection} the updated user selections
     */
    updateSelectedGrossAmount(grossAmount) {
        const userSelections = this.retrieveUserSelections();
        userSelections.selectedGrossAmount = grossAmount;
        this.addOrReplaceUserSelections(userSelections);
        return this.retrieveUserSelections();
    }

    /**
     * @returns {Number} the selected gross amount
     */
    retrieveSelectedGrossAmount() {
        return this.retrieveUserSelections()?.selectedGrossAmount;
    }

    /**
     * @param {Boolean} includesThirteenSalary
     * @returns {UserSelection} the updated user selections
     */
    updateIncludesThirteenSalaryOption(includesThirteenSalary) {
        const userSelections = this.retrieveUserSelections();
        userSelections.selectedThirteenOption = includesThirteenSalary;
        this.addOrReplaceUserSelections(userSelections);
        return this.retrieveUserSelections();
    }

    /**
     * @returns {Boolean} the selected thirteen salary option
     */
    retrieveIncludesThirteenSalaryOption() {
        return this.retrieveUserSelections()?.selectedThirteenOption;
    }

    /**
     * @param {TaxDetails} taxDetails
     * @returns {UserSelection} the updated user selections
     */
    updateTaxDetails(taxDetails) {
        const userSelections = this.retrieveUserSelections();
        userSelections.selectedTaxDetails = taxDetails;
        this.addOrReplaceUserSelections(userSelections);
        return this.retrieveUserSelections();
    }

    /**
     * @returns {TaxDetails} the selected tax details
     */
    retrieveTaxDetails() {
        return this.retrieveUserSelections()?.selectedTaxDetails;
    }

    /**
     * @param {TaxOptions} taxOptions
     * @returns {UserSelection} the updated user selections
     */
    updateTaxOptions(taxOptions) {
        const userSelections = this.retrieveUserSelections()
        userSelections.selectedTaxOptions = taxOptions;
        this.addOrReplaceUserSelections(userSelections);
        return this.retrieveUserSelections();
    }

    /**
     * @returns {UserSelection}
     */
    clearTaxOptions() {
        return this.updateTaxOptions(undefined);
    }

    /**
     * @returns {TaxOptions} the selected tax options
     */
    retrieveSelectedTaxOptions() {
        return this.retrieveUserSelections()?.selectedTaxOptions;
    }

    /**
     * @param {UserSelection} userSelections
     */
    addOrReplaceUserSelections(userSelections) {
        window.localStorage.setItem(USER_SELECTIONS_KEY, JSON.stringify(userSelections));
    }

    /**
     * @returns {UserSelection}
     */
    retrieveUserSelections() {
        const userSelectionsItem = window.localStorage.getItem(USER_SELECTIONS_KEY);
        const userSelectionsObj = JSON.parse(userSelectionsItem);
        return this.#createUserSelections(userSelectionsObj);
    }

    resetUserSelections() {
        const userSelection = new UserSelection(
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined);
        this.addOrReplaceUserSelections(userSelection);
    }

    /**
     * @param {Object} userSelectionsObj
     * @returns {UserSelection}
     */
    #createUserSelections(userSelectionsJson) {
        return new UserSelection(
            userSelectionsJson?.selectedCountry,
            userSelectionsJson?.selectedSalaryType,
            userSelectionsJson?.selectedGrossAmount,
            userSelectionsJson?.selectedThirteenOption,
            userSelectionsJson?.selectedTaxDetails,
            userSelectionsJson?.selectedTaxOptions);
    }
}

export const userSelectionsStore = Object.freeze(new UserSelectionsStore());