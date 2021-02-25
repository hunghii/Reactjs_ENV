import { AES, enc } from 'crypto-js';

const pls = {
  set: (key, value) => {
    localStorage[key] = value;
    return localStorage[key];
  },
  get: (key, defaultValue) => localStorage[key] || defaultValue,
  setObject: (key, value) => {
    localStorage[key] = JSON.stringify(value);
    return localStorage[key];
  },
  getObject: key => {
    try {
      return (localStorage[key] && JSON.parse(localStorage[key])) || {};
    } catch (err) {
      pls.remove(key);
    }
  },
  clear: () => localStorage.clear(),
  remove: key => localStorage.removeItem(key),
};

const sls = {
  set: (key, value) => {
    localStorage[key] = AES.encrypt(value, key).toString();
    return localStorage[key];
  },
  get: (key, defaultValue) => {
    try {
      const encrypted = localStorage[key];
      if (encrypted) {
        return AES.decrypt(encrypted, key).toString(enc.Utf8);
      }
      return defaultValue;
    } catch (err) {
      sls.remove(key);
    }
  },
  setObject: (key, value) => {
    localStorage[key] = AES.encrypt(
      JSON.stringify(value).replace(/(<([^>]+)>)/gi, ''),
      key,
    ).toString();
    return localStorage[key];
  },
  getObject: key => {
    try {
      const encrypted = localStorage[key];
      if (encrypted) {
        const decrypt = AES.decrypt(encrypted, key).toString(enc.Utf8);
        return decrypt ? JSON.parse(decrypt) : null;
      }
    } catch (err) {
      sls.remove(key);
    }
    return null;
  },
  clear: () => localStorage.clear(),
  remove: key => localStorage.removeItem(key),
};

export const $LocalStorage = {
  sls,
  pls,
};
