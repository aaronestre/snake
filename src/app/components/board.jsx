"use client";

import { useState, useEffect, useRef } from "react";

const Board = () => {
	const BOARD_SIZE = 10;
	const boardRef = useRef(null);
	const [board, setBoard] = useState(
		new Array(BOARD_SIZE).fill(0).map((row) => new Array(BOARD_SIZE).fill(0))
	);

	const [moveVector, setMoveVector] = useState({ direction: "horizontal", amount: 1 });
	const [snakeHead, setSnakeHead] = useState({ x: 4, y: 4 });

	useEffect(() => {
		boardRef.current.focus();

		const interval = setInterval(() => {
			boardRef.current.focus();
			moveSnake();
		}, 75);

		return () => clearInterval(interval);
	}, [snakeHead, moveVector]);

	const handleKeyDown = (event) => {
		const direction = event.key === "w" || event.key === "s" ? "vertical" : "horizontal";
		const amount = event.key === "w" || event.key === "a" ? -1 : 1;

		setMoveVector({ direction: direction, amount: amount });
	};

	const moveSnake = () => {
		setSnakeHead((prev) => {
			if (moveVector.direction === "vertical") {
                if (prev.y + moveVector.amount < BOARD_SIZE && prev.y + moveVector.amount >= 0 ) return{ x: prev.x, y: prev.y + moveVector.amount };
				else return{ x: prev.x, y: prev.y };
			} else if (moveVector.direction === "horizontal") {
                if (prev.x + moveVector.amount < BOARD_SIZE && prev.x + moveVector.amount >= 0 ) return{ x: prev.x + moveVector.amount, y: prev.y };
				else return{ x: prev.x, y: prev.y };
			}
		});
	};

	return (
		<div
			className="border border-white border-solid focus:outline-none"
			ref={boardRef}
			onKeyDown={handleKeyDown}
			tabIndex={-1}
		>
			<p>
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
								rowIndex === snakeHead.y && cellIndex === snakeHead.x
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
