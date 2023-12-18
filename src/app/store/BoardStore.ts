import { create } from "zustand";
import BoardService from "../service/BoardService";
import { databases } from "../../../appwrite";

const boardService = new BoardService();
export const useBoardStore = create<BoardState>((set) => ({
  board: {
    columns: new Map<TypedColumn, Column>(),
  },
  getBoard: async () => {
    const board = await boardService.getTodosGroupedByColums();
    set({ board });
  },
  setBoardState: (board) => set({ board }),
}));
