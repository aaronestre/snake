"use client";

import { useRef } from "react";
import { useBoardStore } from "../stores/boardStore";
import { useFoodStore } from "../stores/foodStore";
import { useMultiplayerGameEngineStore } from "../stores/multiplayerGameEngineStore";
import { useMultiplayerGameManager } from "../hooks/useMultiplayerGameManager";
import { useMultiplayerSnakeStore } from "../stores/multiplayerSnakeStore";
import { useMultiplayerControlsStore } from "../stores/multiplayerControlStore";

import BoardCell from "./boardCell";

const Board = () => {

    const food = useFoodStore((state) => state.food);
    const snake = useMultiplayerSnakeStore((state) => state.snake);

	const boardRef = useRef(null);
	const board = useBoardStore((state) => state.board);
	const handleKeyDown = useMultiplayerControlsStore((state) => state.handleKeyDown);
	const handleMovement = (event) => {
		handleKeyDown(event);
	}
    useMultiplayerGameManager();

	return (
		<div
			className="border border-white border-solid focus:outline-none"
			ref={boardRef}
			onKeyDown={handleMovement}
			tabIndex={-1}
		>
			<p className="text-white mx-auto">
				Score: {useMultiplayerGameEngineStore.getState().score}
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
