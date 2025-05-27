"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import useQuizstore from "../../store/Quizstore";
import questions from "./quesions";

export default function QuestionsPage() {
  const router = useRouter();
  const [isVertical, setIsVertical] = useState(false); // NEW: toggle state

  const {
    result,
    setResult,
    currentQuestion,
    setCurrentQuestion,
    setQuizSummary,
  } = useQuizstore();

  const question = questions[currentQuestion];

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleJump = (index) => {
    setCurrentQuestion(index);
    if (isVertical) {
      const el = document.getElementById(`question-${index}`);
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleAnswer = (questionId, option) => {
    const updated = result.filter((r) => r.id !== questionId);
    setResult([...updated, { id: questionId, answer: option }]);
  };

  const handleSubmit = () => {
    const correctans = result.filter((userAns) =>
      questions.some((q) => q.id === userAns.id && q.answer === userAns.answer)
    ).length;

    setQuizSummary({
      total: questions.length,
      answered: result.length,
      correct: correctans,
    });

    router.push("/result");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-between p-6">
      {/* Header */}
      <div className="w-full flex justify-between items-center mb-6 relative">
        <h2 className="text-xl font-semibold text-gray-800">
          Question {currentQuestion + 1}
        </h2>

        <button
          onClick={() => setIsVertical(!isVertical)}
          className="absolute left-1/2 transform -translate-x-1/2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow"
        >
          Switch to {isVertical ? "Horizontal" : "Vertical"} View
        </button>

        <button
          type="button"
          onClick={handleSubmit}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow"
        >
          Submit
        </button>
      </div>

      {/* Conditional Layout */}
      {isVertical ? (
        <div className="flex flex-1 overflow-hidden max-w-4xl mx-auto">
          <div className="flex-1 overflow-y-auto pr-4 max-h-[80vh] space-y-8">
            {questions.map((q, index) => (
              <div
                key={q.id}
                id={`question-${index}`}
                className={`p-6 rounded-xl border transition text-gray-900 shadow ${
                  currentQuestion === index
                    ? "border-purple-600 bg-purple-50"
                    : "border-gray-200 bg-white"
                }`}
              >
                <h3 className="text-xl font-semibold mb-4">{q.text}</h3>
                <ul className="space-y-4">
                  {q.options.map((opt, i) => (
                    <li key={i} className="flex items-center space-x-3">
                      <input
                        type="radio"
                        id={`q${index}-opt${i}`}
                        name={`q${index}`}
                        value={opt}
                        checked={
                          result.find((r) => r.id === q.id)?.answer === opt
                        }
                        onChange={() => {
                          handleAnswer(q.id, opt);
                          setCurrentQuestion(index);
                        }}
                        className="form-radio h-5 w-5 text-purple-600"
                      />
                      <label
                        htmlFor={`q${index}-opt${i}`}
                        className="cursor-pointer text-lg"
                      >
                        {opt}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Vertical Carousel on Right */}
          <div className="ml-6 hidden md:flex flex-col gap-3">
            {questions.map((q, index) => (
              <button
                key={q.id}
                onClick={() => handleJump(index)}
                className={`w-10 h-10 rounded-full font-medium transition ${
                  index === currentQuestion
                    ? "bg-purple-600 text-white scale-110"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <>
          {question ? (
            <div className="text-center mb-8 ">
              <div className="inline-block max-w-full w-auto p-6 rounded-xl border border-purple-600 bg-purple-50 text-gray-900 shadow transition">
                <h3 className="text-lg font-medium text-gray-800 mb-4 ">
                  {question.text}
                </h3>
                <form>
                  <ul className="space-y-4 max-w-md mx-auto text-left">
                    {question.options.map((opt, i) => (
                      <li key={i} className="flex items-center space-x-3">
                        <input
                          type="radio"
                          id={`option-${i}`}
                          name="answer"
                          value={opt}
                          checked={
                            result.find((r) => r.id === question.id)?.answer ===
                            opt
                          }
                          onChange={() => {
                            handleAnswer(question.id, opt);
                          }}
                          className="form-radio h-5 w-5 text-purple-600"
                        />
                        <label
                          htmlFor={`option-${i}`}
                          className="cursor-pointer text-gray-800"
                        >
                          {opt}
                        </label>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6">
                    {currentQuestion < questions.length - 1 && (
                      <button
                        type="button"
                        onClick={handleNext}
                        className="bg-purple-500 hover:bg-purple-600 text-white font-semibold px-6 py-2 rounded-lg transition"
                      >
                        Next
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          ) : (
            <p className="text-center text-red-600 font-semibold">
              Invalid question index!
            </p>
          )}
        </>
      )}

      {/* Bottom Carousel (Only in Horizontal View) */}
      {!isVertical && (
        <div className="flex gap-2 flex-wrap justify-center mt-8">
          {questions.map((q, index) => (
            <button
              key={q.id}
              onClick={() => handleJump(index)}
              className={`w-10 h-10 rounded-full font-medium transition ${
                index === currentQuestion
                  ? "bg-purple-600 text-white scale-110"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
