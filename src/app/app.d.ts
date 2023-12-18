interface Board {
  columns: Map<TypeColumn, Column>;
}
interface Column {
  id: TypedColumn;
  todos: Todo[];
}
interface Todo {
  $id: string;
  $createdAt: string;
  title: string;
  status: TypedColumn;
  image?: string;
}
interface BoardState {
  setBoardState: (board: Board) => void;
  board: Board;
  getBoard: () => void;
 
}

type TypedColumn = "todo" | "inprogress" | "done";
