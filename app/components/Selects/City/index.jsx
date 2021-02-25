import PropTypes from 'prop-types';
import React, { useCallback, useEffect, memo, useState } from 'react';
import _ from 'lodash';
import ServiceBase from 'utils/ServiceBase';
import { Ui } from 'utils/Ui';
import { Select, Spin } from 'antd';
const { Option } = Select;

const City = ({
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
      url: `/cities/list`,
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
        label: x.cityname,
      }));
    }
    setFetching(false);
    setData(newData);
  }, []);
  useEffect(() => {
    fetch({ searchInput: '' });
  }, [fetch]);
  return (
    <Select
      showArrow
      allowClear
      className={className}
      showSearch
      mode={mode}
      value={value}
      labelInValue={labelInValue}
      defaultActiveFirstOption={false}
      optionFilterProp="children"
      placeholder="Tên Tỉnh/Thành phố"
      filterOption={(input, option) =>
        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
      notFoundContent={fetching ? <Spin size="small" /> : 'Không có dữ liệu'}
      onChange={onSelect}
      style={{ width: '100%' }}
    >
      {_.map(data, city => (
        <Option value={city.key} key={city.key}>
          {city.label}
        </Option>
      ))}
    </Select>
  );
};

City.propTypes = {
  className: PropTypes.any,
  labelInValue: PropTypes.bool,
  mode: PropTypes.string,
  onSelect: PropTypes.any,
  value: PropTypes.any,
};
export default memo(City);
