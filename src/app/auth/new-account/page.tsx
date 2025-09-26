import { titleFont } from '@/config/fonts';

export default function NewAccountPage() {
  return (
    <div className="flex flex-col w-5/6 md:w-[35%]   ">

      <h1 className={`${titleFont.className} text-4xl mb-5 text-center`}>Create Account</h1>

      <div className="flex flex-col">

        <label htmlFor="name">Name</label>
        <input
          placeholder='John Doe'
          className="px-5 py-2 border bg-gray-200 rounded mb-5"
          type="text" />


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

        <label htmlFor="confirm-password">Confirm Password</label>
        <input
          placeholder='********'
          className="px-5 py-2 border bg-gray-200 rounded mb-5"
          type="password" />

        <button
          type="submit"
          className="btn-primary">
          Create
        </button>



      </div>
    </div>
  );
}
