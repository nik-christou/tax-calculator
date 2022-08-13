import {TaxOptions} from "../../../../model/TaxOptions.js";
import {CyprusTaxOptions} from "../../model/CyprusTaxOptions.js";
import {cyprusTaxOptionsLoader} from "../loader/CyprusTaxOptionsLoader.js";
import {EmploymentTypes} from "../../../../model/EmploymentTypes";

class CyprusTaxOptionsConverter {

    /**
     * @param {TaxOptions} taxOptions
     * @returns {CyprusTaxOptions}
     */
    convertIntoCyprusTaxOptions(taxOptions) {
        const cyprusTaxOptionsObj = taxOptions.options;
        const {employmentTypeFromObj} = cyprusTaxOptionsObj;
        const employmentType = this.#retrieveEmploymentType(employmentTypeFromObj);
        return new CyprusTaxOptions(employmentType);
    }

    #retrieveEmploymentType(employmentType) {
        if(employmentType === EmploymentTypes.EMPLOYED.type) {
            return EmploymentTypes.EMPLOYED;
        }
        return EmploymentTypes.SELF_EMPLOYED;
    }

    /**
     * @param {JSON} countryJson
     * @returns {CyprusTaxOptions}
     */
    convertIntoCyprusTaxOptionsFromJson(countryJson) {
        return cyprusTaxOptionsLoader.loadTaxOptionsFromCountryObject(countryJson);
    }

    /**
     * @param {Number} countryId
     * @param {CyprusTaxOptions} cyprusTaxOptions
     * @returns {TaxOptions}
     */
    convertIntoTaxOptions(countryId, cyprusTaxOptions) {
        return new TaxOptions(countryId, cyprusTaxOptions);
    }
}

export const cyprusTaxOptionsConverter = Object.freeze(new CyprusTaxOptionsConverter());