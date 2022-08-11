import { dataLoaderUtil } from "./DataLoaderUtil.js";
import { countryStore } from "./CountryStore.js";
import { taxDetailsStore } from "./TaxDetailsStore.js";
import { taxOptionsStore } from "./TaxOptionsStore.js";
import { userSelectionsStore } from "./UserSelectionsStore.js";

class DatastoreManager {

    /**
     * @param {JSON} newOrUpdatedCountryDataJson
     */
    handleNewOrUpdateCountryJson(newOrUpdatedCountryDataJson) {

        const newOrUpdatedCountry = dataLoaderUtil.convertCountryFromJson(newOrUpdatedCountryDataJson);
        countryStore.addOrReplaceCountry(newOrUpdatedCountry);

        const newOrUpdatedTaxDetails = dataLoaderUtil.extractTaxDetailsFromJson(newOrUpdatedCountryDataJson);
        taxDetailsStore.addOrReplaceTaxDetails(newOrUpdatedTaxDetails);

        const newOrUpdatedTaxOptions = dataLoaderUtil.extractTaxOptionsFromJson(newOrUpdatedCountryDataJson);
        taxOptionsStore.addOrReplaceTaxOptions(newOrUpdatedTaxOptions);

        userSelectionsStore.resetUserSelections();
    }
}

export const datastoreManager = Object.freeze(new DatastoreManager());