import React, {  } from "react";
import { Modal } from "antd";
import _ from "lodash";
import { Table } from "@devexpress/dx-react-grid-material-ui";

const Cell = ({ props }) => {
  const { column, row, tableRow } = props;

  let itemOk = null;
  _.map(_.get(row, "duLieuThang"), (item) => {
    if (item.ngay === column.name) {
      itemOk = item;
    }
  });
  if (itemOk) {
    return (
      <Table.Cell
        className="Table_body text-center"
        {...props}
        value={<div>{itemOk.cong}</div>}
      />
    );
  } else if (column.name === "Stt") {
    return (
      <Table.Cell
        className="Table_body"
        {...props}
        value={<div>{tableRow.rowId + 1}</div>}
      />
    );
  } else if (column.name === "name") {
    return (
      <Table.Cell
        className="Table_body "
        {...props}
        value={
          <div
            className="text-hidden text-nowrap text-overflow"
            title={row.taiXeTen}
          >
            {row.taiXeTen}
          </div>
        }
      />
    );
  } else if (column.name === "total") {
    return (
      <Table.Cell
        className="Table_body"
        {...props}
        value={<div>{row.tongCong}</div>}
      />
    );
  } else {
    return (
      <Table.Cell
        className="Table_body text-center"
        {...props}
        value={<div>0</div>}
      />
    );
  }
};
// };
export default Cell;
