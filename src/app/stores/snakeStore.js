import { create } from "zustand";

export const useSnakeStore = create((set, get) => ({

    BOARD_SIZE: 10,

    snake: [
        { x: 4, y: 4 },
        { x: 3, y: 4 },
        { x: 2, y: 4 },
    ],

    moveSnake: async (moveDirection, moveAmount) => {
        const isHittingWall = await get().hitWall(moveDirection, moveAmount);
        set((state) => {
            if (isHittingWall) return state;
            let newSnake = [...state.snake];
            let head = { ...state.snake[0] };
            if (moveDirection === "vertical") {
                head.y += moveAmount;
            } else if (moveDirection === "horizontal") {
                head.x += moveAmount;
            }
            newSnake.unshift(head);
            newSnake.pop();
            return { snake: newSnake };
        });
    },
    hitWall: (moveDirection, moveAmount) => {
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
}));
