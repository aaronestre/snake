"use client";

import { useRef } from "react";
import { useBoardStore } from "../stores/boardStore";
import { useControlsStore } from "../stores/controlsStore";
import { useSnakeStore } from "../stores/snakeStore";
import { useFoodStore } from "../stores/foodStore";
import { useGameManager } from "../hooks/useGameManager";

import BoardCell from "./boardCell";

const Board = () => {

    const food = useFoodStore((state) => state.food);
    const snake = useSnakeStore((state) => state.snake);

	const boardRef = useRef(null);
	const board = useBoardStore((state) => state.board);
	const handleKeyDown = useControlsStore((state) => state.handleKeyDown);
	const handleMovement = (event) => {
		handleKeyDown(event);
	}

    useGameManager();

	return (
		<div
			className="border border-white border-solid focus:outline-none"
			ref={boardRef}
			onKeyDown={handleMovement}
			tabIndex={-1}
		>
			<p className="text-white">
				
			</p>
			{board.map((row, rowIndex) => (
				<div
					className="flex"
					key={rowIndex}
				>
					{row.map((cell, cellIndex) => (
						<BoardCell
                            key={cellIndex}
                            position={{ x: cellIndex, y: rowIndex }}
                            isSnake={snake.some((pos) => pos.x === cellIndex && pos.y === rowIndex)}
                            isFood={food.x === cellIndex && food.y === rowIndex}
                        />
					))}
				</div>
			))}
		</div>
	);
};

export default Board;
