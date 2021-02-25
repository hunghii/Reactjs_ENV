// import Enlang from './entries/en-US';
import Vnlang from './entries/vi_VN';
import { addLocaleData } from 'react-intl';

const AppLocale = {
    // en: Enlang,
    vi: Vnlang,
};
// addLocaleData(AppLocale.en.data);
addLocaleData(AppLocale.vi.data);

export default AppLocale;