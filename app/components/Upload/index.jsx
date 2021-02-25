import React, { memo, useState, useEffect, useCallback } from "react";
import { Upload, Button, Icon, notification } from "antd";
// import reqwest from 'reqwest';
import { connect } from "react-redux";
import { Ui } from "utils/Ui";
import ServiceBase from "utils/ServiceBase";
import { UploadOutlined } from "@ant-design/icons";
import Axios from "axios";
import { API_BASE_URL } from "../../utils/constants";

let uid = 1;

const UploadList = ({}) => {
    const [arrData,setArrData] = useState({
        arrayImgURL:[]
    })
  const URL = () => {
    return `${API_BASE_URL}upload/multi/files`;
  };
  const customRequest = async (option) => {
      console.log('option.file',option.file)
    const data = new FormData();
    data.set("files", option.file);
    console.log('data',data)
    let result = await ServiceBase.requestJson({
      url: `${API_BASE_URL}upload/multi/files`,
      method: "POST",
      data: data,
    });
    if (result.hasErrors) {
    } else {
      let name = response.data
        ? response.data[0].replace("https://media.cr.havaz.vn/files/", "")
        : "";
      const file = {
        uid: uid++,
        name: name,
        status: "done",
        url: response.data,
      };
      this.setState((oldState) => {
        let newState = { ...oldState };
        newState.arrayImgURL.push(file);
        this.props.setFieldsValue({
          files: newState.arrayImgURL,
        });
        return newState;
      });
      notification.warning({
          message: 'Có lỗi trong quá trình upload',
          // description:
          //     'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
      });
    }
  };
  const onRemove = (val) => {
    setArrData((oldState) => {
      let nextState = { ...oldState };
      nextState.arrayImgURL.splice(
        nextState.arrayImgURL.findIndex((item) => item.uid === val.uid),
        1
      );
      this.props.setFieldsValue({
        files: nextState.arrayImgURL,
      });
      return nextState;
    });
  };

  return (
    <Upload
      // onDownload={this.onDownload}
      // fileList={arrayImgURL}
        onRemove={(e) => onRemove(e)}
      // disabled={this.props.form.getFieldValue("upload") ? true : false}
      name="file"
      action={URL}
      // file={this.props.form.upload}
      customRequest={customRequest}
    >
      <Button>
        <UploadOutlined /> Click to Upload
      </Button>
    </Upload>
  );
};
UploadList.defaultProps = {
  arrayImgURL: [],
};
export default UploadList;
