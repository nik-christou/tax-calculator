import { Country } from '../model/Country.js';
import { TaxDetails } from "../model/TaxDetails";
import { TaxOptions } from "../model/TaxOptions";
import CountryIDsEnum from "./CountryIDsEnum";
import { cyprusTaxDetailsLoader } from '../countries/cyprus/controller/CyprusTaxDetailsLoader.js';
import { cyprusTaxOptionsLoader } from "../countries/cyprus/controller/CyprusTaxOptionsLoader.js";
import { AustraliaTaxDetailsLoader } from '../countries/australia/controller/AustraliaTaxDetailsLoader.js';
import { GermanyTaxDetailsLoader } from '../countries/germany/control/GermanTaxDetailsLoader.js';
import { GreeceTaxDetailsLoader } from '../countries/greece/control/GreeceTaxDetailsLoader.js';

class DataLoaderUtil {

    /**
     * @param {JSON} countryObj
     * @returns {Country}
     */
    convertCountryFromJson(countryObj) {
        const {id, name, locale, currency, flag, additionalOptions} = countryObj;
        return new Country(id,
            name,
            locale,
            currency,
            flag,
            additionalOptions
        );
    }

    /**
     * @param {JSON} countryObj
     * @returns {TaxDetails}
     */
    extractTaxDetailsFromJson(countryObj) {

        const {id} = countryObj;
        const taxDetailsObject = this.#retrieveTaxDetailsFromCountryObj(countryObj);
        const taxDetails = this.createTaxDetails(id, taxDetailsObject);

        return taxDetails;
    }

    /**
     * @param {Number} countryId
     * @param {Object} taxDetailsObject
     * @returns {TaxDetails}
     */
    createTaxDetails(countryId, taxDetailsObject) {
        return new TaxDetails(countryId, taxDetailsObject);
    }

    /**
     * @param {Number} countryId
     * @param {JSON} countryObj
     * @returns {Object} the country specific tax details object
     */
    #retrieveTaxDetailsFromCountryObj(countryObj) {

        const {id} = countryObj;

        switch (id) {
            case CountryIDsEnum.CYPRUS_ID:
                return cyprusTaxDetailsLoader.loadTaxDetailsFromCountryObject(countryObj);
            case CountryIDsEnum.AUSTRALIA_ID:
                return AustraliaTaxDetailsLoader.loadTaxDetailsFromCountryObject(countryObj);
            case CountryIDsEnum.GERMANY_ID:
                return GermanyTaxDetailsLoader.loadTaxDetailsFromCountryObject(countryObj);
            case CountryIDsEnum.GREECE_ID:
                return GreeceTaxDetailsLoader.loadTaxDetailsFromCountryObject(countryObj);
            default:
                return null;
        }
    }

    /**
     * @param {JSON} countryObj
     * @returns {TaxOptions}
     */
    extractTaxOptionsFromJson(countryObj) {

        const {id} = countryObj;
        const taxOptionsObject = this.#retrieveTaxOptionsFromCountryObj(countryObj);
        const taxOptions = this.createTaxOptions(id, taxOptionsObject);

        return taxOptions;
    }

    /**
     * @param {Number} countryId
     * @param {Object} taxOptionsObject
     * @returns {TaxOptions}
     */
    createTaxOptions(countryId, taxOptionsObject) {
        return new TaxOptions(countryId, taxOptionsObject);
    }

    /**
     * @param {Number} countryId
     * @param {JSON} countryObj
     * @returns {Object} the country specific tax options object
     */
    #retrieveTaxOptionsFromCountryObj(countryObj) {

        const {id} = countryObj;

        switch (id) {
            case CountryIDsEnum.CYPRUS_ID:
                return cyprusTaxOptionsLoader.loadTaxOptionsFromCountryObject(countryObj);
            case CountryIDsEnum.AUSTRALIA_ID:
                // return AustraliaTaxDetailsLoader.loadTaxDetailsFromCountryObject(countryObj);
            case CountryIDsEnum.GERMANY_ID:
                // return GermanyTaxDetailsLoader.loadTaxDetailsFromCountryObject(countryObj);
            case CountryIDsEnum.GREECE_ID:
                // return GreeceTaxDetailsLoader.loadTaxDetailsFromCountryObject(countryObj);
            default:
                return null;
        }
    }
}

export const dataLoaderUtil = Object.freeze(new DataLoaderUtil());
