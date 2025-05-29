"use client";

import { useRouter } from "next/navigation";
import useQuizstore from "../../store/Quizstore";
import questions from "../questions/quesions";
import { useState } from "react";

export default function ResultPage() {
  const router = useRouter();
  const { result } = useQuizstore();
  const [isChecked, setIsChecked] = useState(false);

  const getAnswerStatus = (q) => {
    const userAns = result.find((r) => r.id === q.id)?.answer;
    const isCorrect = userAns === q.answer;
    return { userAns, isCorrect };
  };

  const handleSubmit = () => {
    const allAnswered = questions.every((q) =>
      result.find((r) => r.id === q.id && r.answer)
    );

    if (!isChecked) {
      alert("Please confirm the declaration before submitting.");
      return;
    }

    if (!allAnswered) {
      alert("Please answer all questions before submitting.");
      return;
    }

    alert("Submitted successfully!");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-start pb-28">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-gray-100 w-full border-b border-gray-300">
        <div className="max-w-3xl mx-auto p-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-purple-700">Quiz Results</h1>
          <button
            onClick={() => router.push("/questions")}
            className="bg-orange-600 hover:bg-orange-700 transition-colors text-white font-semibold px-6 py-2 rounded-lg focus:outline-none focus:ring-4 focus:ring-orange-300"
          >
            Edit Answers
          </button>
        </div>
      </header>

      {/* Result Cards */}
      <main className="w-full max-w-3xl bg-gray-100 p-6 rounded-lg shadow mt-6">
        {questions.map((q, idx) => {
          const { userAns, isCorrect } = getAnswerStatus(q);
          return (
            <div key={q.id}>
              <div className="rounded-md px-4 py-2">
                <h2 className="text-base font-semibold mb-3 text-gray-800">
                  {q.text}
                </h2>
                <div className="ml-4 space-y-1 text-sm">
                  <p>
                    <span className="font-medium text-gray-700">
                      Your Answer:{" "}
                    </span>
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
                      Correct Answer:{" "}
                    </span>
                    <span className="text-purple-700 font-semibold">
                      {q.answer}
                    </span>
                  </p>
                </div>
              </div>

              {idx < questions.length - 1 && (
                <hr
                  className="border-t border-dashed border-gray-500 my-6"
                  style={{
                    borderStyle: "dashed",
                    borderWidth: "1px",
                    borderColor: "#6B7280",
                    borderImage:
                      "repeating-linear-gradient(90deg, #6B7280 0, #6B7280 6px, transparent 6px, transparent 12px) 10",
                  }}
                />
              )}
            </div>
          );
        })}
      </main>

      {/* Declaration + Submit */}
      <footer className="fixed bottom-0 z-30 w-full bg-gray-100 border-t border-gray-300 px-4 py-4">
        <div className="max-w-3xl mx-auto flex justify-between items-center">
          <label className="flex items-center space-x-2 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
              className="w-4 h-4 text-orange-600 rounded border-gray-300 focus:ring-orange-500"
            />
            <span>
              I declare that everything I have answered is to the best of my
              knowledge.
            </span>
          </label>

          <button
            onClick={handleSubmit}
            className="bg-orange-600 hover:bg-orange-700 transition-colors text-white font-semibold px-6 py-2 rounded-md shadow hover:shadow-lg disabled:opacity-50"
          >
            Submit
          </button>
        </div>
      </footer>
    </div>
  );
}
