import React, {useState} from "react";
import {TodoItem} from "../todoItem/todoItem";
import {TodoModel} from "@/common/models/Todo.model";
import {TodoStatus} from "@/common/enums/TodoStatus";
import {Flex} from "@mantine/core";

const testTodos:TodoModel[] = []

for (let i = 0; i < 10; i++) {
    let status = TodoStatus.Completed
    if (i % 2) status = TodoStatus.Pending
    else if (i % 3) status = TodoStatus.unCompleted
    testTodos.push({
        title:`this is a test ${i} titlenecfklnwelcf nweb cfvkbwriob viobw vioeobvo ie bvioeiveibiorv`,
        description:"testeando todo" + i,
        date: new Date(2022,11,19,4,50),
        status
    },);
}

export function TodoList(){
    const [todos,setTodos] = useState<TodoModel[]>(testTodos)
    return (
        <Flex direction="column" px={"sm"}>
            {todos.map((t,index) => <TodoItem
                key={`todo-${t.title}`}
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