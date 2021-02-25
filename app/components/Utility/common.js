/* eslint-disable indent */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-underscore-dangle */
import React from 'react';
import _ from 'lodash';
import withStyles from '@material-ui/core/styles/withStyles';
import {
  PagingPanel,
  TableHeaderRow,
  TableGroupRow,
  TableBandHeader,
  Table,
} from '@devexpress/dx-react-grid-material-ui';

import classNames from 'classnames';
import styled from 'styled-components';
import { calculateTotalPage } from 'utils/helper';

export const TableHeaderContent = withStyles({
  container: {
    display: 'grid',
    gridAutoFlow: 'row',
    color: 'rgb(108, 114, 147)',
    fontSize: 13,
  },
})(({ classes, column, ...restProps }) => (
  <TableHeaderRow.Content column={column} {...restProps}>
    <div className={classes.container}>
      {_.isArray(column.title)
        ? column.title.map((e, index) => (
            <span key={index}>
              {e}
              {index === column.title.length - 1 ? '' : ' /'}
            </span>
          ))
        : column.title}
    </div>
  </TableHeaderRow.Content>
));
export const CustomizeTableHeaderRow = withStyles({
  container: {
    display: 'grid',
    gridAutoFlow: 'row',
    color: 'rgb(108, 114, 147)',
    fontSize: 13,
  },
})(({ classes, contentComponent, ...restProps }) => (
  <TableHeaderRow
    {...restProps}
    contentComponent={contentComponent || TableHeaderContent}
    cellComponent={({ style, ...props }) => (
      <TableHeaderRow.Cell
        {...props}
        style={{
          ...style,
          paddingTop: 4,
          paddingBottom: 4,
          background: 'rgb(242, 243, 248)',
        }}
      />
    )}
  />
));
export const CustomizeTableGroupRow = withStyles({})(
  ({ classes, ...restProps }) => (
    <TableGroupRow
      {...restProps}
      cellComponent={props => (
        <TableGroupRow.Cell
          {...props}
          style={{ paddingBottom: 3, paddingTop: 3 }}
        />
      )}
    />
  ),
);
export const CustomizeTableBandHeader = withStyles({
  container: {
    display: 'grid',
    gridAutoFlow: 'row',
    color: 'rgb(108, 114, 147)',
    fontSize: 13,
  },
})(({ classes, ...restProps }) => (
  <TableBandHeader
    {...restProps}
    cellComponent={({ style, ...props }) => (
      <TableBandHeader.Cell
        {...props}
        style={{
          ...style,
          paddingTop: 2,
          paddingBottom: 2,
          textAlign: 'center',
          background: '#f2f3f8',
        }}
      />
    )}
  />
));

export const TableCell = withStyles({
  container: {
    fontSize: 12,
  },
})(
  ({
    classes,
    className,
    style,
    customStyle = { paddingTop: 4, paddingBottom: 4 },
    ...restProps
  }) => {
    let cellValue = _.get(restProps, 'value');
    if (_.isNumber(cellValue)) {
      cellValue = _.replace(cellValue, /\B(?=(\d{3})+(?!\d))/g, ',');
    }
    return (
      <Table.Cell
        {...restProps}
        title={_.isString(cellValue) ? cellValue : ''}
        value={cellValue}
        style={{ ...style, ...customStyle }}
        className={classNames({
          [className]: true,
          [classes.container]: true,
        })}
      />
    );
  },
);
const _paging = props => {
  // eslint-disable-next-line react/prop-types
  const totalPages = calculateTotalPage(props.totalCount, props.pageSize) || 0;
  return (
    <PagingPanel.Container
      {...props}
      totalPages={totalPages}
      pageSizes={[5, 10, 15, 30, 50, 100]}
    />
  );
};
export const PagingContainer = styled(_paging)`
  padding: 0 !important;
  span {
    display: inline-flex;
    font-size: 12px;
    color: #6c7293;
  }
  div:first-child {
    display: inline-flex;
  }
  div {
    font-size: 12px;
  }
`;
