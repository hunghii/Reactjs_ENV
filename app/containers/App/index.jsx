/**
 *
 * DemoApp
 *
 */

import React, { memo } from 'react';
import AppRouter from 'containers/AppRouter';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { ToastContainer } from 'react-toastify';
import reducer from './reducer';
import saga from './saga';
import 'react-toastify/dist/ReactToastify.css';
import GlobalStyle from 'containers/Style/global-styles';
import  "containers/Style/style.scss"
export function App() {
  useInjectReducer({ key: 'App', reducer });
  useInjectSaga({ key: 'App', saga });
  return (
    <div id="LauncherApp">
      <AppRouter />
      <ToastContainer />
      <GlobalStyle />
    </div>
  );
}

App.propTypes = {};
export default memo(App);
