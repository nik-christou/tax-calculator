import { AustraliaOptions } from "../entity/AustraliaOptions.js";

export class AustraliaOptionsLoader {

    /**
     * @param {Object} jsonData
     * @returns {Promise<AustraliaOptions>} the tax details
     */
    static async loadOptionsFromJsonData(jsonData) {

        const isResident = jsonData.residents;

        return new AustraliaOptions(isResident);
    }
}
