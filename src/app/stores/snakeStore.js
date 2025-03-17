import { create } from "zustand";
import { useFoodStore } from "./foodStore";
import { useControlsStore } from "./controlsStore";

export const useSnakeStore = create((set, get) => ({

    BOARD_SIZE: 10,

    snake: [
        { x: 4, y: 4 },
    ],

    moveSnake: async () => {
        const moveDirection = useControlsStore.getState().moveVector.direction;
        const moveAmount = useControlsStore.getState().moveVector.amount;

        const isHittingWall = await get().hitWall(moveDirection, moveAmount);
        const food = useFoodStore.getState().food;
        if (isHittingWall) return;
        set((state) => {
            let newSnake = [...state.snake];
            let head = { ...state.snake[0] };
            if (moveDirection === "vertical") {
                head.y += moveAmount;
            } else if (moveDirection === "horizontal") {
                head.x += moveAmount;
            }
            newSnake.unshift(head);

            if ( head.x === food.x && head.y === food.y) {
                useFoodStore.getState().generateFood();
            }
            else {
                newSnake.pop();
            }

            return { snake: newSnake };
        });
    },
    hitWall: () => {
        const moveDirection = useControlsStore.getState().moveVector.direction;
        const moveAmount = useControlsStore.getState().moveVector.amount;
        const {snake, BOARD_SIZE} = get();
        const head = snake[0];
        if ( moveDirection === "vertical") {
			if ( head.y + moveAmount >= BOARD_SIZE || head.y + moveAmount < 0) return true;
			else return false;
		}
		else if ( moveDirection === "horizontal") {
			if ( head.x + moveAmount >= BOARD_SIZE || head.x + moveAmount < 0) return true;
			else return false;
		}
    },
    hitSelf: () => {
        const {snake} = get();
        return snake.slice(1).some((pos) => pos.x === head.x && pos.y === head.y);
    }
}));
