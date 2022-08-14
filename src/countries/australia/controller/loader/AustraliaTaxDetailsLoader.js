import { AustraliaTaxDetails } from '../../model/AustraliaTaxDetails.js';
import { AustraliaTaxBracket } from '../../model/AustraliaTaxBracket.js';
import { AustraliaResidents } from '../../model/AustraliaResidents.js';
import { AustraliaNonResidents } from '../../model/AustraliaNonResidents.js';

class AustraliaTaxDetailsLoader {

    /**
     * @param {JSON} countryObj
     * @returns {AustraliaTaxDetails}
     */
    loadTaxDetailsFromCountryObject(countryObj) {

        const {taxDetails} = countryObj;

        const residents = this.#loadResidentsData(taxDetails);
        const nonResidents = this.#loadNonResidentsData(taxDetails);

        return new AustraliaTaxDetails(residents, nonResidents);
    }

    /**
     * @param {JSON} taxDetailsJson
     */
    #loadResidentsData(taxDetailsJson) {
        const {resident} = taxDetailsJson;
        const taxBrackets = this.#loadTaxBrackets(resident.taxBrackets);
        return new AustraliaResidents(taxBrackets, resident.medicarePercent);
    }

    /**
     * @param {JSON} taxDetails
     */
    #loadNonResidentsData(taxDetails) {
        const {nonResident} = taxDetails;
        const taxBrackets = this.#loadTaxBrackets(nonResident.taxBrackets);
        return new AustraliaNonResidents(taxBrackets);
    }

    /**
     * @param {any} taxBracketsJson
     */
    #loadTaxBrackets(taxBracketsJson) {
        const taxBrackets = [];

        taxBracketsJson.forEach((taxBracketJson) => {
            const end = taxBracketJson.end === -1 ? Number.POSITIVE_INFINITY : taxBracketJson.end;
            const taxBracket = new AustraliaTaxBracket(
                taxBracketJson.start, 
                end, 
                taxBracketJson.fixedCharge, 
                taxBracketJson.ratePercent);

            taxBrackets.push(taxBracket);
        });

        return taxBrackets;
    }
}

export const australiaTaxDetailsLoader = Object.freeze(new AustraliaTaxDetailsLoader());
