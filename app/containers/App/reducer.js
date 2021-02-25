/*
 *
 * DemoApp reducer
 *
 */
import { Map } from "immutable";
import Globals from "utils/globals";
import _ from "lodash";
import produce from "immer";
import setupSession from "utils/setupSession";
import {
  BROWSE_GLOBAL_CONFIG,
  SET_AUTHENTICATED,
  LOGOUT,
  SET_ENTRY,
  SET_MQTT,
  ACTION_SELECT,
} from "./constants";

setupSession();
export const initialState = Map({
  isAuthenticated: Globals.isAuthenticated,
  profile: Globals.erpReport || {},
  appConfig: {},
  client: {},
  dataSelect: [],
});

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    let nextState = state;
    const { payload } = action;
    switch (action.type) {
      case BROWSE_GLOBAL_CONFIG.SUCCESS:
        return state;
      case "app/Launcher/BROWSE_GLOBAL_CONFIG/TRIGGER":
        nextState = nextState.set("appConfig", action.payload.value);
        return nextState;
      case SET_AUTHENTICATED:
        nextState = nextState.set(
          "isAuthenticated",
          _.get(payload, "isAuthenticated")
        );
        nextState = nextState.set("profile", _.get(payload, "profile"));
        return nextState;
      case SET_ENTRY:
        return nextState;
      case SET_MQTT:
        nextState = nextState.set(
          "client",
          _.get(payload, "client")
        );
        return nextState;
      case ACTION_SELECT:
        nextState = nextState.set("dataSelect", _.get(payload, "dataSelect"));
        return nextState;
      case LOGOUT:
        Globals.clear();
        nextState = nextState.set("isAuthenticated", false);
        nextState = nextState.set("profile", {});
        return nextState;
      default:
        return state;
    }
  });

export default appReducer;
