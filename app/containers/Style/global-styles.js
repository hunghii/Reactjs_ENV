import { createGlobalStyle } from "styled-components";

import DefaultStyle from "./default";
import FlexStyle from "./flex";
import ScrollBarStyle from "./scroll-bar";
import ValidationStyle from "./validation";
import OtherStyle from "./other";
// Ant Design
import SelectStyle from "./antd/select";
import DatePickerStyle from "./antd/datePicker";
import Modal from "./antd/modal";
import InputNumber from "./antd/inputNumber";
const GlobalStyle = createGlobalStyle`

// Style Default
    ${DefaultStyle}
// Style Flex
    ${FlexStyle}
// Style Scroll bar
    ${ScrollBarStyle}
// Style Validation
    ${ValidationStyle}
// Style Other
    ${OtherStyle}
// Style for Ant Design
    ${SelectStyle}
    ${DatePickerStyle}
    ${Modal}
    ${InputNumber}

// Customize

      .container {
        padding-right: 15px;
        padding-left: 15px;
        margin-right: auto;
        margin-left: auto;
        &:before {
            display: table;
            content: " ";
        }
        &:after {
            display: table;
            content: " ";
            clear: both;
        }
    }
      @media (min-width: 768px) {
        .container {
            width: 750px;
        }
    }
    
    @media (min-width: 992px) {
        .container {
            width: 970px;
        }
    }
    
    @media (min-width: 1200px) {
        .container {
            width: 1170px;
        }
    }

    

`;

export default GlobalStyle;
