import { css } from 'styled-components';
import * as style from 'components/Variables';

const ValidationStyle = css`
  .mark-required-color {
    margin-left: 0.2em;
    font-size: ${style.fontsize.small};
    color: ${style.color.danger};
  }
`;

export default ValidationStyle;
