import {countryStore} from '../../datastore/CountryStore.js';
import {userSelectionsStore} from '../../datastore/UserSelectionsStore.js';
import {SalaryTypes} from '../../model/SalaryTypes';
import {taxDetailsStore} from '../../datastore/TaxDetailsStore.js';
import {taxOptionsStore} from '../../datastore/TaxOptionsStore.js';
import {CyprusTaxOptions} from '../../countries/cyprus/model/CyprusTaxOptions';
import CountryIDsEnum from '../../datastore/CountryIDsEnum.js';
import {GermanTaxOptions} from "../../countries/germany/model/GermanTaxOptions.js";
import {AustraliaTaxOptions} from "../../countries/australia/model/AustraliaTaxOptions.js";
import {MaritalStatuses} from "../../model/MaritalStatuses";
import {ParentalStatuses} from "../../model/ParentalStatuses";
import {EmploymentTypes} from "../../model/EmploymentTypes";
import {TaxOptions} from "../../model/TaxOptions";
import {ResidenceTypes} from "../../model/ResidenceTypes";

export class ResultsSearchParametersProcessor {

    /**
     * @param {URLSearchParams} urlSearchParams
     */
    processSearchParameters(urlSearchParams) {

        const countryId = urlSearchParams.get('countryId');
        const grossAmount = urlSearchParams.get('grossAmount');
        const salaryType = urlSearchParams.get('salaryType');
        const includesThirteen = urlSearchParams.get('includesThirteen');

        const country = countryStore.retrieveCountryById(countryId);
        const taxDetails = taxDetailsStore.retrieveTaxDetailsByCountryById(countryId);
        const taxOptions = taxOptionsStore.retrieveTaxOptionsByCountryById(countryId);
        const salaryTypeResolved = this.#resolveSalaryType(salaryType);
        const countrySpecificTaxOptions = this.#resolveCountrySpecificTaxOption(taxOptions, urlSearchParams);

        userSelectionsStore.updateSelectedCountry(country);
        userSelectionsStore.updateSelectedGrossAmount(grossAmount);
        userSelectionsStore.updateSelectedSalaryType(salaryTypeResolved);
        userSelectionsStore.updateIncludesThirteenSalaryOption(includesThirteen);
        userSelectionsStore.updateTaxDetails(taxDetails);
        userSelectionsStore.updateTaxOptions(countrySpecificTaxOptions);
    }

    /**
     * @param {TaxOptions} taxOptions
     * @param {URLSearchParams} urlSearchParams
     */
    #resolveCountrySpecificTaxOption(taxOptions, urlSearchParams) {

        switch (taxOptions.countryId) {
            case CountryIDsEnum.CYPRUS_ID:
                return this.#processCyprusTaxOptions(taxOptions, urlSearchParams);
            case CountryIDsEnum.AUSTRALIA_ID:
                return this.#processAustraliaTaxOptions(taxOptions, urlSearchParams);
            case CountryIDsEnum.GERMANY_ID:
                return this.#processGermanyTaxOptions(taxOptions, urlSearchParams);
            default:
                break;
        }
    }

    /**
     * @param {TaxOptions} taxOptions
     * @param {URLSearchParams} urlSearchParams
     */
    #processCyprusTaxOptions(taxOptions, urlSearchParams) {

        const employmentType = urlSearchParams.get('employmentType') === EmploymentTypes.EMPLOYED.type
            ? EmploymentTypes.EMPLOYED
            : EmploymentTypes.SELF_EMPLOYED;

        return new TaxOptions(taxOptions.countryId, new CyprusTaxOptions(employmentType));
    }

    /**
     * @param {TaxOptions} taxOptions
     * @param {URLSearchParams} urlSearchParams
     */
    #processAustraliaTaxOptions(taxOptions, urlSearchParams) {

        const residenceType = urlSearchParams.get('residenceType') === ResidenceTypes.RESIDENT.type
            ? ResidenceTypes.RESIDENT
            : ResidenceTypes.NON_RESIDENT;

        return new TaxOptions(taxOptions.countryId, new AustraliaTaxOptions(residenceType));
    }

    /**
     * @param {TaxOptions} taxOptions
     * @param {URLSearchParams} urlSearchParams
     */
    #processGermanyTaxOptions(taxOptions, urlSearchParams) {

        const maritalStatus = urlSearchParams.get('maritalStatus') === MaritalStatuses.SINGLE.type
            ? MaritalStatuses.SINGLE
            : MaritalStatuses.MARRIED;

        const parentalStatus = urlSearchParams.get('parentalStatus') === ParentalStatuses.NO_CHILDREN.type
            ? ParentalStatuses.NO_CHILDREN
            : ParentalStatuses.WITH_CHILDREN;

        return new TaxOptions(taxOptions.countryId, new GermanTaxOptions(maritalStatus, parentalStatus));
    }

    #resolveSalaryType(salaryType) {

        if (salaryType === SalaryTypes.ANNUAL.type) {
            return SalaryTypes.ANNUAL;
        }

        return SalaryTypes.MONTHLY;
    }
}