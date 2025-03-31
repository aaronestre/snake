import { create } from "zustand";
import { useSnakeStore } from "./snakeStore";


export const useMultiplayerGameEngineStore  = create((set, get) => ({
    gameStatus: "playing",
    score: 0,
    snakes: {},
    startGame: () => set({ gameStatus: "playing" }),
    endGame: () => set({ gameStatus: "ended" }),
    resetGame: () => {
        useSnakeStore.getState().initializeSnake();
        set({ gameStatus: "playing", score: 0 })
    },

    increaseScore: () => set((state) => ({ score: state.score + 1 })),
}));