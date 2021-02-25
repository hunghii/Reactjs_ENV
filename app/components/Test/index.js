/**
 *
 * Test
 *
 */

import PropTypes from 'prop-types';
import React, { memo } from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';

function Test({ className }) {
  return <div className={className}>dit con me</div>;
}

Test.propTypes = {
  className: PropTypes.any,
};

export default styled(memo(Test))`
  color: red;
`;
