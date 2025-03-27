import { create } from "zustand";

const BOARD_SIZE = 10;

export const useBoardStore = create((set, get) => ({
    board: new Array(BOARD_SIZE).fill(0).map((row) => new Array(BOARD_SIZE).fill(0)),
    getBoardSize: () => BOARD_SIZE,

}));