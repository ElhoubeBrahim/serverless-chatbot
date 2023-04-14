import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { useSetRecoilState } from 'recoil';
import PrimaryButton from '../components/PrimaryButton';
import WelcomeCard from '../components/WelcomeCard';
import { chatRoomFormModalState } from '../store/modals';

interface CardContent {
  icon: IconProp;
  content: string;
}

function ChatHome() {
  const setChatFormModalOpen = useSetRecoilState(chatRoomFormModalState);
  const cardContents: CardContent[] = [
    {
      icon: 'star',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla.',
    },
    {
      icon: 'star',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla.',
    },
    {
      icon: 'star',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla.',
    },
    {
      icon: 'star',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla.',
    },
  ];

  return (
    <div className='lg:w-2/3 mx-auto'>
      <div className='flex flex-col gap-4 items-center justify-center mb-20'>
        <img src='/logo-black.svg' alt='Chatty' className='h-24 w-24 object-cover' />
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
