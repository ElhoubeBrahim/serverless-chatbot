import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface WelcomeCardProps {
  icon: IconProp;
  content: string;
}

function WelcomeCard({ icon, content }: WelcomeCardProps) {
  return (
    <div className='flex flex-col items-center justify-center text-center gap-4 p-4 bg-gray-50 rounded border border-primary dark:bg-slate-800'>
      <FontAwesomeIcon icon={icon} className='text-5xl text-secondary dark:text-primary' />
      <p className='text-sm'>{content}</p>
    </div>
  );
}

export default WelcomeCard;
