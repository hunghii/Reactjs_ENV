import React, { memo, useState, useEffect, useCallback } from "react";
import { Spin } from "antd";
import _ from "lodash";
import moment from "moment";
import {
  Grid,
  Table,
  TableBandHeader,
  TableHeaderRow,
  PagingPanel,
} from "@devexpress/dx-react-grid-material-ui";
import Paper from "@material-ui/core/Paper";

import styled from "styled-components";
import PropTypes from "prop-types";
import * as style from "components/Variables";
import classNames from "classnames";
import { Ui } from "utils/Ui";
import ServiceBase from "utils/ServiceBase";
import { PagingState, IntegratedPaging } from "@devexpress/dx-react-grid";

const list = memo(({ data }) => {
  const [pageSizes] = useState([5, 10, 15, 0]);

  //groud để tìm key
  const groud = _.groupBy(data, "Country");
  let obj = [];
  let arr = [];
  let dataTable = [];
  //for data vừa ground
  _.forEach(groud, (item, index) => {
    let tem = {};
    tem[`title`] = index;
    let children = [];
    //for để làm header theo đều kiện
    _.forEach(item[0], (_item, _index) => {
      if (
        _index === "sl" ||
        _index === "sk" ||
        _index === "dtkhach" ||
        _index === "dthang" ||
        _index === "khachBQ" ||
        _index === "hsld"
      ) {
        let teamobj = {};
        teamobj[`name`] = `${index}-${_index}`;
        teamobj[`title`] = _item;
        obj.push(teamobj);
        children.push({ columnName: `${index}-${_index}` });
      }
    });
    tem[`children`] = children;
    arr.push(tem);
    let key = 0;
    let indexKey = 0;
    //for để làm dữ liệu theo đều kiện
    _.forEach(item, (_item) => {
      let teamobj = {};
      teamobj["ID"] = indexKey++;
      teamobj["Date"] = _item.Date;
      teamobj["GDP_Industry"] = _item.GDP_Industry;
      teamobj["GDP_Services"] = _item.GDP_Services;
      teamobj["GDP_Agriculture"] = _item.GDP_Services;
      teamobj["GDP_Total"] = _item.GDP_Total;
      teamobj["Population_Total"] = _item.Population_Total;
      teamobj[`${index}-sl`] = _item.ID;
      teamobj[`${index}-sk`] = _item.GDP_Industry;
      teamobj[`${index}-dtkhach`] = _item.Area;
      teamobj[`${index}-dthang`] = _item.ID;
      teamobj[`${index}-khachBQ`] = _item.ID - _item.Area;
      teamobj[`${index}-hsld`] = _item.Area;
      teamobj["slt"] = _item.slt;
      teamobj["skt"] = _item.skt;
      teamobj["dtkhacht"] = _item.dtkhacht;
      teamobj["dthangt"] = _item.dthangt;
      teamobj["khachbqt"] = _item.khachbqt;
      teamobj["hsldt"] = _item.hsldt;
      // if (dataTable[indexKey]) {
      //   // console.log("dataTable[indexKey]", dataTable[indexKey]);
      //   dataTable[indexKey] = { ...dataTable[indexKey], ...teamobj };
      // } else {
      //   dataTable.push(teamobj);
      // }
      dataTable.push(teamobj);
      indexKey++;
    });
  });
  //push vào đầu và cuối của header để tạo mới
  obj.unshift({ name: "ID", title: "Stt" }, { name: "Date", title: "Ngày" });
  obj.push(
    { name: "slt", title: "Số lượt" },
    { name: "skt", title: "Số khách" },
    { name: "dtkhacht", title: "DT khách" },
    { name: "dthangt", title: "DT hàng" },
    { name: "khachbqt", title: "Khách BQ lượt" },
    { name: "hsldt", title: "Hệ số lấp đầy" },
    { name: "GDP_Industry", title: "So kế hoạch" },
    { name: "GDP_Services", title: "So tuần trước" },
    { name: "GDP_Agriculture", title: "So kế hoạch" },
    { name: "GDP_Total", title: "So tuần trước" },
    { name: "GDP_Agriculture1", title: "So kế hoạch" },
    { name: "GDP_Total2", title: "So tuần trước" },
    { name: "Population_Total", title: "Số xe chưa nghiệm thu" }
  );
  arr.push(
    {
      title: "Tổng",
      children: [
        { columnName: "slt" },
        { columnName: "skt" },
        { columnName: "dtkhacht" },
        { columnName: "dthangt" },
        { columnName: "khachbqt" },
        { columnName: "hsldt" },
      ],
    },
    {
      title: "So sánh DT khách",
      children: [
        { columnName: "GDP_Industry" },
        { columnName: "GDP_Services" },
      ],
    },
    {
      title: "So sánh DT hàng",
      children: [
        { columnName: "GDP_Agriculture" },
        { columnName: "GDP_Total" },
      ],
    },
    {
      title: "So sánh lượt xe",
      children: [
        { columnName: "GDP_Agriculture1" },
        { columnName: "GDP_Total2" },
      ],
    }
  );

  let _dataSort = _.sortBy(dataTable, ["Date"]);
  let dataOrderTest = _(_dataSort)
    .groupBy((item) => item.Date)
    .value();
  let dataOrder = {};
  _.map(dataOrderTest, (item, index) => {
    _.map(item, (value, key) => {
      if (dataOrder[index]) {
        dataOrder[index] = { ...dataOrder[index], ...value };
      } else {
        dataOrder[index] = value;
      }
    });
  });
  let dataConver = _.map(dataOrder, (item, index) => {
    return item;
  });

  const [columns] = useState(obj);
  const [columnBands] = useState(arr);

  const [tableColumnExtensions] = useState([
    { columnName: "ID", width: 80, align: "center" },
    { columnName: "Date", width: 125, align: "center" },
    { columnName: "Country", width: 125, align: "center" },
    {
      columnName: "Population_Total",
      width: 120,
      align: "right",
      wordWrapEnabled: true,
    },
    { columnName: "Population_Urban", width: 75, align: "right" },
    { columnName: "GDP_Total", width: 110, align: "right" },
    { columnName: "GDP_Industry", width: 110, align: "right" },
    { columnName: "GDP_Services", width: 110, align: "right" },
    { columnName: "GDP_Agriculture", width: 110, align: "right" },
  ]);
  const border = { border: "1px solid rgb(224, 224, 224, 1)" };

  return (
    <Paper>
      <Grid rows={dataConver} columns={columns}>
        <PagingState defaultCurrentPage={0} defaultPageSize={500} />
        <IntegratedPaging />
        <Table columnExtensions={tableColumnExtensions} />
        <TableHeaderRow
          cellComponent={(props) => {
            return (
              <TableHeaderRow.Cell
                {...props}
                style={{
                  ...props.style,
                  background: "#f2f3f8",
                  position: "sticky",
                  top: 0,
                  zIndex: "301",
                }}
              />
            );
          }}
        />
        <TableBandHeader
          columnBands={columnBands}
          cellComponent={(props) => {
            return (
              <TableHeaderRow.Cell
                {...props}
                style={{
                  ...props.style,
                  ...border,
                  background: "#f2f3f8",
                  position: "sticky",
                  top: 0,
                  zIndex: "301",
                }}
              />
            );
          }}
        />
        <PagingPanel pageSizes={pageSizes} />
      </Grid>
    </Paper>
  );
});
export default list;
