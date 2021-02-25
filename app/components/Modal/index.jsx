import React, { memo, useState, useEffect, useCallback } from "react";
import { Spin, Modal, Row, Col } from "antd";

const ModalBase = memo(({ isShow, setIsShow, children,title,width}) => {
  const handleCancel = () => {
    setIsShow(false);
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
});
export default ModalBase;
