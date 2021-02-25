import React, { memo } from "react";
import { Menu } from "antd";
import styled from "styled-components";
import * as style from "components/Variables";
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from "@ant-design/icons";
const { Item, SubMenu } = Menu;

const AntMenu = (props) => <Menu mode={props.mode} {...props} />;

export default styled(memo(AntMenu))`
  .ant-menu-horizontal.ant-menu-item-selected {
    color: ${style.color.menu.color};
    border-bottom: ${style.color.menu.colorBottom};
    font-weigth: ${style.color.menu.bold};
    font-size: ${style.color.menu.fontsize};
  }
  .ant-menu-item:hover,
  .ant-menu-item-active.ant-menu-item-selected {
    color: ${style.color.menu.color};
    border-bottom: ${style.color.menu.colorBottom};
    font-weigth: ${style.color.menu.bold};
    font-size: ${style.color.menu.fontsize};
  }
  
`;
