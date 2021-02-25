import { compose } from "recompose";
import { Route } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import React, { memo } from "react";
import { Switch, Redirect } from "react-router";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import _ from "lodash";

import { $LocalStorage } from "utils/localStorage";
import { APP_PARAM } from "utils/constants";
import { Helmet } from "react-helmet";
import Globals from "utils/globals";
import {
  makeSelectAppConfig,
  makeSelectProfile,
} from "containers/App/selectors";
import { BrowserRouter } from "react-router-dom";
import { publicRouter } from "./routes";
const AppRoute = ({
  component: Component,
  layout: Layout,
  path: Path,
  appConfig,
  profile,
  ...rest
}) => {
  let isLoginPath = Path === "/signin";
  let isMap = Path === "/vt/:id";
  if (!Globals.isAuthenticated && !isLoginPath && !isMap) {
    return (
      <Redirect
        to={{
          pathname: "/signin",
          state: { from: rest.location },
        }}
      />
    );
  }
  if (Globals.isAuthenticated && isLoginPath && !isMap) {
    return <Redirect to="/" />;
  }
  return (
    <Route
      {...rest}
      render={(props) => {
        const appParam = _.get($LocalStorage.sls.getObject(APP_PARAM), "", {});
        return (
          <Layout {...props} profile={profile}>
            <Helmet
              titleTemplate="%s - ERP REPORT"
              defaultTitle="ERP REPORT"
            >
              <meta name="description" content="ERP REPORT" />
            </Helmet>
            <Component
              appParam={appParam}
              appConfig={appConfig}
              profile={profile}
            />
          </Layout>
        );
      }}
    />
  );
};
AppRoute.propTypes = {
  component: PropTypes.any.isRequired,
  layout: PropTypes.any.isRequired,
  path: PropTypes.any.isRequired,
  appConfig: PropTypes.any.isRequired,
  profile: PropTypes.any.isRequired,
};

const AppRouter = ({ appConfig, profile }) => (
  console.log('appConfig',appConfig),
  <BrowserRouter>
    <Switch>
      {_.map(publicRouter, (route, routeId) => (
        <AppRoute
          {...route}
          appConfig={appConfig}
          profile={profile}
          key={routeId}
        />
      ))}
    </Switch>
  </BrowserRouter>
);
AppRouter.propTypes = {
  appConfig: PropTypes.any.isRequired,
  profile: PropTypes.any.isRequired,
};
const mapStateToProps = createStructuredSelector({
  appConfig: makeSelectAppConfig(),
  profile: makeSelectProfile(),
});
const withConnect = connect(
  mapStateToProps,
  null
);
export default compose(
  withConnect,
  memo
)(AppRouter);
