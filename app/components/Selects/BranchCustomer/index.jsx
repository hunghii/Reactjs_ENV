import PropTypes from 'prop-types';
import React, { useCallback, useState, memo } from 'react';
import _ from 'lodash';
import ServiceBase from 'utils/ServiceBase';
import { Ui } from 'utils/Ui';
import { Select, Spin } from 'antd';
const { Option } = Select;
let timer = null;

const BranchCustomer = ({
  onSelect,
  mode = 'single',
  labelInValue = true,
  value,
  className,
}) => {
  const [data, setData] = useState([]);
  const [fetching, setFetching] = useState(false);
  const fetch = useCallback(async ({ searchInput }) => {
    let newData = [];
    setFetching(true);
    const result = await ServiceBase.requestJson({
      method: 'POST',
      url: `/partners/branch/list`,
      data: {
        searchInput,
        pageLimit: 100,
        currentPage: 0,
        orderBy: { name: 1 },
        query: {},
      },
    });
    if (result.hasErrors) {
      Ui.showErrors(result.errors);
    } else {
      newData = _.map(result.value.data, x => ({
        key: x.uuid,
        label: x.name,
      }));
    }
    setFetching(true);
    setData(newData);
  }, []);
  return (
    <Select
      showArrow
      allowClear
      showSearch
      className={className}
      mode={mode}
      value={value}
      labelInValue={labelInValue}
      defaultActiveFirstOption={false}
      filterOption={false}
      placeholder="Chọn đơn vị quản lý"
      notFoundContent={fetching ? <Spin size="small" /> : 'Không có dữ liệu'}
      onFocus={() => {
        fetch({ searchInput: '' });
      }}
      onChange={onSelect}
      onSearch={input => {
        if (timer) {
          clearTimeout(timer);
        }
        timer = setTimeout(() => {
          fetch({ searchInput: input });
        }, 500);
      }}
      style={{ width: '100%' }}
    >
      {_.map(data, customer => (
        <Option value={customer.key} key={customer.key}>
          {customer.label}
        </Option>
      ))}
    </Select>
  );
};

BranchCustomer.propTypes = {
  className: PropTypes.any,
  labelInValue: PropTypes.bool,
  mode: PropTypes.string,
  onSelect: PropTypes.any,
  value: PropTypes.any,
};
export default memo(BranchCustomer);
