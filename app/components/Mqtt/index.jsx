// import React, { memo, useState, useEffect, useCallback } from "react";
// import PropTypes from "prop-types";
// import mqtt from "mqtt";
// import _ from "lodash";
// import { createStructuredSelector } from "reselect";
// import { makeSelectMap } from "containers/App/selectors";
// import { connect } from "react-redux";
// import { compose } from "recompose";
// const connectMqtt = memo(({ setDataMap, plate, arrBks, client }) => {
//   const resultMqtt = () => {
//     useEffect(() => {
//       let checkSize = _.size(client);
//       if (checkSize > 0) {
//         _.map(arrBks, (item) => {
//           client.subscribe(`${item}`, (err) => {
//             // Dispatch action store.dispatch()
//             if (!err) {
//               // client.publish(`vungtau/29B31105`, "mqtt success");
//             }
//           });
//         });
//         client.on("message", (topic, message) => {
//           // message is Buffers
//           try {
//             let arrLocation = message.toString();
//             let _arrLocation = JSON.parse(arrLocation);
//             setDataMap((preState) => {
//               let nextState = { ...preState };
//               nextState.data[_arrLocation.license_plate] = _arrLocation;
//               return nextState;
//             });

//             //  else if (plate === "haivan/#") {
//             //   setDataMap((preState) => {
//             //     let nextState = { ...preState };
//             //     nextState.data = [...nextState.data, _arrLocation];
//             //     return nextState;
//             //   });
//             // } else {
//             // setDataMap((preState) => {
//             //   let nextState = { ...preState };
//             //   nextState.data = [_arrLocation];
//             //   return nextState;
//             // });
//             // }
//           } catch (error) {
//             console.log("error", error);
//           }
//         });
//       }
//     }, [arrBks]);
//     // client.on("disconnect", (topic) => {
//     //   console.log("disconnect");
//     // });
//     // client.on("error", (topic) => {
//     //   console.log("error");
//     // });
//     // client.on("close", function(topic) {
//     //   console.log("close", option.clientId + " disconnected");
//     // });
//   };

//   return resultMqtt();
// });
// connectMqtt.propTypes = {
//   plate: PropTypes.string,
// };
// const mapStateToProps = createStructuredSelector({
//   client: makeSelectMap(),
// });
// const withConnect = connect(
//   mapStateToProps,
//   null
// );
// export default compose(withConnect)(connectMqtt);
