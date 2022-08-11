import { AustraliaTaxDetails } from '../model/AustraliaTaxDetails.js';
import { AustraliaTaxBracket } from '../model/AustraliaTaxBracket.js';
import { AustraliaResidents } from '../model/AustraliaResidents.js';
import { AustraliaNonResidents } from '../model/AustraliaNonResidents.js';

export class AustraliaTaxDetailsLoader {

    /**
     * @param {import('../../data/AustraliaTaxData.js').AustraliaTaxData} australiaTaxData
     * @returns {Promise<AustraliaTaxDetails>} the tax details
     */
    static async loadTaxDetailsFromCountryObject(australiaTaxData) {
        
        const residents = this._loadResidentsData(australiaTaxData);
        const nonResidents = this._loadNonResidentsData(australiaTaxData);

        return new AustraliaTaxDetails(residents, nonResidents);
    }

    /**
     * @param {{ residents: any; }} data
     */
    static _loadResidentsData(data) {
        const residents = data.residents;
        const taxBrackets = this._loadTaxBrackets(residents.taxBrackets);
        return new AustraliaResidents(taxBrackets, residents.medicarePercent);
    }

    /**
     * @param {{ nonResidents: any; }} data
     */
    static _loadNonResidentsData(data) {
        const nonResidents = data.nonResidents;
        const taxBrackets = this._loadTaxBrackets(nonResidents.taxBrackets);

        return new AustraliaNonResidents(taxBrackets);
    }

    /**
     * @param {any} taxBracketsJson
     */
    static _loadTaxBrackets(taxBracketsJson) {
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
