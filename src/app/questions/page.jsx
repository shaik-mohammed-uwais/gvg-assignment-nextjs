"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import useQuizstore from "../../store/Quizstore";
import questions from "./quesions";

export default function QuestionsPage() {
  const router = useRouter();
  const [isVertical, setIsVertical] = useState(false);

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

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
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

  const isAttempted = (qId) => result.some((r) => r.id === qId);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="w-full bg-gray-200 flex justify-between items-center px-6 py-3 sticky top-0 z-10">
        <div className="flex-1" />
        <div className="flex justify-center absolute left-1/2 -translate-x-1/2">
          <div className="inline-flex bg-white border border-orange-500 rounded-lg overflow-hidden">
            <button
              onClick={() => setIsVertical(false)}
              className={`px-4 py-2 text-sm font-medium transition ${
                !isVertical ? "bg-orange-500 text-white" : "text-orange-500"
              }`}
            >
              Horizontal
            </button>
            <button
              onClick={() => setIsVertical(true)}
              className={`px-4 py-2 text-sm font-medium transition ${
                isVertical ? "bg-orange-500 text-white" : "text-orange-500"
              }`}
            >
              Vertical
            </button>
          </div>
        </div>
        <button
          type="button"
          onClick={handleSubmit}
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg shadow"
        >
          Submit
        </button>
      </div>

      {isVertical ? (
        <div className="flex flex-1 overflow-hidden">
          <div className="flex-1 overflow-y-auto pr-4 max-h-[80vh] space-y-8 py-6 px-8">
            {questions.map((q, index) => {
              const isCurrent = index === currentQuestion;
              return (
                <div
                  key={q.id}
                  id={`question-${index}`}
                  className={`p-6 rounded-xl shadow text-gray-900 transition border-2 ${
                    isCurrent
                      ? "border-orange-500 bg-orange-50"
                      : "border-gray-300 bg-white"
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
              );
            })}
          </div>
          <div className="bg-gray-200 p-4 flex flex-col items-center sticky top-0">
            <div className="flex flex-col gap-2 mb-2">
              {questions.map((q, index) => {
                const isCurrent = index === currentQuestion;
                const attempted = isAttempted(q.id);
                let classes = "w-8 h-8 text-sm rounded-full font-medium";

                if (isCurrent) {
                  classes += " bg-orange-500 text-white scale-110";
                } else if (attempted) {
                  classes += " bg-purple-500 text-white";
                } else {
                  classes += " bg-gray-400 text-white";
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => handleJump(index)}
                    className={`${classes} transition`}
                  >
                    {index + 1}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="bg-gray-100 p-10 rounded-xl shadow-lg max-w-4xl w-full mt-8 min-h-[300px]">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
              {question.text}
            </h3>
            <form>
              <ul className="space-y-4">
                {question.options.map((opt, i) => (
                  <li key={i} className="flex items-center space-x-3">
                    <input
                      type="radio"
                      id={`option-${i}`}
                      name="answer"
                      value={opt}
                      checked={
                        result.find((r) => r.id === question.id)?.answer === opt
                      }
                      onChange={() => handleAnswer(question.id, opt)}
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
            </form>
          </div>

          <div className="w-full bg-gray-200 mt-auto py-6 px-6 flex items-center justify-center gap-20">
            <button
              onClick={handlePrev}
              className="bg-orange-500 text-white px-4 py-2 rounded-lg shadow"
            >
              Prev
            </button>
            <div className="flex gap-2">
              {questions.map((q, index) => {
                const isCurrent = index === currentQuestion;
                const attempted = isAttempted(q.id);
                let classes = "w-8 h-8 text-sm rounded-full font-medium";

                if (isCurrent) {
                  classes += " bg-orange-500 text-white scale-110";
                } else if (attempted) {
                  classes += " bg-purple-500 text-white";
                } else {
                  classes += " bg-gray-400 text-white";
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => handleJump(index)}
                    className={`${classes} transition`}
                  >
                    {index + 1}
                  </button>
                );
              })}
            </div>
            <button
              onClick={handleNext}
              className="bg-orange-500 text-white px-4 py-2 rounded-lg shadow"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
