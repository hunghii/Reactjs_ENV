import React, { memo, useCallback, useState } from "react";
import Paper from "@material-ui/core/Paper";
import {
  Chart,
  BarSeries,
  LineSeries,
  ArgumentAxis,
  ValueAxis,
  Title,
  Legend,
  PieSeries,
  Tooltip,
} from "@devexpress/dx-react-chart-material-ui";
import { connectProps } from "@devexpress/dx-react-core";

import {
  Animation,
  EventTracker,
  HoverState,
} from "@devexpress/dx-react-chart";

const index = memo(({}) => {
  const [objTarget, setTarget] = useState({
    target: null,
  });
  const data = [
    {
      name: "Email Archive",
      size: 20,
      count: 11,
    },
    {
      name: "Spreadsheet",
      size: 30,
      count: 3,
    },
    {
      name: "Document",
      size: 10,
      count: 12,
    },
    {
      name: "Presentation",
      size: 40,
      count: 2,
    },
  ];


  return (
    <Paper>
      <Chart data={data}>
        <PieSeries valueField="size" argumentField="name" />
     
        <EventTracker />
        <HoverState />
        <Tooltip />
        <Animation />
        <Legend />
      </Chart>
    </Paper>
  );
});
export default index;
