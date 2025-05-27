import { create } from "zustand";

const useQuizstore = create((set) => ({
  total: 0,
  answered: 0,
  correct: 0,

  setResult: ({ total, answered, correct }) =>
    set({ total, answered, correct }),
}));
export default useQuizstore;
