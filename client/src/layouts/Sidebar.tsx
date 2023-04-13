import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import ChatRoomLink from '../components/ChatRoomLink';
import PrimaryButton from '../components/PrimaryButton';
import UserProfile from '../components/UserProfile';
import ChatRoom from '../types/ChatRoom';

function Sidebar({ user }: { user: any }) {
  const [chats, setChats] = useState<ChatRoom[]>([]);

  return (
    <aside className='bg-secondary text-white fixed w-[400px] top-0 bottom-0'>
      <div className='p-3 border-b border-light'>
        <PrimaryButton text='New Chat' preIcon={<FontAwesomeIcon icon='plus' />} />
      </div>
      <div className='p-3'>
        {chats && chats.map((chat) => <ChatRoomLink key={chat.ID} chat={chat} />)}
        {!chats.length && (
          <div className='text-center px-4 py-8 text-gray-400'>
            <p className='text-lg'>
              No chat room found <br />
              Please create one
            </p>
          </div>
        )}
      </div>
      <div className='p-3 absolute bottom-0 left-0 right-0 border-t border-light'>
        <UserProfile user={user} />
      </div>
    </aside>
  );
}

export default Sidebar;
