/*
 *
 * App actions
 *
 */
import { createRoutine } from 'redux-saga-routines';
import { BROWSE_GLOBAL_CONFIG, SET_AUTHENTICATED, LOGOUT, SET_ENTRY,SET_MQTT,ACTION_SELECT } from './constants';

const browseGlobalConfig = createRoutine(BROWSE_GLOBAL_CONFIG, null, {
  prefix: BROWSE_GLOBAL_CONFIG,
});
const setAuthenticated = ({ isAuthenticated, profile }) => ({
  type: SET_AUTHENTICATED,
  payload: {
    isAuthenticated,
    profile,
  },
});

const setEntry = (entry) => ({
  type: SET_ENTRY,
  payload: {
    entry
  },
});
const logOut = () => ({
  type: LOGOUT,
});
const connectMqtt = (client)=>({
  type : SET_MQTT,
  payload:{
    client
  }
})
const actionSelect = (dataSelect)=>({
  type:ACTION_SELECT,
  payload:{
    dataSelect
  }
})
export { browseGlobalConfig, setAuthenticated, logOut, setEntry,connectMqtt,actionSelect };
