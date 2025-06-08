"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useQuizstore from "../../store/Quizstore";

export default function ResultPage() {
  const router = useRouter();
  const { result } = useQuizstore();
  const [isChecked, setIsChecked] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const res = await fetch("/api/questions");
        const data = await res.json();
        setQuestions(data);
      } catch (error) {
        console.error("Error loading questions:", error);
      }
    }
    fetchQuestions();
  }, []);

  const getAnswerStatus = (q) => {
    const userAns = result.find((r) => r.questionId === q.id)?.answer;
    const isCorrect = userAns === q.correctAnswer;
    return { userAns, isCorrect };
  };

  const handleSubmit = async () => {
    if (!isChecked) {
      alert("Please agree to the declaration");
      return;
    }

    try {
      setSubmitting(true);

      const transformedAnswers = result.map((item) => {
        const q = questions.find((q) => q.id === item.questionId);

        return {
          question: q?.question || "Unknown question",
          selected: item.answer || "Not answered",
          correct: q?.correctAnswer || "Unknown correct",
        };
      });

      console.log("Submitting answers:", transformedAnswers);

      const response = await fetch("/api/answers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ answers: transformedAnswers }),
      });

      if (response.ok) {
        alert("successful");
      } else {
        alert("Submission failed");
        const error = await response.json();
        throw new Error(error.error || "Submission failed");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Submission failed: " + error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-start pb-28">
      <header className="sticky top-0 z-30 bg-gray-100 w-full border-b border-gray-300">
        <div className="max-w-3xl mx-auto p-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-purple-700">Quiz Results</h1>
          <button
            onClick={() => router.push("/questions")}
            className="bg-orange-600 hover:bg-orange-700 text-white font-semibold px-6 py-2 rounded-lg"
          >
            Edit Answers
          </button>
        </div>
      </header>

      <main className="w-full max-w-3xl bg-gray-100 p-6 rounded-lg shadow mt-6">
        {questions.map((q, idx) => {
          const { userAns, isCorrect } = getAnswerStatus(q);
          return (
            <div key={q.id}>
              <div className="rounded-md px-4 py-2">
                <h2 className="text-base font-semibold mb-3 text-gray-800">
                  {q.question}
                </h2>
                <div className="ml-4 space-y-1 text-sm">
                  <p>
                    <span className="font-medium text-gray-700">
                      Your Answer:{" "}
                    </span>
                    <span
                      className={`${
                        userAns
                          ? isCorrect
                            ? "text-green-700"
                            : "text-red-700"
                          : "text-gray-700"
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
                      {q.correctAnswer}
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

      <footer className="fixed bottom-0 z-30 w-full bg-gray-100 border-t border-gray-300 px-4 py-4">
        <div className="max-w-3xl mx-auto flex justify-between items-center">
          <label className="flex items-center space-x-2 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
              className="w-4 h-4 text-orange-600 rounded border-gray-300"
            />
            <span>
              I declare that everything I have answered is to the best of my
              knowledge.
            </span>
          </label>
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="bg-orange-600 hover:bg-orange-700 text-white font-semibold px-6 py-2 rounded-md shadow hover:shadow-lg disabled:opacity-50"
          >
            {submitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </footer>
    </div>
  );
}
