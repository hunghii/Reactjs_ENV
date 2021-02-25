/* eslint-disable react/prop-types */
import React, { useState, useCallback } from 'react';
import _ from 'lodash';
export default Component => ({ props }) => {
  const [visible, setVisible] = useState(false);
  const toggleOpen = useCallback(e => {
    if (e && _.isFunction(e.preventDefault)) {
      e.preventDefault();
    }
    setVisible(prevState => !prevState);
  }, []);
  return <Component {...props} visible={visible} toggleOpen={toggleOpen} />;
};
