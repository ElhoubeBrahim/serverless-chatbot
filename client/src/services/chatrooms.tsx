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

export const chatPrompt = async (chatRoomId: string, prompt: string) => {
  try {
    return await API.post(api.name, `${api.paths.chat}`, {
      body: { room: chatRoomId, prompt },
    });
  } catch (error) {
    return null;
  }
};

export const rateResponse = async (
  chatRoomId: string,
  responseId: string,
  rating: number,
  feedback: string,
) => {
  try {
    return await API.post(api.name, `${api.paths.chat}${api.paths.rate}`, {
      body: { room: chatRoomId, response: responseId, rating, feedback },
    });
  } catch (error) {
    return null;
  }
};
