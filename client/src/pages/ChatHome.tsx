import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { useRecoilState, useSetRecoilState } from 'recoil';
import PrimaryButton from '../components/PrimaryButton';
import WelcomeCard from '../components/WelcomeCard';
import { chatRoomFormModalState } from '../store/modals';
import { themeState } from '../store/theme';

interface CardContent {
  icon: IconProp;
  content: string;
}

function ChatHome() {
  const setChatFormModalOpen = useSetRecoilState(chatRoomFormModalState);
  const [theme, setTheme] = useRecoilState(themeState);
  const cardContents: CardContent[] = [
    {
      icon: 'star',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi.',
    },
    {
      icon: 'star',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi.',
    },
    {
      icon: 'star',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi.',
    },
    {
      icon: 'star',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi.',
    },
  ];

  return (
    <div className='lg:w-2/3 mx-auto py-5'>
      <div className='flex flex-col gap-4 items-center justify-center mb-20'>
        <img
          src={theme === 'dark' ? '/logo-light.svg' : '/logo-black.svg'}
          alt='Chatty'
          className='h-24 w-24 object-cover'
        />
        <h1 className='text-4xl font-extrabold text-center text-primary font-title'>chatty.ai</h1>
      </div>
      <div className='grid lg:grid-cols-2 gap-4 mb-10'>
        {cardContents.map((cardContent, index) => (
          <WelcomeCard key={index} icon={cardContent.icon} content={cardContent.content} />
        ))}
      </div>
      <div className='mx-auto md:w-1/2'>
        <PrimaryButton
          text='Create a chat room'
          align='center'
          onClick={() => setChatFormModalOpen(true)}
        />
      </div>
    </div>
  );
}

export default ChatHome;
