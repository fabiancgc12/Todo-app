import React from "react";
import {TodoForm} from "@/component/todoForm/todoForm";

export function CreatePage(){

    return (
        <TodoForm action={(todo) => {
            console.log(todo)}
        }/>
    )
}