import Cookies from 'js-cookie';

const ACCESS_TOKEN_KEY = 'grav_token';
const REFRESH_TOKEN_KEY = 'grav_refresh_token';

export const storageService = {
  getToken: () => Cookies.get(ACCESS_TOKEN_KEY),
  setToken: (token: string) => Cookies.set(ACCESS_TOKEN_KEY, token, { expires: 7, path: '/' }),
  removeToken: () => {
    Cookies.remove(ACCESS_TOKEN_KEY, { path: '/' });
    Cookies.remove(REFRESH_TOKEN_KEY, { path: '/' });
  },

  getRefreshToken: () => Cookies.get(REFRESH_TOKEN_KEY),
  setRefreshToken: (token: string) => Cookies.set(REFRESH_TOKEN_KEY, token, { expires: 7, path: '/' }),
};
