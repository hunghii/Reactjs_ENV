/**
 * Create the store with dynamic reducers
 */

import { createStore, applyMiddleware, compose } from "redux";
import { routerMiddleware } from "connected-react-router";
import createSagaMiddleware from "redux-saga";
import { Map } from "immutable";
import createReducer from "./reducers";
import { connectMqtt } from "./containers/App/actions";
import mqtt from "mqtt";

// const patchStoreToAddLogging = () => {
  // return (store) => {

    // connect mqtt ẩn đi

    // const option = {
    //   username: "mqtt",
    //   password: "HazClients@123",
    //   clientId:
    //     "mqttjs_" +
    //     Math.random()
    //       .toString(16)
    //       .substr(2, 8),
    // };
    // const client = mqtt.connect("wss://emqx.havazdev.net:8087/mqtt", option);
    // client.on("connect", () => {
    //   store.dispatch(connectMqtt(client));
    // });
    // client.on("message", (topic, message) => {
    // client.on("message", (topic, message) => {
    //   // message is Buffer
    //   try {
    //     let arrLocation = message.toString();
    //     let _arrLocation = JSON.parse(arrLocation);

    //   } catch (error) {
    //     console.log("error", error);
    //   }
    // });
    // client.on("disconnect", (topic) => {
    //   console.log('disconnect')
    // })
    // client.on("error", (topic) => {
    //   console.log('error')
    // })
    // client.on('close', function (topic) {
    //   console.log('close',topic)
    // })
    // return (next) => (action) => {
    //   next(action);
    // };
//   };
// };
export default function configureStore(initialState = {}, history) {
  let composeEnhancers = compose;
  const reduxSagaMonitorOptions = {};

  // If Redux Dev Tools and Saga Dev Tools Extensi≠ons are installed, enable them
  /* istanbul ignore next */
  if (process.env.NODE_ENV !== "production" && typeof window === "object") {
    /* eslint-disable no-underscore-dangle */
    if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
      composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({});

    // NOTE: Uncomment the code below to restore support for Redux Saga
    // Dev Tools once it supports redux-saga version 1.x.x
    // if (window.__SAGA_MONITOR_EXTENSION__)
    //   reduxSagaMonitorOptions = {
    //     sagaMonitor: window.__SAGA_MONITOR_EXTENSION__,
    //   };
    /* eslint-enable */
  }

  const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);

  // Create the store with two middlewares
  // 1. sagaMiddleware: Makes redux-sagas work
  // 2. routerMiddleware: Syncs the location/URL path to the state
  const middlewares = [
    sagaMiddleware,
    routerMiddleware(history),
    // patchStoreToAddLogging(),
  ];

  const enhancers = [applyMiddleware(...middlewares)];

  const store = createStore(
    createReducer(),
    initialState,
    composeEnhancers(...enhancers)
  );

  // Extensions
  store.runSaga = sagaMiddleware.run;
  store.injectedReducers = {}; // Reducer registry
  store.injectedSagas = {}; // Saga registry

  // Make reducers hot reloadable, see http://mxs.is/googmo
  /* istanbul ignore next */
  if (module.hot) {
    module.hot.accept("./reducers", () => {
      store.replaceReducer(createReducer(store.injectedReducers));
    });
  }

  return store;
}
