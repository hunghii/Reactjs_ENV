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
import List from "./List/index";
import Fillter from "./Filter/index";
const index = memo(({}) => {
  const data1 = [
    

  ];
  let data = []
  let i
  let arrName = ['Hà Nội','Hà Tây','Vũng Tàu','HCM','Bắc Giang','Cao Bằng','Hà Giang','Bắc Kạn']
  for( i = 0; i < 10000;i++){
    let obj = {
      ID: 2,
      Country: `${arrName[Math.floor(Math.random() * arrName.length)]}`,
      Area: 9388211,
      Population_Urban: 0.54,
      Population_Rural: 0.46,
      Population_Total: 1375530000,
      GDP_Agriculture: 1,
      GDP_Industry: 0.426,
      GDP_Services: 0.483,
      GDP_Total: 10380380,
      Date: `${Math.floor(Math.random() * Math.floor(30))}-${Math.floor(Math.random() * Math.floor(12))}-2020`,
      sl: "Số lượt",
      sk: "Số khách",
      dtkhach: "DT khách",
      dthang: "DT hàng",
      khachBQ: "Khách BQ lượt",
      hsld: "Hệ số lấp đầy",
      slt: 0.483,
      skt: 0.444,
      dtkhacht: 0.555,
      dthangt: 0.222,
      khachbqt: 0.333,
      hsldt: 0.48113,
    }
    data.push(obj)
  }
  console.log('data',data)
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper>
          <Card>
            <CardHeader className="cardHeader" title={<Fillter />} />
            <CardContent>
              <List data={data} />
            </CardContent>
          </Card>
        </Paper>
      </Grid>
    </Grid>
  );
});
export default index;
