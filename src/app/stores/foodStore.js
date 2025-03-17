import { create } from "zustand";

export const useFoodStore = create((set, get) => ({

    food: [{x: 0, y: 0}]

}))