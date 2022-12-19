import {userSelectionsStore} from '../../datastore/UserSelectionsStore.js';
import CountryIDsEnum from "../../datastore/CountryIDsEnum.js";
import {TaxOptions} from "../../model/TaxOptions";

export class ResultsUrlSearchParametersFactory {

    generateResultsUrlWithSearchParams() {

        const selectedCountry = userSelectionsStore.retrieveSelectedCountry();
        const selectedGrossAmount = userSelectionsStore.retrieveSelectedGrossAmount();
        const selectedSalaryType = userSelectionsStore.retrieveSalaryType();
        const selectedIncludeThirteenSalary = userSelectionsStore.retrieveIncludesThirteenSalaryOption();
        const selectedTaxOptions = userSelectionsStore.retrieveSelectedTaxOptions();

        const urlSearchParams = new URLSearchParams();
        urlSearchParams.append('countryId', selectedCountry.id);
        urlSearchParams.append('grossAmount', selectedGrossAmount);
        urlSearchParams.append('salaryType', selectedSalaryType.type);
        urlSearchParams.append('includesThirteen', selectedIncludeThirteenSalary);

        this.#generateTaxOptionsSearchParams(selectedTaxOptions, urlSearchParams);

        return '/results?' + urlSearchParams.toString();
    }

    /**
     * @param {TaxOptions} taxOptions
     * @param {URLSearchParams} urlSearchParams
     */
    #generateTaxOptionsSearchParams(taxOptions, urlSearchParams) {

        switch (taxOptions.countryId) {
            case CountryIDsEnum.CYPRUS_ID:
                return this.#generateCyprusTaxOptions(taxOptions, urlSearchParams);
            case CountryIDsEnum.AUSTRALIA_ID:
                return this.#generateAustraliaTaxOptions(taxOptions, urlSearchParams);
            case CountryIDsEnum.GERMANY_ID:
                return this.#processGermanyTaxOptions(taxOptions, urlSearchParams);
            default:
                break;
        }
    }

    #generateCyprusTaxOptions(taxOptions, urlSearchParams) {
        const cyprusTaxOptions = taxOptions.options;
        urlSearchParams.append('employmentType', cyprusTaxOptions.employmentType.type);
    }

    #generateAustraliaTaxOptions(taxOptions, urlSearchParams) {
        const australiaTaxOptions = taxOptions.options;
        urlSearchParams.append('residenceType', australiaTaxOptions.residenceType.type);
    }

    #processGermanyTaxOptions(taxOptions, urlSearchParams) {
        const germanyTaxOptions = taxOptions.options;
        urlSearchParams.append('maritalStatus', germanyTaxOptions.maritalStatus.type);
        urlSearchParams.append('parentalStatus', germanyTaxOptions.parentalStatus.type);
    }
}