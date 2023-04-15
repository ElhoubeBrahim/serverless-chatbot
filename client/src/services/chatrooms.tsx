import { API } from 'aws-amplify';
import ChatRoomRequest from '../types/request/ChatRoom';
import api from '../secure/api';

export const createChatRoom = async (chatRoom: ChatRoomRequest) => {
  try {
    return await API.post(api.name, api.paths.chatrooms, {
      body: chatRoom,
    });
  } catch (error) {
    return null;
  }
};
