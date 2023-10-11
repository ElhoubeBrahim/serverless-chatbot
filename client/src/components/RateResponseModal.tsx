import { useState } from 'react';
import { toast } from 'react-toastify';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { RateResponseModalState } from '../store/modals';
import Input from './Input';
import Modal from './Modal';
import PrimaryButton from './PrimaryButton';
import ReactStars from 'react-rating-stars-component';
import { rateResponse } from '../services/chatrooms';

function RateResponseModal() {
  const [responseModal, setResponseModal] = useRecoilState(RateResponseModalState);
  const [rating, setRating] = useState(5);
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    // Validate title
    if (!rating || rating < 1 || rating > 5) {
      toast.error('Please enter a valid rating');
      return;
    }

    // Validate feedback
    if (!feedback) {
      toast.error('Please enter feedback');
      return;
    }

    // Rate message
    setLoading(true);
    const response = await rateResponse(responseModal.roomId, responseModal.responseId, rating, feedback);

    // Handle error
    if (!response) {
      toast.error('Ooops! Something went wrong. Cannot rate response');
      setLoading(false);
      return;
    }

    // Close the form & show success message
    closeModal();
    toast.success('Thanks for your feedback');

  };

  const closeModal = () => {
    setFeedback('');
    setRating(5);

    setLoading(false);
    setResponseModal({
      roomId: '',
      responseId: '',
      isOpen: false,
    });
  };

  return (
    <Modal
      show={responseModal.isOpen}
      onClose={closeModal}
      action={
        <PrimaryButton
          text={loading ? 'Sending ...' : 'Rate response'}
          className='w-max rounded-full px-8'
          disabled={loading}
          onClick={handleSubmit}
        />
      }
    >
      <>
        <div className='text-lg font-bold'>Rate response</div>
        <hr className='mb-4 mt-2' />
        <div className='mb-4 w-full'>
          <ReactStars
            count={5}
            value={rating}
            onChange={setRating}
            size={24}
            activeColor='#ffd700'
          />
        </div>
        <div className='mb-4 w-full'>
          <Input
            label='Feedback'
            type='textarea'
            placeholder='Enter feedback'
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            rows="5"
          />
        </div>
      </>
    </Modal>
  );
}

export default RateResponseModal;
