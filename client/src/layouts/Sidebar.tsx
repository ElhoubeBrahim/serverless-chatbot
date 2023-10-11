import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useQuery } from '@tanstack/react-query';
import { useRecoilState, useSetRecoilState } from 'recoil';
import ChatRoomLink from '../components/ChatRoomLink';
import PrimaryButton from '../components/PrimaryButton';
import UserProfile from '../components/UserProfile';
import { getChatRooms } from '../services/chatrooms';
import { chatRoomsState } from '../store/chatrooms';
import { chatRoomFormModalState } from '../store/modals';

function Sidebar({ user }: { user: any }) {
  const [chats, setChats] = useRecoilState(chatRoomsState);
  const setChatFormModalOpen = useSetRecoilState(chatRoomFormModalState);

  const query = useQuery(['chats'], getChatRooms, {
    onSuccess: (data) => setChats(data),
  });

  return (
    <aside className='bg-secondary text-white fixed w-[300px] top-0 bottom-0'>
      <div className='p-3 border-b border-light'>
        <PrimaryButton
          text='New Chat'
          preIcon={<FontAwesomeIcon icon='plus' />}
          onClick={() => setChatFormModalOpen(true)}
        />
      </div>
      <div className='p-3'>
        {query.isLoading && (
          <div className='text-center p-2 text-gray-400'>
            <p className='text-lg'>Loading ...</p>
          </div>
        )}
        {query.isSuccess && chats.map((chat) => <ChatRoomLink key={chat.ID} chat={chat} />)}
        {query.isSuccess && chats.length === 0 && (
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
