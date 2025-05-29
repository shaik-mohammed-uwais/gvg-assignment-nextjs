import { create } from "zustand";

const useQuizstore = create((set) => ({
  // Stores selected answers [{ id, answer }]
  result: [],
  setResult: (newResult) => set({ result: newResult }),

  // Currently viewed question index
  currentQuestion: 0,
  setCurrentQuestion: (index) => set({ currentQuestion: index }),

  // Summary stats (to be calculated at review stage)
  quizSummary: {
    total: 0,
    answered: 0,
    correct: 0,
  },
  setQuizSummary: (summary) => set({ quizSummary: summary }),

  // Resets all state
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
