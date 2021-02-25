/* eslint-disable react/prop-types */
import PropTypes from 'prop-types';
import React, { useCallback, memo, useState, useEffect } from 'react';
import _ from 'lodash';
import ServiceBase from 'utils/ServiceBase';
import { Ui } from 'utils/Ui';
import { Select, Spin } from 'antd';
const { Option } = Select;
let timer = null;

const Vehicle = ({
  onSelect,
  mode = 'single',
  labelInValue = true,
  value,
  className,
  disabled,
  vehicleTypeId,
  contractId,
}) => {
  const [data, setData] = useState([]);
  const [fetching, setFetching] = useState([]);
  const fetch = useCallback(
    async ({ searchInput }) => {
      let newData = [];
      const param = {
        pageLimit: 20,
        currentPage: 0,
        orderBy: { lastUpdatedAt: 1 },
        searchInput,
        contractId,
        query: {
          partnerUuid: '',
          vehicleTypeUuid: vehicleTypeId ? [vehicleTypeId] : [],
        },
      };
      setFetching(true);
      const result = await ServiceBase.requestJson({
        method: 'POST',
        url: `/vehicles/list`,
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
    [vehicleTypeId, contractId],
  );
  useEffect(() => {
    fetch({ searchInput: '' });
  }, [fetch]);
  return (
    <Select
      showArrow
      allowClear
      showSearch
      mode={mode}
      disabled={disabled}
      value={value}
      className={className}
      labelInValue={labelInValue}
      defaultActiveFirstOption={false}
      filterOption={false}
      placeholder="Chọn Xe"
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

Vehicle.propTypes = {
  className: PropTypes.any,
  disabled: PropTypes.any,
  labelInValue: PropTypes.bool,
  mode: PropTypes.string,
  onSelect: PropTypes.any,
  value: PropTypes.any,
  vehicleTypeId: PropTypes.any,
};
export default memo(Vehicle);
