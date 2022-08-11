import { EmploymentType } from './EmploymentType.js';

/**
 * Enum for employment types
 *
 * @readonly
 * @enum {EmploymentType}
 */
export const EmploymentTypes = Object.freeze({
    EMPLOYED: new EmploymentType(1, 'employed'),
    SELF_EMPLOYED: new EmploymentType(2, 'self-employed')
});
