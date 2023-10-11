interface ModalProps {
  children: JSX.Element;
  show: boolean;
  action?: JSX.Element;
  onClose?: () => void;
}

function Modal({ children, show, action, onClose }: ModalProps) {
  if (!show) return null;

  return (
    <div
      className='fixed inset-0 z-10'
      aria-labelledby='modal-title'
      role='dialog'
      aria-modal='true'
    >
      <div
        className='fixed inset-0 bg-black bg-opacity-80 transition-opacity'
        onClick={onClose}
      ></div>
      <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
        <div className='relative transform overflow-hidden rounded-lg bg-white dark:bg-slate-700 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg'>
          <div className='bg-white dark:bg-slate-800 px-4 pb-4 pt-5 sm:p-6 sm:pb-4'>{children}</div>
          <div className='bg-gray-100 dark:bg-slate-700 border-t-2 px-4 py-3 sm:flex sm:flex-row-reverse gap-4 sm:px-6'>
            {action}
            <button
              type='button'
              className='py-2 px-4 rounded-full font-medium text-danger border border-danger hover:bg-danger hover:bg-opacity-10 transition select-none sm:mt-0 sm:w-auto'
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
