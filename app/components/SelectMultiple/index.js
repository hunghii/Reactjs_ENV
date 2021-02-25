import PropTypes from "prop-types";
import React, { useCallback, memo, useState, useEffect } from "react";

import { Select, Spin } from "antd";
import _ from "lodash";
import ServiceBase from "utils/ServiceBase";
import { Ui } from "utils/Ui";
let timer = null;

const SelectMultiple = ({
  onSelect,
  mode = "multiple",
  labelInValue = true,
  value,
  className,
  url,
  limit = 20,
  disabled = false,
  placeholder = "Chọn",
  validateCell,
  onChange,
  option,
}) => {
  const [data, setData] = useState([]);
  const [fetching, setFetching] = useState([]);
  const [border, setBorder] = useState("1px solid #dcdcdc");
  const fetch = useCallback(async ({ searchInput }) => {
    let newData = [];

    let param = {};
    if (option) {
      param = option;
    } else {
      param = {
        // limit,
        // q: searchInput,
      };
    }
    setFetching(true);
    const result = await ServiceBase.requestJson({
      method: "GET",
      url,
      data: param,
    });
    if (result.hasErrors) {
      Ui.showErrors(result.errors);
    } else {
      if (url === "/dieudo/dsnottuyen") {
        console.log('url',url)
        newData = _.map(_.get(result, "value.data", []), (x) => ({
          key: x.id,
          id: x.didId,
          label: x.name,
        }));
      } else {
        newData = _.map(_.get(result, "value.data", []), (x) => ({
          key: x.id,
          label: x.name,
        }));
      }
    }
    setFetching(false);
    setData(newData);
  });
  useEffect(() => {
    if (validateCell && !value.key) {
      setBorder("1px solid red");
    } else {
      setBorder("1px solid white");
    }
  }, [validateCell, value]);

  return (
    <Select
      disabled={disabled}
      showArrow
      showSearch
      mode={mode}
      value={value}
      className={className}
      labelInValue={labelInValue}
      defaultActiveFirstOption={false}
      filterOption={(input, option) =>
        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
      placeholder={placeholder}
      notFoundContent={fetching ? <Spin size="small" /> : "Không có dữ liệu"}
      onFocus={() => {
        fetch({ searchInput: "" });
      }}
      onChange={onChange}
      onSelect={onSelect}
      onSearch={(input) => {
        if (timer) {
          clearTimeout(timer);
        }
        timer = setTimeout(() => {
          fetch({ searchInput: input });
        }, 500);
      }}
      style={{ width: "100%", border: border }}
    >
      {data.map((item) => (
        <Select.Option
          value={item.key}
          key={item.key}
          id={item.id}
          title={item.label}
        >
          {item.label}
        </Select.Option>
      ))}
    </Select>
  );
};

SelectMultiple.propTypes = {
  className: PropTypes.any,
  disabled: PropTypes.bool,
  labelInValue: PropTypes.bool,
  limit: PropTypes.number,
  mode: PropTypes.string,
  onSelect: PropTypes.any,
  placeholder: PropTypes.string,
  url: PropTypes.any,
  value: PropTypes.any,
};
export default memo(SelectMultiple);
