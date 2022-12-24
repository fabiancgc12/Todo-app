import React from "react";
import {TodoForm} from "@/component/todoForm/todoForm";
import {useTodosContext} from "@/global/todosContext/todosContext";
import {useNavigate} from "react-router-dom";

export function CreatePage(){
    const navigate = useNavigate();
    const [,setTodos] = useTodosContext()
    return (
        <>
            <TodoForm action={(todo) => {
                setTodos(todos => [todo,...todos])
                navigate(-1)
            }}/>
        </>

    )
}