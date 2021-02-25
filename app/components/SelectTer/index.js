import React from 'react';
import { Select, Spin } from 'antd';
import { API_URI } from '@Constants';

import _ from 'lodash';
import { requestJsonGet } from '@Services/base';
const timer = null;
class SelectTer extends React.PureComponent {
  _cache = {};

  fetch = searchInput => {
    const param = {
      limmit: this.props.pageLimit,
      q: searchInput,
    };
    this.setState({ data: [], fetching: true });
    requestJsonGet({ url: this.props.apiUrl, data: param }).then(response => {
      const data =
        response &&
        response.data.map(item => ({
          key: item.key,
          label: item.label,
        }));
      this.setState({ data, fetching: false });
    });
  };

  static defaultProps = {
    placeHolder: 'Chọn',
    currentPage: 0,
    pageLimit: 20,
    apiUrl: API_URI.GET_LIST_CITY,
    style: {},
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      data: [],
    };
  }

  render() {
    const { data, fetching } = this.state;
    const { value, onSelect, mode = 'single', placeholder, style } = this.props;
    return (
      <Select
        style={style}
        allowClear
        showArrow
        mode={mode}
        showSearch
        value={value}
        labelInValue
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        placeholder={placeholder}
        notFoundContent={fetching ? <Spin size="small" /> : null}
        onChange={item => onSelect(item, data)}
        onFocus={() => {
          if (data.length === 0) {
            this.fetch('');
          }
        }}
        onSearch={searchInput => {
          if (this.timer) {
            clearTimeout(this.timer);
          }
          this.timer = setTimeout(() => {
            this.fetch(searchInput);
          }, 800);
        }}
        style={{ width: '100%' }}
      >
        {data.map((item, index) => (
          <Select.Option title={item.label} value={item.key} key={index}>
            {item.label}
          </Select.Option>
        ))}
      </Select>
    );
  }
}

export default SelectTer;
