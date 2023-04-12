import ChatMessage from '../types/ChatMessage';

function ChatMessage(props: { chat: ChatMessage }) {
  const chat = props.chat;

  return (
    <div>
      <div className='flex gap-4 items-start p-4 py-8'>
        <div className='shrink-0'>
          <img
            src='https://picsum.photos/200'
            alt='User'
            className='w-10 h-10 rounded-full object-cover border-2 border-primary'
          />
        </div>
        <div>{chat.Prompt}</div>
      </div>
      {chat.Loading ? (
        <div className='flex gap-4 p-4 py-2 rounded-lg border bg-gray-50 items-center border-primary'>
          <div className='shrink-0'>
            <img
              src={chat.Response === null ? '/bot-avatar-error.svg' : '/bot-avatar.svg'}
              alt='Bot'
              className='w-10 h-10 rounded-full object-cover'
            />
          </div>
          <div className='flex items-center gap-2'>
            <div className='animate-pulse bg-gray-300 h-3 w-3 rounded-full'></div>
            <div className='animate-pulse bg-gray-400 h-3 w-3 rounded-full'></div>
            <div className='animate-pulse bg-gray-500 h-3 w-3 rounded-full'></div>
          </div>
        </div>
      ) : (
        <div
          className={`flex gap-4 p-4 rounded-lg border bg-gray-50 ${
            chat.Response === null
              ? 'border-danger text-danger items-center'
              : 'py-8 border-primary items-start'
          }`}
        >
          <div className='shrink-0'>
            <img
              src={chat.Response === null ? '/bot-avatar-error.svg' : '/bot-avatar.svg'}
              alt='Bot'
              className='w-10 h-10 rounded-full object-cover'
            />
          </div>
          <div>{chat.Response || 'Oooops! something went wrong. Please try again later.'}</div>
        </div>
      )}
    </div>
  );
}

export default ChatMessage;
