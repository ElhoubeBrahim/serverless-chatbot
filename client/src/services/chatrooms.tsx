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

export const getChatRooms = async () => {
  try {
    return await API.get(api.name, api.paths.chatrooms, {});
  } catch (error) {
    return null;
  }
};

export const deleteChatRoom = async (chatRoomId: string) => {
  try {
    return await API.del(api.name, `${api.paths.chatrooms}/${chatRoomId}`, {});
  } catch (error) {
    return null;
  }
};
