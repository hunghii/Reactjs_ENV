/**
 * ErrorMessage (Component)
 */

import PropTypes from 'prop-types';
import React, { memo } from 'react';

import Wrapper from './Wrapper';

const ErrorMessage = ({ componentStack, error }) => (
  <div>
    <Wrapper>
      <p>
        <strong>Oops! An error occured!</strong>
      </p>
      <p>Here’s what we know…</p>
      <p>
        <strong>Error:</strong> {error.toString()}
      </p>
      <p>
        <strong>Stacktrace:</strong> {componentStack}
      </p>
    </Wrapper>
  </div>
);

ErrorMessage.propTypes = {
  componentStack: PropTypes.any,
  error: PropTypes.shape({
    toString: PropTypes.func,
  }),
};

export default memo(ErrorMessage);
