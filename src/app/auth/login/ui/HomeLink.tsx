'use client'

export const HomeLink = () => {
    return (
        <button
            onClick={() => window.location.replace('/')}
            className="mb-10  hover:text-gray-800 transition-colors text-xl flex gap-2 h-12 bg-blue-500 hover:bg-blue-600 rounded-md justify-center items-center text-white">
            Go to shop
        </button>
    );
};