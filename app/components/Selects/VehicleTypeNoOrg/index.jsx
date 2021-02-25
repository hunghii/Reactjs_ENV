/* eslint-disable react/prop-types */
import PropTypes from 'prop-types';
import React, { memo, useState } from 'react';
import _ from 'lodash';
import { Ui } from 'utils/Ui';
import ServiceBase from 'utils/ServiceBase';
import { Select, Spin } from 'antd';
const { Option } = Select;

const VehicleTypeNoOrg = ({
  onSelect,
  mode = 'single',
  value,
  className,
  style,
  disabled,
  contractId,
}) => {
  const [data, setData] = useState([]);
  const [fetching, setFetching] = useState(false);
  const fetch = async ({ searchInput }) => {
    const param = {
      pageLimit: 100,
      currentPage: 0,
      orderBy: { lastUpdatedAt: 1 },
      searchInput,
      contractId,
      query: {
        vehicleTypeUuid: [],
      },
    };
    let newData = [];
    setFetching(true);
    const result = await ServiceBase.requestJson({
      method: 'POST',
      url: '/vehicles/type/list',
      data: param,
    });
    if (result.hasErrors) {
      Ui.showErrors(result.errors);
    } else {
      newData = _.get(result, 'value.data', []);
      setData(newData);
    }
    setFetching(false);
  };
  const _onSearch = _.debounce(searchInput => {
    fetch({ searchInput });
  }, 300);
  return (
    <Select
      showArrow
      allowClear
      showSearch
      className={className}
      mode={mode}
      value={value}
      disabled={disabled}
      labelInValue
      defaultActiveFirstOption={false}
      filterOption={false}
      placeholder="Tên loại xe"
      notFoundContent={fetching ? <Spin size="small" /> : 'Không có dữ liệu'}
      onChange={route => onSelect(route, data)}
      onFocus={() => {
        fetch({ searchInput: '' });
      }}
      onSearch={_onSearch}
      style={style}
    >
      {_.map(data, vehicleType => (
        <Option value={vehicleType.key} key={vehicleType.key}>
          {vehicleType.label}
        </Option>
      ))}
    </Select>
  );
};

VehicleTypeNoOrg.propTypes = {
  className: PropTypes.any,
  disabled: PropTypes.any,
  mode: PropTypes.string,
  onSelect: PropTypes.func,
  style: PropTypes.any,
  value: PropTypes.any,
};
export default memo(VehicleTypeNoOrg);
