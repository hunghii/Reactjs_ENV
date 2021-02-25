import React, { memo } from "react";
import { Spin } from "antd";
import Pagination from "../../../components/Paginate/index";
import _ from "lodash";
import {
  Grid,
  Table,
  TableColumnReordering,
  TableHeaderRow,
  TableFixedColumns,
} from "@devexpress/dx-react-grid-material-ui";
import {
  PagingState,
  IntegratedPaging,
} from "@devexpress/dx-react-grid";
import Cell from "../Cell/index";

const List = memo(
  ({ data, loading, grid, totalLength, params, setParams, header }) => {
    const border = { border: "1px solid rgba(0, 0, 0, 0.12)" };
    let arrHeader = [];
    _.map(header, (item) => {
      let obj = {};
      if (item.ngay) {
        obj = {
          columnName: item.ngay,
          width: 60,
          align: "center",
        };
        arrHeader.push(obj);
      }
    });
    arrHeader.push(
      { columnName: "name", width: 200, align: "left" },
      { columnName: "Stt", width: 80, align: "center" },
      { columnName: "total", width: 100, align: "center" }
    );
    return (
      <Spin spinning={loading} tip="Đang lấy dữ liệu...">
        <Grid
          rootComponent={(props) => {
            return (
              <Grid.Root {...props} style={{ ...props.style, height: 600 }} />
            );
          }}
          rows={data}
          columns={header}
        >
          <PagingState currentPage={0} pageSize={100} />
          <IntegratedPaging />
          <Table
            columnExtensions={arrHeader}
            cellComponent={(props) => (
              <Cell props={props} data={data} border={border} />
            )}
          />
          <TableColumnReordering />

          <TableHeaderRow
            cellComponent={(props) => {
              if (props.column.name === "Stt") {
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
              } else if (props.column.name === "name") {
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
              } else if (props.column.name === "total") {
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
              } else if (
                props.column.dateAt === "chủ nhật" ||
                props.column.dateAt === "thứ bảy"
              ) {
                return (
                  <TableHeaderRow.Cell
                    {...props}
                    style={{
                      ...props.style,
                      ...border,
                      background: "#f97a7a",
                      position: "sticky",
                      top: 0,
                      zIndex: "300",
                    }}
                  />
                );
              } else {
                return (
                  <TableHeaderRow.Cell
                    {...props}
                    style={{
                      ...props.style,
                      ...border,
                      background: "#f2f3f8",
                      position: "sticky",
                      top: 0,
                      zIndex: "300",
                    }}
                  />
                );
              }
            }}
          />
          <TableFixedColumns
            leftColumns={["Stt", "name"]}
            rightColumns={["total"]}
          />
        </Grid>
        <Pagination
          className="mt_10 mb_10 d-flex justify-content-end"
          total={totalLength}
          setParams={setParams}
          grid={grid}
          params={params}
        />
      </Spin>
    );
  }
);
export default List;
