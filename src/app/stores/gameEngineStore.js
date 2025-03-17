import { create } from "zustand";

export const useGameEngineStore = create((set, get) => ({
    gameStatus: "playing",
    score: 0,

    startGame: () => set({ gameStatus: "playing" }),
    endGame: () => set({ gameStatus: "ended" }),
    resetGame: () => set({ gameStatus: "playing", score: 0 }),

    increaseScore: () => set((state) => ({ score: state.score + 1 })),
}));