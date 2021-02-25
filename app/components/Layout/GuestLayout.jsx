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
import {Layout} from "antd";
import { connect } from "react-redux";
import { compose } from "recompose";
import classNames from "classnames";

const { Header, Footer, Content } = Layout;
const AuthorizedLayout = ({
  className,
  location,
  children,
  profile,
  isAuthenticated,
  onBrowseGlobalConfig,
  onLogOut,
  appConfig,
}) => {
  const [collapsed, setCollapsed] = useState(false);
  const toggle = () => {
    setCollapsed(!collapsed);
  };
  const onBrowseGlobalConfigRequest = useCallback(async () => {
    const resultEntry = await ServiceBase.requestJson({
      method: "GET",
      url: "/menu",
      data: {},
    });
    onBrowseGlobalConfig(resultEntry);
  });

  useEffect(() => {
    onBrowseGlobalConfigRequest();
  }, [onBrowseGlobalConfig]);
  return <div className={classNames({
    [className]:true
  })}>{children}</div>;
};
const mapStateToProps = createStructuredSelector({
  isAuthenticated: makeSelectIsAuthenticated(),
  appConfig: makeSelectAppConfig(),
});
const mapDispatchToProps = (dispatch) => ({
  onBrowseGlobalConfig: (resultEntry) =>
    dispatch(browseGlobalConfig(resultEntry)),
  onLogOut: () => dispatch(logOut()),
});
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);
export default styled(
  compose(
    withConnect,
    memo
  )(AuthorizedLayout)
)`
  min-height: 100vh;
  header {
    padding: 0;
    height: 56px;
    line-height: inherit;
    // position: sticky;
    // top: 0;
    // z-index: 10;
  }
  main {
    min-height: calc(100vh - 56px - 200px);
    .main_container {
      padding: 0px 1rem 1rem 1rem;
    }
  }
  footer {
    z-index: 100;
    padding: 0;
  }
`;
