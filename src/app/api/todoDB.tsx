import { ID } from "appwrite";
import { databases } from "../../../appwrite";
const db_id = process.env.NEXT_PUBLIC_DATABASE_ID!;
const coll_id = process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!;
class TodoDataBase {
  updateTodoInDB = async (todo: Todo, columnId: TypedColumn) => {
    await databases.updateDocument(db_id, coll_id, todo.$id, {
      title: todo.title,
      status: columnId,
    });
  };
  deleteFromDB = async (object_id: string) => {
    databases.deleteDocument(db_id, coll_id, object_id);
  };
  createTodoInDB = async (todo: any) => {
    await databases.createDocument(db_id, coll_id, ID.unique(), todo);
  };
}
export default TodoDataBase;
