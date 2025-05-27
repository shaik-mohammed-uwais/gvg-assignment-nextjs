"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleStart = () => {
    router.push("/questions");
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="text-center max-w-sm">
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
          Ready for a fun quiz?
        </h1>
        <p className="text-base text-gray-600 mb-6">
          Click below to start answering a few short questions.
        </p>
        <button
          onClick={handleStart}
          className="bg-purple-500 hover:bg-purple-600 text-white font-medium px-5 py-2.5 rounded-full shadow-md transition duration-200 ease-in-out transform hover:scale-105"
        >
          Start Quiz
        </button>
      </div>
    </main>
  );
}
