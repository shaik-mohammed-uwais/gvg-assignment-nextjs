import { create } from "zustand";

const useQuizstore = create((set) => ({
  // Stores all answered questions { id, answer }
  result: [],
  setResult: (newResult) => set({ result: newResult }),

  // Current question index
  currentQuestion: 0,
  setCurrentQuestion: (index) => set({ currentQuestion: index }),

  // Summary data for result page
  quizSummary: {
    total: 0,
    answered: 0,
    correct: 0,
  },
  setQuizSummary: (summary) => set({ quizSummary: summary }),

  // (Optional) Reset state function
  resetQuiz: () =>
    set({
      result: [],
      currentQuestion: 0,
      quizSummary: {
        total: 0,
        answered: 0,
        correct: 0,
      },
    }),
}));

export default useQuizstore;
