import { Outlet } from 'react-router-dom';
import ChatRoomFormModal from '../components/ChatRoomFormModal';
import Authenticator from '../layouts/Authenticator';
import Sidebar from '../layouts/Sidebar';

function Chat() {
  return (
    <Authenticator>
      {(user) => (
        <div>
          <Sidebar user={user} />
          <main className='fixed top-0 bottom-0 right-0 left-[400px]'>
            <div className='container mx-auto px-4 py-10 h-full'>
              <Outlet />
              <ChatRoomFormModal />
            </div>
          </main>
        </div>
      )}
    </Authenticator>
  );
}

export default Chat;
