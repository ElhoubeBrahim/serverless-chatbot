import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ChatMessage from '../types/ChatMessage';
import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { RateResponseModalState } from '../store/modals';
import { useParams } from 'react-router-dom';

function ChatMessage(props: { chat: ChatMessage }) {
  const { id } = useParams();
  const chat = props.chat;
  const errorMessage = 'Oooops! something went wrong. Please try again later.';
  const [copied, setCopied] = useState(false);
  const setRateResponseModalOpen = useSetRecoilState(RateResponseModalState);

  const copyAnswer = () => {
    navigator.clipboard.writeText(chat.Response || errorMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <div className='flex gap-4 items-start p-4 pt-8'>
        <div className='shrink-0'>
          <img
            src='https://picsum.photos/200'
            alt='User'
            className='w-10 h-10 rounded-full object-cover border-2 border-primary'
          />
        </div>
        <div className='mt-[10px]'>{chat.Prompt}</div>
      </div>
      {chat.Loading ? (
        <div className='flex gap-4 p-4 py-2 rounded-lg border bg-gray-50 dark:bg-slate-800 items-center border-primary'>
          <div className='shrink-0'>
            <img
              src={'/bot-avatar.svg'}
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
          className={`flex gap-4 p-4 rounded-lg border bg-gray-50 dark:bg-slate-800 ${
            chat.Response === null
              ? 'border-danger text-danger items-center'
              : 'border-primary items-start'
          }`}
        >
          <div className='shrink-0'>
            <img
              src={chat.Response === null ? '/bot-avatar-error.svg' : '/bot-avatar.svg'}
              alt='Bot'
              className='w-10 h-10 rounded-full object-cover'
            />
          </div>
          <div className='mt-[10px] w-full'>
            <div className='mb-4 pb-4 border-b'>
              {chat.Response || errorMessage}
            </div>
            <div className='flex gap-4 pl-4'>
              <FontAwesomeIcon
                icon={copied ? 'check' : 'clipboard'}
                className='text-gray-400 cursor-pointer hover:text-gray-500 transition-all'
                onClick={copyAnswer}
              />
              <FontAwesomeIcon
                icon='star'
                className='text-gray-400 cursor-pointer hover:text-gray-500 transition-all'
                onClick={() => setRateResponseModalOpen({
                  roomId: id as string,
                  responseId: chat.ID,
                  isOpen: true,
                })}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatMessage;
