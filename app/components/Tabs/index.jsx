import React, { memo } from 'react';
import { Tabs as AntTabs } from 'antd';
import styled from 'styled-components';
import * as style from 'components/Variables';

const Tabs = props => <AntTabs {...props} />;
export default styled(memo(Tabs))`
  .ant-tabs-tab.ant-tabs-tab-active {
    color: ${style.color.haiVan.default} !important;
    background: ${style.color.haiVan.bg} !important;
  }
  .ant-tabs-nav .ant-tabs-tab-active {
    font-weight: 400;
  }
  .ant-tabs-nav .ant-tabs-tab:hover {
    color: ${style.color.haiVan.bg};
  }
`;
