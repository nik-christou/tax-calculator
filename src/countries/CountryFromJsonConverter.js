import {Country} from "../model/Country";

class CountryFromJsonConverter {

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
}

export const countryFromJsonConverter = Object.freeze(new CountryFromJsonConverter());