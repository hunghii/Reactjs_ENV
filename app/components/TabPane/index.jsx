import React, { memo } from 'react';
import { Tabs as AntTabs } from 'antd';
import styled from 'styled-components';

const TabPane = props => <AntTabs.TabPane {...props} />;
export default styled(memo(TabPane))``;
