import { JWT_TOKEN } from './constants';

const _Cookies = window.Cookies;

const get = () => {
  try {
    const authorization = _Cookies.get(JWT_TOKEN);
    return authorization;
  } catch (err) {
    remove();
    return null;
  }
};
const remove = () => {
  _Cookies.remove(JWT_TOKEN);
};
export const $Token = {
  get,
  remove,
};
