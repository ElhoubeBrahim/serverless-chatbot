import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Input from "../Input";

interface EmailInputProps {
  inputClasses?: string;
  email: string;
  setEmail: (email: string) => void;
}

function EmailInput({ inputClasses, email, setEmail }: EmailInputProps) {
  return (
    <div className='mb-4 w-full'>
      <Input
        type='text'
        placeholder='Email'
        className={inputClasses}
        preIcon={<FontAwesomeIcon icon='user' className='text-white' />}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
    </div>
  );
}

export default EmailInput;
