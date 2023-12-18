"use client";
import { MdDelete } from "react-icons/md";
import {
  DraggableProvidedDragHandleProps,
  DraggableProvidedDraggableProps,
} from "react-beautiful-dnd";
import TodoDataBase from "../api/todoDB";
import { useBoardStore } from "../store/BoardStore";

type Props = {
  todo: Todo;
  object_id: string;
  index: number;
  id: TypedColumn;
  innerRef: (elemennt: HTMLElement | null) => void;
  draggableProps: DraggableProvidedDraggableProps;
  dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
};

const todoDb = new TodoDataBase();
function TodoCard({
  todo,
  object_id,
  index,
  id,
  innerRef,
  draggableProps,
  dragHandleProps,
}: Props) {
  const [board, getBoard, setBoardState] = useBoardStore((state) => [
    state.board,
    state.getBoard,
    state.setBoardState,
  ]);
  const deleteTask = () => {
    const copyboard = board;
    copyboard.columns.get(id)?.todos.splice(index, 1);
    setBoardState(copyboard);
    todoDb.deleteFromDB(object_id);
  };
  return (
    <div
      className="bg-white rounded-md p-2 my-1 drop-shadow-md"
      {...dragHandleProps}
      {...draggableProps}
      ref={innerRef}
    >
      {" "}
      <div className="flex justify-between">
        <h2>{todo.title}</h2>
        <MdDelete
          onClick={() => {
            deleteTask();
          }}
        />
      </div>
    </div>
  );
}
export default TodoCard;
