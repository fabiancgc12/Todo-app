import {TodoForm} from "@/component/todoForm/todoForm";
import {useTodosContext} from "@/global/todosContext/todosContext";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";

export function EditPage(){
    const [todos,setTodo] = useTodosContext()
    const { id } = useParams();
    const navigate = useNavigate()
    const todo = todos.find(t => t.id === id)
    // if there is no to-do to be found redirect to home
    useEffect(() => {
        if (!todo)
            navigate("/")
    },[todo])
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