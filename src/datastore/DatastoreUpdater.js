import CountryIDsEnum from "./CountryIDsEnum";
import {countryStore} from "./CountryStore.js";
import {taxDetailsStore} from "./TaxDetailsStore.js";
import {taxOptionsStore} from "./TaxOptionsStore.js";
import {userSelectionsStore} from "./UserSelectionsStore.js";
import {countryFromJsonConverter} from "../countries/CountryFromJsonConverter.js";
import {cyprusTaxOptionsConverter} from "../countries/cyprus/controller/converter/CyprusTaxOptionsConverter.js";
import {cyprusTaxDetailsConverter} from "../countries/cyprus/controller/converter/CyprusTaxDetailsConverter.js";
// import {AustraliaTaxDetailsLoader} from "../countries/australia/controller/AustraliaTaxDetailsLoader";
// import {GermanyTaxDetailsLoader} from "../countries/germany/control/GermanTaxDetailsLoader";
// import {GreeceTaxDetailsLoader} from "../countries/greece/control/GreeceTaxDetailsLoader";

class DatastoreUpdater {

    /**
     * @param {JSON} newOrUpdatedCountryDataJson
     */
    handleNewOrUpdateCountryJson(newOrUpdatedCountryDataJson) {

        const newOrUpdatedCountry = countryFromJsonConverter.convertCountryFromJson(newOrUpdatedCountryDataJson);
        countryStore.addOrReplaceCountry(newOrUpdatedCountry);

        const newOrUpdatedTaxDetails = this.#extractTaxDetailsFromCountryJson(newOrUpdatedCountryDataJson);
        if(newOrUpdatedTaxDetails) {
            taxDetailsStore.addOrReplaceTaxDetails(newOrUpdatedTaxDetails);
        }

        const newOrUpdatedTaxOptions = this.#extractTaxOptionsFromCountryJson(newOrUpdatedCountryDataJson);
        if(newOrUpdatedTaxOptions) {
            taxOptionsStore.addOrReplaceTaxOptions(newOrUpdatedTaxOptions);
        }

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
            // case CountryIDsEnum.AUSTRALIA_ID:
            //     return AustraliaTaxDetailsLoader.loadTaxDetailsFromCountryObject(countryObj);
            // case CountryIDsEnum.GERMANY_ID:
            //     return GermanyTaxDetailsLoader.loadTaxDetailsFromCountryObject(countryObj);
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
     * @param {JSON} countryJson
     * @returns {TaxOptions|null}
     */
    #extractTaxOptionsFromCountryJson(countryJson) {

        const {id} = countryJson;

        switch (id) {
            case CountryIDsEnum.CYPRUS_ID:
                return this.#extractTaxOptionsFromCyprusJson(id, countryJson);
            // case CountryIDsEnum.AUSTRALIA_ID:
            //     return AustraliaTaxDetailsLoader.loadTaxDetailsFromCountryObject(countryObj);
            // case CountryIDsEnum.GERMANY_ID:
            //     return GermanyTaxDetailsLoader.loadTaxDetailsFromCountryObject(countryObj);
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
}

export const datastoreUpdater = Object.freeze(new DatastoreUpdater());