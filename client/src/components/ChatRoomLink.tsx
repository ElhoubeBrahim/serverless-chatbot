import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import ChatRoom from '../types/ChatRoom';

interface ChatRoomLinkProps {
  chat: ChatRoom;
}

function ChatRoomLink({ chat }: ChatRoomLinkProps) {
  return (
    <div className='flex justify-between gap-4 items-center p-2 mb-2'>
      <Link to={`/chat/${chat.ID}`} className='block w-full'>
        {chat.Title}
      </Link>
      <div className='flex items-center gap-2'>
        <FontAwesomeIcon icon='pencil-alt' className='cursor-pointer' />
        <FontAwesomeIcon icon='trash-alt' className='cursor-pointer' />
      </div>
    </div>
  );
}

export default ChatRoomLink;
