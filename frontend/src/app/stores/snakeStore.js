import { create } from "zustand";
import { useFoodStore } from "./foodStore";
import { useControlsStore } from "./controlsStore";
import { useGameEngineStore } from "./gameEngineStore";
import { useBoardStore } from "./boardStore";

export const useSnakeStore = create((set, get) => ({
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

	moveSnake: async () => {
		const moveDirection = useControlsStore.getState().moveVector.direction;
		const moveAmount = useControlsStore.getState().moveVector.amount;

		const BOARD_SIZE = useBoardStore.getState().getBoardSize();
		const snake = get().snake;
		const head = get().head;

		if (await get().hitWall(head, moveDirection, moveAmount, BOARD_SIZE)) return;

		if (await get().hitSelf(head, snake)) {
			useGameEngineStore.getState().resetGame();
			return;
		}

		set((state) => {
			const food = useFoodStore.getState().food;
			let newSnake = [...state.snake];
			let head = { ...state.head };
			if (moveDirection === "vertical") {
				head.y += moveAmount;
			} else if (moveDirection === "horizontal") {
				head.x += moveAmount;
			}
			newSnake.unshift(head);

			if (head.x === food.x && head.y === food.y) {
				useFoodStore.getState().generateFood();
				useGameEngineStore.getState().increaseScore();
			} else {
				newSnake.pop();
			}

			return { snake: newSnake, head: head };
		});
	},
	hitWall: (head, moveDirection, moveAmount, BOARD_SIZE) => {
		if (moveDirection === "vertical") {
			if (head.y + moveAmount >= BOARD_SIZE || head.y + moveAmount < 0) return true;
			else return false;
		} else if (moveDirection === "horizontal") {
			if (head.x + moveAmount >= BOARD_SIZE || head.x + moveAmount < 0) return true;
			else return false;
		}
	},
	hitSelf: (head, snake) => {
		return snake.slice(1).some((pos) => pos.x === head.x && pos.y === head.y);
	}
}));
