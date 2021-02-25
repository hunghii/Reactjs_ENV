import React, { memo, useCallback } from "react";
import { Row, Col, DatePicker, Button } from "antd";
import _ from "lodash";
import moment from "moment";
import styled from "styled-components";
import * as style from "components/Variables";
import classNames from "classnames";
import SelectMultiple from "../../../components/SelectMultiple";
const monthFormat = "MM/YYYY";
const Fillter = memo(({ className, params, setParams }) => {
  const getQuery = useCallback(
    (value, name) => {
      setParams((preState) => {
        let nextState = { ...preState };
        nextState[name] = value;
        return nextState;
      });
    },
    [params]
  );
  const clearParams = () => {
    setParams((preState) => {
      let nextState = { ...preState };
      nextState.thang = moment();
      nextState.chiNhanh = [];
      nextState.page = 1;
      nextState.size = 10;
      return nextState;
    });
  };
  const dateAt = moment(params.thang);
  return (
    <div
      gutter={15}
      className={classNames({
        [className]: true,
      })}
    >
      <Row gutter={15}>
        <Col xxl={5} xl={6} lg={10} md={7}>
          <p>Bảng báo cáo chấm công</p>
        </Col>
          <Col xxl={{span:2,offset: 15 }} xl={{span:2,offset: 13}} lg={{span:3,offset: 8}} md={4}>
            <Button type="link" onClick={clearParams}>
              Xóa bộ lọc
            </Button>
          </Col>
          <Col xxl={2} xl={2} lg={3} md={4} className="buttonCustomer">
            <Button type="primary">In File</Button>
          </Col>
      </Row>
      <Row gutter={15}>
        <Col xxl={5} xl={6} lg={6} md={7}>
          <DatePicker
            format={monthFormat}
            value={dateAt}
            placeholder={["Tháng"]}
            picker="month"
            onChange={(value) => {
              if (value) {
                getQuery(value, "thang");
              } else {
                let setDate = moment();
                getQuery(setDate, "thang");
              }
            }}
          />
        </Col>
        <Col xxl={5} xl={6} lg={6} md={7}>
          <SelectMultiple
            url="/branch"
            placeholder="Điểm làm việc"
            value={params.chiNhanh}
            onChange={(value) => {
              getQuery(value, "chiNhanh");
            }}
          />
        </Col>
      </Row>
    </div>
  );
});
export default styled(Fillter)`
  .buttonCustomer {
    .ant-btn {
      border-color: ${style.color.success.border};
      color: ${style.color.success.color};
      background: ${style.color.success.default};
    }
    .ant-btn :hover {
      color: ${style.color.success.colorHover};
      background: ${style.color.success.background};
    }
  }
  .buttonCustomerPush {
    .ant-btn {
      border-color: ${style.color.primary.border};
      color: ${style.color.primary.color};
      background: ${style.color.primary.default};
    }
    .ant-btn :hover {
      color: ${style.color.primary.colorHover};
      background: ${style.color.primary.background};
    }
  }
`;
