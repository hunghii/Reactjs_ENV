/**
 *
 * Asynchronously loads the component for A tag
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
