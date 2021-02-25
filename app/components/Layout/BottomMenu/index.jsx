import PropTypes from 'prop-types';
import React, { memo } from 'react';
import styled from 'styled-components';
import Label from 'components/Label/Loadable';
import * as style from 'components/Variables';

function BottomMenu({ className }) {
  return (
    <div className={className}>
      <p className="corporate-name text-uppercase">
        Công ty liên doanh vận chuyển quốc tế Hải Vân
      </p>
      <p>
        <Label>Địa chỉ đăng kí kinh doanh:</Label> Số 10.15 đường Lương Thế
        Vinh, khu độ thị mới phía Đông, Phường Hải Tân, Thành phố Hải Dương,
        Tỉnh Hải Dương, Việt Nam
      </p>
      <p>
        <Label>Địa chỉ:</Label> Lô C8, đường Nguyễn Chánh, Quận Cầu Giấy, Hà Nội
      </p>
      <p>
        <Label>Giấy chứng nhận ĐKKD:</Label> Số 0800290724 do sở kế hoạch và đầu
        tư tỉnh Hải Dương cấp lần đầu ngày 18/04/2008
      </p>
      <p>
        <Label>Email:</Label> cskh@haivan.com - <Label>Hotline:</Label> 1900
        6763
      </p>
      <p>Bản quyền © 2020 thuộc về Haivan.com</p>
    </div>
  );
}

BottomMenu.propTypes = {
  className: PropTypes.any,
};

export default memo(styled(BottomMenu)`
  width: 100%;
  height: 200px;
  padding: 16px 0;
  text-align: center;
  background: ${style.color.footer.bg};
  color: ${style.color.footer.default};
  .corporate-name {
    text-transform: uppercase !important;
    font-weight: 700 !important;
    color: ${style.color.footer.bold};
  }
  label {
    margin: 0 0 4px 0;
    font-weight: bold;
    width: auto;
    color: ${style.color.footer.label};
    text-transform: uppercase;
  }
  p {
    margin: 0 0 4px 0;
  }
`);
