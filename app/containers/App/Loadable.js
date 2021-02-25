/**
 *
 * Asynchronously loads the component for DemoApp
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
