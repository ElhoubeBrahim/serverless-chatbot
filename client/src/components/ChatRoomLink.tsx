import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';
import { deleteChatRoom } from '../services/chatrooms';
import { chatRoomsState } from '../store/chatrooms';
import ChatRoom from '../types/ChatRoom';

interface ChatRoomLinkProps {
  chat: ChatRoom;
}

function ChatRoomLink({ chat }: ChatRoomLinkProps) {
  const { id } = useParams();
  const setChats = useSetRecoilState(chatRoomsState);
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this chat room?')) {
      const response = await deleteChatRoom(chat.ID);

      if (!response) {
        toast.error('Ooops! Something went wrong. Cannot delete chat room');
      } else {
        toast.success('Chat room deleted successfully');
        setChats((chats) => chats.filter((c) => c.ID !== chat.ID));
        navigate('/chat')
      }
    }
  };

  return (
    <div
      className={`flex justify-between gap-4 items-center px-4 py-3 mb-2 rounded transition-colors hover:bg-light ${
        id === chat.ID ? 'bg-light' : ''
      }`}
    >
      <Link to={`/chat/${chat.ID}`} className='block w-full'>
        {chat.Title}
      </Link>
      <div className='flex items-center gap-2'>
        <FontAwesomeIcon icon='pencil-alt' className='cursor-pointer' />
        <FontAwesomeIcon icon='trash-alt' className='cursor-pointer' onClick={handleDelete} />
      </div>
    </div>
  );
}

export default ChatRoomLink;
