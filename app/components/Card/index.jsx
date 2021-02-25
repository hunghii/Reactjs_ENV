import React, { memo } from 'react';
import { Card as AntCard } from 'antd';
import styled, { css } from 'styled-components';

const defaultHeadBordered = css`
  border-bottom: '1px solid #dcdcdc';
`;
const noHeadBordered = css`
  border-bottom: none;
`;

const Card = props => <AntCard {...props} />;
export default styled(memo(Card))`
  .ant-card-body {
    padding: 1em;
  }
  .ant-card-head {
    padding: 0 1em 0 1em;
    ${props => (props.noheadbordered ? noHeadBordered : defaultHeadBordered)}
    .ant-card-head-wrapper {
      .ant-card-extra {
        padding: 0.5em 0px !important;
      }
    }
  }
`;
