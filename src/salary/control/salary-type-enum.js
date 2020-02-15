// @ts-check

import { SalaryType } from "../model/salary-type.js";

/**
 * Enum for salary types
 *
 * @readonly
 * @enum {SalaryType}
 */
export const SalaryTypes = Object.freeze({
    MONTHLY: new SalaryType(1, "Monthly"),
    ANNUAL: new SalaryType(2, "Annual")
});
