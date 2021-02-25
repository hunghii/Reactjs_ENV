import React, { memo, useState, useEffect, useCallback } from "react";
import { ColorPickerComponent } from "@syncfusion/ej2-react-inputs";
import "../../../node_modules/@syncfusion/ej2-base/styles/material.css";
import "../../../node_modules/@syncfusion/ej2-inputs/styles/material.css";
import "../../../node_modules/@syncfusion/ej2-popups/styles/material.css";
import "../../../node_modules/@syncfusion/ej2-splitbuttons/styles/material.css";
import "../../../node_modules/@syncfusion/ej2-inputs/styles/material.css";
const Color = memo(({onChange ,value}) => {
  return <ColorPickerComponent change={onChange} value={value}/>;
});
export default Color;
