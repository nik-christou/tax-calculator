import { Country } from "./country/model/Country.js";
import { SalaryDetails } from "./salary/model/SalaryDetails.js";
import { TaxResults } from "./results/model/TaxResults.js";
import { getCountryJsonFilePath, getTaxLoaderFilePath, getTaxCalculatorFilePath } from "./CountryJsonMapper.js";

export class CountryTaxDispatcher {
    /**
     * @param {Country} country
     * @param {SalaryDetails} salaryDetails
     *
     * @returns {Promise<TaxResults>}
     */
    static process(country, salaryDetails) {
        switch (country.id) {
            case 1:
                return this._processCyprusTax(country, salaryDetails);
            default:
                return Promise.resolve(null);
        }
    }

    /**
     * @param {Country} country
     * @param {SalaryDetails} salaryDetails
     *
     * @returns {Promise<TaxResults>}
     */
    static async _processCyprusTax(country, salaryDetails) {
        const countryJsonFilePath = getCountryJsonFilePath(country.id);
        const taxLoaderFilePath = getTaxLoaderFilePath(country.id);
        const taxCalculatorFilePath = getTaxCalculatorFilePath(country.id);

        const taxLoaderModule = await import(taxLoaderFilePath);
        const taxCalculatorModule = await import(taxCalculatorFilePath);

        const CyprusTaxLoader = taxLoaderModule.CyprusTaxLoader;
        const CyprusTaxCalculator = taxCalculatorModule.CyprusTaxCalculator;

        const cyprusTaxDetails = await CyprusTaxLoader.loadTaxDetailsFromJson(countryJsonFilePath);
        const taxResults = CyprusTaxCalculator.calculateTax(cyprusTaxDetails, salaryDetails);

        return taxResults;
    }
}
