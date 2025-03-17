import { create } from "zustand";

import { useSnakeStore } from "./snakeStore";

export const useControlsStore = create((set, get) => ({
    moveVector: { direction: "horizontal", amount: 1 },

    handleKeyDown: (event) => {
        const moveSnake = useSnakeStore.getState().moveSnake;
        const {moveVector} = get();
        if ( moveVector.direction === "vertical") {
			if ((event.key === "w" && moveVector.amount === 1) ||( event.key === "s" && moveVector.amount === -1)) return;
		}
		else if ( moveVector.direction === "horizontal") {
			if ((event.key === "a" && moveVector.amount === 1) || (event.key === "d" && moveVector.amount === -1)) return;
		}
		const direction = event.key === "w" || event.key === "s" ? "vertical" : "horizontal";
		const amount = event.key === "w" || event.key === "a" ? -1 : 1;

		set({ moveVector: { direction: direction, amount: amount } });
        moveSnake(moveVector.direction, moveVector.amount);
    }
}));