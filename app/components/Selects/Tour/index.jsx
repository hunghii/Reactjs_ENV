/* eslint-disable react/prop-types */
import PropTypes from 'prop-types';
import React, { useCallback, memo, useState } from 'react';
import _ from 'lodash';
import ServiceBase from 'utils/ServiceBase';
import { Ui } from 'utils/Ui';
import { Select, Spin } from 'antd';
const { Option } = Select;
let timer = null;

const Tour = ({
  onSelect,
  mode = 'single',
  labelInValue = true,
  placeholder = 'Chọn Tour',
  value,
  contractId,
}) => {
  const [data, setData] = useState([]);
  const [fetching, setFetching] = useState([]);
  const fetch = useCallback(
    async ({ searchInput }) => {
      let newData = [];
      const param = {
        pageLimit: 10,
        currentPage: 0,
        searchInput,
        contractId,
        orderBy: { createdAt: 1 },
        query: { nameCode: '', pointName: '' },
      };
      setFetching(true);
      const result = await ServiceBase.requestJson({
        method: 'POST',
        url: `/routes/tour/list`,
        data: param,
      });
      if (result.hasErrors) {
        Ui.showErrors(result.errors);
      } else {
        newData = _.get(result, 'value.data', []);
      }
      setFetching(false);
      setData(newData);
    },
    [contractId],
  );
  return (
    <Select
      showArrow
      allowClear
      showSearch
      mode={mode}
      value={value}
      labelInValue={labelInValue}
      defaultActiveFirstOption={false}
      filterOption={false}
      placeholder={placeholder}
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
      {_.map(data, item => (
        <Option value={item.key} key={item.key}>
          {item.label}
        </Option>
      ))}
    </Select>
  );
};

Tour.propTypes = {
  labelInValue: PropTypes.bool,
  mode: PropTypes.string,
  onSelect: PropTypes.any,
  placeholder: PropTypes.string,
  value: PropTypes.any,
};
export default memo(Tour);
