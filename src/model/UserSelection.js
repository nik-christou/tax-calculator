
export class UserSelection {

    /**
     * @param {Country} selectedCountry the selected country
     * @param {SalaryType} selectedSalaryType the selected salary type
     * @param {Number} selectedGrossAmount The selected gross amount
     * @param {Boolean} selectedThirteenOption true if thirteen salary is selected
     * @param {TaxDetails} selectedTaxDetails the selected tax details
     * @param {TaxOptions} selectedTaxOptions the selected tax options
     */
    constructor(
        selectedCountry, 
        selectedSalaryType,
        selectedGrossAmount,
        selectedThirteenOption,
        selectedTaxDetails,
        selectedTaxOptions) {

        this.selectedCountry = selectedCountry;
        this.selectedSalaryType = selectedSalaryType;
        this.selectedGrossAmount = selectedGrossAmount;
        this.selectedThirteenOption = selectedThirteenOption;
        this.selectedTaxDetails = selectedTaxDetails;
        this.selectedTaxOptions = selectedTaxOptions;
    }
};