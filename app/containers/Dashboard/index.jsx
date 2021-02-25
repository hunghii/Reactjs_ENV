import React, { memo, useCallback, useState } from "react";

import Pie from "./PieSeries/index";
import Bar from "./BarSeries/index";
const index = memo(({}) => {
  return (
    <div>
      <Pie />
      <Bar />
      <iframe src="https://elk.haivanexpress.vn/app/kibana#/dashboard/7adfa750-4c81-11e8-b3d7-01146121b73d?embed=true&_g=(filters%3A!()%2CrefreshInterval%3A(pause%3A!f%2Cvalue%3A900000)%2Ctime%3A(from%3Anow-24h%2Cto%3Anow))" height="600" width="100%"></iframe>

    </div>
  );
});
export default index;
