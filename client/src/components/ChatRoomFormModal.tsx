import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { chatRoomFormModalState } from '../store/modals';
import Input from './Input';
import Modal from './Modal';
import PrimaryButton from './PrimaryButton';

function ChatRoomFormModal() {
  const [isOpen, setIsOpen] = useRecoilState(chatRoomFormModalState);
  const [title, setTitle] = useState('');

  return (
    <Modal
      show={isOpen}
      onClose={() => setIsOpen(false)}
      action={<PrimaryButton text='Create' className='w-max rounded-full px-8' />}
    >
      <>
        <div className='text-lg font-bold'>Create a chat room</div>
        <hr className='mb-4 mt-2' />
        <div className='mb-4 w-full'>
          <Input
            label="Chat room's title"
            type='text'
            placeholder='Enter chat room title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
      </>
    </Modal>
  );
}

export default ChatRoomFormModal;
