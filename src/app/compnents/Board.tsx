"use client";
import { useEffect } from "react";
import { useBoardStore } from "../store/BoardStore";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { StrictModeDroppable as Droppable } from "./StrictModeDroppable";
import Column from "./Column";
import TodoDataBase from "../api/todoDB";

const todoDB = new  TodoDataBase();
function Board() {
  const [board, getBoard, setBoardState] = useBoardStore((state) => [
    state.board,
    state.getBoard,
    state.setBoardState,
  ]);
  useEffect(() => {
    getBoard();
  }, [getBoard]);

  const handleOnDragEnd = (results: DropResult) => {
    const { destination, source, type, draggableId } = results;
    if (!destination) return;
    if (type === "column") {
      const entries = Array.from(board.columns.entries());
      const [removed] = entries.splice(source.index, 1);
      entries.splice(destination.index, 0, removed);
      const newBoardstate = new Map(entries);
      setBoardState({ ...board, columns: newBoardstate });
    }

    if (type === "card") {
      const entries = Array.from(board.columns.entries());
      const [removed] = entries[Number(source.droppableId)][1].todos.splice(
        source.index,
        1
      );
      entries[Number(destination.droppableId)][1].todos.splice(
        destination.index,
        0,
        removed
      );
      const newBoardstate = new Map(entries);
      setBoardState({ ...board, columns: newBoardstate });
      const type = entries[Number(destination.droppableId)][0];
      if (destination.droppableId !== source.droppableId)
        todoDB.updateTodoInDB(removed, type);
    }
  };
  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId={"dropboard"} direction="horizontal" type="column">
        {(provided) => (
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-7xl"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {Array.from(board.columns.entries()).map(([id, column], index) => (
              <>
                <Column
                  id={id}
                  key={id}
                  todos={column.todos}
                  index={index}
                ></Column>
              </>
            ))}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
export default Board;
