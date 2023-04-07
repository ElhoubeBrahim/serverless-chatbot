import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function UserProfile() {
  return (
    <div className='flex justify-between items-center gap-4'>
      <div className='flex gap-3 items-center'>
        <img
          src='https://picsum.photos/200'
          alt='User'
          className='w-10 h-10 rounded-full object-cover border-2 border-primary'
        />
        <p className='font-medium'>John Doe</p>
      </div>
      <FontAwesomeIcon icon='sign-out-alt' className='cursor-pointer text-danger' />
    </div>
  );
}

export default UserProfile;
