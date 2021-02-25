/* eslint-disable react/prop-types */
import React from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';

const InjectMassage = props => (
  <FormattedMessage {...props}>
    {txt => <span className={props.className}>{txt}</span>}
  </FormattedMessage>
);
export default injectIntl(InjectMassage, {
  withRef: false,
});
