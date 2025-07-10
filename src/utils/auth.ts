const key = 'token';

export const getToken = () => localStorage.getItem(key);

export const setToken = (token: string) => localStorage.setItem(key, token);

export const removeToken = () => localStorage.removeItem(key);