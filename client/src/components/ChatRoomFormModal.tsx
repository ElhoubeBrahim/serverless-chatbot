import { useState } from 'react';
import { toast } from 'react-toastify';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { createChatRoom } from '../services/chatrooms';
import { chatRoomsState } from '../store/chatrooms';
import { chatRoomFormModalState } from '../store/modals';
import Input from './Input';
import Modal from './Modal';
import PrimaryButton from './PrimaryButton';

function ChatRoomFormModal() {
  const [isOpen, setIsOpen] = useRecoilState(chatRoomFormModalState);
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const setChats = useSetRecoilState(chatRoomsState);

  const handleSubmit = async () => {
    // Validate title
    if (!title) {
      toast.error('Please enter chat room title');
      return;
    }

    // Create chat room
    setLoading(true);
    const response = await createChatRoom({ title });

    // Handle error
    if (!response) {
      toast.error('Ooops! Something went wrong. Cannot create chat room');
      setLoading(false);
      return;
    }

    // Append new chat room to the list
    setChats((old) => [response.room, ...old]);

    // Close the form & show success message
    closeModal();
    toast.success('Chat room created successfully');
  };

  const closeModal = () => {
    setTitle('');
    setLoading(false);
    setIsOpen(false);
  };

  return (
    <Modal
      show={isOpen}
      onClose={closeModal}
      action={
        <PrimaryButton
          text={loading ? 'Creating ...' : 'Create room'}
          className='w-max rounded-full px-8'
          disabled={loading}
          onClick={handleSubmit}
        />
      }
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
