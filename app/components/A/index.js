/**
 *
 * A tag
 *
 */
import styled from 'styled-components';
import * as style from 'components/Variables';

const A = styled.a`
  color: ${style.color.primary.default};
  text-decoration: underline;

  &:hover {
    color: ${style.color.primary.hover};
  }
`;

export default A;
