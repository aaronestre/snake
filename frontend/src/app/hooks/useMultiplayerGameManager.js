import { useEffect } from "react";

import { useMultiplayerSnakeStore } from "../stores/multiplayerSnakeStore";
import { useGameEngineStore } from "../stores/gameEngineStore";

export const useMultiplayerGameManager  = (speed = 75) => {
    const moveSnake = useSnakeStore((state) => state.moveSnake);
    const gameStatus = useGameEngineStore((state) => state.gameStatus);

    const initialize = useSnakeStore((state) => state.initializeSnake);

    useEffect(() => {
        if (gameStatus === "playing") {
            initialize();

            const interval = setInterval(() => {
            }, speed);
        }

        return () => clearInterval(interval);
    }, [moveSnake, initialize, gameStatus, speed]);

    return gameStatus;
};
