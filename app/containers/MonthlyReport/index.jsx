import React, { memo, useState, useEffect, useCallback } from "react";
import { Spin } from "antd";
import _ from "lodash";
import moment from "moment";
import { Grid, Paper, Card, CardHeader, CardContent } from "@material-ui/core";
import styled from "styled-components";
import PropTypes from "prop-types";
import * as style from "components/Variables";
import classNames from "classnames";
import { Ui } from "utils/Ui";
import ServiceBase from "utils/ServiceBase";

import Fillter from "./Fillter/index";
import List from "./List/index";
let time = null;
const ManagementShift = memo(({}) => {
  const [loading, setLoading] = useState(false);
  const [totalLength, setTotalLength] = useState(0);
  const [data, setData] = useState({
    header: [],
    rows: [],
  });
  const [params, setParams] = useState({
    thang: moment(),
    chiNhanh: undefined,
    page: 1,
    size: 10,
  });
  const [grid, setGrid] = useState({
    thang: params.thang,
    chiNhanh: params.diemLamViec,
    page: params.page,
    limit: params.size,
  });
  const boweload = useCallback(async () => {
    let newParams = {
      thang: params.thang.format("MM/YYYY"),
      chiNhanh: params.chiNhanh,
      page: params.page,
      limit: params.size,
    };
    setLoading(true);
    let result = await ServiceBase.requestJson({
      url: "/baocaothang/danhsach",
      method: "GET",
      data: newParams,
    });
    if (result.hasErrors) {
      Ui.showErrors(result.errors);
      setLoading(false);
    } else {
      setLoading(false);
      setTotalLength(_.get(result, "value.totalElement"));
      let i = 1;
      let formatData = params.thang.format("YYYY-MM");
      let dataMonth = formatData
        ? moment(formatData, "YYYY-MM").daysInMonth()
        : "";
      let _i;
      let key = 2;
      let arrHeader = [];
      for (_i = 0; _i < dataMonth; _i++) {
        let month = moment(
          moment(formatData)
            .add(_i, "d")
            .format("YYYY-MM-DD")
        ).format("YYYY-MM-DD");
        let arr = {
          stt: i++,
          key: key++,
          taiXeTen: "",
          ngay: moment(
            moment(formatData)
              .add(_i, "d")
              .format("YYYY-MM-DD")
          ).format("YYYY-MM-DD"),
          title: [
            moment(
              moment(formatData)
                .add(_i, "d")
                .format("YYYY-MM-DD")
            ).format("DD-MM"),
          ],
          name: month,
          dateAt: month
            ? moment(month)
                .locale("vi")
                .format("dddd")
            : "",
        };

        arrHeader.push(arr);
      }

      arrHeader.unshift(
        {
          name: "Stt",
          title: ["Stt"],
        },
        {
          name: "name",
          title: ["Tài xế"],
        }
      );
      arrHeader.push({
        name: "total",
        title: ["Tổng"],
      });
      let dataNew = _.get(result, "value.data");
      setData((preState) => {
        let nextState = { ...preState };
        nextState.rows = dataNew;
        nextState.header = arrHeader;
        return nextState;
      });
    }
  }, [params]);
  useEffect(() => {
    clearTimeout(time);
    time = setTimeout(boweload, 800);
  }, [boweload]);
  const _rows = _.get(data, "rows");
  const _header = _.get(data, "header");
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper>
          <Card>
            <CardHeader
              className="cardHeader"
              title={
                <Fillter params={params} setParams={setParams} data={data} />
              }
            />
            <CardContent>
              <List
                data={_rows}
                header={_header}
                loading={loading}
                grid={grid}
                setParams={setParams}
                totalLength={totalLength}
                params={params}
              />
            </CardContent>
          </Card>
        </Paper>
      </Grid>
    </Grid>
  );
});
export default ManagementShift;
