import {TodoForm} from "../component/todoForm/todoForm";
import React from "react";

export function CreatePage(){
    return (
        <TodoForm action={(todo) => {
            console.log(todo)}
        }/>
    )
}