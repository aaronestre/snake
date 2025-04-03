import { useEffect } from "react";

import { useMultiplayerSnakeStore } from "../stores/multiplayerSnakeStore";
import { useGameEngineStore } from "../stores/gameEngineStore";

export const useMultiplayerGameManager  = (speed = 75) => {
    const moveSnake = useMultiplayerSnakeStore((state) => state.moveSnake);
    const gameStatus = useGameEngineStore((state) => state.gameStatus);

    const initialize = useMultiplayerSnakeStore((state) => state.initializeSnake);

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
