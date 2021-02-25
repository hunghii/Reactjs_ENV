import React, { memo, useState, useEffect, useCallback } from "react";
import { Spin } from "antd";
import _ from "lodash";
import moment from "moment";
import { Grid, Paper, Card, CardHeader, CardContent } from "@material-ui/core";
import styled from "styled-components";
import * as style from "components/Variables";
import classNames from "classnames";
import { Ui } from "utils/Ui";
import ServiceBase from "utils/ServiceBase";
import List from "./List/index";
import Fillter from "./Fillter/index";
const index = memo(({}) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper>
          <Card>
            <CardHeader className="cardHeader" title={<Fillter />} />
            <CardContent>
              <List />
            </CardContent>
          </Card>
        </Paper>
      </Grid>
    </Grid>
  );
});
export default index;
