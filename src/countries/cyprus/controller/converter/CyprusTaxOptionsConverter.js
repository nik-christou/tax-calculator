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
        const {employmentType} = cyprusTaxOptionsObj;
        const employmentTypeObj = this.#retrieveEmploymentType(employmentType);
        return new CyprusTaxOptions(this.#retrieveEmploymentType(employmentTypeObj));
    }

    #retrieveEmploymentType(employmentTypeFromObj) {
        console.log(employmentTypeFromObj);
        if(employmentTypeFromObj.type === EmploymentTypes.EMPLOYED.type) {
            return EmploymentTypes.EMPLOYED;
        }
        return EmploymentTypes.SELF_EMPLOYED;
    }

    /**
     * @param {JSON} countryJson
     * @returns {CyprusTaxOptions}
     */
    convertIntoCyprusTaxOptionsFromJson(countryJson) {
        return cyprusTaxOptionsLoader.loadCyprusTaxOptionsFromCountryObject(countryJson);
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