/* eslint-disable no-underscore-dangle */
/**
 *
 * SignIn
 *
 */

import React, { memo, useCallback, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose, bindActionCreators } from "redux";
import Globals from "utils/globals";
import { Ui } from "utils/Ui";
import { makeSelectIsAuthenticated } from "containers/App/selectors";
import { setAuthenticated, setEntry } from "containers/App/actions";
import ServiceBase from "utils/ServiceBase";
import { createStructuredSelector } from "reselect";
import { Form, Row, Typography, Button, Checkbox, Col, Avatar } from "antd";
import { Paper } from "@material-ui/core";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import _ from "lodash";
import Input from "components/Input";
import { URI } from "./constants";
import BackgroundSingin from "images/HaiVan170426-106.jpg";
import IconSingin from "images/HV1.png";
import BackgroundFrom from "images/aqua_geometry_abstract_background_6816196.jpg";
import "./style.scss";
const { Title } = Typography;
const formLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const SignIn = ({ className, isAuthenticated, setAuthenticated }) => {
  const [, setIsFetching] = useState(false);
  const _handleLogIn = useCallback(
    async (param) => {
      setIsFetching(true);
      const result = await ServiceBase.requestJson({
        method: "POST",
        url: URI.SIGN_IN,
        data: {
          username: _.get(param, "username"),
          password: _.get(param, "password"),
        },
      });

      if (result.hasErrors) {
        Ui.showErrors(result.errors);
        setIsFetching(false);
      } else {
        Ui.showSuccess({ message: "Đăng nhập hệ thống thành công." });
        let profile = _.get(result, "value", {});
        profile = {
          ...profile,
          parentName: _.get(profile, "value.adm_name", ""),
          parentId: _.get(profile, "value.adm_id", ""),
          rolesName: _.get(profile, "value.role", ""),
        };
        delete profile.role;
        Globals.setSession({
          public: {
            erpReport: JSON.stringify(profile),
          },
          private: {
            token: _.get(result, "value.accessToken"),
            refresh_token: _.get(result, "value.refresh_token"),
          },
        });

        setAuthenticated({
          isAuthenticated: true,
          profile,
        });
      }
    },
    [setAuthenticated]
  );

  const onFinishFailed = useCallback(() => {}, []);
  if (isAuthenticated) {
    return <Redirect to="/" />;
  }
  return (
    <Paper
      className={className}
      style={{
        backgroundImage: `url(${BackgroundSingin})`,
        backgroundSize: "cover",
        boxShadow: "unset",
        backgroundRepeat: "no-repeat",

        // backgroundPosition: "bottom",
      }}
    >
      <Row
        gutter={15}
        className="animation"
        style={{
          width: "25%",
          backgroundImage: `url(${BackgroundFrom})`,
          backgroundSize: "cover",
        }}
      >
        <Col xs={24}>
          <Title className="loginTitle" level={3}>
            Đăng nhập
          </Title>
        </Col>
        <Col xs={24} className="d-flex justify-content-center">
          <img src={IconSingin} alt="Trulli" width="300" height="150" />
        </Col>
        <Form
          style={{ width: "100%" }}
          {...formLayout}
          name="signin"
          initialValues={{ remember: true }}
          onFinish={_handleLogIn}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Tài khoản"
            name="username"
            rules={[{ required: true, message: "Nhập tên tài khoản" }]}
          >
            <Input style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: "Nhập mật khẩu" }]}
          >
            <Input.Password style={{ width: "100%" }} />
          </Form.Item>
          <Row gutter={15}>
            <Col xxl={6} xl={7} lg={7} md={7}>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Đăng nhập
                </Button>
              </Form.Item>
            </Col>
            <Col xxl={18} xl={17} lg={17} md={17}>
              <Form.Item name="remember" valuePropName="checked">
                <Checkbox>Ghi nhớ mật khẩu</Checkbox>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Row>
    </Paper>
  );
};

SignIn.propTypes = {
  setAuthenticated: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  className: PropTypes.any.isRequired,
};

const mapStateToProps = createStructuredSelector({
  isAuthenticated: makeSelectIsAuthenticated(),
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setAuthenticated,
    },
    dispatch
  );
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);
export default compose(
  withConnect,
  memo
)(styled(SignIn)`
  .MuiPaper-rounded {
    background: red;
  }

  display: flex;
  justify-content: center;
  padding: 120px 0;
  background-color: #fff;
  .loginTitle {
    text-align: center;
  }
  .ant-row {
    // background-color: #f2f6fc;
    border-radius: 5px;
    padding: 15px;
    justify-content: center;
    .btnLogin {
      display: flex;
    }
  }
  .ant-form-item {
    margin-bottom: 0px;
    .ant-form-item-label {
      text-align: left;
    }
    .ant-form-item-required:before {
      display: none !important;
    }
    .ant-form-item-required:after {
      color: #f5222d;
      font-size: 14px;
      font-family: SimSun, sans-serif;
      line-height: 1;
      content: "*" !important;
    }
  }
`);
