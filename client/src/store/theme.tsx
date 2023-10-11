import { atom } from 'recoil';

export const themeState = atom({
  key: 'themeState',
  default: localStorage.getItem('theme') || 'light',
});
