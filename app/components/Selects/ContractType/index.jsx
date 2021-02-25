import React from "react";
import { memo, useState } from "react";
import { TreeSelect } from "antd";
import _ from "lodash";

const ContractType = ({
  onSelect,
  multiple = false,
  labelInValue = false,
  value,
  className,
}) => {
  const [data] = useState([
    {
      title: "Lộ trình cố định",
      value: "1",
      selectable: false,
      children: [
        {
          title: "Đón trả nhân viên",
          value: "1.1",
        },
        {
          title: "Đón trả học sinh",
          value: "1.2",
        },
        {
          title: "Thuê xe tháng",
          value: "1.3",
        },
        {
          title: "Trọn gói Km",
          value: "1.4",
        },
      ],
    },
    {
      title: "Lộ trình không cố định",
      value: "2",
      selectable: false,
      children: [
        {
          title: "Thuê xe tour",
          value: "2.1",
        },
      ],
    },
  ]);
  return (
    <TreeSelect
      showArrow
      allowClear
      className={className}
      showSearch
      multiple={multiple}
      value={value}
      treeData={data}
      labelInValue={labelInValue}
      treeNodeFilterProp="title"
      defaultActiveFirstOption={false}
      placeholder="Chọn loại hợp đồng"
      onChange={onSelect}
      style={{ minWidth: 200, width: "100%" }}
      dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
    />
    
  );
};
export default memo(ContractType);
