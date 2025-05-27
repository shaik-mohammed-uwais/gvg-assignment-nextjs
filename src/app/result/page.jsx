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
    <div className="min-h-screen bg-white flex flex-col items-center justify-start py-10 px-4">
      <div className="w-full max-w-3xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-purple-700">Quiz Results</h1>
          <button
            onClick={() => router.push("/questions")}
            className="bg-purple-600 hover:bg-purple-700 transition-colors text-white font-medium px-6 py-2 rounded-lg shadow-md"
          >
            Try Again
          </button>
        </div>

        <div className="space-y-6">
          {questions.map((q, idx) => {
            const { userAns, isCorrect } = getAnswerStatus(q);
            return (
              <div
                key={q.id}
                className={`p-5 rounded-xl shadow-md border-l-4 ${
                  isCorrect
                    ? "border-green-500 bg-green-50"
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
                        isCorrect ? "text-green-700" : "text-red-700"
                      } font-semibold`}
                    >
                      {userAns || "Not Answered"}
                    </span>
                  </p>
                  <p>
                    <span className="font-medium text-gray-700">
                      Correct Answer:
                    </span>{" "}
                    <span className="text-blue-700 font-semibold">
                      {q.answer}
                    </span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
