/**
 *
 * Profile
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { Avatar, Divider, Row, Col } from 'antd';
import styled from 'styled-components';
import { UserOutlined, StarFilled } from '@ant-design/icons';
import logo from 'images/Apps-Samsung-icon-jp.jpg';
import Info from './Info';
const Profile = ({ profile, className }) => (
  <div className={className}>
    <Helmet title="THÔNG TIN TÀI KHOẢN">
      <meta name="description" content="Hồ sơ doanh nghiệp - ERP REPORT" />
    </Helmet>
    <Row gutter={15} style={{ background: 'white' }}>
      <Col md={24} className="d-flex justify-content-center align-items-end">
        <span className="text-body text-center font_20 font_600">
          {profile.parentName}
        </span>
        <span className="ml_10">
          {logo ? (
            <Avatar src={logo} shape="square" size={40} />
          ) : (
            <Avatar
              style={{ backgroundColor: '#fff' }}
              shape="square"
              size={100}
            />
          )}
        </span>
      </Col>
      <Col md={24}>
        <Divider>
          <StarFilled />
        </Divider>
      </Col>
    </Row>
    <Row
      gutter={15}
      style={{ background: 'white' }}
      className="d-flex justify-content-center"
    >
     
      <Col xl={8} md={18} sm={24}>
        <Info profile={profile} />
      </Col>
    </Row>
  </div>
);

Profile.propTypes = {
  profile: PropTypes.any.isRequired,
  className: PropTypes.any.isRequired,
};
export default styled(memo(Profile))``;
