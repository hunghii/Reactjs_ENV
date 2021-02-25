import { css } from "styled-components";
import * as style from "components/Variables";
import BackgroundSingin from "images/Image_04.jpg";

const DefaultStyle = css`
  body {
    font-family: Roboto, Helvetica, Arial, sans-serif !important;
    font-size: ${style.fontsize.reg};
    color: ${style.color.haiVan.primary};
    background-size: cover;
    background-repeat: no-repeat;
    // background-position: bottom;
  }
  body.fontLoaded {
    font-family: Roboto, Helvetica, Arial, sans-serif !important;
  }
  .MuiCardHeader-root{
    padding:10px 16px 0px 16px !important;
  }
  // .ant-divider-horizontal{
  //   padding:10px !important;
  // }
`;

export default DefaultStyle;
