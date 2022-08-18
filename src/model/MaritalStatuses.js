import {MaritalStatus} from './MaritalStatus.js';

/**
 * Enum for marital status
 *
 * @readonly
 * @enum {MaritalStatus}
 */
export const MaritalStatuses = Object.freeze({
    MARRIED: new MaritalStatus(1, 'married'),
    SINGLE: new MaritalStatus(2, 'single')
});
