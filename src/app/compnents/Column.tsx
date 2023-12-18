import { Draggable } from "react-beautiful-dnd";
import { StrictModeDroppable as Droppable } from "./StrictModeDroppable";
import TodoCard from "./TodoCard";
import { IoMdAdd } from "react-icons/io";
import { Dispatch, SetStateAction } from "react";

type Props = {
  id: TypedColumn;
  todos: Todo[];
  index: number;
  setOpenForm: Dispatch<SetStateAction<string>>;
};
function Column({ id, todos, index, setOpenForm }: Props) {
  const getTodoListByStatus = todos.map((todo, index) => (
    <Draggable key={todo.$id} draggableId={todo.$id} index={index}>
      {(provided) => (
        <TodoCard
          todo={todo}
          object_id={todo.$id}
          index={index}
          id={todo.status}
          innerRef={provided.innerRef}
          draggableProps={provided.draggableProps}
          dragHandleProps={provided.dragHandleProps}
        />
      )}
    </Draggable>
  ));

  const textColor =
    id == "todo"
      ? "text-red-400"
      : id == "inprogress"
      ? "text-gray-500"
      : "text-green-300";
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Droppable droppableId={index.toString()} type="card">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={`p-2 rounded-2xl shadow-sm ${
                  snapshot.isDraggingOver ? "bg-blue-300" : "bg-pink-100"
                }`}
              >
                <b className={`${textColor}`}> {id.toUpperCase()}</b>
                <b className="float-right mr-2">
                  <IoMdAdd
                    onClick={() => {
                      setOpenForm(id);
                    }}
                  />
                </b>
                {getTodoListByStatus}
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
}

export default Column;
