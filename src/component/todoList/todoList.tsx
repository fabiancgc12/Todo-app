import React from "react";
import {TodoItem} from "../todoItem/todoItem";
import {TodoStatus} from "@/common/enums/TodoStatus";
import {Flex} from "@mantine/core";
import {useTodosContext} from "@/global/todosContext/todosContext";

export function TodoList(){
    const [todos,setTodos] = useTodosContext()
    return (
        <Flex direction="column" px={"sm"}>
            {todos.map((t,index) => <TodoItem
                key={`todo-${t.id}`}
                todo={t}
                changeStatus={() => {
                    const newTodos = [...todos]
                    const newTodo = {...t}
                    if (newTodo.status == TodoStatus.Completed)
                        newTodo.status = TodoStatus.unCompleted
                    else if (newTodo.status == TodoStatus.unCompleted)
                        newTodo.status = TodoStatus.Pending
                    else if (newTodo.status == TodoStatus.Pending)
                        newTodo.status = TodoStatus.Completed
                    newTodos.splice(index,1,newTodo)
                    setTodos(newTodos)
                }}
            />)}
        </Flex>
    )
}