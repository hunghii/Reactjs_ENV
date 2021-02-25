/* eslint-disable prefer-const */
/* eslint-disable no-empty */
import React, { memo, useState } from 'react';
import { Row, Col, Form, Button } from 'antd';
import ServiceBase from 'utils/ServiceBase';
import { Ui } from 'utils/Ui';
import PropTypes from 'prop-types';
import Input from 'components/Input';
const Info = memo(({ profile }) => {
  const [passNew, setPassNew] = useState('');
  const [setComformPassNew] = useState('');
  const [form] = Form.useForm();

  const onFinish = async values => {
    let params = values;
    params.uuid = profile.uuid;
    params.password = values.comfirmPassword;
    const searchResult = await ServiceBase.requestJson({
      method: 'PUT',
      data: params,
      url: 'customer/change-password/me',
    });
    if (searchResult.hasErrors) {
    } else {
      Ui.showSuccess({ message: 'Đổi mật khẩu thành công' });
      form.resetFields();
    }
  };
  const passwordNew = pass => {
    setPassNew(pass.target.value);
  };
  const comfirmPassword = comfirmPass => {
    setComformPassNew(comfirmPass.target.value);
  };
  return (
    <div>
      <Row gutter={15} className="mb_20 font_16">
        <Col md={12}>
          <Col md={24} className="mb_5">
            <b className="text-body">Họ và tên:</b>
            <b className="text-info"> {profile.fullName}</b>
          </Col>
          <Col md={24} className="mb_5">
            <b className="text-body">Chức danh:</b>
            <b className="text-info"> {profile.rolesName}</b>
          </Col>
          <Col md={24} className="mb_5">
            <b className="text-body ">Địa chỉ:</b>
            <b className="text-info"> {profile.address}</b>
          </Col>
          <Col md={24} className="mb_5">
            <b className="text-body ">Số điện thoại:</b>
            <b className="text-info"> {profile.phone}</b>
          </Col>
          <Col md={24} className="mb_5">
            <b className="text-body ">Email:</b>
            <b className="text-info"> {profile.email}</b>
          </Col>
        </Col>
        <Col md={12}>
          <Col md={24}>
            <Form
              form={form}
              name="basic"
              // initialValues={{ remember: true }}
              onFinish={onFinish}
            >
              <Form.Item
                label="Mật khẩu cũ"
                name="passwordOld"
                className="d-block"
                rules={[{ required: true, message: 'Vui lòng nhập họ tên' }]}
              >
                <Input.Password placeholder="Mật khẩu cũ" />
              </Form.Item>
              <Form.Item
                label="Mật khẩu mới"
                name="passwordNew"
                className="d-block"
                rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}
              >
                <Input.Password
                  placeholder="Mật khẩu mới"
                  onChange={passwordNew}
                />
              </Form.Item>
              <Form.Item
                label="Xác nhận mật khẩu"
                name="comfirmPassword"
                className="d-block"
                rules={[
                  { required: true, message: 'Vui lòng nhập mật khẩu' },
                  {
                    validator: (rule, value, callback) => {
                      if (value !== passNew) {
                        callback(new Error('Mật khẩu xác nhận không khớp !'));
                      } else {
                        callback();
                      }
                    },
                  },
                ]}
              >
                <Input.Password
                  placeholder="Xác nhận mật khẩu"
                  onChange={comfirmPassword}
                />
              </Form.Item>
              <Form.Item className="mt_10">
                <Button type="primary" htmlType="submit">
                  Cập nhật
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Col>
      </Row>
    </div>
  );
});
Info.propTypes = {
  profile: PropTypes.any.isRequired,
};
export default Info;
