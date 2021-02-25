import { css } from "styled-components";
import * as style from "components/Variables";

const SelectStyle = css`
  .ant-select {
    font-size: ${style.fontsize.reg} !important;
    font-family: ${style.fontfamily.roboto};
    color: ${style.color.haiVan.primary} !important;
    .ant-select-selector {
      border: 1px solid ${style.color.haiVan.select.border} !important;
      box-shadow: none !important;
    }
    width: 100%;
  }
  .ant-select-dropdown {
    .ant-select-item-option-selected:not(.ant-select-item-option-disabled) {
      background: ${style.color.haiVan.bg} !important;
    }
    .ant-select-item-option-selected:not(.ant-select-item-option-disabled)
      .ant-select-item-option-state {
      color: ${style.color.haiVan.primary} !important;
      display: flex;
      align-items: center;
    }
  }
  .ant-select-tree {
    .ant-select-tree-switcher {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .ant-select-tree-node-content-wrapper.ant-select-tree-node-selected {
      background: ${style.color.haiVan.bg} !important;
    }
  }
  .ant-select-show-search.ant-select-multiple .ant-select-selector {
    max-height: 80px;
    overflow: auto;
  }
`;

export default SelectStyle;
