import {ParentalStatus} from './ParentalStatus.js';

/**
 * Enum for marital status
 *
 * @readonly
 * @enum {ParentalStatus}
 */
export const ParentalStatuses = Object.freeze({
    NO_CHILDREN: new ParentalStatus(1, 'no children'),
    WITH_CHILDREN: new ParentalStatus(2, 'with children')
});
