import CountryIDsEnum from "./CountryIDsEnum";
import {countryStore} from "./CountryStore.js";
import {taxDetailsStore} from "./TaxDetailsStore.js";
import {taxOptionsStore} from "./TaxOptionsStore.js";
import {userSelectionsStore} from "./UserSelectionsStore.js";
import {countryFromJsonConverter} from "../countries/CountryFromJsonConverter.js";
import {cyprusTaxOptionsConverter} from "../countries/cyprus/controller/converter/CyprusTaxOptionsConverter.js";
import {cyprusTaxDetailsConverter} from "../countries/cyprus/controller/converter/CyprusTaxDetailsConverter.js";
import {australiaTaxDetailsConverter} from "../countries/australia/controller/converter/AustraliaTaxDetailsConverter.js";
import {australiaTaxOptionsConverter} from "../countries/australia/controller/converter/AustraliaTaxOptionsConverter.js";
import {germanTaxDetailsConverter} from "../countries/germany/controller/converter/GermanTaxDetailsConverter.js";
import {germanTaxOptionsConverter} from "../countries/germany/controller/converter/GermanTaxOptionsConverter.js";
// import {GreeceTaxDetailsLoader} from "../countries/greece/controller/GreeceTaxDetailsLoader.js";

class DatastoreUpdater {

    /**
     * @param {JSON} newOrUpdatedCountryDataJson
     */
    handleNewOrUpdateCountryJson(newOrUpdatedCountryDataJson) {

        const newOrUpdatedCountry = countryFromJsonConverter.convertCountryFromJson(newOrUpdatedCountryDataJson);
        countryStore.addOrReplaceCountry(newOrUpdatedCountry);

        const newOrUpdatedTaxDetails = this.#extractTaxDetailsFromCountryJson(newOrUpdatedCountryDataJson);
        taxDetailsStore.addOrReplaceTaxDetails(newOrUpdatedTaxDetails);

        const newOrUpdatedTaxOptions = this.#extractTaxOptionsFromCountryJson(newOrUpdatedCountryDataJson);
        taxOptionsStore.addOrReplaceTaxOptions(newOrUpdatedTaxOptions);

        userSelectionsStore.resetUserSelections();
    }

    /**
     * @param {JSON} countryJson
     * @returns {TaxDetails|null}
     */
    #extractTaxDetailsFromCountryJson(countryJson) {

        const {id} = countryJson;

        switch (id) {
            case CountryIDsEnum.CYPRUS_ID:
                return this.#extractTaxDetailsFromCyprusJson(id, countryJson);
            case CountryIDsEnum.AUSTRALIA_ID:
                return this.#extractTaxDetailsFromAustraliaJson(id, countryJson);
            case CountryIDsEnum.GERMANY_ID:
                return this.#extractTaxDetailsFromGermanyJson(id, countryJson);
            // case CountryIDsEnum.GREECE_ID:
            //     return GreeceTaxDetailsLoader.loadTaxDetailsFromCountryObject(countryObj);
            default:
                return null;
        }
    }

    /**
     * @param {Number} countryId
     * @param {JSON} countryJson
     * @returns {TaxDetails}
     */
    #extractTaxDetailsFromCyprusJson(countryId, countryJson) {
        const cyprusTaxDetails = cyprusTaxDetailsConverter.convertIntoCyprusTaxDetailsFromJson(countryJson);
        return cyprusTaxDetailsConverter.convertIntoTaxDetails(countryId, cyprusTaxDetails);
    }

    /**
     * @param {Number} countryId
     * @param {JSON} countryJson
     * @returns {TaxDetails}
     */
    #extractTaxDetailsFromAustraliaJson(countryId, countryJson) {
        const australiaTaxDetails = australiaTaxDetailsConverter.convertIntoAustraliaTaxDetailsFromJson(countryJson);
        return australiaTaxDetailsConverter.convertIntoTaxDetails(countryId, australiaTaxDetails);
    }

    /**
     * @param {Number} countryId
     * @param {JSON} countryJson
     * @returns {TaxDetails}
     */
    #extractTaxDetailsFromGermanyJson(countryId, countryJson) {
        const germanyTaxDetails = germanTaxDetailsConverter.convertIntoGermanTaxDetailsFromJson(countryJson);
        return germanTaxDetailsConverter.convertIntoTaxDetails(countryId, germanyTaxDetails);
    }

    /**
     * @param {JSON} countryJson
     * @returns {TaxOptions|null}
     */
    #extractTaxOptionsFromCountryJson(countryJson) {

        const {id} = countryJson;

        switch (id) {
            case CountryIDsEnum.CYPRUS_ID:
                return this.#extractTaxOptionsFromCyprusJson(id, countryJson);
            case CountryIDsEnum.AUSTRALIA_ID:
                return this.#extractTaxOptionsFromAustraliaJson(id, countryJson);
            case CountryIDsEnum.GERMANY_ID:
                return this.#extractTaxOptionsFromGermanJson(id, countryJson);
            // case CountryIDsEnum.GREECE_ID:
            //     return GreeceTaxDetailsLoader.loadTaxDetailsFromCountryObject(countryObj);
            default:
                return null;
        }
    }

    /**
     * @param {Number} countryId
     * @param {JSON} countryJson
     * @returns {TaxOptions}
     */
    #extractTaxOptionsFromCyprusJson(countryId, countryJson) {
        const cyprusTaxOptions = cyprusTaxOptionsConverter.convertIntoCyprusTaxOptionsFromJson(countryJson);
        return cyprusTaxOptionsConverter.convertIntoTaxOptions(countryId, cyprusTaxOptions);
    }

    /**
     * @param {Number} countryId
     * @param {JSON} countryJson
     * @returns {TaxOptions}
     */
    #extractTaxOptionsFromAustraliaJson(countryId, countryJson) {
        const australiaTaxOptions = australiaTaxOptionsConverter.convertIntoAustraliaTaxOptionsFromJson(countryJson);
        return australiaTaxOptionsConverter.convertIntoTaxOptions(countryId, australiaTaxOptions);
    }

    /**
     * @param {Number} countryId
     * @param {JSON} countryJson
     * @returns {TaxOptions}
     */
    #extractTaxOptionsFromGermanJson(countryId, countryJson) {
        const germanTaxOptions = germanTaxOptionsConverter.convertIntoGermanTaxOptionsFromJson(countryJson);
        return australiaTaxOptionsConverter.convertIntoTaxOptions(countryId, germanTaxOptions);
    }
}

export const datastoreUpdater = Object.freeze(new DatastoreUpdater());