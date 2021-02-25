import React, { memo, useState, useEffect, useCallback } from "react";
import { Spin, Drawer, Row, Col } from "antd";
import _ from "lodash";
const DrawerBase = memo(({ isShow, setIsShow, children,title,width}) => {
  const handleCancel = () => {
    setIsShow(false);
  };
  return (
    <Drawer
      title={title}
      visible={isShow}
      onClose={handleCancel}
      width={width}
     
    >
      {children}
    </Drawer>
  );
});
export default DrawerBase;
