import React, { memo, useState, useEffect, useCallback } from "react";
import { Row, Col, Pagination } from "antd";
import { DownCircleOutlined, UpCircleOutlined } from "@ant-design/icons";

const paginate = memo(({ total, grid, setParams, params }) => {
  const onPageSize = (e) => {
    setParams((preState) => {
      let nextState = { ...preState };
      nextState.page = e;
      return nextState;
    });
  };
  const onSizeChange = (current, pageSize) => {
    setParams((preState) => {
      let nextState = { ...preState };
      nextState.size = pageSize;
      return nextState;
    });
  };
  return (
    <Pagination
      className="mt_10 d-flex justify-content-end"
      current={params.page}
      total={total}
      onChange={(e) => onPageSize(e)}
      showTotal={(total, range) => `${range[0]}-${range[1]} của ${total} bản ghi`}
      pageSizeOptions={['5', '15', '30', '50','100','200']}
      onShowSizeChange={(current, pageSize) => onSizeChange(current, pageSize)}
      showSizeChanger
    />
  );
});
export default paginate;
