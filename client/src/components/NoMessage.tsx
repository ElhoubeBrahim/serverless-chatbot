function NoMessage() {
  const prompts = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi.',
    'Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla.',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi.',
    'Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla.',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi.',
    'Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla.',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi.',
    'Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla.',
  ];

  return (
    <div className="my-10">
      <div className='flex flex-col gap-4 items-center justify-center mb-10'>
        <img src='/bot-avatar.svg' alt='Chatty' className='h-28 w-28 object-cover' />
        <div className='text-2xl text-gray-400 font-bold font-title'>
          Hello there! How can I assist you today?
        </div>
      </div>
      <div className='grid lg:grid-cols-2 gap-4'>
        {prompts.map((prompt, index) => (
          <div
            key={index}
            className='bg-gray-50 dark:bg-slate-800 border border-primary rounded p-3 text-sm cursor-pointer hover:bg-gray-100 transition-colors'
          >
            {prompt}
          </div>
        ))}
      </div>
    </div>
  );
}

export default NoMessage;
