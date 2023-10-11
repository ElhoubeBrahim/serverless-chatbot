import { Outlet } from 'react-router-dom';
import ChatRoomFormModal from '../components/ChatRoomFormModal';
import Authenticator from '../layouts/Authenticator';
import Sidebar from '../layouts/Sidebar';
import RateResponseModal from '../components/RateResponseModal';

function Chat() {
  return (
    <Authenticator>
      {(user) => (
        <div>
          <Sidebar user={user} />
          <main className='fixed top-0 bottom-0 right-0 left-[300px]'>
            <div className='container mx-auto px-4 pb-10 h-full'>
              <Outlet />
              <ChatRoomFormModal />
              <RateResponseModal />
            </div>
          </main>
        </div>
      )}
    </Authenticator>
  );
}

export default Chat;
