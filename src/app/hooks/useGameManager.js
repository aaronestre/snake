import { useEffect } from "react";

import { useSnakeStore } from "../stores/snakeStore";
import { useControlsStore } from "../stores/controlsStore";
import { useGameEngineStore } from "../stores/gameEngineStore";

export const useGameManager = (speed = 75) => {
    const moveSnake = useSnakeStore((state) => state.moveSnake);
    const moveVector = useControlsStore((state) => state.moveVector);
    const gameStatus = useGameEngineStore((state) => state.gameStatus);

    useEffect(() => {
        if ( gameStatus !== "playing") return;

        const interval = setInterval(() => {
            moveSnake();
        }, speed);

        return () => clearInterval(interval);
    }, [moveSnake, moveVector, gameStatus, speed]);

    return gameStatus;
}