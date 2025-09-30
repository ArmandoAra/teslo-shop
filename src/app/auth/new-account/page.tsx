import { titleFont } from '@/config/fonts';
import { RegisterForm } from './ui/RegisterForm';

export default function NewAccountPage() {
  return (
    <div className="flex flex-col w-5/6 md:w-1/3 xl:w-1/5   ">

      <h1 className={`${titleFont.className} text-4xl mb-5 text-center`}>Create Account</h1>

      <RegisterForm />
    </div>
  );
}
