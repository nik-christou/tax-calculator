import {ResidenceType} from './ResidenceType.js';

/**
 * Enum for residence types
 * @enum {ResidenceType}
 */
export const ResidenceTypes = Object.freeze({
    RESIDENT: new ResidenceType(1, 'resident'),
    NON_RESIDENT: new ResidenceType(2, 'non-resident')
});