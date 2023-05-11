import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import ChatMessage from '../components/ChatMessage';
import Input from '../components/Input';
import NoMessage from '../components/NoMessage';
import { chatPrompt } from '../services/chatrooms';
import { chatRoomsState } from '../store/chatrooms';
import ChatRoom from '../types/ChatRoom';

function ChatMessages() {
  const { id } = useParams();
  if (!id) {
    return null;
  }

  const chatRooms = useRecoilValue(chatRoomsState);
  const [chat, setChat] = useState<ChatRoom>({
    ID: '',
    UserID: '',
    Title: '',
    Chat: [],
    CreatedAt: '',
    UpdatedAt: '',
  });

  useEffect(() => {
    const chat = chatRooms.find((chat) => chat.ID === id);
    if (chat) {
      setChat(chat);
    }
  }, [chatRooms, id]);

  // Scroll to bottom when new message is added
  const bottomChatRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    bottomChatRef.current?.scrollIntoView();
  }, [chat]);

  const getAnswer = async (prompt: string) => {
    // Add loading message to chat
    let message = {
      ID: '',
      Prompt: prompt,
      Response: null,
      Loading: true,
      CreatedAt: '',
    };

    setChat((chat) => ({
      ...chat,
      Chat: [...chat.Chat, message],
    }));

    // Get response from chatbot
    const response = await chatPrompt(id, prompt);
    if (response) {
      message = {
        ID: response.ID,
        Prompt: response.Prompt,
        Response: response.Response,
        Loading: false,
        CreatedAt: response.CreatedAt,
      };

      setChat((chat) => ({
        ...chat,
        Chat: [...chat.Chat.filter((chat) => chat.ID !== ''), message],
      }));
    }
  };

  return (
    <div className='h-full lg:w-2/3 mx-auto relative'>
      <div className='absolute top-0 left-0 right-0 w-full pb-[70px] bg-gradient-to-b from-white via-white to-transparent'>
        <div className='p-3 border-b border-light text-xl font-title font-bold text-primary'>
          {chat.Title}
        </div>
      </div>
      <div className='messages pb-[200px] pt-[70px] overflow-y-auto scrollbar-hide h-full'>
        {chat.Chat && chat.Chat.map((message) => <ChatMessage chat={message} />)}
        {!chat.Chat.length && <NoMessage />}
        <div ref={bottomChatRef} />
      </div>
      <div className='absolute bottom-0 left-0 right-0 w-full pt-[100px] bg-gradient-to-t from-white via-white to-transparent'>
        <Input
          placeholder='Ask me anything ...'
          className='p-4'
          onKeyUp={(e) => {
            if (e.key === 'Enter') {
              getAnswer(e.currentTarget.value);
              e.currentTarget.value = '';
            }
          }}
          postIcon={<FontAwesomeIcon icon='paper-plane' className='text-secondary' />}
        />
      </div>
    </div>
  );
}

export default ChatMessages;
