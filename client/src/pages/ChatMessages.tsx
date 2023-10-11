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

  const [scrollBtnVisible, setScrollBtnVisible] = useState(false);
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
    message = {
      ID: response?.ID,
      Prompt: prompt,
      Response: response ? response.Response : null,
      Loading: false,
      CreatedAt: response?.CreatedAt,
    };

    setChat((chat) => ({
      ...chat,
      Chat: [...chat.Chat.filter((chat) => chat.ID !== ''), message],
    }));
  };

  return (
    <div className='h-full lg:w-2/3 mx-auto relative'>
      <div className='absolute top-0 left-0 right-0 w-full pb-[70px] bg-gradient-to-b from-white via-white to-transparent dark:from-slate-700 dark:via-slate-700'>
        <div className='p-3 border-b border-light text-xl font-title font-bold text-primary'>
          {chat.Title}
        </div>
      </div>
      <div
        className='messages pb-[200px] pt-[70px] overflow-y-auto scrollbar-hide h-full'
        onScroll={(e) => {
          setScrollBtnVisible(
            e.currentTarget.scrollTop < e.currentTarget.scrollHeight - e.currentTarget.clientHeight,
          );
        }}
      >
        {chat.Chat && chat.Chat.map((message) => <ChatMessage chat={message} />)}
        {!chat.Chat.length && <NoMessage />}
        <div ref={bottomChatRef} />
      </div>
      <div className='absolute bottom-[150px] right-[-100px]'>
        {scrollBtnVisible && (
          <button
            className='flex items-center justify-center w-10 h-10 rounded-full bg-light text-secondary dark:text-primary'
            onClick={() => {
              bottomChatRef.current?.scrollIntoView({
                behavior: 'smooth',
              });
            }}
          >
            <FontAwesomeIcon icon='chevron-down' />
          </button>
        )}
      </div>
      <div className='absolute bottom-0 left-0 right-0 w-full pt-[100px] bg-gradient-to-t from-white via-white to-transparent dark:from-slate-700 dark:via-slate-700'>
        <Input
          placeholder='Ask me anything ...'
          className='p-4'
          onKeyUp={(e) => {
            if (e.key === 'Enter') {
              getAnswer(e.currentTarget.value);
              e.currentTarget.value = '';
            }
          }}
          postIcon={<FontAwesomeIcon icon='paper-plane' className='text-secondary dark:text-primary' />}
        />
      </div>
    </div>
  );
}

export default ChatMessages;
