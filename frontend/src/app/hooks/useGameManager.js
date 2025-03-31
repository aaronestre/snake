import { useEffect } from "react";

import { useSnakeStore } from "../stores/snakeStore";
import { useGameEngineStore } from "../stores/gameEngineStore";

export const useGameManager = (speed = 75) => {
	const moveSnake = useSnakeStore((state) => state.moveSnake);
	const gameStatus = useGameEngineStore((state) => state.gameStatus);

	const initialize = useSnakeStore((state) => state.initializeSnake);

	useEffect(() => {
		if (gameStatus === "playing") {
			initialize();

			const interval = setInterval(() => {
				moveSnake();
			}, speed);
		}

		return () => clearInterval(interval);
	}, [moveSnake, initialize, gameStatus, speed]);

	return gameStatus;
};
