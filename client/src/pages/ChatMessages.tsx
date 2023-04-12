import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import ChatMessage from '../components/ChatMessage';
import Input from '../components/Input';
import NoMessage from '../components/NoMessage';
import ChatRoom from '../types/ChatRoom';

function ChatMessages() {
  const { id } = useParams();
  const [chat, setChat] = useState<ChatRoom>({
    ID: '',
    UserID: '',
    Title: '',
    Chats: [],
    CreatedAt: '',
    UpdatedAt: '',
  });

  // Scroll to bottom when new message is added
  const bottomChatRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    bottomChatRef.current?.scrollIntoView();
  }, [chat]);

  return (
    <div className='h-full lg:w-2/3 mx-auto relative'>
      <div className='messages pb-[150px] overflow-y-auto scrollbar-hide h-full'>
        {chat.Chats && chat.Chats.map((message) => <ChatMessage chat={message} />)}
        {!chat.Chats.length && <NoMessage />}
        <div ref={bottomChatRef} />
      </div>
      <div className='absolute bottom-0 left-0 right-0 w-full pt-[100px] bg-gradient-to-t from-white via-white to-transparent'>
        <Input
          placeholder='Ask me anything ...'
          className='p-4'
          postIcon={<FontAwesomeIcon icon='paper-plane' className='text-secondary' />}
        />
      </div>
    </div>
  );
}

export default ChatMessages;
