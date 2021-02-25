import { css } from 'styled-components';
import * as style from 'components/Variables';

const DatePickerStyle = css`

  .ant-picker {
    width:100%;
    font-size: ${style.fontsize.reg} !important;
    font-family: ${style.fontfamily.roboto};
    color: ${style.color.haiVan.primary} !important;
    border: 1px solid ${style.color.haiVan.select.border} !important;
    box-shadow: none !important;
    input {
      font-size: 14px !important;
      font-family: Roboto;
      color: #58595b !important;
    }
    .ant-picker-active-bar {
      background: ${style.color.haiVan.bg} !important;
    }
    .ant-picker-suffix {
      display: flex;
      align-self: center;
    }
    .ant-picker-clear,
    .ant-picker-separator {
      display: flex;
      align-items: center;
    }
  }
  .ant-picker-dropdown {
    .ant-picker-preset > span {
      color: ${style.color.haiVan.primary} !important;
      background: ${style.color.haiVan.bg} !important;
      border-color: ${style.color.haiVan.border} !important;
    }
    .ant-picker-cell-in-view.ant-picker-cell-today
      .ant-picker-cell-inner::before {
      border: 1px solid ${style.color.haiVan.bg} !important;
    }
    .ant-picker-cell-in-view.ant-picker-cell-selected .ant-picker-cell-inner,
    .ant-picker-cell-in-view.ant-picker-cell-range-start .ant-picker-cell-inner,
    .ant-picker-cell-in-view.ant-picker-cell-range-end .ant-picker-cell-inner {
      color: ${style.color.haiVan.primary} !important;
      background: ${style.color.haiVan.bg} !important;
    }
  }
`;

export default DatePickerStyle;
