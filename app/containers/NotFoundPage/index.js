/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 *
 */

import React from 'react';
import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <h1>
      <Result
        status="404"
        title="404"
        subTitle="Không tìm thấy trang."
        extra={
          <Button>
            <Link to="/">Trang chủ</Link>
          </Button>
        }
      />
    </h1>
  );
}
