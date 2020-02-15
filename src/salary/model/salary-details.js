// @ts-check

import { SalaryType } from "./salary-type.js";

export class SalaryDetails {
    /**
     * @param {Number} amount
     * @param {SalaryType} type
     * @param {Boolean} includesThirteen
     */
    constructor(amount, type, includesThirteen) {
        this.amount = amount;
        this.type = type;
        this.includesThirteen = includesThirteen;

        Object.freeze(this.amount);
        Object.freeze(this.type);
        Object.freeze(this.includesThirteen);
        Object.freeze(this);
    }
}
