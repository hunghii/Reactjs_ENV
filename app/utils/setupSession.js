import Globals from './globals';
import { $Cookies } from './cookies';
import { JWT_TOKEN, ERP_REPORT } from './constants';
const setupSession = () => {
  Globals.reset();
  const token = $Cookies.get(JWT_TOKEN);
  const erpReport = $Cookies.get(ERP_REPORT);
  Globals.init({
    public: {
      erpReport,
    },
    private: {
      token,
    },
  });
};
export default setupSession;
