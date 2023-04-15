import { atom } from 'recoil';
import ChatRoom from '../types/ChatRoom';

export const chatRoomsState = atom({
  key: 'chatRoomsState',
  default: [] as ChatRoom[],
});
