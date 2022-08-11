import { CyprusTaxOptions } from '../model/CyprusTaxOptions.js';
import {EmploymentTypes} from "../../../model/EmploymentTypes";

class CyprusTaxOptionsLoader {

    /**
    * @param {JSON} countryJsonObj
    * @returns {CyprusTaxOptions}
    */
    loadTaxOptionsFromCountryObject(countryJsonObj) {

        const {taxOptions} = countryJsonObj;
        const {employmentType} = taxOptions;
        const employment = this.#retrieveEmploymentType(employmentType);

        return new CyprusTaxOptions(employment);
    }

    #retrieveEmploymentType(employmentType) {
        if(employmentType === EmploymentTypes.EMPLOYED.type) {
            return EmploymentTypes.EMPLOYED;
        }
        return EmploymentTypes.SELF_EMPLOYED;
    }
}

export const cyprusTaxOptionsLoader = Object.freeze(new CyprusTaxOptionsLoader());