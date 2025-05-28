"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useQuizstore from "../../store/Quizstore";
import questions from "../questions/quesions";

export default function ResultPage() {
  const router = useRouter();
  const { result } = useQuizstore();

  useEffect(() => {
    if (!result || result.length === 0) {
      router.push("/questions");
    }
  }, [result, router]);

  const getAnswerStatus = (q) => {
    const userAns = result.find((r) => r.id === q.id)?.answer;
    const isCorrect = userAns === q.answer;
    return { userAns, isCorrect };
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-start">
      {/* Full width sticky header */}
      <header className="sticky top-0 z-30 bg-gray-100 w-full shadow-md">
        <div className="max-w-3xl mx-auto p-4 rounded-b-lg flex justify-between items-center">
          <h1 className="text-3xl font-bold text-purple-700">Quiz Results</h1>
          <button
            onClick={() => router.push("/questions")}
            className="
              bg-gradient-to-r from-orange-500 to-orange-600
              hover:from-orange-600 hover:to-orange-700
              transition-all duration-300 ease-in-out
              text-white font-semibold px-6 py-2 rounded-lg
              shadow-md hover:shadow-lg
              transform hover:scale-105
              focus:outline-none focus:ring-4 focus:ring-orange-300
            "
          >
            Try Again
          </button>
        </div>
      </header>

      {/* Results container remains centered */}
      <main className="w-full max-w-3xl space-y-6 bg-gray-100 p-6 rounded-lg shadow mt-6">
        {questions.map((q, idx) => {
          const { userAns, isCorrect } = getAnswerStatus(q);
          return (
            <div
              key={q.id}
              className={`p-5 rounded-xl shadow-md border-l-4 ${
                isCorrect
                  ? "border-orange-500 bg-orange-50"
                  : "border-red-500 bg-red-50"
              }`}
            >
              <h2 className="text-lg font-semibold mb-3 text-gray-800">
                Q{idx + 1}. {q.text}
              </h2>
              <div className="ml-4 space-y-1">
                <p>
                  <span className="font-medium text-gray-700">
                    Your Answer:
                  </span>{" "}
                  <span
                    className={`${
                      isCorrect ? "text-orange-700" : "text-red-700"
                    } font-semibold`}
                  >
                    {userAns || "Not Answered"}
                  </span>
                </p>
                <p>
                  <span className="font-medium text-gray-700">
                    Correct Answer:
                  </span>{" "}
                  <span className="text-purple-700 font-semibold">
                    {q.answer}
                  </span>
                </p>
              </div>
            </div>
          );
        })}
      </main>
    </div>
  );
}
