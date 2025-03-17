"use client";

import { useState, useEffect, useRef } from "react";
import { useBoardStore } from "../stores/boardStore";
import { useControlsStore } from "../stores/controlsStore";
import { useSnakeStore } from "../stores/snakeStore";
import { useFoodStore } from "../stores/foodStore";
import { useGameManager } from "../hooks/useGameManager";

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
						<div
							className={`w-[50px] h-[50px] border border-white border-solid 
                                ${ snake.some(segment => segment.x === cellIndex && segment.y === rowIndex)
									? "bg-(--secondary-green)"
									: ""
							    }
                                ${ food.x === cellIndex && food.y === rowIndex
                                    ? "bg-red-500"
                                    : ""
                                }

                            `}
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
