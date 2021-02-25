import PropTypes from "prop-types";
import React, { useCallback, memo, useState, useEffect } from "react";

import { Select, Spin, notification } from "antd";
import _ from "lodash";
import ServiceBase from "utils/ServiceBase";
import { Ui } from "utils/Ui";
import { actionSelect } from "containers/App/actions";
import { connect } from "react-redux";
import { makeActionSelect } from "containers/App/selectors";
import { createStructuredSelector } from "reselect";
import { compose, bindActionCreators } from "redux";
let timer = null;

const SelectSon = ({
  onSelect,
  mode = "single",
  labelInValue = true,
  value,
  className,
  url,
  limit = 20,
  disabled = false,
  placeholder,
  validateCell,
  option,
  onChange,
  actionSelect,
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
        q: searchInput,
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
      if (url === "/dieudo/tcd/danh-sach-tai-xe") {
        actionSelect(_.get(result, "value.data", []));
        newData = _.map(_.get(result, "value.data", []), (x) => ({
          key: x.id,
          label: x.name,
          id: x.idXe,
        }));
      } else if (url === "/lichtruc/danhsachxe") {
        newData = _.map(_.get(result, "value.data", []), (x) => ({
          key: x.id,
          // label: `${x.bks} - ID: ${x.id}`,
          label: x.bks,
        }));
      }  else {
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
      allowClear
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

SelectSon.propTypes = {
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
const mapStateToProps = createStructuredSelector({
  dataSelect: makeActionSelect(),
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      actionSelect,
    },
    dispatch
  );
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);
export default compose(
  withConnect,
  memo
)(SelectSon);
