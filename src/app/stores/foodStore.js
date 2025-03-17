import { create } from "zustand";
import { useSnakeStore } from "./snakeStore";

export const useFoodStore = create((set, get) => ({
	food: { x: 0, y: 0 },
	generateFood: () => {
		const snake = useSnakeStore.getState().snake;

        let randomX;
        let randomY;

		do {
			randomX = Math.floor(Math.random() * 10);
			randomY = Math.floor(Math.random() * 10);
		} while (snake.some((pos) => pos.x === randomX && pos.y === randomY));

        set({ food: { x: randomX, y: randomY } });
	}
}));
