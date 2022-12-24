import React from "react";
import {TodoForm} from "@/component/todoForm/todoForm";
import {useTodosContext} from "@/global/todosContext/todosContext";

export function CreatePage(){
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