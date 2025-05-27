"use client";

import { useState } from "react";
import questions from "./quesions";
import { useRouter } from "next/navigation";
import useQuizstore from "../../store/Quizstore";

export default function QuestionsPage() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [result, setResult] = useState([]);
  const updateres = useQuizstore((state) => state.setResult);

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setSelectedOption(null);
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const handleJump = (index) => {
    setSelectedOption(null);
    setCurrentQuestion(index);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const correctans = result.filter((userAns) =>
      questions.some((q) => q.id === userAns.id && q.answer === userAns.answer)
    ).length;

    updateres({
      total: questions.length,
      answered: result.length,
      correct: correctans,
    });

    router.push("/result");
  };

  const question = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-white flex flex-col justify-between p-6">
      {/* Header with Submit button on the right */}
      <div className="w-full flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          Question {currentQuestion + 1}
        </h2>
        <button
          type="button"
          onClick={handleSubmit}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow"
        >
          Submit
        </button>
      </div>

      {/* Question and Options */}
      <div className="text-center mb-8">
        <h3 className="text-lg font-medium text-gray-700 mb-4">
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
                  checked={selectedOption === opt}
                  onChange={() => {
                    setSelectedOption(opt);
                    setResult((prev) => {
                      const updated = prev.filter(
                        (val) => val.id !== question.id
                      );
                      return [...updated, { id: question.id, answer: opt }];
                    });
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

          {/* Next button */}
          <div className="mt-6">
            <button
              type="button"
              onClick={handleNext}
              className="bg-purple-500 hover:bg-purple-600 text-white font-semibold px-6 py-2 rounded-lg transition"
            >
              Next
            </button>
          </div>
        </form>
      </div>

      {/* Carousel */}
      <div className="flex gap-2 flex-wrap justify-center mt-8">
        {questions.map((q, index) => (
          <button
            key={q.id}
            onClick={() => handleJump(index)}
            className={`w-10 h-10 rounded-full font-medium transition
              ${
                index === currentQuestion
                  ? "bg-purple-500 text-white scale-110"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
