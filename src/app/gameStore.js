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

export const useControlsStore = create((set, get) => ({
    moveVector: { direction: "horizontal", amount: 1 },

    handleKeyDown: (event, moveSnake) => {
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

export const useBoardStore = create((set, get) => ({
    board: new Array(10).fill(0).map((row) => new Array(10).fill(0)),
}));