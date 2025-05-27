"use client";
import useQuizstore from "../../store/Quizstore";
import { useRouter } from "next/navigation";

export default function ResultPage() {
  const { total, answered, correct } = useQuizstore();
  const notAnswered = total - answered;
  const router = useRouter();

  return (
    <main className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="max-w-md w-full text-center p-8 border rounded-xl shadow-lg">
        <h1 className="text-3xl font-extrabold mb-6 text-gray-900">
          Quiz Results
        </h1>

        <div className="space-y-4 text-left">
          <div className="flex justify-between text-gray-700 text-lg">
            <span>Total Questions:</span>
            <span>{total}</span>
          </div>
          <div className="flex justify-between text-purple-600 text-lg font-semibold">
            <span>Answered Questions:</span>
            <span>{answered}</span>
          </div>
          <div className="flex justify-between text-green-600 text-lg font-semibold">
            <span>Correct Answers:</span>
            <span>{correct}</span>
          </div>
          <div className="flex justify-between text-red-500 text-lg font-semibold">
            <span>Not Answered:</span>
            <span>{notAnswered}</span>
          </div>
        </div>

        <button
          onClick={() => router.push("/questions")}
          className="mt-8 bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-xl shadow-md transition transform hover:scale-105"
        >
          Retake Quiz
        </button>
      </div>
    </main>
  );
}
