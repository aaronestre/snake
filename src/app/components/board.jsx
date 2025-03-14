"use client";

import { useState, useEffect, useRef } from "react";
import { useSnakeStore, useControlsStore, useBoardStore } from "../gameStore";

const Board = () => {
	const BOARD_SIZE = 10;
	const SNAKE_SPEED = 75;
	const boardRef = useRef(null);
	const board = useBoardStore((state) => state.board);

	const moveVector = useControlsStore((state) => state.moveVector);
	const snake = useSnakeStore((state) => state.snake);

	useEffect(() => {
		boardRef.current.focus();

		const interval = setInterval(() => {
			boardRef.current.focus();
			moveSnake(moveVector.direction, moveVector.amount);
		}, SNAKE_SPEED);

		return () => clearInterval(interval);
	}, [snake, moveVector]);

	const handleKeyDown = useControlsStore((state) => state.handleKeyDown);
	const handleMovement = (event) => {
		handleKeyDown(event, moveSnake);
	}
	const moveSnake = useSnakeStore((state) => state.moveSnake);

	return (
		<div
			className="border border-white border-solid focus:outline-none"
			ref={boardRef}
			onKeyDown={handleMovement}
			tabIndex={-1}
		>
			<p className="text-white">
				{moveVector.direction} {moveVector.amount}
			</p>
			{board.map((row, rowIndex) => (
				<div
					className="flex"
					key={rowIndex}
				>
					{row.map((cell, cellIndex) => (
						<div
							className={`w-[50px] h-[50px] border border-white border-solid ${
								snake.some(segment => segment.x === cellIndex && segment.y === rowIndex)
									? "bg-(--secondary-green)"
									: ""
							}`}
							key={cellIndex}
							coords={`x: ${rowIndex}, y: ${cellIndex}`}
						></div>
					))}
				</div>
			))}
		</div>
	);
};

export default Board;
