import antdVn from 'antd/lib/locale-provider/vi_VN';
import appLocaleData from 'react-intl/locale-data/vi';
import viMessages from '../locales/vi_VN.json';

const VnLang = {
  messages: {
    ...viMessages
  },
  antd: antdVn,
  locale: 'vi-VN',
  data: appLocaleData
};
export default VnLang;