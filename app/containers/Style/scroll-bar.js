import { css } from 'styled-components';
import * as style from 'components/Variables';

const ScrollBarStyle = css`
  

  ::-webkit-scrollbar {
    height: 8px;
    width: 8px;
    border: 1px solid #d5d5d5;
  }

  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px grey;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background: ${style.color.haiVan.bg};
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #ff6d00;
  }
`;

export default ScrollBarStyle;
