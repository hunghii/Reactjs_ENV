/* eslint-disable no-underscore-dangle */
import PropTypes from 'prop-types';
import React, { memo } from 'react';
import styled from 'styled-components';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import { defineMessages, FormattedMessage } from 'react-intl';
import * as style from 'components/Variables';
const prefix = 'app.routing.';
function Footer({ className, pathName }) {
  const _messages = defineMessages({
    moduleName: {
      id: `${prefix}${pathName}`,
      defaultMessage: 'Không tìm thấy trang',
    },
  });
  return (
    <Breadcrumb className={className} separator="/">
      <Breadcrumb.Item>
        <Link to="/">
          <span>Trang chủ</span>
        </Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item>
        <Link to={pathName}>
          <FormattedMessage {..._messages.moduleName} />
        </Link>
      </Breadcrumb.Item>
    </Breadcrumb>
  );
}

Footer.propTypes = {
  className: PropTypes.any,
  pathName: PropTypes.any,
};

export default memo(styled(Footer)`
  padding: 1rem 0 1rem 0;
  a {
    color: ${style.color.haiVan.primary};
    font-weight: bold;
    font-size: ${style.fontsize.reg};
  }
  a:hover {
    color: ${style.color.haiVan.bg} !important;
  }
`);
