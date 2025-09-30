import { titleFont } from '@/config/fonts';
import LoginForm from './ui/LoginForm';

export default function LoginPage() {
  return (
    <div className="flex flex-col w-5/6 md:w-1/3 xl:w-1/5   ">

      <h1 className={`${titleFont.className} text-4xl mb-5 text-center`}>Login</h1>
      <LoginForm />

    </div>
  );
}
