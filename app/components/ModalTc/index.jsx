import React, { memo, useState, useEffect, useCallback } from "react";
import { Spin, Modal, Row, Col } from "antd";

const ModalBase = memo(
  ({ isShow, setIsShow, children, title, width, setObjDriver }) => {
    const handleCancel = () => {
      setIsShow((preState) => {
        let nextState = { ...preState };
        nextState.ishowModal = false;
        nextState.ishowModalMap = false;
        return nextState;
      });
    };
    return (
      <Modal
        title={title}
        visible={isShow}
        onCancel={handleCancel}
        width={width}
        destroyOnClose
        footer={[]}
      >
        {children}
      </Modal>
    );
  }
);
export default ModalBase;
