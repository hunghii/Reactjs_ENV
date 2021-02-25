import React, { memo } from "react";
import { Menu } from "antd";
import styled from "styled-components";
import * as style from "components/Variables";
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import _ from "lodash";
const { Item, SubMenu } = Menu;

const ItemMenu = memo(({ arrMenu }) => {
  const data = _.isArray(arrMenu) ? arrMenu : [];
  return data.map((item, index) => {
    return (
      <Menu theme="dark" mode="inline">
        <Item key={item.key}>{item.name}</Item>
      </Menu>
    );
  });
});
export default ItemMenu;
