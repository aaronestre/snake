"use client";

import { useState } from "react";

const Board = () => {
	const BOARD_SIZE = 10;
	const [board, setBoard] = useState(
		new Array(BOARD_SIZE).fill(0).map((row) => new Array(BOARD_SIZE).fill(0))
	);

	return (
		<div>
			{board.map((row, rowIndex) => (
				<div className="flex" key={rowIndex}>
					{row.map((cell, cellIndex) => (
						<div
							className="w-[50px] h-[50px] border border-white border-solid"
							key={cellIndex}
						>
							
						</div>
					))}
				</div>
			))}
		</div>
	);
};

export default Board;
