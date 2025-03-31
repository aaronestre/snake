import { create } from "zustand";
import { useBoardStore } from "./boardStore";

export const useMultiplayerSnakeStore = create((set, get) => ({
    snake: [],
    head: {},
    initializeSnake: () => {
        const BOARD_SIZE = useBoardStore.getState().getBoardSize();
        const initialHead = {
            x: Math.floor(Math.random() * BOARD_SIZE),
            y: Math.floor(Math.random() * BOARD_SIZE)
        };

        set({
            snake: [initialHead],
            head: initialHead,
        });
    },
}));
