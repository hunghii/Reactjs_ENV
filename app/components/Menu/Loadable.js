/**
 *
 * Asynchronously loads the component for B tag
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
