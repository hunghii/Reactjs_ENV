import PropTypes from 'prop-types';
import React, { useCallback, useEffect, memo, useState } from 'react';
import _ from 'lodash';
import ServiceBase from 'utils/ServiceBase';
import { Ui } from 'utils/Ui';
import { Select, Spin } from 'antd';
const { Option } = Select;
let timer = null;

const Contract = ({
  onSelect,
  mode = 'single',
  placeholder = 'Chọn hợp đồng',
  labelInValue = true,
  fetchDataOnMount = true,
  fetchDataOnFocus = true,
  style = { width: '100%' },
  ...props
}) => {
  const [data, setData] = useState([]);
  const [fetching, setFetching] = useState([]);
  const fetch = useCallback(async searchInput => {
    let newData = [];
    const param = {
      pageLimit: 5,
      currentPage: 0,
      searchInput,
      orderBy: { createdAt: 1 },
      query: {
        contractNumber: '',
        codeAndName: '',
        phoneAndAddress: '',
        contractType: undefined,
      },
    };
    setFetching(true);
    const result = await ServiceBase.requestJson({
      method: 'GET',
      url: `/contract/list`,
      data: param,
    });
    if (result.hasErrors) {
      Ui.showErrors(result.errors);
    } else {
      newData = _.map(_.get(result, 'value.data', []), x => ({
        key: x.uuid,
        label: x.contractNumber,
      }));
    }
    setFetching(false);
    setData(newData);
  }, []);
  const _handleFocus = useCallback(() => {
    if (fetchDataOnFocus) {
      fetch('');
    }
  }, [fetch, fetchDataOnFocus]);
  const _handleSearch = useCallback(
    searchInput => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fetch(searchInput);
      }, 500);
    },
    [fetch],
  );
  useEffect(() => {
    if (fetchDataOnMount) {
      fetch('');
    }
  }, [fetch, fetchDataOnMount]);
  return (
    <Select
      {...props}
      showArrow
      allowClear
      showSearch
      labelInValue={labelInValue}
      placeholder={placeholder}
      style={style}
      mode={mode}
      defaultActiveFirstOption={false}
      filterOption={false}
      loading={fetching}
      notFoundContent={fetching ? <Spin size="small" /> : 'Không có dữ liệu'}
      onFocus={_handleFocus}
      onChange={onSelect}
      onSearch={_handleSearch}
    >
      {_.map(data, item => (
        <Option value={item.key} key={item.key}>
          {item.label}
        </Option>
      ))}
    </Select>
  );
};

Contract.propTypes = {
  fetchDataOnFocus: PropTypes.bool,
  fetchDataOnMount: PropTypes.bool,
  labelInValue: PropTypes.bool,
  mode: PropTypes.string,
  onSelect: PropTypes.any,
  placeholder: PropTypes.string,
  style: PropTypes.shape({
    width: PropTypes.string,
  }),
};

export default memo(Contract);
