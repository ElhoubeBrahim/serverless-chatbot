import { IconProp } from '@fortawesome/fontawesome-svg-core';
import PrimaryButton from '../components/PrimaryButton';
import WelcomeCard from '../components/WelcomeCard';
import Sidebar from '../layouts/Sidebar';

interface CardContent {
  icon: IconProp;
  content: string;
}

function ChatHome() {
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
    <div>
      <Sidebar />
      <main className='ml-[400px] p-4'>
        <div className='container mx-auto px-4 py-10'>
          <div className='flex flex-col gap-4 items-center justify-center mb-20'>
            <img src='/logo-black.svg' alt='Chatty' className='h-24 w-24 object-cover' />
            <h1 className='text-4xl font-extrabold text-center text-primary font-title'>
              chatty.ai
            </h1>
          </div>
          <div className='grid lg:grid-cols-2 gap-4 mb-10'>
            {cardContents.map((cardContent, index) => (
              <WelcomeCard key={index} icon={cardContent.icon} content={cardContent.content} />
            ))}
          </div>
          <div className='mx-auto md:w-1/2'>
            <PrimaryButton text='Create a chat room' align='center' />
          </div>
        </div>
      </main>
    </div>
  );
}

export default ChatHome;
