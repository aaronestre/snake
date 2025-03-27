import { create } from "zustand";
import { useSnakeStore } from "./snakeStore";


export const useGameEngineStore = create((set, get) => ({
    gameStatus: "playing",
    score: 0,

    startGame: () => set({ gameStatus: "playing" }),
    endGame: () => set({ gameStatus: "ended" }),
    resetGame: () => {
        useSnakeStore.getState().initializeSnake();
        set({ gameStatus: "playing", score: 0 })
    },

    increaseScore: () => set((state) => ({ score: state.score + 1 })),
}));