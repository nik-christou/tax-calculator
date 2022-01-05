import { SalaryType } from './SalaryType.js';

/**
 * Enum for salary types
 *
 * @readonly
 * @enum {SalaryType}
 */
export const SalaryTypes = Object.freeze({
    ANNUAL: new SalaryType(1, 'Annual'),
    MONTHLY: new SalaryType(2, 'Monthly')
});
