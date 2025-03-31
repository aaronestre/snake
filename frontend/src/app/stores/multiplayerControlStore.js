import { create } from "zustand";

export const useMultiplayerControlsStore = create((set, get) => ({

    handleKeyDown: (event) => {
        const key = event.key.toLowerCase();
        if (key !== "w" && key !== "a" && key !== "s" && key !== "d") return;

        switch (key) {
            case "w":
                return "up"
            case "s":
                return "down"
            case "a":
                return "left"
            case "d":
                return "right";

        }
    }
}));