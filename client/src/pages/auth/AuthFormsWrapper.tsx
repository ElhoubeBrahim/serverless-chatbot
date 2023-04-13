import loginBackground from '../../assets/login-bg.svg';
import loginDecor from '../../assets/login-decor.svg';
import Guest from '../../layouts/Guest';

interface AuthFormsWrapperProps {
  children: JSX.Element;
  showDecor?: boolean;
}

function AuthFormsWrapper({ children, showDecor = false }: AuthFormsWrapperProps) {
  return (
    <Guest>
      <main
        className='px-5 py-20 h-screen bg-cover relative overflow-hidden bg-secondary'
        style={{
          backgroundImage: `url(${loginBackground})`,
        }}
      >
        <div className='container mx-auto'>
          <div className='w-full md:w-1/2 lg:w-1/3 xl:w-1/4 mx-auto'>
            <div className='flex items-center justify-center mb-10'>
              <img src='logo.svg' alt='Chatty' className='h-[150px] w-[150px] select-none' />
            </div>
            <div className='flex flex-col items-center justify-center'>{children}</div>
          </div>
        </div>
        {showDecor && (
          <img
            src={`${loginDecor}`}
            className='absolute bottom-0 right-0 h-[200px] w-full object-cover object-top mix-blend-multiply select-none'
          />
        )}
      </main>
    </Guest>
  );
}

export default AuthFormsWrapper;
