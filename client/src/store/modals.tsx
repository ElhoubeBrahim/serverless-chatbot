import { atom } from 'recoil';

export const chatRoomFormModalState = atom({
  key: 'chatRoomFormModalState',
  default: false,
});

export const RateResponseModalState = atom({
  key: 'RateResponseModalState',
  default: {
    roomId: '',
    responseId: '',
    isOpen: false,
  },
});
