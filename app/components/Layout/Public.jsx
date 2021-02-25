/* eslint-disable react/prop-types */
import React, { memo, useEffect, useCallback, useState } from "react";
import {
  makeSelectIsAuthenticated,
  makeSelectAppConfig,
} from "containers/App/selectors";
import { createStructuredSelector } from "reselect";
import ServiceBase from "utils/ServiceBase";
import { browseGlobalConfig, logOut } from "containers/App/actions";
import styled from "styled-components";
import { Layout } from "antd";
import { connect } from "react-redux";
import { compose } from "recompose";

const Public = ({children}) => {
  return <div id="abc" >{children}</div>;
};

export default Public;
