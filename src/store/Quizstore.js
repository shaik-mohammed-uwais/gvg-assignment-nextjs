import { create } from "zustand";

const useQuizstore = create((set) => ({
  result: [],
  setResult: (newResult) => set({ result: newResult }),

  currentQuestion: 0,
  setCurrentQuestion: (index) => set({ currentQuestion: index }),

  quizSummary: {
    total: 0,
    answered: 0,
    correct: 0,
  },
  setQuizSummary: (summary) => set({ quizSummary: summary }),

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
