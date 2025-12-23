import Cookies from 'js-cookie';

const ACCESS_TOKEN_KEY = 'grav_token';

export const storageService = {
  getToken: () => Cookies.get(ACCESS_TOKEN_KEY),
  setToken: (token: string) => Cookies.set(ACCESS_TOKEN_KEY, token, { expires: 7 }), // 7 days
  removeToken: () => Cookies.remove(ACCESS_TOKEN_KEY),
};
