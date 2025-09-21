import { titleFont } from '@/config/fonts';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="flex flex-col w-5/6 md:w-2/5   ">

      <h1 className={`${titleFont.className} text-4xl mb-5 text-center`}>Login</h1>

      <div className="flex flex-col">

        <label htmlFor="email">Email</label>
        <input
          placeholder='example@correo.com'
          className="px-5 py-2 border bg-gray-200 rounded mb-5"
          type="email" />


        <label htmlFor="password">Password</label>
        <input
          placeholder='********'
          className="px-5 py-2 border bg-gray-200 rounded mb-5"
          type="password" />

        <button

          className="btn-primary">
          Enter
        </button>


        {/* divisor l ine */}
        <div className="flex items-center my-5">
          <div className="flex-1 border-t border-gray-500"></div>
          <div className="px-2 text-gray-800">O</div>
          <div className="flex-1 border-t border-gray-500"></div>
        </div>

        <Link
          href="/auth/new-account"
          className="btn-secondary text-center">
          Create new account
        </Link>

      </div>
    </div>
  );
}
