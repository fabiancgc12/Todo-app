import {TodoForm} from "@/component/todoForm/todoForm";
import {useTodosContext} from "@/global/todosContext/todosContext";
import {useParams} from "react-router-dom";
import {TodoModel} from "@/common/models/Todo.model";

export function EditPage(){
    const [todos,setTodo] = useTodosContext()
    const { id } = useParams();
    const todo = todos.find(t => t.id === id) as TodoModel
    console.log(todo)
    return (
        <TodoForm
            action={updatedTodo => {
                setTodo(todos => todos.map(t => {
                    if (t.id === updatedTodo.id)
                        return updatedTodo
                    return  t;
                    }));
                }
            }
            submitLabel={"Update"}
        />
    )
}