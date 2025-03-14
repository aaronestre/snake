"use client";

import { useState, useEffect, useRef } from "react";

const Board = () => {
	const BOARD_SIZE = 10;
	const SNAKE_SPEED = 75;
	const boardRef = useRef(null);
	const [board, setBoard] = useState(
		new Array(BOARD_SIZE).fill(0).map((row) => new Array(BOARD_SIZE).fill(0))
	);

	const [moveVector, setMoveVector] = useState({ direction: "horizontal", amount: 1 });
	const [snake, setSnake] = useState([{ x: 4, y: 4 }, { x: 3, y: 4 }, { x: 2, y: 4 }]);

	useEffect(() => {
		boardRef.current.focus();

		const interval = setInterval(() => {
			boardRef.current.focus();
			moveSnake();
		}, SNAKE_SPEED);

		return () => clearInterval(interval);
	}, [snake, moveVector]);

	const handleKeyDown = (event) => {

		if ( moveVector.direction === "vertical") {
			if ((event.key === "w" && moveVector.amount === 1) ||( event.key === "s" && moveVector.amount === -1)) return;
		}
		else if ( moveVector.direction === "horizontal") {
			if ((event.key === "a" && moveVector.amount === 1) || (event.key === "d" && moveVector.amount === -1)) return;
		}
		const direction = event.key === "w" || event.key === "s" ? "vertical" : "horizontal";
		const amount = event.key === "w" || event.key === "a" ? -1 : 1;

		setMoveVector({ direction: direction, amount: amount });
		moveSnake();
	};

	const moveSnake = () => {
		setSnake((prev) => {
			if (hitWall()) return prev;
			if (moveVector.direction === "vertical") {
				let newSnake = [...prev];
                let head = {...prev[0]}
				head.y += moveVector.amount;
				newSnake.unshift(head);
				newSnake.pop();
				return newSnake;
			} else if (moveVector.direction === "horizontal") {
                let newSnake = [...prev];
                let head = {...prev[0]}
				head.x += moveVector.amount;
				newSnake.unshift(head);
				newSnake.pop();
				return newSnake;
			}
		})
	}

	const hitWall = () => {
		if ( moveVector.direction === "vertical") {
			if ( snake[0].y + moveVector.amount >= BOARD_SIZE || snake[0].y + moveVector.amount < 0) return true;
			else return false;
		}
		else if ( moveVector.direction === "horizontal") {
			if ( snake[0].x + moveVector.amount >= BOARD_SIZE || snake[0].x + moveVector.amount < 0) return true;
			else return false;
		}
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
