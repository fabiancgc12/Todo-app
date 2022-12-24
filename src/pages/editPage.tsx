import {TodoForm} from "@/component/todoForm/todoForm";
import {useTodosContext} from "@/global/todosContext/todosContext";
import {useNavigate, useParams} from "react-router-dom";
import {TodoModel} from "@/common/models/Todo.model";

export function EditPage(){
    const [todos,setTodo] = useTodosContext()
    const { id } = useParams();
    const navigate = useNavigate()
    const todo = todos.find(t => t.id === id) as TodoModel
    return (
        <TodoForm
            action={updatedTodo => {
                setTodo(todos => todos.map(t => {
                    if (t.id === id)
                        return updatedTodo
                    return  t;
                    }));
                navigate(-1)
                }
            }
            defaultValue={todo}
            submitLabel={"Update"}
        />
    )
}