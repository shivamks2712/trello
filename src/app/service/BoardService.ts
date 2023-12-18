import { databases } from "../../../appwrite";

class BoardService {
  getTodosGroupedByColums = async () => {
    const data = await databases.listDocuments(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!
    );

    const todos = data.documents;
    const columns = todos.reduce((acc, todo) => {
      if (!acc.get(todo.status)) {
        acc.set(todo.status, {
          id: todo.status,
          todos: [],
        });
      }
      acc.get(todo.status)!.todos.push({
        $id: todo.$id,
        $createdAt: todo.$createdAt,
        title: todo.title,
        status: todo.status,
        ...(todo.image && { image: todo.image }),
      });
      return acc;
    }, new Map<TypedColumn, Column>());
    const key: TypedColumn[] = ["todo", "inprogress", "done"];

    for (const columnType of key) {
      if (!columns.get(columnType)) {
        columns.set(columnType, {
          id: columnType,
          todos: [],
        });
      }
    }
    const sortedColumns = new Map(
      Array.from(columns.entries()).sort((a, b) => {
        return key.indexOf(a[0]) - key.indexOf(b[0]);
      })
    );

    const board: Board = {
      columns: sortedColumns,
    };
    return board;
  };
}
export default BoardService;
